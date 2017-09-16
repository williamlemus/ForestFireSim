/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CELL_SIZE = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cell = __webpack_require__(2);

var _cell2 = _interopRequireDefault(_cell);

var _util = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WIDTH = 1530;
var HEIGHT = 750;
var NEIGHBORS = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
var ROWS = 50;
var COLS = 102;
var CELL_SIZE = exports.CELL_SIZE = 15;

var Grid = function () {
  function Grid() {
    _classCallCheck(this, Grid);

    this.grid = new Array(ROWS);
    for (var i = 0; i < ROWS; i++) {
      this.grid[i] = new Array(COLS);
    }
    this.totalTreeCount = 0;
    this.setupGrid();
    this.handleClick = this.handleClick.bind(this);
    this.handleRandomClick = this.handleRandomClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.render = this.render.bind(this);
    this.burnTrees = this.burnTrees.bind(this);
    this.startBurn = this.startBurn.bind(this);
    this.getPreferences = this.getPreferences.bind(this);
    this.collectNeighborTrees = this.collectNeighborTrees.bind(this);
    this.burningTrees = [];
    this.probablility = 50;
    this.windDirection = '';
    this.numBurntTrees = 0;
    canvas.addEventListener('click', this.handleClick);
  }

  _createClass(Grid, [{
    key: 'setupGrid',
    value: function setupGrid() {
      for (var i = 0; i < ROWS; i++) {
        for (var j = 0; j < COLS; j++) {
          var cell = new _cell2.default();
          this.grid[i][j] = cell;
          if (cell.tree()) ++this.totalTreeCount;
        }
      }
    }
  }, {
    key: 'getPreferences',
    value: function getPreferences() {
      var probablility = document.getElementById('probablility');
      if (probablility.value !== "") this.probablility = probablility.value;
      this.windDirection = document.getElementById('wind-direction').value;
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      // TODO: if empty cell, instruct user to click another cell
      this.getPreferences();

      var clickedCell = (0, _util.getCellLocation)([e.offsetX, e.offsetY]);
      this.burningTrees.push(clickedCell);
      this.startBurn();
    }
  }, {
    key: 'handleRandomClick',
    value: function handleRandomClick() {
      var randLocation = [Math.floor(Math.random() * ROWS), Math.floor(Math.random() * COLS)];
      this.getPreferences();
      while (!this.grid[randLocation[0]][randLocation[1]].tree()) {
        randLocation = [Math.floor(Math.random() * ROWS), Math.floor(Math.random() * COLS)];
      }
      this.burningTrees.push(randLocation);
      this.startBurn();
    }
  }, {
    key: 'handleResetClick',
    value: function handleResetClick() {
      for (var i = 0; i < ROWS; i++) {
        for (var j = 0; j < COLS; j++) {
          this.grid[i][j].growTree();
        }
      }
      this.numBurntTrees = 0;
      var burned = document.getElementById('num-burned');
      burned.innerText = this.numBurntTrees;
      var remaining = document.getElementById('forest-remaining');
      remaining.innerText = 100 - Math.round(100 * this.numBurntTrees / this.totalTreeCount);
      this.render();
    }
  }, {
    key: 'collectNeighborTrees',
    value: function collectNeighborTrees(treeLocation) {
      var _this = this;

      var originCell = this.grid[treeLocation[0]][treeLocation[1]];
      if (!originCell.empty() && !originCell.isBurnt()) {
        var _loop = function _loop(n) {
          var delta = NEIGHBORS[n];
          var neighborLocation = [treeLocation[0] + delta[0], treeLocation[1] + delta[1]];
          var neighborCell = _this.isInBounds(neighborLocation) ? _this.grid[neighborLocation[0]][neighborLocation[1]] : undefined;
          if (neighborCell && !neighborCell.isBurning() && !neighborCell.isBurnt() && neighborCell.tree()) {
            // more things will occur here, probably at level of cell

            //probablility here should be util function
            if (Math.random() <= (0, _util.calculateProbability)(_this.windDirection, delta, _this.probablility) / 100) {
              //only add if its not in list
              if (_this.burningTrees.every(function (el) {
                return !(el[0] === neighborLocation[0] && el[1] === neighborLocation[1]);
              })) {
                _this.burningTrees.push(neighborLocation);
              }
            }
          }
        };

        for (var n = 0; n < NEIGHBORS.length; n++) {
          _loop(n);
        }
      } else {
        //for now do nothing
        // don't change if cell is empty(maybe produce a warning)
      }
    }
  }, {
    key: 'burnTrees',
    value: function burnTrees() {
      var _this2 = this;

      this.burningTrees.forEach(function (cell) {
        _this2.grid[cell[0]][cell[1]].burn();
      });
      this.numBurntTrees += this.burningTrees.length;
    }
  }, {
    key: 'isInBounds',
    value: function isInBounds(newLocation) {
      return newLocation[0] >= 0 && newLocation[0] < ROWS && newLocation[1] >= 0 && newLocation[1] < COLS;
    }
  }, {
    key: 'startBurn',
    value: function startBurn() {
      //this will do the animate callback
      // remove all cells from list of burningTrees
      // find their neighbors, and add them to burningTrees
      // change the cell to a burntTree
      var timer = 1;
      var that = this;
      var animate = function animate() {
        // user can set speed and wind may increase speed
        if (timer % 4 === 0) {
          var burntTrees = that.burningTrees.slice();
          that.burnTrees();
          that.render();
          that.burningTrees = [];
          while (burntTrees.length > 0) {
            var burntTree = burntTrees.shift();
            that.collectNeighborTrees(burntTree);
            that.grid[burntTree[0]][burntTree[1]].burnt();
          }
          if (that.burningTrees.length === 0) {
            that.render();
            return;
          }
          timer = 1;
        } else {
          if (that.windDirection !== 'None') {
            timer += 2;
          }
          timer++;
        }

        window.requestAnimationFrame(animate);
      };
      return animate();
    }
  }, {
    key: 'render',
    value: function render() {
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');
      ctx.strokeStyle = 'black';
      ctx.fillStyle = '#5F3B00';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      for (var j = 0; j < HEIGHT; j += CELL_SIZE) {
        for (var i = 0; i < WIDTH; i += CELL_SIZE) {
          ctx.strokeRect(i, j, CELL_SIZE, CELL_SIZE);
          ctx.fillRect(i, j, CELL_SIZE, CELL_SIZE);
          ctx.font = this.grid[j / CELL_SIZE][i / CELL_SIZE].font;
          ctx.fillStyle = this.grid[j / CELL_SIZE][i / CELL_SIZE].color;
          ctx.fillText(this.grid[j / CELL_SIZE][i / CELL_SIZE].output(), i + 7, j + 10);
          ctx.fillStyle = '#5F3B00';
        }
      }
      var burned = document.getElementById('num-burned');
      burned.innerText = this.numBurntTrees;
      var remaining = document.getElementById('forest-remaining');
      remaining.innerText = 100 - Math.round(100 * this.numBurntTrees / this.totalTreeCount);
    }
  }]);

  return Grid;
}();

