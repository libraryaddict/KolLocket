import {
  getProperty,
  print,
  toInt,
  Monster,
  printHtml,
  Location,
  getMonsters,
  myLocation,
  canAdventure,
} from "kolmafia";
import { LocketUtils } from "./LocketUtils";
import { LocketLoader, MonsterGroup } from "./MonsterLoader";

type LocketSource = (filter?: string) => void;

class LocketMonsters {
  locketMonsters: Monster[];
  loader: LocketLoader = new LocketLoader();
  locketSources: [string[], LocketSource][] = [];

  constructor() {
    this.locketMonsters = LocketUtils.getLocketMonsters();

    const note: string = "";

    this.locketSources.push([
      ["file", "data"],
      () => {
        return this.loader.loadDataFile();
      },
    ]);

    this.locketSources.push([
      ["zone", "czone", "current zone", "myzone"],
      () => {
        return this.loader.loadZone(
          myLocation().zone,
          "Current Zone: ",
          "note"
        );
      },
    ]);

    this.locketSources.push([
      ["pzone", "parent zone", "parent"],
      () => {
        const toLoad = myLocation().zone;

        let zone = LocketUtils.getZones().get(toLoad.toLowerCase());

        while (zone.parentZone != null) {
          zone = zone.parentZone;
        }

        return this.loader.loadZone(zone.id, zone.id + ": ", note);
      },
    ]);

    this.locketSources.push([
      ["location", "loc", "myloc"],
      () => {
        return this.loader.loadMonsterLocation(
          myLocation(),
          myLocation() + " ",
          note
        );
      },
    ]);

    this.locketSources.push([
      ["wanderers", "wanderer", "zoneless"],
      () => {
        return this.loader.loadMonsterLocation(
          Location.get("None"),
          "Wanderers: ",
          note
        );
      },
    ]);

    this.locketSources.push([
      ["all", "everything", "*"],
      () => {
        this.loader.hideNotInLocation = false;
        return this.loader.loadMonsterLocation(null, "All ", note);
      },
    ]);

    this.locketSources.push([
      ["canadv", "available", "adv"],
      () => {
        for (const loc of Location.all()) {
          if (!canAdventure(loc)) {
            continue;
          }

          this.loader.loadMonsterLocation(loc, "Can Adv: ", note);
        }
      },
    ]);

    this.locketSources.push([
      Location.all()
        .filter((l) => getMonsters(l).length > 0)
        .map((l) => l.toString()),
      (name) => {
        this.loader.loadMonsterLocation(
          Location.get(name),
          Location.get(name) + ": ",
          note
        );
      },
    ]);
  }

  loadData(origSource: string): boolean {
    const source = origSource.toLowerCase();

    for (const s of this.locketSources) {
      if (!s[0].includes(source)) {
        continue;
      }

      s[1].call(this, source);
      return true;
    }

    print(
      "Unable to find something to load by the name of '" +
        origSource +
        "'. Provide 'help' to get valid filters",
      "red"
    );

    return false;
  }

  run(parameter: string) {
    if (parameter == "help") {
      for (const source of this.locketSources) {
        let s: string;

        if (source[0].length > 10) {
          s = "<font color=green>A Location Name</font>";
        } else {
          s = source[0]
            .map((s) => "<font color=green>" + s + "</font>")
            .join('<font color=blue>", "</font>');
        }

        printHtml(
          '<font color=blue>Can do: "</font>' +
            s +
            '<font color=blue>" to filter by that group..</font>'
        );
      }

      return;
    }

    parameter = parameter.trim();
    let source: string = "file";
    let limit: number = 10;

    const limitMatch = parameter.match(/(?:(?:\s|^)(\d+)$)|(?:^(\d+)(?:\s|$))/);

    if (limitMatch != null) {
      if (limitMatch[1] != null) {
        limit = toInt(limitMatch[1]);
      } else if (limitMatch[2] != null) {
        limit = toInt(limitMatch[2]);
      }

      parameter = parameter.replace(limitMatch[0], "");
    }

    if (parameter.length > 0) {
      source = parameter;
    }

    print("Doing source '" + source + "' and limit " + limit, "gray");

    if (!this.loadData(source)) {
      return;
    }

    this.printLocket(limit);
  }

  printLocket(limit: number) {
    const wantToGet: MonsterGroup[] = this.loader.monsterGroups;
    const alreadyKnow: Monster[] = this.locketMonsters;
    const knownToHave = toInt(getProperty(LocketUtils.propertyNameKnownToHave));

    if (alreadyKnow.length < knownToHave) {
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

    const totalToGet: number = wantToGet.reduce(
      (p, v) => p + v.monsters.length,
      0
    );
    const unknown: MonsterGroup[] = wantToGet
      .map((group) => {
        const g = new MonsterGroup();
        g.groupName = group.groupName;

        for (const m of group.monsters) {
          if (alreadyKnow.includes(m.monster)) {
            continue;
          }

          g.monsters.push(m);
        }

        return g;
      })
      .filter((g) => g.monsters.length > 0);

    const totalUnknown: number = unknown.reduce(
      (p, v) => p + v.monsters.length,
      0
    );
    const totalKnown: number = totalToGet - totalUnknown;

    let monstersPrinted: number = 0;
    let linesPrinted: number = 0;

    print("Hover over the monsters to see locations");

    for (const group of unknown) {
      monstersPrinted += group.monsters.length;
      linesPrinted++;

      if (group.groupName == null) {
        for (const monster of group.monsters) {
          printHtml(
            LocketUtils.makeZoneString(
              monster.monster +
                (group.groupName != null ? " @ " + group.groupName : ""),
              monster
            )
          );
        }
      } else {
        for (let i = 0; i < group.monsters.length; i += 100) {
          const toPrint = group.monsters.slice(
            i,
            Math.min(i + 50, group.monsters.length)
          );

          printHtml(
            "<font color='blue'>" +
              (i == 0 ? group.groupName : "Continued") +
              ":</font> " +
              toPrint
                .map((monster) =>
                  LocketUtils.makeZoneString(monster.monster + "", monster)
                )
                .join(", ")
          );
        }
      }

      if (linesPrinted >= limit && monstersPrinted + 1 < totalUnknown) {
        break;
      }
    }

    if (totalUnknown > monstersPrinted) {
      print(
        "There is more! Skipped " +
          (totalUnknown - monstersPrinted) +
          " lines..",
        "red"
      );
    }

    const totalMonsters: number = Monster.all().filter(
      (m) => m.copyable && !m.boss
    ).length;

    printHtml(
      `You have ${totalKnown} / ${totalToGet}. Including every monster <font title="The data on copyable monsters isn't always accurate.">possible*,</font> you have ${alreadyKnow.length} / ${totalMonsters}`
    );
  }
}

export function main(limit: string = "10") {
  new LocketMonsters().run(limit);
}
