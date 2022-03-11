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
  entityEncode,
  Location,
  getMonsters,
  containsText,
  myLocation,
  getLocationMonsters,
} from "kolmafia";

class MonsterInfo {
  monster: Monster;
  note: string;
}

class MonsterGroup {
  monsters: MonsterInfo[] = [];
  groupName: string;
}

class Zone {
  parentZone: Zone;
  children: Zone[] = [];
  id: string;
  name: string;
  locations: Location[] = [];
}

class LocketMonsters {
  propertyName: string = "_locketMonstersSaved";
  propertyNameKnownToHave = "locketAmountKnownToHave";
  allZones: Map<string, Zone>;
  monsters: MonsterGroup[];
  locketMonsters: Monster[];

  loadStuff() {
    this.allZones = this.getAllZones();
    this.monsters = this.loadMonsterGroups();
    this.locketMonsters = this.getLocketMonsters();
  }

  getFullName(zoneName: string): string {
    if (zoneName == null) {
      return zoneName;
    }

    let zone: Zone = this.allZones.get(zoneName.toLowerCase());

    if (zone == null) {
      return zoneName;
    }

    if (zone.parentZone == null || zone.parentZone.locations.length == 0) {
      return zone.name;
    }

    return this.getFullName(zone.parentZone.name) + " => " + zone.name;
  }

  loadMonsterZone(
    alreadyProcessed: Monster[],
    monsterGroups: MonsterGroup[],
    zone: Zone,
    groupName: string,
    note: string
  ) {
    let zones: Zone[] = [zone];

    while (zones.length > 0) {
      let zone = zones.pop();

      zones.push(...zone.children);

      for (let loc of zone.locations) {
        let group = new MonsterGroup();
        group.groupName = (groupName || "") + this.getFullName(zone.name);

        if (zone.name) {
          group.groupName += " => ";
        }

        group.groupName += loc;

        for (let monster of getMonsters(loc)) {
          if (
            !monster.copyable ||
            monster.boss ||
            containsText(monster.attributes, "ULTRARARE")
          ) {
            continue;
          }

          let info = new MonsterInfo();
          info.monster = monster;
          info.note = note;

          group.monsters.push(info);
        }

        if (group.monsters.length > 0) {
          monsterGroups.push(group);
        }
      }
    }
  }

  isLocketable(monster: Monster): boolean {
    return (
      !monster.boss &&
      monster.copyable &&
      !containsText(monster.attributes, "ULTRARARE")
    );
  }

  loadLocationless(): Monster[] {
    let monstersFound: Monster[] = [];

    for (let l of Location.all()) {
      for (let m of Object.keys(getLocationMonsters(l)).map((m) =>
        Monster.get(m)
      )) {
        monstersFound.push(m);
      }
    }

    let monsters: Monster[] = Monster.all().filter(
      (m) => !monstersFound.includes(m) && this.isLocketable(m)
    );

    return monsters;
  }

  loadMonsterLocation(
    alreadyProcessed: Monster[],
    monsterGroups: MonsterGroup[],
    location: Location,
    groupName: string,
    note: string
  ) {
    let group = new MonsterGroup();
    group.groupName = (groupName || "") + this.getFullName(location.zone);

    if (location.zone) {
      group.groupName += " => ";
    }

    let monsters: Monster[] = [];

    if (location == Location.get("None")) {
      group.groupName += "Locationless";
      monsters = this.loadLocationless();
    } else {
      group.groupName += location;
      monsters = getMonsters(location);
    }

    for (let monster of monsters) {
      if (!this.isLocketable(monster)) {
        continue;
      }

      let info = new MonsterInfo();
      info.monster = monster;
      info.note = note;

      group.monsters.push(info);
    }

    if (group.monsters.length > 0) {
      monsterGroups.push(group);
    }
  }

  loadMonsterGroup(
    alreadyProcessed: Monster[],
    monsterGroups: MonsterGroup[],
    monster: Monster,
    groupName: string,
    note: string
  ) {
    if (monster == null || monster == Monster.get("None")) {
      return;
    }

    if (!monster.copyable || monster.boss) {
      print(
        monster +
          " is marked as a boss or no-copy, yet is in locket_monsters.txt. Is this a mistake?",
        "gray"
      );
    }

    if (alreadyProcessed.includes(monster)) {
      print(
        "You have a duplicate entry for " +
          monster +
          " in your locket_monsters.txt"
      );
      return;
    }

    let monsterInfo = new MonsterInfo();
    monsterInfo.monster = monster;
    monsterInfo.note = note;

    if (groupName != null) {
      let group = monsterGroups.find((group) => group.groupName == groupName);

      if (group != null) {
        group.monsters.push(monsterInfo);
        return;
      }
    }

    let group = new MonsterGroup();
    group.monsters.push(monsterInfo);
    group.groupName = groupName;

    monsterGroups.push(group);
  }