exports.default = Grid;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _grid = __webpack_require__(0);

var _grid2 = _interopRequireDefault(_grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var grid = new _grid2.default();
  grid.render();
  var randomButton = document.getElementById('random-button');
  var resetButton = document.getElementById('reset-button');
  randomButton.addEventListener('click', function (e) {
    e.preventDefault();
    grid.handleRandomClick();
  });
  resetButton.addEventListener('click', function (e) {
    e.preventDefault();
    grid.handleResetClick();
  });
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
** Cell states
**/
var BURNING = 'b';
var EMPTY = 'e';
var BURNT = 'B';
var TREE = 't';

var Cell = function () {
  function Cell() {
    _classCallCheck(this, Cell);

    var rand = Math.ceil(Math.random() * 3);
    this.color = 'green';
    this.font = '12px sans-serif';
    if (rand <= 2) {
      this.status = 't';
      this.text = '\uD83C\uDF32';
    } else {
      this.status = EMPTY;
      this.text = '';
    }
  }

  _createClass(Cell, [{
    key: 'burn',
    value: function burn() {
      this.text = '\uD83D\uDD25'; // should also set text somewhere, or just use that as status
      this.status = BURNING;
      this.color = '#D74915';
    }
  }, {
    key: 'burnt',
    value: function burnt() {
      this.text = '\uD83C\uDF32';
      this.status = BURNT;
      this.color = 'black';
      this.font = '4px sans-serif';
    }
  }, {
    key: 'empty',
    value: function empty() {
      return this.status === EMPTY;
    }
  }, {
    key: 'isBurning',
    value: function isBurning() {
      return this.status === BURNING;
    }
  }, {
    key: 'isBurnt',
    value: function isBurnt() {
      return this.status === BURNT;
    }
  }, {
    key: 'tree',
    value: function tree() {
      return this.status === TREE;
    }
  }, {
    key: 'output',
    value: function output() {
      return this.text;
    }
  }, {
    key: 'growTree',
    value: function growTree() {
      if (this.isBurnt()) {
        this.status = TREE;
        this.text = '\uD83C\uDF32';
        this.color = 'green';
        this.font = '12px sans-serif';
      }
    }
  }]);

  return Cell;
}();

exports.default = Cell;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateProbability = exports.getCellLocation = undefined;

var _grid = __webpack_require__(0);

var NORTH = 'North';
var SOUTH = 'South';
var EAST = 'East';
var WEST = 'West';

var getCellLocation = exports.getCellLocation = function getCellLocation(location) {
  return [Math.floor(location[1] / _grid.CELL_SIZE), Math.floor(location[0] / _grid.CELL_SIZE)];
};

var calculateProbability = exports.calculateProbability = function calculateProbability(direction, delta, probablility) {
  switch (direction) {
    case NORTH:
      return delta[0] === -1 ? probablility * 1.5 : probablility * .5;
    case SOUTH:
      return delta[0] === 1 ? probablility * 1.5 : probablility * .5;
    case EAST:
      return delta[1] === 1 ? probablility * 1.5 : probablility * .5;
    case WEST:
      return delta[1] === -1 ? probablility * 1.5 : probablility * .5;
    default:
      return probablility;
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map