import {
  fileToBuffer,
  getLocketMonsters,
  getProperty,
  print,
  setProperty,
  toInt,
  toMonster,
  Monster,
  printHtml,
  urlEncode,
  entityEncode,
  Location,
  getMonsters,
} from "kolmafia";

class MonsterGroup {
  monsters: Monster[] = [];
  groupName: string;
}

class LocketMonsters {
  propertyName: string = "_locketMonstersSaved";

  loadMonsters(): MonsterGroup[] {
    let buffer = fileToBuffer("locket_monsters.txt");

    let monsters: MonsterGroup[] = [];
    let alreadyProcessed: Monster[] = [];

    buffer.split(/(\n|\r)+/).forEach((line) => {
      line = line.trim();

      if (line.length == 0 || line.startsWith("#")) {
        return;
      }

      let spl = line.split("\t");

      let monster = Monster.get(spl[0]);

      if (
        monster == null ||
        monster == Monster.get("None") ||
        alreadyProcessed.includes(monster)
      ) {
        return;
      }

      alreadyProcessed.push(monster);

      let groupName = spl[1];

      if (groupName != null) {
        let group = monsters.find((group) => group.groupName == groupName);

        if (group != null) {
          group.monsters.push(monster);
          return;
        }
      }

      let group = new MonsterGroup();
      group.monsters.push(monster);
      group.groupName = groupName;

      monsters.push(group);
    });

    return monsters;
  }

  getLocketMonsters() {
    let locketMonsters: Monster[] = Object.keys(getLocketMonsters()).map((m) =>
      Monster.get(m)
    );

    // Add the fought
    for (let monster of getProperty("_locketMonstersFought")
      .split(",")
      .filter((m) => m.match(/[0-9]+/))
      .map((m) => toMonster(toInt(m)))) {
      if (locketMonsters.includes(monster)) {
        continue;
      }

      locketMonsters.push(monster);
    }

    let savedLocketMonsters: Monster[] = getProperty(this.propertyName)
      .split(",")
      .filter((m) => m.match(/[0-9]+/))
      .map((m) => toMonster(toInt(m)));

    for (let m of savedLocketMonsters) {
      if (locketMonsters.includes(m)) {
        continue;
      }

      locketMonsters.push(m);
    }

    if (locketMonsters.length > savedLocketMonsters.length) {
      setProperty(
        this.propertyName,
        locketMonsters.map((m) => toInt(m)).join(",")
      );
    } else {
      locketMonsters = savedLocketMonsters;
    }

    return locketMonsters;
  }

  printLocket(limit: number) {
    let wantToGet: MonsterGroup[] = this.loadMonsters();
    let alreadyKnow: Monster[] = this.getLocketMonsters();

    if (alreadyKnow.length <= 3) {
      print(
        "This is embarrassing.. Can't pull data on what locket monsters you own!",
        "red"
      );

      if (getProperty("_locketMonstersFought").split(",").length >= 3) {
        print(
          "You have already fought all 3 locket fights, unfortunately this means you can't load the monsters.. Wait for rollover?",
          "red"
        );
      } else {
        print(
          "Try visiting the locket remenise page then run this script again!",
          "gray"
        );
      }

      return;
    }

    let totalToGet: number = wantToGet.reduce(
      (p, v) => p + v.monsters.length,
      0
    );
    let unknown: MonsterGroup[] = wantToGet
      .map((group) => {
        let g = new MonsterGroup();
        g.groupName = group.groupName;

        for (let m of group.monsters) {
          if (alreadyKnow.includes(m)) {
            continue;
          }

          g.monsters.push(m);
        }

        return g;
      })
      .filter((g) => g.monsters.length > 0);

    let totalUnknown: number = unknown.reduce(
      (p, v) => p + v.monsters.length,
      0
    );
    let totalKnown: number = totalToGet - totalUnknown;

    let monstersPrinted: number = 0;
    let linesPrinted: number = 0;

    let getLocations: (monster: Monster) => Location[] = function (
      monster: Monster
    ): Location[] {
      let locations: Location[] = [];

      for (let l of Location.all()) {
        if (!getMonsters(l).includes(monster)) {
          continue;
        }

        locations.push(l);
      }

      return locations;
    };

    let makeString: (string: String, locations: Location[]) => string =
      function (string: String, locations: Location[]) {
        let locationsTitle = "";

        if (locations.length > 0) {
          let locationsStrings: string[] = locations.map(
            (l) => l.zone + ": " + l
          );

          locationsTitle = entityEncode(locationsStrings.join(", "));
        } else {
          locationsTitle = "No locations found";
        }

        return (
          "<font color='gray' title='" +
          locationsTitle +
          "'>" +
          string +
          "</font>"
        );
      };

    print("Hover over the monsters to see locations");

    for (let group of unknown) {
      monstersPrinted += group.monsters.length;
      linesPrinted++;

      if (group.groupName == null) {
        for (let monster of group.monsters) {
          printHtml(
            makeString(
              monster +
                (group.groupName != null ? " @ " + group.groupName : ""),
              getLocations(monster)
            )
          );
        }
      } else {
        printHtml(
          "<font color='blue'>" +
            group.groupName +
            ":</font> " +
            group.monsters
              .map((monster) => makeString(monster + "", getLocations(monster)))
              .join(", ")
        );
      }

      if (linesPrinted >= limit && monstersPrinted + 1 < totalUnknown) {
        break;
      }
    }

    if (totalUnknown > monstersPrinted) {
      print(
        "Skipped " + (totalUnknown - monstersPrinted) + " monsters..",
        "gray"
      );
    }

    let totalMonsters: number = Monster.all().filter(
      (m) => m.copyable && !m.boss
    ).length;

    printHtml(
      `You have ${totalKnown} / ${totalToGet}. Including every monster <font title="The data on copyable monsters isn't always accurate.">possible*,</font> you have ${alreadyKnow.length} / ${totalMonsters}`
    );
  }
}

export function main(limit: string = "10") {
  new LocketMonsters().printLocket(toInt(limit));
}
