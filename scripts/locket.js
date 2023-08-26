/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  main: () => (/* binding */ main)
});

;// CONCATENATED MODULE: external "kolmafia"
const external_kolmafia_namespaceObject = require("kolmafia");
;// CONCATENATED MODULE: ./src/LocketUtils.ts
function _createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperty(obj, key, value) {key = _toPropertyKey(key);if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toPropertyKey(arg) {var key = _toPrimitive(arg, "string");return typeof key === "symbol" ? key : String(key);}function _toPrimitive(input, hint) {if (typeof input !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {var res = prim.call(input, hint || "default");if (typeof res !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");}return (hint === "string" ? String : Number)(input);}


var Zone = /*#__PURE__*/_createClass(function Zone() {_classCallCheck(this, Zone);_defineProperty(this, "parentZone", void 0);_defineProperty(this, "children",

  []);_defineProperty(this, "id", void 0);_defineProperty(this, "name", void 0);_defineProperty(this, "locations",


  []);});


var LocketUtils = /*#__PURE__*/function () {function LocketUtils() {_classCallCheck(this, LocketUtils);}_createClass(LocketUtils, null, [{ key: "getZones", value:




    function getZones() {
      if (this.allZones == null) {
        this.allZones = this.loadAllZones();
      }

      return this.allZones;
    } }, { key: "getLocations", value:

    function getLocations(monster) {
      var locations = [];var _iterator = _createForOfIteratorHelper(

          external_kolmafia_namespaceObject.Location.all()),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var l = _step.value;
          if (!(0,external_kolmafia_namespaceObject.getMonsters)(l).includes(monster)) {
            continue;
          }

          locations.push(l);
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

      return locations;
    } }, { key: "makeZoneString", value:

    function makeZoneString(string, monsterInfo) {
      var locationsTitle = "";
      var locations = this.getLocations(monsterInfo.monster);

      if (locations.length > 0) {
        var locationsStrings = locations.map(
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
        (0,external_kolmafia_namespaceObject.entityEncode)(locationsTitle) +
        "'>" +
        (0,external_kolmafia_namespaceObject.entityEncode)(string) +
        "</font>");

    } }, { key: "getFullZoneName", value:

    function getFullZoneName(zoneName) {
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
    } }, { key: "loadAllZones", value:

    function loadAllZones() {
      var zoneMap = new Map();

      var zoneData = (0,external_kolmafia_namespaceObject.fileToBuffer)("locket_zones.txt").split("\n");var _iterator2 = _createForOfIteratorHelper(

          zoneData),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var data = _step2.value;
          if (data.length == 0 || data.startsWith("#")) {
            continue;
          }

          var spl = data.split("\t");

          if (spl.length < 3) {
            continue;
          }

          var zone = new Zone();
          zone.id = spl[0];
          zone.parentZone = zoneMap.get(spl[1].toLowerCase());
          zone.name = spl[2];

          if (zone.parentZone != null) {
            zone.parentZone.children.push(zone);
          }var _iterator3 = _createForOfIteratorHelper(

              external_kolmafia_namespaceObject.Location.all()),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var loc = _step3.value;
              if (loc.zone != zone.id) {
                continue;
              }

              zone.locations.push(loc);
            }} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}

          zoneMap.set(zone.id.toLowerCase(), zone);
          zoneMap.set(zone.name.toLowerCase(), zone);
        }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}

      return zoneMap;
    } }, { key: "getLocketMonsters", value:

    function getLocketMonsters() {
      var locketMonsters = Object.keys((0,external_kolmafia_namespaceObject.getLocketMonsters)()).map((m) =>
      external_kolmafia_namespaceObject.Monster.get(m)
      );

      var knownToHave = (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)(this.propertyNameKnownToHave));

      // Add the fought
      var _iterator4 = _createForOfIteratorHelper((0,external_kolmafia_namespaceObject.getProperty)("_locketMonstersFought").
        split(",").
        filter((m) => m.match(/[0-9]+/)).
        map((m) => (0,external_kolmafia_namespaceObject.toMonster)((0,external_kolmafia_namespaceObject.toInt)(m)))),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var monster = _step4.value;
          if (locketMonsters.includes(monster)) {
            continue;
          }

          locketMonsters.push(monster);
        }} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}

      var savedLocketMonsters = (0,external_kolmafia_namespaceObject.getProperty)(this.propertyName).
      split(",").
      filter((m) => m.match(/[0-9]+/)).
      map((m) => (0,external_kolmafia_namespaceObject.toMonster)((0,external_kolmafia_namespaceObject.toInt)(m)));var _iterator5 = _createForOfIteratorHelper(

          savedLocketMonsters),_step5;try {for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {var m = _step5.value;
          if (locketMonsters.includes(m)) {
            continue;
          }

          locketMonsters.push(m);
        }} catch (err) {_iterator5.e(err);} finally {_iterator5.f();}

      if (locketMonsters.length > savedLocketMonsters.length) {
        var prop = (0,external_kolmafia_namespaceObject.getProperty)("logPreferenceChange");

        if (prop == "true") {
          (0,external_kolmafia_namespaceObject.print)(
            "Reason we're disabling preference logging for a sec is due to spam",
            "gray"
          );
          (0,external_kolmafia_namespaceObject.setProperty)("logPreferenceChange", "false");
        }

        (0,external_kolmafia_namespaceObject.setProperty)(
          this.propertyName,
          locketMonsters.map((m) => (0,external_kolmafia_namespaceObject.toInt)(m)).join(",")
        );

        if (prop == "true") {
          (0,external_kolmafia_namespaceObject.setProperty)("logPreferenceChange", prop);
        }

        if (knownToHave < locketMonsters.length) {
          (0,external_kolmafia_namespaceObject.setProperty)(
            this.propertyNameKnownToHave,
            locketMonsters.length.toString()
          );
        }
      } else {
        locketMonsters = savedLocketMonsters;
      }

      return locketMonsters;
    } }]);return LocketUtils;}();_defineProperty(LocketUtils, "propertyName", "_locketMonstersSaved");_defineProperty(LocketUtils, "propertyNameKnownToHave", "locketAmountKnownToHave");_defineProperty(LocketUtils, "allZones", void 0);