  loadMonsterGroups(): MonsterGroup[] {
    let buffer = fileToBuffer("locket_monsters.txt");

    let monsters: MonsterGroup[] = [];
    let alreadyProcessed: Monster[] = [];

    buffer.split(/(\n|\r)+/).forEach((line) => {
      line = line.trim();

      if (line.length == 0 || line.startsWith("#")) {
        return;
      }

      let spl = line.split("\t");
      let toLoad = spl[0];
      let groupName = spl[1];
      let note = spl[2] || "";

      let zone: Zone;

      if (
        toLoad.toLowerCase() == "current zone" ||
        toLoad.toLowerCase() == "zone"
      ) {
        toLoad = myLocation().zone;
      } else if (toLoad.toLowerCase() == "parent zone") {
        toLoad = myLocation().zone;

        zone = this.allZones.get(toLoad.toLowerCase());

        while (zone.parentZone != null) {
          zone = zone.parentZone;
        }

        toLoad = zone.id;
      } else if (toLoad.toLowerCase() == "location") {
        this.loadMonsterLocation(
          alreadyProcessed,
          monsters,
          myLocation(),
          groupName,
          note
        );
        return;
      } else if (
        toLoad.toLowerCase() == "wanderer" ||
        toLoad.toLowerCase() == "wanderers" ||
        toLoad == "none"
      ) {
        this.loadMonsterLocation(
          alreadyProcessed,
          monsters,
          Location.get("None"),
          groupName,
          note
        );
        return;
      }

      zone = this.allZones.get(toLoad.toLowerCase());

      if (zone != null) {
        this.loadMonsterZone(alreadyProcessed, monsters, zone, groupName, note);
        return;
      }

      try {
        let monster: Monster = Monster.get(toLoad);
        this.loadMonsterGroup(
          alreadyProcessed,
          monsters,
          monster,
          groupName,
          note
        );
      } catch {
        print("Invalid monster/zone: " + toLoad, "red");
        return;
      }
    });

    return monsters;
  }

  getLocketMonsters() {
    let locketMonsters: Monster[] = Object.keys(getLocketMonsters()).map((m) =>
      Monster.get(m)
    );

    let knownToHave = toInt(getProperty(this.propertyNameKnownToHave));

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
      let prop = getProperty("logPreferenceChange");

      if (prop == "true") {
        print(
          "Reason we're disabling preference logging for a sec is due to spam",
          "gray"
        );
        setProperty("logPreferenceChange", "false");
      }

      setProperty(
        this.propertyName,
        locketMonsters.map((m) => toInt(m)).join(",")
      );

      if (prop == "true") {
        setProperty("logPreferenceChange", prop);
      }

      if (knownToHave < locketMonsters.length) {
        setProperty(
          this.propertyNameKnownToHave,
          locketMonsters.length.toString()
        );
      }
    } else {
      locketMonsters = savedLocketMonsters;
    }

    return locketMonsters;
  }

  makeZoneString(string: String, monsterInfo: MonsterInfo) {
    let locationsTitle = "";
    let locations = this.getLocations(monsterInfo.monster);

    if (locations.length > 0) {
      let locationsStrings: string[] = locations.map(
        (l) => this.getFullName(l.zone) + ": " + l
      );

      locationsTitle = entityEncode(locationsStrings.join(", "));
    } else {
      locationsTitle = "No locations found";
    }

    if (monsterInfo.note.length > 0) {
      locationsTitle += " ~ Note: " + monsterInfo.note;
    }

    return (
      "<font color='gray' title='" + locationsTitle + "'>" + string + "</font>"
    );
  }

  getLocations: (monster: Monster) => Location[] = function (
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

  printLocket(limit: number) {
    this.loadStuff();

    let wantToGet: MonsterGroup[] = this.monsters;
    let alreadyKnow: Monster[] = this.locketMonsters;
    let knownToHave = toInt(getProperty(this.propertyNameKnownToHave));

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

    let totalToGet: number = wantToGet.reduce(
      (p, v) => p + v.monsters.length,
      0
    );
    let unknown: MonsterGroup[] = wantToGet
      .map((group) => {
        let g = new MonsterGroup();
        g.groupName = group.groupName;

        for (let m of group.monsters) {
          if (alreadyKnow.includes(m.monster)) {
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

    print("Hover over the monsters to see locations");

    for (let group of unknown) {
      monstersPrinted += group.monsters.length;
      linesPrinted++;

      if (group.groupName == null) {
        for (let monster of group.monsters) {
          printHtml(
            this.makeZoneString(
              monster.monster +
                (group.groupName != null ? " @ " + group.groupName : ""),
              monster
            )
          );
        }
      } else {
        printHtml(
          "<font color='blue'>" +
            group.groupName +
            ":</font> " +
            group.monsters
              .map((monster) =>
                this.makeZoneString(monster.monster + "", monster)
              )
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

  getAllZones(): Map<string, Zone> {
    let zoneMap: Map<string, Zone> = new Map();

    let zoneData: string[] = fileToBuffer("locket_zones.txt").split("\n");

    for (let data of zoneData) {
      if (data.length == 0 || data.startsWith("#")) {
        continue;
      }

      let spl = data.split("\t");

      if (spl.length < 3) {
        continue;
      }

      let zone = new Zone();
      zone.id = spl[0];
      zone.parentZone = zoneMap.get(spl[1].toLowerCase());
      zone.name = spl[2];

      if (zone.parentZone != null) {
        zone.parentZone.children.push(zone);
      }

      for (let loc of Location.all()) {
        if (loc.zone != zone.id) {
          continue;
        }

        zone.locations.push(loc);
      }

      zoneMap.set(zone.id.toLowerCase(), zone);
      zoneMap.set(zone.name.toLowerCase(), zone);
    }

    return zoneMap;
  }
}

export function main(limit: string = "10") {
  new LocketMonsters().printLocket(toInt(limit));
}
