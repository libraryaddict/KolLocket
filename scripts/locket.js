var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/Locket.ts
var Locket_exports = {};
__export(Locket_exports, {
  main: () => main
});
module.exports = __toCommonJS(Locket_exports);
var import_kolmafia3 = require("kolmafia");

// src/LocketUtils.ts
var import_kolmafia = require("kolmafia");
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var _n = 0, F = function F2() {
      };
      return { s: F, n: function n() {
        return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
      }, e: function e2(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = true, u = false;
  return { s: function s() {
    t = t.call(r);
  }, n: function n() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function e2(r2) {
    u = true, o = r2;
  }, f: function f() {
    try {
      a || null == t.return || t.return();
    } finally {
      if (u) throw o;
    }
  } };
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, e) {
  if ("object" != typeof t || !t) return t;
  var r;
  if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) {
    var i = r.call(t, e || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === e ? String : Number)(t);
}
var Zone = /* @__PURE__ */ _createClass(function Zone2() {
  _classCallCheck(this, Zone2);
  _defineProperty(
    this,
    "children",
    []
  );
  _defineProperty(
    this,
    "locations",
    []
  );
});
var LocketUtils = /* @__PURE__ */ (function() {
  function LocketUtils2() {
    _classCallCheck(this, LocketUtils2);
  }
  return _createClass(LocketUtils2, null, [{ key: "getZones", value: function getZones() {
    if (this.allZones == null) {
      this.allZones = this.loadAllZones();
    }
    return this.allZones;
  } }, { key: "getLocations", value: function getLocations(monster) {
    var locations = [];
    var _iterator = _createForOfIteratorHelper(
      import_kolmafia.Location.all()
    ), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var l = _step.value;
        if (!(0, import_kolmafia.getMonsters)(l).includes(monster)) {
          continue;
        }
        locations.push(l);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return locations;
  } }, { key: "makeZoneString", value: function makeZoneString(string, monsterInfo) {
    var locationsTitle = [];
    var locations = this.getLocations(monsterInfo.monster);
    locationsTitle.push(
      "=-=-=-=-= " + monsterInfo.monster.name + " =-=-=-=-=-="
    );
    if (locations.length > 0) {
      var locationsStrings = locations.map(
        (l) => this.getFullZoneName(l.zone) + " => " + l
      );
      locationsTitle.push.apply(locationsTitle, _toConsumableArray(locationsStrings));
    } else {
      locationsTitle.push("No locations found");
    }
    if (monsterInfo.note.length > 0) {
      locationsTitle.push("~ Note: " + monsterInfo.note);
    }
    return "<font color='gray' title='" + locationsTitle.map((s) => (0, import_kolmafia.entityEncode)(s)).join("&#010;") + "'>" + (0, import_kolmafia.entityEncode)(string) + "</font>";
  } }, { key: "getFullZoneName", value: function getFullZoneName(zoneName) {
    if (zoneName == null) {
      return zoneName;
    }
    var zone = this.getZones().get(zoneName.toLowerCase());
    if (zone == null) {
      return zoneName;
    }
    if (zone.parentZone == null || zone.parentZone.locations.length == 0) {
      return zone.name;
    }
    return this.getFullZoneName(zone.parentZone.name) + " => " + zone.name;
  } }, { key: "loadAllZones", value: function loadAllZones() {
    var zoneMap = /* @__PURE__ */ new Map();
    var zoneData = (0, import_kolmafia.fileToBuffer)("locket_zones.txt").split("\n");
    var _iterator2 = _createForOfIteratorHelper(
      zoneData
    ), _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
        var data = _step2.value;
        if (data.length == 0 || data.startsWith("#")) {
          continue;
        }
        var spl = data.split("	");
        if (spl.length < 3) {
          continue;
        }
        var zone = new Zone();
        zone.id = spl[0];
        zone.parentZone = zoneMap.get(spl[1].toLowerCase());
        zone.name = spl[2];
        if (zone.parentZone != null) {
          zone.parentZone.children.push(zone);
        }
        var _iterator3 = _createForOfIteratorHelper(
          import_kolmafia.Location.all()
        ), _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
            var loc = _step3.value;
            if (loc.zone != zone.id) {
              continue;
            }
            zone.locations.push(loc);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        zoneMap.set(zone.id.toLowerCase(), zone);
        zoneMap.set(zone.name.toLowerCase(), zone);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return zoneMap;
  } }, { key: "getMonsters", value: function getMonsters3(locketMonsters, propertyName, propertyNameKnownToHave) {
    var knownToHave = (0, import_kolmafia.toInt)((0, import_kolmafia.getProperty)(propertyNameKnownToHave));
    var _iterator4 = _createForOfIteratorHelper((0, import_kolmafia.getProperty)("_locketMonstersFought").split(",").filter((m2) => m2.match(/[0-9]+/)).map((m2) => (0, import_kolmafia.toMonster)((0, import_kolmafia.toInt)(m2)))), _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
        var monster = _step4.value;
        if (locketMonsters.includes(monster)) {
          continue;
        }
        locketMonsters.push(monster);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    var savedLocketMonsters = (0, import_kolmafia.getProperty)(propertyName).split(",").filter((m2) => m2.match(/[0-9]+/)).map((m2) => (0, import_kolmafia.toMonster)((0, import_kolmafia.toInt)(m2)));
    var _iterator5 = _createForOfIteratorHelper(
      savedLocketMonsters
    ), _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
        var m = _step5.value;
        if (locketMonsters.includes(m)) {
          continue;
        }
        locketMonsters.push(m);
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    if (locketMonsters.length > savedLocketMonsters.length) {
      var prop = (0, import_kolmafia.getProperty)("logPreferenceChange");
      if (prop == "true") {
        (0, import_kolmafia.print)(
          "Reason we're disabling preference logging for a sec is due to spam",
          "gray"
        );
        (0, import_kolmafia.setProperty)("logPreferenceChange", "false");
      }
      (0, import_kolmafia.setProperty)(propertyName, locketMonsters.map((m2) => (0, import_kolmafia.toInt)(m2)).join(","));
      if (prop == "true") {
        (0, import_kolmafia.setProperty)("logPreferenceChange", prop);
      }
      if (knownToHave < locketMonsters.length) {
        (0, import_kolmafia.setProperty)(propertyNameKnownToHave, locketMonsters.length.toString());
      }
    } else {
      locketMonsters = savedLocketMonsters;
    }
    return locketMonsters;
  } }, { key: "getLocketMonsters", value: function getLocketMonsters() {
    var locketMonsters = Object.keys((0, import_kolmafia.getLocketMonsters)()).map(
      (m) => import_kolmafia.Monster.get(m)
    );
    return this.getMonsters(
      locketMonsters,
      this.propertyName,
      this.propertyNameKnownToHave
    );
  } }]);
})();
_defineProperty(LocketUtils, "propertyName", "_locketMonstersSaved");
_defineProperty(LocketUtils, "propertyNameKnownToHave", "locketAmountKnownToHave");

// src/MonsterLoader.ts
var import_kolmafia2 = require("kolmafia");
function _createForOfIteratorHelper2(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray2(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var _n = 0, F = function F2() {
      };
      return { s: F, n: function n() {
        return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
      }, e: function e2(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = true, u = false;
  return { s: function s() {
    t = t.call(r);
  }, n: function n() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function e2(r2) {
    u = true, o = r2;
  }, f: function f() {
    try {
      a || null == t.return || t.return();
    } finally {
      if (u) throw o;
    }
  } };
}
function _toConsumableArray2(r) {
  return _arrayWithoutHoles2(r) || _iterableToArray2(r) || _unsupportedIterableToArray2(r) || _nonIterableSpread2();
}
function _nonIterableSpread2() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray2(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray2(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray2(r, a) : void 0;
  }
}
function _iterableToArray2(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles2(r) {
  if (Array.isArray(r)) return _arrayLikeToArray2(r);
}
function _arrayLikeToArray2(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _defineProperty2(e, r, t) {
  return (r = _toPropertyKey2(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _defineProperties2(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey2(o.key), o);
  }
}
function _createClass2(e, r, t) {
  return r && _defineProperties2(e.prototype, r), t && _defineProperties2(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
}
function _toPropertyKey2(t) {
  var i = _toPrimitive2(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive2(t, e) {
  if ("object" != typeof t || !t) return t;
  var r;
  if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) {
    var i = r.call(t, e || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === e ? String : Number)(t);
}
function _classCallCheck2(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
var MonsterInfo = /* @__PURE__ */ _createClass2(function MonsterInfo2() {
  _classCallCheck2(this, MonsterInfo2);
});
var MonsterGroup = /* @__PURE__ */ _createClass2(function MonsterGroup2() {
  _classCallCheck2(this, MonsterGroup2);
  _defineProperty2(
    this,
    "monsters",
    []
  );
});
var LocketLoader = /* @__PURE__ */ (function() {
  function LocketLoader2() {
    _classCallCheck2(this, LocketLoader2);
    _defineProperty2(
      this,
      "monsterGroups",
      []
    );
    _defineProperty2(
      this,
      "alreadyProcessed",
      []
    );
    _defineProperty2(
      this,
      "hideNotInLocation",
      true
    );
  }
  return _createClass2(LocketLoader2, [{ key: "getMonsters", value: function getMonsters3(location) {
    var result;
    if (!this.hideNotInLocation) {
      result = (0, import_kolmafia2.getMonsters)(location);
    } else {
      result = Object.entries((0, import_kolmafia2.appearanceRates)(location)).filter((v) => v[1] > 0).map((v) => import_kolmafia2.Monster.get(v[0]));
      result.sort((m1, m2) => m1.name.localeCompare(m2.name));
    }
    return result;
  } }, { key: "loadMonsterZone", value: function loadMonsterZone(zone, groupName, note) {
    var zones = [zone];
    while (zones.length > 0) {
      var _zone = zones.pop();
      zones.push.apply(zones, _toConsumableArray2(_zone.children));
      var _iterator = _createForOfIteratorHelper2(
        _zone.locations
      ), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var loc = _step.value;
          var group = new MonsterGroup();
          group.groupName = (groupName || "") + LocketUtils.getFullZoneName(_zone.name);
          if (_zone.name) {
            group.groupName += " => ";
          }
          group.groupName += loc;
          var _iterator2 = _createForOfIteratorHelper2(
            this.getMonsters(loc)
          ), _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
              var monster = _step2.value;
              if (this.alreadyProcessed.includes(monster) || !this.isLocketable(monster)) {
                continue;
              }
              var info = new MonsterInfo();
              info.monster = monster;
              info.note = note;
              group.monsters.push(info);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          if (group.monsters.length > 0) {
            this.monsterGroups.push(group);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  } }, { key: "getZone", value: function getZone(zoneName) {
    return LocketUtils.getZones().get(zoneName.toLowerCase());
  } }, { key: "loadZone", value: function loadZone(zone, groupName, note) {
    if (typeof zone == "string") {
      zone = this.getZone(zone);
    }
    this.loadMonsterZone(zone, groupName, note);
  } }, { key: "loadDataFile", value: function loadDataFile() {
    var buffer = (0, import_kolmafia2.fileToBuffer)("locket_monsters.txt");
    buffer.split(/(\n|\r)+/).forEach((line) => {
      line = line.trim();
      if (line.length == 0 || line.startsWith("#")) {
        return;
      }
      var spl = line.split("	");
      var toLoad = spl[0];
      var groupName = spl[1];
      var note = spl[2] || "";
      if (toLoad.toLowerCase() == "current zone" || toLoad.toLowerCase() == "zone") {
        this.loadZone((0, import_kolmafia2.myLocation)().zone, groupName, note);
        return;
      } else if (toLoad.toLowerCase() == "parent zone") {
        toLoad = (0, import_kolmafia2.myLocation)().zone;
        var zone = LocketUtils.getZones().get(toLoad.toLowerCase());
        while (zone.parentZone != null) {
          zone = zone.parentZone;
        }
        this.loadZone(zone.id, groupName, note);
        return;
      } else if (toLoad.toLowerCase() == "location") {
        this.loadMonsterLocation((0, import_kolmafia2.myLocation)(), groupName, note);
        return;
      } else if (toLoad.toLowerCase() == "wanderer" || toLoad.toLowerCase() == "wanderers" || toLoad == "none") {
        this.loadMonsterLocation(import_kolmafia2.Location.get("None"), groupName, note);
        return;
      } else if (toLoad == "*" || toLoad == "all") {
        this.loadMonsterLocation(null, groupName, note);
        return;
      }
      try {
        var monster = import_kolmafia2.Monster.get(toLoad);
        this.loadMonsterGroup(monster, groupName, note);
      } catch (_unused) {
        (0, import_kolmafia2.print)("Invalid monster/zone: " + toLoad, "red");
        return;
      }
    });
  } }, { key: "isLocketable", value: function isLocketable(monster) {
    return !monster.boss && monster.copyable && monster.id > 0 && !(0, import_kolmafia2.containsText)(monster.attributes, "ULTRARARE");
  } }, { key: "loadLocationless", value: function loadLocationless() {
    var monstersFound = [];
    var _iterator3 = _createForOfIteratorHelper2(
      import_kolmafia2.Location.all()
    ), _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
        var l = _step3.value;
        var _iterator4 = _createForOfIteratorHelper2(
          this.getMonsters(l)
        ), _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
            var m = _step4.value;
            monstersFound.push(m);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    var monsters = import_kolmafia2.Monster.all().filter(
      (m2) => !monstersFound.includes(m2) && this.isLocketable(m2)
    );
    return monsters;
  } }, { key: "loadAllMonsters", value: function loadAllMonsters(groupName, note) {
    var group = new MonsterGroup();
    group.groupName = (groupName || "") + "All Monsters";
    var _iterator5 = _createForOfIteratorHelper2(
      import_kolmafia2.Monster.all()
    ), _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
        var monster = _step5.value;
        if (this.alreadyProcessed.includes(monster) || !this.isLocketable(monster)) {
          continue;
        }
        var info = new MonsterInfo();
        info.monster = monster;
        info.note = note;
        group.monsters.push(info);
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    if (group.monsters.length > 0) {
      this.monsterGroups.push(group);
    }
  } }, { key: "loadMonsterLocation", value: function loadMonsterLocation(location, groupName, note) {
    var group = new MonsterGroup();
    group.groupName = (groupName || "") + (location == null ? "" : LocketUtils.getFullZoneName(location.zone));
    if (location != null && location.zone) {
      group.groupName += " => ";
    }
    var monsters = [];
    if (location == null) {
      monsters = import_kolmafia2.Monster.all();
    } else if (location == import_kolmafia2.Location.get("None")) {
      group.groupName += "Locationless (Or not available in their location) ";
      monsters = this.loadLocationless();
    } else {
      group.groupName += location;
      monsters = this.getMonsters(location);
    }
    var _iterator6 = _createForOfIteratorHelper2(
      monsters
    ), _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
        var monster = _step6.value;
        if (this.alreadyProcessed.includes(monster) || !this.isLocketable(monster)) {
          continue;
        }
        var info = new MonsterInfo();
        info.monster = monster;
        info.note = note;
        group.monsters.push(info);
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
    if (group.monsters.length > 0) {
      this.monsterGroups.push(group);
    }
  } }, { key: "loadMonsterGroup", value: function loadMonsterGroup(monster, groupName, note) {
    if (monster == null || monster == import_kolmafia2.Monster.get("None")) {
      return;
    }
    if (!monster.copyable || monster.boss || monster.id < 0) {
      return;
    }
    if (this.alreadyProcessed.includes(monster)) {
      (0, import_kolmafia2.print)(
        "You have a duplicate entry for " + monster + " in your locket_monsters.txt"
      );
      return;
    }
    var monsterInfo = new MonsterInfo();
    monsterInfo.monster = monster;
    monsterInfo.note = note;
    if (groupName != null) {
      var _group = this.monsterGroups.find(
        (group2) => group2.groupName == groupName
      );
      if (_group != null) {
        _group.monsters.push(monsterInfo);
        return;
      }
    }
    var group = new MonsterGroup();
    group.monsters.push(monsterInfo);
    group.groupName = groupName;
    this.monsterGroups.push(group);
  } }]);
})();

// src/Locket.ts
function _createForOfIteratorHelper3(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray3(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var _n = 0, F = function F2() {
      };
      return { s: F, n: function n() {
        return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
      }, e: function e2(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = true, u = false;
  return { s: function s() {
    t = t.call(r);
  }, n: function n() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function e2(r2) {
    u = true, o = r2;
  }, f: function f() {
    try {
      a || null == t.return || t.return();
    } finally {
      if (u) throw o;
    }
  } };
}
function _unsupportedIterableToArray3(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray3(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray3(r, a) : void 0;
  }
}
function _arrayLikeToArray3(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _classCallCheck3(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties3(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey3(o.key), o);
  }
}
function _createClass3(e, r, t) {
  return r && _defineProperties3(e.prototype, r), t && _defineProperties3(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
}
function _defineProperty3(e, r, t) {
  return (r = _toPropertyKey3(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey3(t) {
  var i = _toPrimitive3(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive3(t, e) {
  if ("object" != typeof t || !t) return t;
  var r;
  if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) {
    var i = r.call(t, e || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === e ? String : Number)(t);
}
var LocketMonsters = /* @__PURE__ */ (function() {
  function LocketMonsters2() {
    _classCallCheck3(this, LocketMonsters2);
    _defineProperty3(this, "loader", new LocketLoader());
    _defineProperty3(this, "locketSources", []);
    this.locketMonsters = LocketUtils.getLocketMonsters();
    var note = "";
    this.locketSources.push(
      [
        ["file", "data"],
        () => {
          return this.loader.loadDataFile();
        }
      ]
    );
    this.locketSources.push(
      [
        ["zone", "czone", "current zone", "myzone"],
        () => {
          return this.loader.loadZone(
            (0, import_kolmafia3.myLocation)().zone,
            "Current Zone: ",
            "note"
          );
        }
      ]
    );
    this.locketSources.push(
      [
        ["pzone", "parent zone", "parent"],
        () => {
          var toLoad = (0, import_kolmafia3.myLocation)().zone;
          var zone = LocketUtils.getZones().get(toLoad.toLowerCase());
          while (zone.parentZone != null) {
            zone = zone.parentZone;
          }
          return this.loader.loadZone(zone.id, zone.id + ": ", note);
        }
      ]
    );
    this.locketSources.push(
      [
        ["location", "loc", "myloc"],
        () => {
          return this.loader.loadMonsterLocation(
            (0, import_kolmafia3.myLocation)(),
            (0, import_kolmafia3.myLocation)() + " ",
            note
          );
        }
      ]
    );
    this.locketSources.push(
      [
        ["wanderers", "wanderer", "zoneless"],
        () => {
          return this.loader.loadMonsterLocation(
            import_kolmafia3.Location.get("None"),
            "Wanderers: ",
            note
          );
        }
      ]
    );
    this.locketSources.push(
      [
        ["all", "everything", "*"],
        () => {
          this.loader.hideNotInLocation = false;
          return this.loader.loadMonsterLocation(null, "All ", note);
        }
      ]
    );
    this.locketSources.push(
      [
        ["canadv", "available", "adv"],
        () => {
          var _iterator = _createForOfIteratorHelper3(
            import_kolmafia3.Location.all()
          ), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var loc = _step.value;
              if (!(0, import_kolmafia3.canAdventure)(loc)) {
                continue;
              }
              this.loader.loadMonsterLocation(loc, "Can Adv: ", note);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      ]
    );
    this.locketSources.push(
      [
        import_kolmafia3.Location.all().filter((l) => (0, import_kolmafia3.getMonsters)(l).length > 0).map((l) => l.toString()),
        (name) => {
          this.loader.loadMonsterLocation(
            import_kolmafia3.Location.get(name),
            import_kolmafia3.Location.get(name) + ": ",
            note
          );
        }
      ]
    );
  }
  return _createClass3(LocketMonsters2, [{ key: "loadData", value: function loadData(origSource) {
    var source = origSource.toLowerCase();
    var _iterator2 = _createForOfIteratorHelper3(
      this.locketSources
    ), _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
        var s = _step2.value;
        if (!s[0].includes(source)) {
          continue;
        }
        s[1].call(this, source);
        return true;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    (0, import_kolmafia3.print)(
      "Unable to find something to load by the name of '" + origSource + "'. Provide 'help' to get valid filters",
      "red"
    );
    return false;
  } }, { key: "run", value: function run(parameter) {
    if (parameter == "help") {
      var _iterator3 = _createForOfIteratorHelper3(
        this.locketSources
      ), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var _source = _step3.value;
          var s = void 0;
          if (_source[0].length > 10) {
            s = "<font color=green>A Location Name</font>";
          } else {
            s = _source[0].map((s2) => "<font color=green>" + s2 + "</font>").join('<font color=blue>", "</font>');
          }
          (0, import_kolmafia3.printHtml)(
            '<font color=blue>Can do: "</font>' + s + '<font color=blue>" to filter by that group..</font>'
          );
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return;
    }
    parameter = parameter.trim();
    var source = "file";
    var limit = 10;
    var limitMatch = parameter.match(/(?:(?:\s|^)(\d+)$)|(?:^(\d+)(?:\s|$))/);
    if (limitMatch != null) {
      if (limitMatch[1] != null) {
        limit = (0, import_kolmafia3.toInt)(limitMatch[1]);
      } else if (limitMatch[2] != null) {
        limit = (0, import_kolmafia3.toInt)(limitMatch[2]);
      }
      parameter = parameter.replace(limitMatch[0], "");
    }
    if (parameter.length > 0) {
      source = parameter;
    }
    (0, import_kolmafia3.print)("Doing source '" + source + "' and limit " + limit, "gray");
    if (!this.loadData(source)) {
      return;
    }
    this.printLocket(limit);
  } }, { key: "printLocket", value: function printLocket(limit) {
    var wantToGet = this.loader.monsterGroups;
    var alreadyKnow = this.locketMonsters;
    var knownToHave = (0, import_kolmafia3.toInt)((0, import_kolmafia3.getProperty)(LocketUtils.propertyNameKnownToHave));
    if (alreadyKnow.length < knownToHave) {
      (0, import_kolmafia3.print)(
        "This is embarrassing. Can't pull data on what locket monsters you own!",
        "red"
      );
      if ((0, import_kolmafia3.getProperty)("_locketMonstersFought").split(",").length >= 3) {
        (0, import_kolmafia3.print)(
          "You have already fought all 3 locket fights, unfortunately this means you can't load the monsters. Wait for rollover?",
          "red"
        );
      } else {
        (0, import_kolmafia3.print)(
          "Try visiting the locket reminisce page then run this script again!",
          "gray"
        );
      }
      (0, import_kolmafia3.print)(
        "Otherwise use 'set locketAmountKnownToHave=0' to reset the count, this is safe to do."
      );
      return;
    }
    var totalToGet = wantToGet.reduce(
      (p, v) => p + v.monsters.length,
      0
    );
    var unknown = wantToGet.map((group2) => {
      var g = new MonsterGroup();
      g.groupName = group2.groupName;
      var _iterator4 = _createForOfIteratorHelper3(
        group2.monsters
      ), _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
          var m = _step4.value;
          if (alreadyKnow.includes(m.monster)) {
            continue;
          }
          g.monsters.push(m);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      return g;
    }).filter((g) => g.monsters.length > 0);
    var totalUnknown = unknown.reduce(
      (p, v) => p + v.monsters.length,
      0
    );
    var totalKnown = totalToGet - totalUnknown;
    var monstersPrinted = 0;
    var linesPrinted = 0;
    (0, import_kolmafia3.print)("Hover over the monsters to see locations");
    var _iterator5 = _createForOfIteratorHelper3(
      unknown
    ), _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
        var group = _step5.value;
        monstersPrinted += group.monsters.length;
        linesPrinted++;
        if (group.groupName == null) {
          var _iterator6 = _createForOfIteratorHelper3(
            group.monsters
          ), _step6;
          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
              var monster = _step6.value;
              (0, import_kolmafia3.printHtml)(
                LocketUtils.makeZoneString(
                  monster.monster + (group.groupName != null ? " @ " + group.groupName : ""),
                  monster
                )
              );
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        } else {
          for (var i = 0; i < group.monsters.length; i += 50) {
            var toPrint = group.monsters.slice(
              i,
              Math.min(i + 50, group.monsters.length)
            );
            (0, import_kolmafia3.printHtml)(
              "<font color='blue'>" + (i == 0 ? group.groupName : "Continued") + ":</font> " + toPrint.map(
                (monster2) => LocketUtils.makeZoneString(monster2.monster + "", monster2)
              ).join(", ")
            );
          }
        }
        if (linesPrinted >= limit && monstersPrinted + 1 < totalUnknown) {
          break;
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    if (totalUnknown > monstersPrinted) {
      (0, import_kolmafia3.print)(
        "There is more! Skipped " + (totalUnknown - monstersPrinted) + " lines..",
        "red"
      );
    }
    var totalMonsters = import_kolmafia3.Monster.all().filter(
      (m) => m.copyable && !m.boss && m.id > 0
    ).length;
    (0, import_kolmafia3.printHtml)(
      `You have ${totalKnown} / ${totalToGet}. Including every monster <font title="The data on copyable monsters isn't always accurate.">possible*,</font> you have ${alreadyKnow.length} / ${totalMonsters}`
    );
  } }]);
})();
function main() {
  var limit = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "10";
  new LocketMonsters().run(limit);
}
