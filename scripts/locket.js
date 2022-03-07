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
  "main": () => (/* binding */ main)
});

;// CONCATENATED MODULE: external "kolmafia"
const external_kolmafia_namespaceObject = require("kolmafia");
;// CONCATENATED MODULE: ./src/Locket.ts
function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var

MonsterInfo = /*#__PURE__*/_createClass(function MonsterInfo() {_classCallCheck(this, MonsterInfo);_defineProperty(this, "monster", void 0);_defineProperty(this, "note", void 0);});var




MonsterGroup = /*#__PURE__*/_createClass(function MonsterGroup() {_classCallCheck(this, MonsterGroup);_defineProperty(this, "monsters",
  []);_defineProperty(this, "groupName", void 0);});var



Zone = /*#__PURE__*/_createClass(function Zone() {_classCallCheck(this, Zone);_defineProperty(this, "parentZone", void 0);_defineProperty(this, "children",

  []);_defineProperty(this, "id", void 0);_defineProperty(this, "name", void 0);_defineProperty(this, "locations",


  []);});var


LocketMonsters = /*#__PURE__*/function () {function LocketMonsters() {_classCallCheck(this, LocketMonsters);_defineProperty(this, "propertyName",
    "_locketMonstersSaved");_defineProperty(this, "propertyNameKnownToHave",
    "locketAmountKnownToHave");_defineProperty(this, "allZones", void 0);_defineProperty(this, "monsters", void 0);_defineProperty(this, "locketMonsters", void 0);_defineProperty(this, "getLocations",

































































































































































































































    function (
    monster)
    {
      var locations = [];var _iterator = _createForOfIteratorHelper(

      external_kolmafia_namespaceObject.Location.all()),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var l = _step.value;
          if (!(0,external_kolmafia_namespaceObject.getMonsters)(l).includes(monster)) {
            continue;
          }

          locations.push(l);
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

      return locations;
    });}_createClass(LocketMonsters, [{ key: "loadStuff", value: function loadStuff() {this.allZones = this.getAllZones();this.monsters = this.loadMonsterGroups();this.locketMonsters = this.getLocketMonsters();} }, { key: "getFullName", value: function getFullName(zoneName) {if (zoneName == null) {return zoneName;}var zone = this.allZones.get(zoneName.toLowerCase());if (zone == null || zone.parentZone == null) {return zoneName;}this.getFullName(zone.parentZone.id) + " " + zone.name;} }, { key: "loadMonsterZone", value: function loadMonsterZone(alreadyProcessed, monsterGroups, zone, groupName, note) {var zones = [zone];while (zones.length > 0) {var _zone = zones.pop();zones.push.apply(zones, _toConsumableArray(_zone.children));var _iterator2 = _createForOfIteratorHelper(_zone.locations),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var loc = _step2.value;var group = new MonsterGroup();group.groupName = (groupName || "") + this.getFullName(_zone.id) + ": " + loc;var _iterator3 = _createForOfIteratorHelper((0,external_kolmafia_namespaceObject.getMonsters)(loc)),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var _monster = _step3.value;if (!_monster.copyable || _monster.boss) {continue;}var info = new MonsterInfo();info.monster = _monster;info.note = note;group.monsters.push(info);}} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}if (group.monsters.length > 0) {monsterGroups.push(group);}}} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}}} }, { key: "loadMonsterGroup", value: function loadMonsterGroup(alreadyProcessed, monsterGroups, monster, groupName, note) {if (monster == null || monster == external_kolmafia_namespaceObject.Monster.get("None")) {return;}if (!monster.copyable || monster.boss) {(0,external_kolmafia_namespaceObject.print)(monster + " is marked as a boss or no-copy, yet is in locket_monsters.txt. Is this a mistake?", "gray");}if (alreadyProcessed.includes(monster)) {(0,external_kolmafia_namespaceObject.print)("You have a duplicate entry for " + monster + " in your locket_monsters.txt");return;}var monsterInfo = new MonsterInfo();monsterInfo.monster = monster;monsterInfo.note = note;if (groupName != null) {var _group = monsterGroups.find((group) => group.groupName == groupName);if (_group != null) {_group.monsters.push(monsterInfo);return;}}var group = new MonsterGroup();group.monsters.push(monsterInfo);group.groupName = groupName;monsterGroups.push(group);} }, { key: "loadMonsterGroups", value: function loadMonsterGroups() {var buffer = (0,external_kolmafia_namespaceObject.fileToBuffer)("locket_monsters.txt");var monsters = [];var alreadyProcessed = [];buffer.split(/(\n|\r)+/).forEach((line) => {line = line.trim();if (line.length == 0 || line.startsWith("#")) {return;}var spl = line.split("\t");var groupName = spl[1];var note = spl[2] || "";var zone = this.allZones.get(spl[0].toLowerCase());if (zone != null) {this.loadMonsterZone(alreadyProcessed, monsters, zone, groupName, note);return;}try {var _monster2 = external_kolmafia_namespaceObject.Monster.get(spl[0]);this.loadMonsterGroup(alreadyProcessed, monsters, _monster2, groupName, note);} catch (_unused) {(0,external_kolmafia_namespaceObject.print)("Invalid monster/zone: " + spl[0], "red");return;}});return monsters;} }, { key: "getLocketMonsters", value: function getLocketMonsters() {var locketMonsters = Object.keys((0,external_kolmafia_namespaceObject.getLocketMonsters)()).map((m) => external_kolmafia_namespaceObject.Monster.get(m));var knownToHave = (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)(this.propertyNameKnownToHave)); // Add the fought
      var _iterator4 = _createForOfIteratorHelper((0,external_kolmafia_namespaceObject.getProperty)("_locketMonstersFought").split(",").filter((m) => m.match(/[0-9]+/)).map((m) => (0,external_kolmafia_namespaceObject.toMonster)((0,external_kolmafia_namespaceObject.toInt)(m)))),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var _monster3 = _step4.value;if (locketMonsters.includes(_monster3)) {continue;}locketMonsters.push(_monster3);}} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}var savedLocketMonsters = (0,external_kolmafia_namespaceObject.getProperty)(this.propertyName).split(",").filter((m) => m.match(/[0-9]+/)).map((m) => (0,external_kolmafia_namespaceObject.toMonster)((0,external_kolmafia_namespaceObject.toInt)(m)));var _iterator5 = _createForOfIteratorHelper(savedLocketMonsters),_step5;try {for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {var m = _step5.value;if (locketMonsters.includes(m)) {continue;}locketMonsters.push(m);}} catch (err) {_iterator5.e(err);} finally {_iterator5.f();}if (locketMonsters.length > savedLocketMonsters.length) {(0,external_kolmafia_namespaceObject.setProperty)(this.propertyName, locketMonsters.map((m) => (0,external_kolmafia_namespaceObject.toInt)(m)).join(","));if (knownToHave < locketMonsters.length) {(0,external_kolmafia_namespaceObject.setProperty)(this.propertyNameKnownToHave, locketMonsters.length.toString());}} else {locketMonsters = savedLocketMonsters;}return locketMonsters;} }, { key: "makeZoneString", value: function makeZoneString(string, monsterInfo) {var locationsTitle = "";var locations = this.getLocations(monsterInfo.monster);if (locations.length > 0) {var locationsStrings = locations.map((l) => this.getFullName(l.zone) + ": " + l);locationsTitle = (0,external_kolmafia_namespaceObject.entityEncode)(locationsStrings.join(", "));} else {locationsTitle = "No locations found";}if (monsterInfo.note.length > 0) {locationsTitle += " ~ Note: " + monsterInfo.note;}return "<font color='gray' title='" + locationsTitle + "'>" + string + "</font>";} }, { key: "printLocket", value:
    function printLocket(limit) {
      this.loadStuff();

      var wantToGet = this.monsters;
      var alreadyKnow = this.locketMonsters;
      var knownToHave = (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)(this.propertyNameKnownToHave));

      if (alreadyKnow.length < knownToHave) {
        (0,external_kolmafia_namespaceObject.print)(
        "This is embarrassing.. Can't pull data on what locket monsters you own!",
        "red");


        if ((0,external_kolmafia_namespaceObject.getProperty)("_locketMonstersFought").split(",").length >= 3) {
          (0,external_kolmafia_namespaceObject.print)(
          "You have already fought all 3 locket fights, unfortunately this means you can't load the monsters.. Wait for rollover?",
          "red");

        } else {
          (0,external_kolmafia_namespaceObject.print)(
          "Try visiting the locket remenise page then run this script again!",
          "gray");

        }

        return;
      }

      var totalToGet = wantToGet.reduce(
      (p, v) => p + v.monsters.length,
      0);

      var unknown = wantToGet.
      map((group) => {
        var g = new MonsterGroup();
        g.groupName = group.groupName;var _iterator6 = _createForOfIteratorHelper(

        group.monsters),_step6;try {for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {var m = _step6.value;
            if (alreadyKnow.includes(m.monster)) {
              continue;
            }

            g.monsters.push(m);
          }} catch (err) {_iterator6.e(err);} finally {_iterator6.f();}

        return g;
      }).
      filter((g) => g.monsters.length > 0);

      var totalUnknown = unknown.reduce(
      (p, v) => p + v.monsters.length,
      0);

      var totalKnown = totalToGet - totalUnknown;

      var monstersPrinted = 0;
      var linesPrinted = 0;

      (0,external_kolmafia_namespaceObject.print)("Hover over the monsters to see locations");var _iterator7 = _createForOfIteratorHelper(

      unknown),_step7;try {for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {var group = _step7.value;
          monstersPrinted += group.monsters.length;
          linesPrinted++;

          if (group.groupName == null) {var _iterator8 = _createForOfIteratorHelper(
            group.monsters),_step8;try {for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {var _monster4 = _step8.value;
                (0,external_kolmafia_namespaceObject.printHtml)(
                this.makeZoneString(
                _monster4.monster + (
                group.groupName != null ? " @ " + group.groupName : ""),
                _monster4));


              }} catch (err) {_iterator8.e(err);} finally {_iterator8.f();}
          } else {
            (0,external_kolmafia_namespaceObject.printHtml)(
            "<font color='blue'>" +
            group.groupName +
            ":</font> " +
            group.monsters.
            map((monster) =>
            this.makeZoneString(monster.monster + "", monster)).

            join(", "));

          }

          if (linesPrinted >= limit && monstersPrinted + 1 < totalUnknown) {
            break;
          }
        }} catch (err) {_iterator7.e(err);} finally {_iterator7.f();}

      if (totalUnknown > monstersPrinted) {
        (0,external_kolmafia_namespaceObject.print)(
        "Skipped " + (totalUnknown - monstersPrinted) + " monsters..",
        "gray");

      }

      var totalMonsters = external_kolmafia_namespaceObject.Monster.all().filter(
      (m) => m.copyable && !m.boss).
      length;

      (0,external_kolmafia_namespaceObject.printHtml)("You have ".concat(
      totalKnown, " / ").concat(totalToGet, ". Including every monster <font title=\"The data on copyable monsters isn't always accurate.\">possible*,</font> you have ").concat(alreadyKnow.length, " / ").concat(totalMonsters));

    } }, { key: "getAllZones", value:

    function getAllZones() {
      var zoneMap = new Map();

      var zoneData = (0,external_kolmafia_namespaceObject.fileToBuffer)("locket_zones.txt").split("\n");var _iterator9 = _createForOfIteratorHelper(

      zoneData),_step9;try {for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {var data = _step9.value;
          if (data.length == 0 || data.startsWith("#")) {
            continue;
          }

          var spl = data.split("\t");

          if (spl.length < 3) {
            continue;
          }

          var zone = new Zone();
          zone.id = spl[0];
          zone.parentZone = zoneMap.get(spl[1]);
          zone.name = spl[2];var _iterator10 = _createForOfIteratorHelper(

          external_kolmafia_namespaceObject.Location.all()),_step10;try {for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {var loc = _step10.value;
              if (loc.zone != zone.id) {
                continue;
              }

              zone.locations.push(loc);
            }} catch (err) {_iterator10.e(err);} finally {_iterator10.f();}

          zoneMap.set(zone.id.toLowerCase(), zone);
        }} catch (err) {_iterator9.e(err);} finally {_iterator9.f();}

      return zoneMap;
    } }]);return LocketMonsters;}();


function main() {var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "10";
  new LocketMonsters().printLocket((0,external_kolmafia_namespaceObject.toInt)(limit));
}
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;