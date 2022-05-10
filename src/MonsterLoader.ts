import {
  Monster,
  fileToBuffer,
  toMonster,
  myLocation,
  Location,
  print,
  containsText,
  getLocationMonsters,
  getMonsters,
  appearanceRates,
} from "kolmafia";
import { LocketUtils, Zone } from "./LocketUtils";

export class MonsterInfo {
  monster: Monster;
  note: string;
}

export class MonsterGroup {
  monsters: MonsterInfo[] = [];
  groupName: string;
}

export class LocketLoader {
  invalidMonsters: Monster[] = [];
  monsterGroups: MonsterGroup[] = [];
  alreadyProcessed: Monster[] = [];
  hideNotInLocation: boolean = true;

  constructor() {
    this.invalidMonsters = this.getInvalidMonsters();
  }

  getMonsters(location: Location): Monster[] {
    let result: Monster[];

    if (!this.hideNotInLocation) {
      result = getMonsters(location);
    } else {
      result = Object.entries(appearanceRates(location))
        .filter((v) => v[1] > 0)
        .map((v) => Monster.get(v[0]));

      result.sort((m1, m2) => m1.name.localeCompare(m2.name));
    }

    return result;
  }

  loadMonsterZone(zone: Zone, groupName: string, note: string) {
    let zones: Zone[] = [zone];

    while (zones.length > 0) {
      let zone = zones.pop();

      zones.push(...zone.children);

      for (let loc of zone.locations) {
        let group = new MonsterGroup();
        group.groupName =
          (groupName || "") + LocketUtils.getFullZoneName(zone.name);

        if (zone.name) {
          group.groupName += " => ";
        }

        group.groupName += loc;

        for (let monster of this.getMonsters(loc)) {
          if (
            this.alreadyProcessed.includes(monster) ||
            !this.isLocketable(monster)
          ) {
            continue;
          }

          let info = new MonsterInfo();
          info.monster = monster;
          info.note = note;

          group.monsters.push(info);
        }

        if (group.monsters.length > 0) {
          this.monsterGroups.push(group);
        }
      }
    }
  }

  getInvalidMonsters(): Monster[] {
    let buffer = fileToBuffer("nowish_monsters.txt").split("\n");
    let monsters: Monster[] = [];

    for (let line of buffer) {
      if (line.startsWith("#") || line.length == 0) {
        continue;
      }

      let monster = toMonster(line);

      monsters.push(monster);
    }

    return monsters;
  }

  getZone(zoneName: string): Zone {
    return LocketUtils.getZones().get(zoneName.toLowerCase());
  }

  loadZone(zone: Zone | string, groupName: string, note: string) {
    if (typeof zone == "string") {
      zone = this.getZone(zone);
    }

    this.loadMonsterZone(zone, groupName, note);
  }

  loadDataFile() {
    let buffer = fileToBuffer("locket_monsters.txt");

    buffer.split(/(\n|\r)+/).forEach((line) => {
      line = line.trim();

      // Is comment
      if (line.length == 0 || line.startsWith("#")) {
        return;
      }

      let spl = line.split("\t");
      let toLoad = spl[0];
      let groupName = spl[1];
      let note = spl[2] || "";

      if (
        toLoad.toLowerCase() == "current zone" ||
        toLoad.toLowerCase() == "zone"
      ) {
        this.loadZone(myLocation().zone, groupName, note);
        return;
      } else if (toLoad.toLowerCase() == "parent zone") {
        toLoad = myLocation().zone;

        let zone = LocketUtils.getZones().get(toLoad.toLowerCase());

        while (zone.parentZone != null) {
          zone = zone.parentZone;
        }

        this.loadZone(zone.id, groupName, note);
        return;
      } else if (toLoad.toLowerCase() == "location") {
        this.loadMonsterLocation(myLocation(), groupName, note);
        return;
      } else if (
        toLoad.toLowerCase() == "wanderer" ||
        toLoad.toLowerCase() == "wanderers" ||
        toLoad == "none"
      ) {
        this.loadMonsterLocation(Location.get("None"), groupName, note);
        return;
      } else if (toLoad == "*" || toLoad == "all") {
        this.loadMonsterLocation(null, groupName, note);
        return;
      }

      try {
        let monster: Monster = Monster.get(toLoad);

        this.loadMonsterGroup(monster, groupName, note);
      } catch {
        print("Invalid monster/zone: " + toLoad, "red");
        return;
      }
    });
  }

  isLocketable(monster: Monster): boolean {
    return (
      !monster.boss &&
      monster.copyable &&
      !containsText(monster.attributes, "ULTRARARE") &&
      !this.invalidMonsters.includes(monster) &&
      monster.baseHp < 50000 // The health is probably a bad idea, but filters great!
    );
  }

  loadLocationless(): Monster[] {
    let monstersFound: Monster[] = [];

    for (let l of Location.all()) {
      for (let m of this.getMonsters(l)) {
        monstersFound.push(m);
      }
    }

    let monsters: Monster[] = Monster.all().filter(
      (m) => !monstersFound.includes(m) && this.isLocketable(m)
    );

    return monsters;
  }

  loadAllMonsters(groupName: string, note: string) {
    let group = new MonsterGroup();
    group.groupName = (groupName || "") + "All Monsters";

    for (let monster of Monster.all()) {
      if (
        this.alreadyProcessed.includes(monster) ||
        !this.isLocketable(monster)
      ) {
        continue;
      }

      let info = new MonsterInfo();
      info.monster = monster;
      info.note = note;

      group.monsters.push(info);
    }

    if (group.monsters.length > 0) {
      this.monsterGroups.push(group);
    }
  }

  loadMonsterLocation(location: Location, groupName: string, note: string) {
    let group = new MonsterGroup();
    group.groupName =
      (groupName || "") +
      (location == null ? "" : LocketUtils.getFullZoneName(location.zone));

    if (location != null && location.zone) {
      group.groupName += " => ";
    }

    let monsters: Monster[] = [];

    if (location == null) {
      monsters = Monster.all();
    } else if (location == Location.get("None")) {
      group.groupName += "Locationless (Or not available in their location) ";
      monsters = this.loadLocationless();
    } else {
      group.groupName += location;
      monsters = this.getMonsters(location);
    }

    for (let monster of monsters) {
      if (
        this.alreadyProcessed.includes(monster) ||
        !this.isLocketable(monster)
      ) {
        continue;
      }

      let info = new MonsterInfo();
      info.monster = monster;
      info.note = note;

      group.monsters.push(info);
    }

    if (group.monsters.length > 0) {
      this.monsterGroups.push(group);
    }
  }

  loadMonsterGroup(monster: Monster, groupName: string, note: string) {
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

    if (this.alreadyProcessed.includes(monster)) {
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
      let group = this.monsterGroups.find(
        (group) => group.groupName == groupName
      );

      if (group != null) {
        group.monsters.push(monsterInfo);
        return;
      }
    }

    let group = new MonsterGroup();
    group.monsters.push(monsterInfo);
    group.groupName = groupName;

    this.monsterGroups.push(group);
  }
}
