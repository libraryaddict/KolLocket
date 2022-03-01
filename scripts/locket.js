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
function _createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var

MonsterInfo = /*#__PURE__*/_createClass(function MonsterInfo() {_classCallCheck(this, MonsterInfo);_defineProperty(this, "monster", void 0);_defineProperty(this, "note", void 0);});var




MonsterGroup = /*#__PURE__*/_createClass(function MonsterGroup() {_classCallCheck(this, MonsterGroup);_defineProperty(this, "monsters",
  []);_defineProperty(this, "groupName", void 0);});var



LocketMonsters = /*#__PURE__*/function () {function LocketMonsters() {_classCallCheck(this, LocketMonsters);_defineProperty(this, "propertyName",
    "_locketMonstersSaved");_defineProperty(this, "propertyNameKnownToHave",
    "locketAmountKnownToHave");}_createClass(LocketMonsters, [{ key: "loadMonsters", value:

    function loadMonsters() {
      var buffer = (0,external_kolmafia_namespaceObject.fileToBuffer)("locket_monsters.txt");

      var monsters = [];
      var alreadyProcessed = [];

      buffer.split(/(\n|\r)+/).forEach((line) => {
        line = line.trim();

        if (line.length == 0 || line.startsWith("#")) {
          return;
        }

        var spl = line.split("\t");
        var monster;

        try {
          monster = external_kolmafia_namespaceObject.Monster.get(spl[0]);
        } catch (_unused) {
          (0,external_kolmafia_namespaceObject.print)("Invalid monster: " + spl[0], "red");
          return;
        }

        if (monster == null || monster == external_kolmafia_namespaceObject.Monster.get("None")) {
          return;
        }

        if (!monster.copyable || monster.boss) {
          (0,external_kolmafia_namespaceObject.print)(
          monster +
          " is marked as a boss or no-copy, yet is in locket_monsters.txt. Is this a mistake?",
          "gray");

        }

        if (alreadyProcessed.includes(monster)) {
          (0,external_kolmafia_namespaceObject.print)(
          "You have a duplicate entry for " +
          monster +
          " in your locket_monsters.txt");

          return;
        }

        alreadyProcessed.push(monster);

        var monsterInfo = new MonsterInfo();
        monsterInfo.monster = monster;
        monsterInfo.note = (spl[2] || "").trim();

        var groupName = spl[1];

        if (groupName != null) {
          var _group = monsters.find((group) => group.groupName == groupName);

          if (_group != null) {
            _group.monsters.push(monsterInfo);
            return;
          }
        }

        var group = new MonsterGroup();
        group.monsters.push(monsterInfo);
        group.groupName = groupName;

        monsters.push(group);
      });

      return monsters;
    } }, { key: "getLocketMonsters", value:

    function getLocketMonsters() {
      var locketMonsters = Object.keys((0,external_kolmafia_namespaceObject.getLocketMonsters)()).map((m) =>
      external_kolmafia_namespaceObject.Monster.get(m));


      var knownToHave = (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)(this.propertyNameKnownToHave));

      // Add the fought
      var _iterator = _createForOfIteratorHelper((0,external_kolmafia_namespaceObject.getProperty)("_locketMonstersFought").
      split(",").
      filter((m) => m.match(/[0-9]+/)).
      map((m) => (0,external_kolmafia_namespaceObject.toMonster)((0,external_kolmafia_namespaceObject.toInt)(m)))),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _monster = _step.value;
          if (locketMonsters.includes(_monster)) {
            continue;
          }

          locketMonsters.push(_monster);
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

      var savedLocketMonsters = (0,external_kolmafia_namespaceObject.getProperty)(this.propertyName).
      split(",").
      filter((m) => m.match(/[0-9]+/)).
      map((m) => (0,external_kolmafia_namespaceObject.toMonster)((0,external_kolmafia_namespaceObject.toInt)(m)));var _iterator2 = _createForOfIteratorHelper(

      savedLocketMonsters),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var m = _step2.value;
          if (locketMonsters.includes(m)) {
            continue;
          }

          locketMonsters.push(m);
        }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}

      if (locketMonsters.length > savedLocketMonsters.length) {
        (0,external_kolmafia_namespaceObject.setProperty)(
        this.propertyName,
        locketMonsters.map((m) => (0,external_kolmafia_namespaceObject.toInt)(m)).join(","));

        (0,external_kolmafia_namespaceObject.setProperty)(
        this.propertyNameKnownToHave,
        locketMonsters.length.toString());

      } else {
        locketMonsters = savedLocketMonsters;
      }

      return locketMonsters;
    } }, { key: "printLocket", value:

    function printLocket(limit) {
      var wantToGet = this.loadMonsters();
      var alreadyKnow = this.getLocketMonsters();
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
        g.groupName = group.groupName;var _iterator3 = _createForOfIteratorHelper(

        group.monsters),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var m = _step3.value;
            if (alreadyKnow.includes(m.monster)) {
              continue;
            }

            g.monsters.push(m);
          }} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}

        return g;
      }).
      filter((g) => g.monsters.length > 0);

      var totalUnknown = unknown.reduce(
      (p, v) => p + v.monsters.length,
      0);

      var totalKnown = totalToGet - totalUnknown;

      var monstersPrinted = 0;
      var linesPrinted = 0;

      var getLocations = function getLocations(
      monster)
      {
        var locations = [];var _iterator4 = _createForOfIteratorHelper(

        external_kolmafia_namespaceObject.Location.all()),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var l = _step4.value;
            if (!(0,external_kolmafia_namespaceObject.getMonsters)(l).includes(monster)) {
              continue;
            }

            locations.push(l);
          }} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}

        return locations;
      };

      var makeString =
      function makeString(string, monsterInfo) {
        var locationsTitle = "";
        var locations = getLocations(monsterInfo.monster);

        if (locations.length > 0) {
          var locationsStrings = locations.map(
          (l) => l.zone + ": " + l);


          locationsTitle = (0,external_kolmafia_namespaceObject.entityEncode)(locationsStrings.join(", "));
        } else {
          locationsTitle = "No locations found";
        }

        if (monsterInfo.note.length > 0) {
          locationsTitle += " ~ Note: " + monsterInfo.note;
        }

        return (
          "<font color='gray' title='" +
          locationsTitle +
          "'>" +
          string +
          "</font>");

      };

      (0,external_kolmafia_namespaceObject.print)("Hover over the monsters to see locations");var _iterator5 = _createForOfIteratorHelper(

      unknown),_step5;try {for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {var group = _step5.value;
          monstersPrinted += group.monsters.length;
          linesPrinted++;

          if (group.groupName == null) {var _iterator6 = _createForOfIteratorHelper(
            group.monsters),_step6;try {for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {var _monster2 = _step6.value;
                (0,external_kolmafia_namespaceObject.printHtml)(
                makeString(
                _monster2.monster + (
                group.groupName != null ? " @ " + group.groupName : ""),
                _monster2));


              }} catch (err) {_iterator6.e(err);} finally {_iterator6.f();}
          } else {
            (0,external_kolmafia_namespaceObject.printHtml)(
            "<font color='blue'>" +
            group.groupName +
            ":</font> " +
            group.monsters.
            map((monster) => makeString(monster.monster + "", monster)).
            join(", "));

          }

          if (linesPrinted >= limit && monstersPrinted + 1 < totalUnknown) {
            break;
          }
        }} catch (err) {_iterator5.e(err);} finally {_iterator5.f();}

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

    } }]);return LocketMonsters;}();


function main() {var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "10";
  new LocketMonsters().printLocket((0,external_kolmafia_namespaceObject.toInt)(limit));
}
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;