;// CONCATENATED MODULE: ./src/MonsterLoader.ts
function MonsterLoader_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = MonsterLoader_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || MonsterLoader_unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function MonsterLoader_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return MonsterLoader_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return MonsterLoader_arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return MonsterLoader_arrayLikeToArray(arr);}function MonsterLoader_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;}function MonsterLoader_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, MonsterLoader_toPropertyKey(descriptor.key), descriptor);}}function MonsterLoader_createClass(Constructor, protoProps, staticProps) {if (protoProps) MonsterLoader_defineProperties(Constructor.prototype, protoProps);if (staticProps) MonsterLoader_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function MonsterLoader_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function MonsterLoader_defineProperty(obj, key, value) {key = MonsterLoader_toPropertyKey(key);if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function MonsterLoader_toPropertyKey(arg) {var key = MonsterLoader_toPrimitive(arg, "string");return typeof key === "symbol" ? key : String(key);}function MonsterLoader_toPrimitive(input, hint) {if (typeof input !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {var res = prim.call(input, hint || "default");if (typeof res !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");}return (hint === "string" ? String : Number)(input);}


var MonsterInfo = /*#__PURE__*/MonsterLoader_createClass(function MonsterInfo() {MonsterLoader_classCallCheck(this, MonsterInfo);MonsterLoader_defineProperty(this, "monster", void 0);MonsterLoader_defineProperty(this, "note", void 0);});




var MonsterGroup = /*#__PURE__*/MonsterLoader_createClass(function MonsterGroup() {MonsterLoader_classCallCheck(this, MonsterGroup);MonsterLoader_defineProperty(this, "monsters",
  []);MonsterLoader_defineProperty(this, "groupName", void 0);});



var LocketLoader = /*#__PURE__*/function () {





  function LocketLoader() {MonsterLoader_classCallCheck(this, LocketLoader);MonsterLoader_defineProperty(this, "invalidMonsters", []);MonsterLoader_defineProperty(this, "monsterGroups", []);MonsterLoader_defineProperty(this, "alreadyProcessed", []);MonsterLoader_defineProperty(this, "hideNotInLocation", true);
    this.invalidMonsters = this.getInvalidMonsters();
  }MonsterLoader_createClass(LocketLoader, [{ key: "getMonsters", value:

    function getMonsters(location) {
      var result;

      if (!this.hideNotInLocation) {
        result = (0,external_kolmafia_namespaceObject.getMonsters)(location);
      } else {
        result = Object.entries((0,external_kolmafia_namespaceObject.appearanceRates)(location)).
        filter((v) => v[1] > 0).
        map((v) => external_kolmafia_namespaceObject.Monster.get(v[0]));

        result.sort((m1, m2) => m1.name.localeCompare(m2.name));
      }

      return result;
    } }, { key: "loadMonsterZone", value:

    function loadMonsterZone(zone, groupName, note) {
      var zones = [zone];

      while (zones.length > 0) {
        var _zone = zones.pop();

        zones.push.apply(zones, _toConsumableArray(_zone.children));var _iterator = MonsterLoader_createForOfIteratorHelper(

            _zone.locations),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var loc = _step.value;
            var group = new MonsterGroup();
            group.groupName =
            (groupName || "") + LocketUtils.getFullZoneName(_zone.name);

            if (_zone.name) {
              group.groupName += " => ";
            }

            group.groupName += loc;var _iterator2 = MonsterLoader_createForOfIteratorHelper(

                this.getMonsters(loc)),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var monster = _step2.value;
                if (
                this.alreadyProcessed.includes(monster) ||
                !this.isLocketable(monster))
                {
                  continue;
                }

                var info = new MonsterInfo();
                info.monster = monster;
                info.note = note;

                group.monsters.push(info);
              }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}

            if (group.monsters.length > 0) {
              this.monsterGroups.push(group);
            }
          }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
      }
    } }, { key: "getInvalidMonsters", value:

    function getInvalidMonsters() {
      var buffer = (0,external_kolmafia_namespaceObject.fileToBuffer)("nowish_monsters.txt").split("\n");
      var monsters = [];var _iterator3 = MonsterLoader_createForOfIteratorHelper(

          buffer),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var line = _step3.value;
          if (line.startsWith("#") || line.length == 0) {
            continue;
          }

          var monster = (0,external_kolmafia_namespaceObject.toMonster)(line);

          monsters.push(monster);
        }} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}

      return monsters;
    } }, { key: "getZone", value:

    function getZone(zoneName) {
      return LocketUtils.getZones().get(zoneName.toLowerCase());
    } }, { key: "loadZone", value:

    function loadZone(zone, groupName, note) {
      if (typeof zone == "string") {
        zone = this.getZone(zone);
      }

      this.loadMonsterZone(zone, groupName, note);
    } }, { key: "loadDataFile", value:

    function loadDataFile() {
      var buffer = (0,external_kolmafia_namespaceObject.fileToBuffer)("locket_monsters.txt");

      buffer.split(/(\n|\r)+/).forEach((line) => {
        line = line.trim();

        // Is comment
        if (line.length == 0 || line.startsWith("#")) {
          return;
        }

        var spl = line.split("\t");
        var toLoad = spl[0];
        var groupName = spl[1];
        var note = spl[2] || "";

        if (
        toLoad.toLowerCase() == "current zone" ||
        toLoad.toLowerCase() == "zone")
        {
          this.loadZone((0,external_kolmafia_namespaceObject.myLocation)().zone, groupName, note);
          return;
        } else if (toLoad.toLowerCase() == "parent zone") {
          toLoad = (0,external_kolmafia_namespaceObject.myLocation)().zone;

          var zone = LocketUtils.getZones().get(toLoad.toLowerCase());

          while (zone.parentZone != null) {
            zone = zone.parentZone;
          }

          this.loadZone(zone.id, groupName, note);
          return;
        } else if (toLoad.toLowerCase() == "location") {
          this.loadMonsterLocation((0,external_kolmafia_namespaceObject.myLocation)(), groupName, note);
          return;
        } else if (
        toLoad.toLowerCase() == "wanderer" ||
        toLoad.toLowerCase() == "wanderers" ||
        toLoad == "none")
        {
          this.loadMonsterLocation(external_kolmafia_namespaceObject.Location.get("None"), groupName, note);
          return;
        } else if (toLoad == "*" || toLoad == "all") {
          this.loadMonsterLocation(null, groupName, note);
          return;
        }

        try {
          var monster = external_kolmafia_namespaceObject.Monster.get(toLoad);

          this.loadMonsterGroup(monster, groupName, note);
        } catch (_unused) {
          (0,external_kolmafia_namespaceObject.print)("Invalid monster/zone: " + toLoad, "red");
          return;
        }
      });
    } }, { key: "isLocketable", value:

    function isLocketable(monster) {
      return (
        !monster.boss &&
        monster.copyable &&
        !(0,external_kolmafia_namespaceObject.containsText)(monster.attributes, "ULTRARARE") &&
        !this.invalidMonsters.includes(monster) &&
        monster.baseHp < 50000 // The health is probably a bad idea, but filters great!
      );
    } }, { key: "loadLocationless", value:

    function loadLocationless() {
      var monstersFound = [];var _iterator4 = MonsterLoader_createForOfIteratorHelper(

          external_kolmafia_namespaceObject.Location.all()),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var l = _step4.value;var _iterator5 = MonsterLoader_createForOfIteratorHelper(
              this.getMonsters(l)),_step5;try {for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {var m = _step5.value;
              monstersFound.push(m);
            }} catch (err) {_iterator5.e(err);} finally {_iterator5.f();}
        }} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}

      var monsters = external_kolmafia_namespaceObject.Monster.all().filter(
        (m) => !monstersFound.includes(m) && this.isLocketable(m)
      );

      return monsters;
    } }, { key: "loadAllMonsters", value:

    function loadAllMonsters(groupName, note) {
      var group = new MonsterGroup();
      group.groupName = (groupName || "") + "All Monsters";var _iterator6 = MonsterLoader_createForOfIteratorHelper(

          external_kolmafia_namespaceObject.Monster.all()),_step6;try {for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {var monster = _step6.value;
          if (
          this.alreadyProcessed.includes(monster) ||
          !this.isLocketable(monster))
          {
            continue;
          }

          var info = new MonsterInfo();
          info.monster = monster;
          info.note = note;

          group.monsters.push(info);
        }} catch (err) {_iterator6.e(err);} finally {_iterator6.f();}

      if (group.monsters.length > 0) {
        this.monsterGroups.push(group);
      }
    } }, { key: "loadMonsterLocation", value:

    function loadMonsterLocation(location, groupName, note) {
      var group = new MonsterGroup();
      group.groupName =
      (groupName || "") + (
      location == null ? "" : LocketUtils.getFullZoneName(location.zone));

      if (location != null && location.zone) {
        group.groupName += " => ";
      }

      var monsters = [];

      if (location == null) {
        monsters = external_kolmafia_namespaceObject.Monster.all();
      } else if (location == external_kolmafia_namespaceObject.Location.get("None")) {
        group.groupName += "Locationless (Or not available in their location) ";
        monsters = this.loadLocationless();
      } else {
        group.groupName += location;
        monsters = this.getMonsters(location);
      }var _iterator7 = MonsterLoader_createForOfIteratorHelper(

          monsters),_step7;try {for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {var monster = _step7.value;
          if (
          this.alreadyProcessed.includes(monster) ||
          !this.isLocketable(monster))
          {
            continue;
          }

          var info = new MonsterInfo();
          info.monster = monster;
          info.note = note;

          group.monsters.push(info);
        }} catch (err) {_iterator7.e(err);} finally {_iterator7.f();}

      if (group.monsters.length > 0) {
        this.monsterGroups.push(group);
      }
    } }, { key: "loadMonsterGroup", value:

    function loadMonsterGroup(monster, groupName, note) {
      if (monster == null || monster == external_kolmafia_namespaceObject.Monster.get("None")) {
        return;
      }

      if (!monster.copyable || monster.boss) {
        (0,external_kolmafia_namespaceObject.print)(
          monster +
          " is marked as a boss or no-copy, yet is in locket_monsters.txt. Is this a mistake?",
          "gray"
        );
      }

      if (this.alreadyProcessed.includes(monster)) {
        (0,external_kolmafia_namespaceObject.print)(
          "You have a duplicate entry for " +
          monster +
          " in your locket_monsters.txt"
        );
        return;
      }

      var monsterInfo = new MonsterInfo();
      monsterInfo.monster = monster;
      monsterInfo.note = note;

      if (groupName != null) {
        var _group = this.monsterGroups.find(
          (group) => group.groupName == groupName
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
    } }]);return LocketLoader;}();
