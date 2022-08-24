import {
  Monster,
  getLocketMonsters,
  toInt,
  getProperty,
  toMonster,
  print,
  setProperty,
  fileToBuffer,
  Location,
  getMonsters,
  entityEncode,
} from "kolmafia";
import { MonsterInfo } from "./MonsterLoader";

export class Zone {
  parentZone: Zone;
  children: Zone[] = [];
  id: string;
  name: string;
  locations: Location[] = [];
}

export class LocketUtils {
  static propertyName: string = "_locketMonstersSaved";
  static propertyNameKnownToHave = "locketAmountKnownToHave";
  static allZones: Map<string, Zone>;

  static getZones(): Map<string, Zone> {
    if (this.allZones == null) {
      this.allZones = this.loadAllZones();
    }

    return this.allZones;
  }

  static getLocations(monster: Monster): Location[] {
    const locations: Location[] = [];

    for (const l of Location.all()) {
      if (!getMonsters(l).includes(monster)) {
        continue;
      }

      locations.push(l);
    }

    return locations;
  }

  static makeZoneString(string: string, monsterInfo: MonsterInfo) {
    let locationsTitle = "";
    const locations = this.getLocations(monsterInfo.monster);

    if (locations.length > 0) {
      const locationsStrings: string[] = locations.map(
        (l) => this.getFullZoneName(l.zone) + ": " + l
      );

      locationsTitle = locationsStrings.join(", ");
    } else {
      locationsTitle = "No locations found";
    }

    if (monsterInfo.note.length > 0) {
      locationsTitle += " ~ Note: " + monsterInfo.note;
    }

    return (
      "<font color='gray' title='" +
      entityEncode(locationsTitle) +
      "'>" +
      entityEncode(string) +
      "</font>"
    );
  }

  static getFullZoneName(zoneName: string): string {
    if (zoneName == null) {
      return zoneName;
    }

    const zone: Zone = this.getZones().get(zoneName.toLowerCase());

    if (zone == null) {
      return zoneName;
    }

    if (zone.parentZone == null || zone.parentZone.locations.length == 0) {
      return zone.name;
    }

    return this.getFullZoneName(zone.parentZone.name) + " => " + zone.name;
  }

  static loadAllZones(): Map<string, Zone> {
    const zoneMap: Map<string, Zone> = new Map();

    const zoneData: string[] = fileToBuffer("locket_zones.txt").split("\n");

    for (const data of zoneData) {
      if (data.length == 0 || data.startsWith("#")) {
        continue;
      }

      const spl = data.split("\t");

      if (spl.length < 3) {
        continue;
      }

      const zone = new Zone();
      zone.id = spl[0];
      zone.parentZone = zoneMap.get(spl[1].toLowerCase());
      zone.name = spl[2];

      if (zone.parentZone != null) {
        zone.parentZone.children.push(zone);
      }

      for (const loc of Location.all()) {
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

  static getLocketMonsters() {
    let locketMonsters: Monster[] = Object.keys(getLocketMonsters()).map((m) =>
      Monster.get(m)
    );

    const knownToHave = toInt(getProperty(this.propertyNameKnownToHave));

    // Add the fought
    for (const monster of getProperty("_locketMonstersFought")
      .split(",")
      .filter((m) => m.match(/[0-9]+/))
      .map((m) => toMonster(toInt(m)))) {
      if (locketMonsters.includes(monster)) {
        continue;
      }

      locketMonsters.push(monster);
    }

    const savedLocketMonsters: Monster[] = getProperty(this.propertyName)
      .split(",")
      .filter((m) => m.match(/[0-9]+/))
      .map((m) => toMonster(toInt(m)));

    for (const m of savedLocketMonsters) {
      if (locketMonsters.includes(m)) {
        continue;
      }

      locketMonsters.push(m);
    }

    if (locketMonsters.length > savedLocketMonsters.length) {
      const prop = getProperty("logPreferenceChange");

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
}