;// CONCATENATED MODULE: ./src/Locket.ts
function Locket_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = Locket_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function Locket_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return Locket_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Locket_arrayLikeToArray(o, minLen);}function Locket_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;}function Locket_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function Locket_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, Locket_toPropertyKey(descriptor.key), descriptor);}}function Locket_createClass(Constructor, protoProps, staticProps) {if (protoProps) Locket_defineProperties(Constructor.prototype, protoProps);if (staticProps) Locket_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function Locket_defineProperty(obj, key, value) {key = Locket_toPropertyKey(key);if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function Locket_toPropertyKey(arg) {var key = Locket_toPrimitive(arg, "string");return typeof key === "symbol" ? key : String(key);}function Locket_toPrimitive(input, hint) {if (typeof input !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {var res = prim.call(input, hint || "default");if (typeof res !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");}return (hint === "string" ? String : Number)(input);}

var



LocketMonsters = /*#__PURE__*/function () {




  function LocketMonsters() {Locket_classCallCheck(this, LocketMonsters);Locket_defineProperty(this, "locketMonsters", void 0);Locket_defineProperty(this, "loader", new LocketLoader());Locket_defineProperty(this, "locketSources", []);
    this.locketMonsters = LocketUtils.getLocketMonsters();

    var note = "";

    this.locketSources.push([
    ["file", "data"],
    () => {
      return this.loader.loadDataFile();
    }]
    );

    this.locketSources.push([
    ["zone", "czone", "current zone", "myzone"],
    () => {
      return this.loader.loadZone(
        (0,external_kolmafia_namespaceObject.myLocation)().zone,
        "Current Zone: ",
        "note"
      );
    }]
    );

    this.locketSources.push([
    ["pzone", "parent zone", "parent"],
    () => {
      var toLoad = (0,external_kolmafia_namespaceObject.myLocation)().zone;

      var zone = LocketUtils.getZones().get(toLoad.toLowerCase());

      while (zone.parentZone != null) {
        zone = zone.parentZone;
      }

      return this.loader.loadZone(zone.id, zone.id + ": ", note);
    }]
    );

    this.locketSources.push([
    ["location", "loc", "myloc"],
    () => {
      return this.loader.loadMonsterLocation(
        (0,external_kolmafia_namespaceObject.myLocation)(),
        (0,external_kolmafia_namespaceObject.myLocation)() + " ",
        note
      );
    }]
    );

    this.locketSources.push([
    ["wanderers", "wanderer", "zoneless"],
    () => {
      return this.loader.loadMonsterLocation(
        external_kolmafia_namespaceObject.Location.get("None"),
        "Wanderers: ",
        note
      );
    }]
    );

    this.locketSources.push([
    ["all", "everything", "*"],
    () => {
      this.loader.hideNotInLocation = false;
      return this.loader.loadMonsterLocation(null, "All ", note);
    }]
    );

    this.locketSources.push([
    ["canadv", "available", "adv"],
    () => {var _iterator = Locket_createForOfIteratorHelper(
          external_kolmafia_namespaceObject.Location.all()),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var loc = _step.value;
          if (!(0,external_kolmafia_namespaceObject.canAdventure)(loc)) {
            continue;
          }

          this.loader.loadMonsterLocation(loc, "Can Adv: ", note);
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
    }]
    );

    this.locketSources.push([
    external_kolmafia_namespaceObject.Location.all().
    filter((l) => (0,external_kolmafia_namespaceObject.getMonsters)(l).length > 0).
    map((l) => l.toString()),
    (name) => {
      this.loader.loadMonsterLocation(
        external_kolmafia_namespaceObject.Location.get(name),
        external_kolmafia_namespaceObject.Location.get(name) + ": ",
        note
      );
    }]
    );
  }Locket_createClass(LocketMonsters, [{ key: "loadData", value:

    function loadData(origSource) {
      var source = origSource.toLowerCase();var _iterator2 = Locket_createForOfIteratorHelper(

          this.locketSources),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var s = _step2.value;
          if (!s[0].includes(source)) {
            continue;
          }

          s[1].call(this, source);
          return true;
        }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}

      (0,external_kolmafia_namespaceObject.print)(
        "Unable to find something to load by the name of '" +
        origSource +
        "'. Provide 'help' to get valid filters",
        "red"
      );

      return false;
    } }, { key: "run", value:

    function run(parameter) {
      if (parameter == "help") {var _iterator3 = Locket_createForOfIteratorHelper(
            this.locketSources),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var _source = _step3.value;
            var s = void 0;

            if (_source[0].length > 10) {
              s = "<font color=green>A Location Name</font>";
            } else {
              s = _source[0].
              map((s) => "<font color=green>" + s + "</font>").
              join('<font color=blue>", "</font>');
            }

            (0,external_kolmafia_namespaceObject.printHtml)(
              '<font color=blue>Can do: "</font>' +
              s +
              '<font color=blue>" to filter by that group..</font>'
            );
          }} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}

        return;
      }

      parameter = parameter.trim();
      var source = "file";
      var limit = 10;

      var limitMatch = parameter.match(/(?:(?:\s|^)(\d+)$)|(?:^(\d+)(?:\s|$))/);

      if (limitMatch != null) {
        if (limitMatch[1] != null) {
          limit = (0,external_kolmafia_namespaceObject.toInt)(limitMatch[1]);
        } else if (limitMatch[2] != null) {
          limit = (0,external_kolmafia_namespaceObject.toInt)(limitMatch[2]);
        }

        parameter = parameter.replace(limitMatch[0], "");
      }

      if (parameter.length > 0) {
        source = parameter;
      }

      (0,external_kolmafia_namespaceObject.print)("Doing source '" + source + "' and limit " + limit, "gray");

      if (!this.loadData(source)) {
        return;
      }

      this.printLocket(limit);
    } }, { key: "printLocket", value:

    function printLocket(limit) {
      var wantToGet = this.loader.monsterGroups;
      var alreadyKnow = this.locketMonsters;
      var knownToHave = (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)(LocketUtils.propertyNameKnownToHave));

      if (alreadyKnow.length < knownToHave) {
        (0,external_kolmafia_namespaceObject.print)(
          "This is embarrassing. Can't pull data on what locket monsters you own!",
          "red"
        );

        if ((0,external_kolmafia_namespaceObject.getProperty)("_locketMonstersFought").split(",").length >= 3) {
          (0,external_kolmafia_namespaceObject.print)(
            "You have already fought all 3 locket fights, unfortunately this means you can't load the monsters. Wait for rollover?",
            "red"
          );
        } else {
          (0,external_kolmafia_namespaceObject.print)(
            "Try visiting the locket reminisce page then run this script again!",
            "gray"
          );
        }

        return;
      }

      var totalToGet = wantToGet.reduce(
        (p, v) => p + v.monsters.length,
        0
      );
      var unknown = wantToGet.
      map((group) => {
        var g = new MonsterGroup();
        g.groupName = group.groupName;var _iterator4 = Locket_createForOfIteratorHelper(

            group.monsters),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var m = _step4.value;
            if (alreadyKnow.includes(m.monster)) {
              continue;
            }

            g.monsters.push(m);
          }} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}

        return g;
      }).
      filter((g) => g.monsters.length > 0);

      var totalUnknown = unknown.reduce(
        (p, v) => p + v.monsters.length,
        0
      );
      var totalKnown = totalToGet - totalUnknown;

      var monstersPrinted = 0;
      var linesPrinted = 0;

      (0,external_kolmafia_namespaceObject.print)("Hover over the monsters to see locations");var _iterator5 = Locket_createForOfIteratorHelper(

          unknown),_step5;try {for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {var group = _step5.value;
          monstersPrinted += group.monsters.length;
          linesPrinted++;

          if (group.groupName == null) {var _iterator6 = Locket_createForOfIteratorHelper(
                group.monsters),_step6;try {for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {var monster = _step6.value;
                (0,external_kolmafia_namespaceObject.printHtml)(
                  LocketUtils.makeZoneString(
                    monster.monster + (
                    group.groupName != null ? " @ " + group.groupName : ""),
                    monster
                  )
                );
              }} catch (err) {_iterator6.e(err);} finally {_iterator6.f();}
          } else {
            for (var i = 0; i < group.monsters.length; i += 50) {
              var toPrint = group.monsters.slice(
                i,
                Math.min(i + 50, group.monsters.length)
              );

              (0,external_kolmafia_namespaceObject.printHtml)(
                "<font color='blue'>" + (
                i == 0 ? group.groupName : "Continued") +
                ":</font> " +
                toPrint.
                map((monster) =>
                LocketUtils.makeZoneString(monster.monster + "", monster)
                ).
                join(", ")
              );
            }
          }

          if (linesPrinted >= limit && monstersPrinted + 1 < totalUnknown) {
            break;
          }
        }} catch (err) {_iterator5.e(err);} finally {_iterator5.f();}

      if (totalUnknown > monstersPrinted) {
        (0,external_kolmafia_namespaceObject.print)(
          "There is more! Skipped " + (
          totalUnknown - monstersPrinted) +
          " lines..",
          "red"
        );
      }

      var totalMonsters = external_kolmafia_namespaceObject.Monster.all().filter(
        (m) => m.copyable && !m.boss
      ).length;

      (0,external_kolmafia_namespaceObject.printHtml)("You have ".concat(
        totalKnown, " / ").concat(totalToGet, ". Including every monster <font title=\"The data on copyable monsters isn't always accurate.\">possible*,</font> you have ").concat(alreadyKnow.length, " / ").concat(totalMonsters)
      );
    } }]);return LocketMonsters;}();


function main() {var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "10";
  new LocketMonsters().run(limit);
}
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;