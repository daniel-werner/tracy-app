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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/common/app.common.calculations.js":
/*!**************************************************!*\
  !*** ./src/js/common/app.common.calculations.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global window*/

/**
 * Application common calculations module.
 * Provides methods that are necessary for navigation.
 *
 * @module app.common.calculations
 * @namespace app.common.calculations
 * @memberof app.common
 */
// make sure that "app" namespace is created
window.app = window.app || {}; // strict mode wrapper function

(function defineAppCommonCalculations(app) {
  'use strict';
  /**
   * Earth radius constant.
   *
   * @private
   * @const {number}
   */

  var EARTH_RADIUS = 6371000,

  /**
   * Meters unit constant.
   *
   * @private
   * @const {string}
   */
  METERS_UNIT = 'm',

  /**
   * Kilometers unit constant.
   *
   * @private
   * @const {string}
   */
  KILOMETERS_UNIT = 'km',

  /**
   * Calculations module reference.
   *
   * @memberof app.common.calculations
   * @private
   * @type {object}
   */
  calculations = null; // create namespace for the module

  app.common = app.common || {};
  app.common.calculations = app.common.calculations || {};
  calculations = app.common.calculations;
  /**
   * Converts the number value expressed in radians to degrees.
   *
   * @private
   * @param {number} value
   * @returns {number}
   */

  function toDegrees(value) {
    return value * 180 / Math.PI;
  }
  /**
   * Converts the number value expressed in degrees to radians.
   *
   * @private
   * @param {number} value
   * @returns {number}
   */


  function toRadians(value) {
    return value * Math.PI / 180;
  }
  /**
   * Formats distance value to be displayed in meters or kilometers.
   *
   * @private
   * @param {number} distance Distance in meters.
   * @returns {number}
   */


  function formatDistance(distance) {
    if (distance >= 1000) {
      distance /= 1000;
    }

    return distance.toFixed(0);
  }
  /**
   * Formats unit value to represent meters or kilometers.
   *
   * @private
   * @param {number} distance Distance in meters.
   * @returns {string}
   */


  function formatUnit(distance) {
    if (distance >= 1000) {
      return KILOMETERS_UNIT;
    }

    return METERS_UNIT;
  }
  /**
   * Calculates the angle based on the start and destination position.
   *
   * @memberof app.common.calculations
   * @public
   * @param {object} start
   * @param {number} start.latitude
   * @param {number} start.longitude
   * @param {object} destination
   * @param {number} destination.latitude
   * @param {number} destination.longitude
   * @returns {number}
   */


  calculations.calculateAngle = function calculateAngle(start, destination) {
    var sLon = toRadians(start.longitude),
        dLon = toRadians(destination.longitude),
        sLat = toRadians(start.latitude),
        dLat = toRadians(destination.latitude),
        deltaLon = dLon - sLon;

    if (deltaLon > Math.PI) {
      deltaLon -= 2 * Math.PI;
    } else if (deltaLon < -Math.PI) {
      deltaLon += 2 * Math.PI;
    }

    return toDegrees(Math.atan2(deltaLon, Math.log(Math.tan(dLat / 2 + Math.PI / 4) / Math.tan(sLat / 2 + Math.PI / 4))));
  };
  /**
   * Calculates the distance between two positions
   * based on its coordinates.
   *
   * @memberof app.common.calculations
   * @public
   * @see http://www.sunearthtools.com/tools/distance.php
   * @param {object} start
   * @param {number} start.latitude
   * @param {number} start.longitude
   * @param {object} destination
   * @param {number} destination.latitude
   * @param {number} destination.longitude
   * @returns {number}
   */


  calculations.calculateDistance = function calculateDistance(start, destination) {
    var sLon = toRadians(start.longitude),
        dLon = toRadians(destination.longitude),
        sLat = toRadians(start.latitude),
        dLat = toRadians(destination.latitude),
        distance = EARTH_RADIUS * Math.acos(Math.sin(sLat) * Math.sin(dLat) + Math.cos(sLat) * Math.cos(dLat) * Math.cos(dLon - sLon));
    return {
      raw: distance,
      formatted: formatDistance(distance),
      unit: formatUnit(distance)
    };
  };
  /**
   * Obtains angle from rotation.
   *
   * @memberof app.common.calculations
   * @param {number} value
   * @returns {number}
   */


  calculations.angleFromRotation = function angleFromRotation(value) {
    var angle = -value % 360;

    if (angle < 0) {
      angle += 360;
    }

    return angle;
  };
  /**
   * Calculates angle for navigation path indicator.
   *
   * @memberof app.common.calculations
   * @param {number} partialPath
   * @param {number} totalPath
   * @param {number} totalAngle
   * @returns {number}
   */


  calculations.calculatePathAngle = function calculatePathAngle(partialPath, totalPath, totalAngle) {
    return partialPath * totalAngle / totalPath;
  };
})(window.app);

/***/ }),

/***/ "./src/js/common/app.common.events.js":
/*!********************************************!*\
  !*** ./src/js/common/app.common.events.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global window*/

/**
 * Application common events module.
 * Provides common methods related to events triggering.
 *
 * @module app.common.events
 * @namespace app.common.events
 * @memberof app.common
 */
// make sure that "app" namespace is created
window.app = window.app || {}; // strict mode wrapper function

(function defineAppCommonEvents(app) {
  'use strict';
  /**
   * Events module reference.
   *
   * @memberof app.common
   * @private
   * @type {object}
   */

  var events = null; // create namespace for the module

  app.common = app.common || {};
  app.common.events = app.common.events || {};
  events = app.common.events;
  /**
   * Dispatches an event.
   *
   * @memberof app.common.events
   * @public
   * @param {string} eventName Event name.
   * @param {*} data Detailed data.
   */

  events.dispatchEvent = function dispatchEvent(eventName, data) {
    var customEvent = new window.CustomEvent(eventName, {
      detail: data
    });
    window.dispatchEvent(customEvent);
  };
})(window.app);

/***/ }),

/***/ "./src/js/model/app.model.battery.js":
/*!*******************************************!*\
  !*** ./src/js/model/app.model.battery.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global console, window, tizen*/

/**
 * Application battery model module.
 * It is responsible for obtaining information about device battery state.
 *
 * @module app.model.battery
 * @requires {@link app.common.events}
 * @namespace app.model.battery
 * @memberof app.model
 */
// make sure that "app" namespace is created
window.app = window.app || {};

(function defineAppModelBattery(app) {
  'use strict';
  /**
   * Battery model module reference.
   *
   * @private
   * @type {object}
   */

  var modelBattery = null,

  /**
   * Common events module reference.
   *
   * @private
   * @type {object}
   */
  commonEvents = app.common.events,
      driver = null; // create namespace for the module

  app.model = app.model || {};
  app.model.battery = app.model.battery || {};
  modelBattery = app.model.battery;
  /**
   * Initializes the battery model module.
   *
   * @memberof app.model.battery
   * @public
   */

  modelBattery.init = function init(driver) {
    driver = driver;
    driver.init();
  };
})(window.app);

/***/ }),

/***/ "./src/js/model/app.model.geolocation.js":
/*!***********************************************!*\
  !*** ./src/js/model/app.model.geolocation.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global window, console, navigator, setTimeout*/

/**
 * Application geolocation model module.
 * It is responsible for providing information about user location.
 *
 * @module app.model.geolocation
 * @requires {@link app.common.events}
 * @requires {@link app.common.calculations}
 * @namespace app.model.geolocation
 * @memberof app.model
 */
// make sure that "app" namespace is created
window.app = window.app || {};

(function defineAppModelGeolocation(app) {
  'use strict';
  /**
   * Geolocation checking interval (in milliseconds).
   *
   * @private
   * @const {number}
   */

  var GEO_CHECKING_INTERVAL = 1000,

  /**
   * Geolocation checking counter.
   * Defines max number of checking interval occurrences.
   *
   * @private
   * @const {number}
   */
  GEO_CHECKING_COUNTER = 5,

  /**
   * Geolocation model module reference.
   *
   * @private
   * @type {object}
   */
  modelGeolocation = null,

  /**
   * Common events module reference.
   *
   * @private
   * @type {object}
   */
  commonEvents = app.common.events,

  /**
   * Common calculations module reference.
   *
   * @private
   * @type {object}
   */
  commonCalculations = app.common.calculations,

  /**
   * Geolocation API object.
   *
   * @private
   * @type {object}
   */
  geolocation = null,

  /**
   * Current position data.
   *
   * @private
   * @type {Position}
   */
  currentPosition = null,

  /**
   * Stores information about number of checking interval occurrences.
   *
   * @private
   * @type {number}
   */
  checkingCounter = 0; // create namespace for the module

  app.model = app.model || {};
  app.model.geolocation = app.model.geolocation || {};
  modelGeolocation = app.model.geolocation;
  /**
   * Checks if the current position is equal to the one given as parameter.
   * Returns true if it is, false otherwise.
   *
   * @param {Position} position
   * @returns {boolean}
   */

  function isPositionEqual(position) {
    if (currentPosition && (currentPosition.coords.latitude === position.coords.latitude || currentPosition.coords.longitude === position.coords.longitude)) {
      return true;
    }

    return false;
  }
  /**
   * Performs action on get current position success.
   *
   * @private
   * @param {Position} position
   * @fires model.geolocation.current.position.changed
   * @fires model.geolocation.current.destination.reached
   * @fires model.geolocation.position.available
   */


  function onGetCurrentPositionSuccess(position) {
    if (!isPositionEqual(position)) {
      currentPosition = position;
      commonEvents.dispatchEvent('model.geolocation.current.position.changed');
    }

    commonEvents.dispatchEvent('model.geolocation.position.available');
    checkingCounter = 0; //setTimeout(getGeoPosition, GEO_CHECKING_INTERVAL);
  }
  /**
   * Performs action on get current position error.
   *
   * @private
   * @fires model.geolocation.position.unavailable
   * @fires model.geolocation.position.lost
   */


  function onGetCurrentPositionError(error) {
    commonEvents.dispatchEvent('model.geolocation.position.unavailable');
    checkingCounter += 1;

    if (checkingCounter === GEO_CHECKING_COUNTER) {
      commonEvents.dispatchEvent('model.geolocation.position.lost');
    }

    console.warn(error); //setTimeout(getGeoPosition, GEO_CHECKING_INTERVAL);
  }
  /**
   * Uses Geolocation API in order to obtain information
   * about changes of the current position.
   *
   * @private
   */


  function getGeoPosition() {
    try {
      geolocation.watchPosition(onGetCurrentPositionSuccess, onGetCurrentPositionError, {
        maximumAge: GEO_CHECKING_INTERVAL,
        enableHighAccuracy: true,
        timeout: GEO_CHECKING_INTERVAL
      });
    } catch (error) {
      console.warn('Couldn\'t get geolocation position.', error);
    }
  }
  /**
   * Returns current position.
   *
   * @memberof app.model.geolocation
   * @public
   * @returns {object}
   */


  modelGeolocation.getCurrentPosition = function getCurrentPosition() {
    return currentPosition;
  };
  /**
   * Initializes the geolocation model module.
   *
   * @memberof app.model.geolocation
   * @public
   * @fires model.geolocation.available
   * @fires model.geolocation.unavailable
   */


  modelGeolocation.init = function init() {
    if (navigator.geolocation) {
      geolocation = navigator.geolocation;
      commonEvents.dispatchEvent('model.geolocation.available');
      getGeoPosition();
    } else {
      commonEvents.dispatchEvent('model.geolocation.unavailable');
    }
  };
})(window.app);

/***/ }),

/***/ "./src/js/model/app.model.network.js":
/*!*******************************************!*\
  !*** ./src/js/model/app.model.network.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global window, console, tizen*/

/**
 * Application network model module.
 * It is responsible for providing information about user location.
 *
 * @module app.model.network
 * @requires {@link app.common.events}
 * @namespace app.model.network
 * @memberof app.model
 */
// make sure that "app" namespace is created
window.app = window.app || {};

(function defineAppModelNetwork(app) {
  'use strict';
  /**
   * Common events module reference.
   *
   * @private
   * @type {object}
   */

  var commonEvents = app.common.events,
      modelNetwork = null; // create namespace for the module

  app.model = app.model || {};
  app.model.network = app.model.network || {};
  modelNetwork = app.model.network;
  modelNetwork.driver = null;
  /**
   * Checks available network type.
   *
   * @private
   */

  function checkNetworkType() {
    return modelNetwork.driver.checkNetworkType();
  }
  /**
   * Checks whether the network type has different value than 'NONE'.
   *
   * @memberof app.model.network
   * @public
   * @returns {boolean}
   */


  modelNetwork.isNetworkAvailable = function isNetworkAvailable() {
    return modelNetwork.driver.isNetworkAvailable();
  };
  /**
   * Returns available network type;
   *
   * @memberof app.model.network
   * @public
   * @returns {string}
   */


  modelNetwork.getNetworkType = function getNetworkType() {
    return modelNetwork.driver.getNetworkType();
  };
  /**
   * Initializes the network model module.
   *
   * @memberof app.model.network
   * @public
   */


  modelNetwork.init = function init(driver) {
    modelNetwork.driver = driver;
    modelNetwork.driver.init();
  };
})(window.app);

/***/ }),

/***/ "./src/js/model/app.model.sync.js":
/*!****************************************!*\
  !*** ./src/js/model/app.model.sync.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*global window, console, geolocation, setTimeout*/

/**
 * Application sync model module.
 * It is responsible for syncing workouts with the server.
 *
 * @module app.model.geolocation
 * @requires {@link app.common.events}
 * @requires {@link app.common.calculations}
 * @namespace app.model.geolocation
 * @memberof app.model
 */
// make sure that "app" namespace is created
window.app = window.app || {};

(function defineAppModelSync(app) {
  'use strict';
  /**
   * Workout model module reference.
   *
   * @private
   * @type {object}
   */

  var modelSync = null,

  /**
   * Geolocation model module reference.
   *
   * @private
   * @type {object}
   */
  modelWorkout = app.model.workout,

  /**
   * Common events module reference.
   *
   * @private
   * @type {object}
   */
  commonEvents = app.common.events,
      modelNetwork = app.model.network,
      syncUrls = {
    login: '',
    upload: ''
  }; // create namespace for the module

  app.model = app.model || {};
  app.model.sync = app.model.sync || {};
  modelSync = app.model.sync;
  /**
   * Registers event listeners.
   *
   * @private
   */

  function bindEvents() {
    window.addEventListener('model.workout.getlist.successful', function (e) {
      e.stopPropagation();
      var workouts = e.detail;
      uploadWorkouts(workouts);
    }, 'model.workout.getlist.failed', function (e) {
      e.stopPropagation();
      commonEvents.dispatchEvent('model.sync.upload.failed');
    });
  }

  function getToken() {
    return localStorage.getItem('token');
  }

  function createAuthHeader() {
    var token = getToken() || '',
        header = {
      key: 'Authorization',
      value: 'Bearer ' + token
    };
    return token.length ? header : false;
  }
  /**
   * Initializes the workout model module.
   *
   * @memberof app.model.workout
   * @public
   * @fires model.sync.login.successful
   * @fires model.sync.login.failed
   * @param {string} loginUrl
   * @param {string} uploadUrl
   */


  modelSync.init = function init(loginUrl, uploadUrl) {
    syncUrls.login = loginUrl;
    syncUrls.upload = uploadUrl;
    bindEvents();
  };

  modelSync.login = function login(email, password) {
    var client = new XMLHttpRequest(),
        localStorage = window.localStorage;
    /* Check the response status */

    client.onreadystatechange = function () {
      if (client.readyState == 4) {
        if (client.status == 200) {
          localStorage.setItem('token', JSON.parse(client.response));
          commonEvents.dispatchEvent('model.sync.login.successful', {
            token: client.response
          });
        } else {
          commonEvents.dispatchEvent('model.sync.login.failed');
        }
      }
    };

    client.onerror = function (e) {
      console.log(e);
    };

    var data = "email=" + email + "&" + "password=" + password;
    client.open('POST', syncUrls.login, true);
    client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    client.send(data);
    /* Send to server */
  };

  modelSync.sync = function () {
    // Disabled until network availability is fixed for cordova
    // if( modelNetwork.isNetworkAvailable() ){
    modelWorkout.getItemsToSync(); // }
  };

  function uploadWorkouts(workouts) {
    var client = new XMLHttpRequest(),
        authHeaders = createAuthHeader();

    if (authHeaders === false) {
      commonEvents.dispatchEvent('model.sync.login.required');
      return false;
    }
    /* Check the response status */


    client.onreadystatechange = function () {
      if (client.readyState == 4) {
        console.log('Response: ' + client.status);

        switch (client.status) {
          case 200:
            modelWorkout.clear();
            commonEvents.dispatchEvent('model.sync.upload.successful', true);
            break;

          case 401:
            commonEvents.dispatchEvent('model.sync.login.required');
            break;

          default:
            commonEvents.dispatchEvent('model.sync.upload.failed');
            break;
        }
      }
    };

    client.open('POST', syncUrls.upload, true);
    var payload = JSON.stringify({
      data: workouts
    });
    client.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    client.setRequestHeader("Accept", "application/json");
    client.setRequestHeader(authHeaders.key, authHeaders.value);
    console.log('Sending data to the server');
    client.send(payload);
    /* Send to server */
  }
})(window.app);

/***/ }),

/***/ "./src/js/model/app.model.workout.js":
/*!*******************************************!*\
  !*** ./src/js/model/app.model.workout.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _workout_app_workout_cycling_workout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../workout/app.workout.cycling_workout */ "./src/js/workout/app.workout.cycling_workout.js");
/* harmony import */ var _workout_app_workout_running_workout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../workout/app.workout.running_workout */ "./src/js/workout/app.workout.running_workout.js");
/* harmony import */ var _workout_app_workout_base_workout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../workout/app.workout.base_workout */ "./src/js/workout/app.workout.base_workout.js");




__webpack_require__(/*! ../common/app.common.calculations */ "./src/js/common/app.common.calculations.js");
/*global window, console, geolocation, setTimeout*/

/**
 * Application geolocation model module.
 * It is responsible for providing information about user location.
 *
 * @module app.model.geolocation
 * @requires {@link app.common.events}
 * @requires {@link app.common.calculations}
 * @namespace app.model.geolocation
 * @memberof app.model
 */
// make sure that "app" namespace is created


window.app = window.app || {};

(function defineAppModelWorkout(app) {
  'use strict';
  /**
   * Geolocation checking interval (in milliseconds).
   *
   * @private
   * @const {number}
   */

  /**
   * Workout model module reference.
   *
   * @private
   * @type {object}
   */

  var modelWorkout = null,

  /**
   * Geolocation model module reference.
   *
   * @private
   * @type {object}
   */
  modelGeolocation = app.model.geolocation,

  /**
   * Common events module reference.
   *
   * @private
   * @type {object}
   */
  commonEvents = app.common.events,
      hardwareDriver = null,

  /**
   * Workout data.
   *
   * @private
   * @type {BaseWorkout}
   */
  workout = null,
      workoutDB = null,
      isDBready = false; // create namespace for the module

  app.model = app.model || {};
  app.model.workout = app.model.workout || {};
  modelWorkout = app.model.workout;
  modelWorkout.WORKOUT_TYPE_RUNNING = 1;
  modelWorkout.WORKOUT_TYPE_CYCLING = 2;
  modelWorkout.WORKOUT_STATUS_UNSAVED = 0;
  modelWorkout.WORKOUT_STATUS_SAVED = 1;
  modelWorkout.WORKOUT_STATUS_SYNCED = 2;
  /**
   * Handles model.geolocation.position.available event.
   *
   * @private
   * @fires model.workout.updateui
   */

  function updateUI() {
    if (workout) {
      commonEvents.dispatchEvent('model.workout.updateui', workout);
    }
  }
  /**
   * Handles model.geolocation.position.available event.
   *
   * @private
   */


  function onModelGeolocationPositionAvailable() {
    var currentPosition = modelGeolocation.getCurrentPosition();

    if (workout && workout.isActive()) {
      var point = new Point(0, currentPosition.coords.latitude, currentPosition.coords.longitude, 0, currentPosition.coords.altitude, currentPosition.timestamp);
      workout.addPoint(point);
      updateUI();
    }
  }
  /**
   * Registers event listeners.
   *
   * @private
   */


  function bindEvents() {
    window.addEventListener('model.geolocation.position.available', onModelGeolocationPositionAvailable);
  }

  function initDatabase() {
    workoutDB = new IDBStore({
      dbVersion: 1,
      storeName: 'workouts',
      keyPath: 'id',
      autoIncrement: true,
      onStoreReady: function onStoreReady() {
        commonEvents.dispatchEvent('model.workout.dbready');
        isDBready = true;
      }
    });
  }
  /**
   * Initializes the workout model module.
   *
   * @memberof app.model.workout
   * @public
   * @fires model.geolocation.available
   * @fires model.geolocation.unavailable
   */


  modelWorkout.init = function init(driver) {
    hardwareDriver = driver;
    hardwareDriver.init();
    bindEvents();
    initDatabase();
  };

  modelWorkout.start = function start(type) {
    switch (type) {
      case _workout_app_workout_base_workout__WEBPACK_IMPORTED_MODULE_2__["WORKOUT_TYPE_CYCLING"]:
        workout = new _workout_app_workout_cycling_workout__WEBPACK_IMPORTED_MODULE_0__["CyclingWorkout"]();
        break;

      case _workout_app_workout_base_workout__WEBPACK_IMPORTED_MODULE_2__["WORKOUT_TYPE_RUNNING"]:
        workout = new _workout_app_workout_running_workout__WEBPACK_IMPORTED_MODULE_1__["RunningWorkout"]();
        break;
    }

    workout.start();
    hardwareDriver.backgroundRunEnable();
  };
  /**
   *
   * @fires model.workout.paused
   */


  modelWorkout.togglePause = function togglePause() {
    if (!workout.isActive()) {
      commonEvents.dispatchEvent('model.workout.resumed');
      hardwareDriver.backgroundRunEnable();
    } else {
      commonEvents.dispatchEvent('model.workout.paused');
      hardwareDriver.backgroundRunDisable();
    }

    workout.pause();
  };

  modelWorkout.save = function save() {
    workout.save();

    var onsuccess = function onsuccess(id) {
      console.log('Successfully inserted! insertId is: ' + id);
      commonEvents.dispatchEvent('model.workout.save.successful', true);
    };

    var onerror = function onerror(error) {
      console.log('Workout save failed!', error);
      commonEvents.dispatchEvent('model.workout.save.failed');
    };

    workoutDB.put(workout.toObject(), onsuccess, onerror);
    return false;
  };

  modelWorkout.clear = function clear() {
    var onsuccess = function onsuccess() {
      console.log('Database celared');
      commonEvents.dispatchEvent('model.workout.clear.successful');
    };

    var onerror = function onerror(error) {
      console.log('Database clear failed!', error);
      commonEvents.dispatchEvent('model.workout.clear.failed');
    };

    workoutDB.clear(onsuccess, onerror);
  };

  modelWorkout.getList = function getList(status) {
    var onsuccess = function onsuccess(data) {
      data = data.filter(function (item) {
        return item.status == status;
      });
      commonEvents.dispatchEvent('model.workout.getlist.successful', data);
    };

    var onerror = function onerror(error) {
      console.log('Workout save failed!', error);
      commonEvents.dispatchEvent('model.workout.getlist.failed');
    };

    workoutDB.getAll(onsuccess, onerror);
  };

  modelWorkout.getItemsToSync = function getItemsToSync() {
    return modelWorkout.getList(modelWorkout.WORKOUT_STATUS_SAVED);
  };

  modelWorkout.getWorkout = function getWorkout() {
    return workout;
  };
})(window.app);

/***/ }),

/***/ "./src/js/model/drivers/android/app.drivers.android.battery.js":
/*!*********************************************************************!*\
  !*** ./src/js/model/drivers/android/app.drivers.android.battery.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../app.drivers.battery */ "./src/js/model/drivers/app.drivers.battery.js");

(function (root) {
  var BatteryDriverAndroid = function BatteryDriverAndroid() {};

  var proto = new BatteryDriver();

  proto.bind = function () {
    var _this = this;

    document.addEventListener("deviceready", function () {
      window.addEventListener("batterystatus", onBatteryStatus, false);

      function onBatteryStatus(status) {
        _this.level = status.level;
      }

      window.addEventListener("batterylow", onBatteryLow, false);

      function onBatteryLow(status) {
        _this.commonEvents.dispatchEvent('model.battery.low');
      }
    }, false);
  };

  BatteryDriverAndroid.prototype = proto;
  root.BatteryDriverAndroid = BatteryDriverAndroid;
})(window);

/***/ }),

/***/ "./src/js/model/drivers/android/app.drivers.android.hardware.js":
/*!**********************************************************************!*\
  !*** ./src/js/model/drivers/android/app.drivers.android.hardware.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../app.drivers.hardware */ "./src/js/model/drivers/app.drivers.hardware.js");

(function (root) {
  var HardwareDriverAndroid = function HardwareDriverAndroid() {
    this.commonEvents = window.app.common.events;
  };

  var proto = new HardwareDriver();

  proto.bind = function () {
    document.addEventListener("deviceready", function () {
      cordova.plugins.backgroundMode.on('activate', function () {
        cordova.plugins.backgroundMode.disableWebViewOptimizations();
      });
      window.addEventListener('model.workout.updateui', function (e) {
        var distance = e.detail.distance;

        if (cordova.plugins.backgroundMode.isActive()) {
          cordova.plugins.backgroundMode.configure({
            text: 'Workout active, distance: ' + Math.round(distance * 100) / 100 + ' km'
          });
        }
      });
    });
  };

  proto.isHeartRateAvailable = function () {
    return false;
  };

  proto.backgroundRunEnable = function () {
    cordova.plugins.backgroundMode.enable();
  };

  proto.backgroundRunDisable = function () {
    cordova.plugins.backgroundMode.disable();
  };

  HardwareDriverAndroid.prototype = proto;
  root.HardwareDriverAndroid = HardwareDriverAndroid;
})(window);

/***/ }),

/***/ "./src/js/model/drivers/android/app.drivers.android.network.js":
/*!*********************************************************************!*\
  !*** ./src/js/model/drivers/android/app.drivers.android.network.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../app.drivers.network */ "./src/js/model/drivers/app.drivers.network.js");

(function (root) {
  var NetworkDriverAndroid = function NetworkDriverAndroid() {};

  var proto = new NetworkDriver();

  proto.bind = function () {
    var _this = this;

    document.addEventListener("offline", function () {
      _this.onNetworkTypeChange();
    }, false);
    document.addEventListener("online", function () {
      _this.onNetworkTypeChange();
    }, false);
  };

  proto.isNetworkAvailable = function () {
    return navigator.connection.type !== Connection.NONE;
  };

  proto.onNetworkTypeChange = function (network) {
    this.networkType = navigator.connection.type;
    this.commonEvents.dispatchEvent('model.network.type.changed');
  };

  proto.onGetNetworkTypeSuccess = function (network) {
    this.networkType = navigator.connection.type;
    this.commonEvents.dispatchEvent('model.network.initialized');
  };

  NetworkDriverAndroid.prototype = proto;
  root.NetworkDriverAndroid = NetworkDriverAndroid;
})(window);

/***/ }),

/***/ "./src/js/model/drivers/app.driver.factory.js":
/*!****************************************************!*\
  !*** ./src/js/model/drivers/app.driver.factory.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./android/app.drivers.android.battery */ "./src/js/model/drivers/android/app.drivers.android.battery.js");

__webpack_require__(/*! ./android/app.drivers.android.network */ "./src/js/model/drivers/android/app.drivers.android.network.js");

__webpack_require__(/*! ./android/app.drivers.android.hardware */ "./src/js/model/drivers/android/app.drivers.android.hardware.js");

__webpack_require__(/*! ./tizen/app.drivers.tizen.battery */ "./src/js/model/drivers/tizen/app.drivers.tizen.battery.js");

__webpack_require__(/*! ./tizen/app.drivers.tizen.network */ "./src/js/model/drivers/tizen/app.drivers.tizen.network.js");

__webpack_require__(/*! ./tizen/app.drivers.tizen.hardware */ "./src/js/model/drivers/tizen/app.drivers.tizen.hardware.js");

;

(function (root) {
  var DriverFactory = function DriverFactory(platform) {
    this.platform = platform;
  };

  DriverFactory.prototype = {
    buildNetworkDriver: function buildNetworkDriver() {
      var networkDriver = new NetworkDriver();

      switch (this.platform) {
        case Platform.PLATFORM_TIZEN:
          networkDriver = new NetworkDriverTizen();
          break;

        case Platform.PLATFORM_ANDROID:
          networkDriver = new NetworkDriverAndroid();
          break;
      }

      return networkDriver;
    },
    buildBatteryDriver: function buildBatteryDriver() {
      var batteryDriver = new BatteryDriver();

      switch (this.platform) {
        case Platform.PLATFORM_TIZEN:
          batteryDriver = new BatteryDriverTizen();
          break;

        case Platform.PLATFORM_ANDROID:
          batteryDriver = new BatteryDriverAndroid();
          break;
      }

      return batteryDriver;
    },
    buildHardwareDriver: function buildHardwareDriver() {
      var hardwareDriver = new HardwareDriver();

      switch (this.platform) {
        case Platform.PLATFORM_TIZEN:
          hardwareDriver = new HardwareDriverTizen();
          break;

        case Platform.PLATFORM_ANDROID:
          hardwareDriver = new HardwareDriverAndroid();
          break;
      }

      return hardwareDriver;
    }
  };
  root.DriverFactory = DriverFactory;
})(window);

/***/ }),

/***/ "./src/js/model/drivers/app.drivers.battery.js":
/*!*****************************************************!*\
  !*** ./src/js/model/drivers/app.drivers.battery.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

;

(function (root) {
  var BatteryDriver = function BatteryDriver() {
    this.level = null;
    this.commonEvents = window.app.common.events;
  };

  BatteryDriver.prototype = {
    init: function init() {
      this.bind();
    },
    bind: function bind() {}
  };
  root.BatteryDriver = BatteryDriver;
})(window);

/***/ }),

/***/ "./src/js/model/drivers/app.drivers.hardware.js":
/*!******************************************************!*\
  !*** ./src/js/model/drivers/app.drivers.hardware.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

;

(function (root) {
  var HardwareDriver = function HardwareDriver() {
    this.commonEvents = window.app.common.events;
  };

  HardwareDriver.prototype = {
    init: function init() {
      this.bind();
    },
    bind: function bind() {},
    isHeartRateAvailable: function isHeartRateAvailable() {
      return false;
    },
    backgroundRunEnable: function backgroundRunEnable() {},
    backgroundRunDisable: function backgroundRunDisable() {}
  };
  root.HardwareDriver = HardwareDriver;
})(window);

/***/ }),

/***/ "./src/js/model/drivers/app.drivers.network.js":
/*!*****************************************************!*\
  !*** ./src/js/model/drivers/app.drivers.network.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

;

(function (root) {
  var NetworkDriver = function NetworkDriver() {
    this.commonEvents = window.app.common.events;
    this.networkType = 'NONE';
  };

  var NETWORKS = ['2G', '2.5G', '3G', '4G', 'WIFI', 'ETHERNET', 'UNKNOWN'];
  NetworkDriver.prototype = {
    init: function init() {
      this.bind();
    },
    bind: function bind() {},
    isNetworkAvailable: function isNetworkAvailable() {
      return NETWORKS.indexOf(this.networkType) !== -1;
    },
    getNetworkType: function getNetworkType() {
      return this.networkType;
    }
  };
  root.NetworkDriver = NetworkDriver;
})(window);

/***/ }),

/***/ "./src/js/model/drivers/app.drivers.platform.js":
/*!******************************************************!*\
  !*** ./src/js/model/drivers/app.drivers.platform.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

;

(function (root) {
  var Platform = {
    PLATFORM_TIZEN: 'tizen',
    PLATFORM_ANDROID: 'android',
    PLATFORM_BROWSER: 'browser',
    get: function get() {
      var platform = this.PLATFORM_BROWSER;

      if ((typeof tizen === "undefined" ? "undefined" : _typeof(tizen)) === 'object' && _typeof(tizen.systeminfo) === 'object') {
        platform = this.PLATFORM_TIZEN;
      } else if ((typeof device === "undefined" ? "undefined" : _typeof(device)) === 'object' && device.platform === 'android') {
        platform = this.PLATFORM_ANDROID;
      }

      return platform;
    }
  };
  root.Platform = Platform;
})(window);

/***/ }),

/***/ "./src/js/model/drivers/tizen/app.drivers.tizen.battery.js":
/*!*****************************************************************!*\
  !*** ./src/js/model/drivers/tizen/app.drivers.tizen.battery.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

__webpack_require__(/*! ../app.drivers.battery */ "./src/js/model/drivers/app.drivers.battery.js");

(function (root) {
  var BatteryDriverTizen = function BatteryDriverTizen() {};

  var proto = new BatteryDriver();

  proto.bind = function () {
    var _this = this,
        systeminfo = null;

    if ((typeof tizen === "undefined" ? "undefined" : _typeof(tizen)) === 'object' && _typeof(tizen.systeminfo) === 'object') {
      var systeminfo = tizen.systeminfo;
    } else {
      console.warn('tizen.systeminfo not available');
    }

    try {
      systeminfo.addPropertyValueChangeListener('BATTERY', function change(battery) {
        _this.level = battery.level;

        if (!battery.isCharging && battery.level < _this.LOW_BATTERY) {
          _this.commonEvents.dispatchEvent('model.battery.low');
        }
      }, null, function errorCallback(error) {
        console.warn('Battery state listener was not set.', error);
      });
    } catch (error) {
      console.warn('Battery state listener was not set.', error);
    }
  };

  BatteryDriverTizen.prototype = proto;
  root.BatteryDriverTizen = BatteryDriverTizen;
})(window);

/***/ }),

/***/ "./src/js/model/drivers/tizen/app.drivers.tizen.hardware.js":
/*!******************************************************************!*\
  !*** ./src/js/model/drivers/tizen/app.drivers.tizen.hardware.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../app.drivers.hardware */ "./src/js/model/drivers/app.drivers.hardware.js");

(function (root) {
  var HardwareDriverTizen = function HardwareDriverTizen() {
    this.commonEvents = window.app.common.events;
  };

  var proto = new HardwareDriver();

  proto.bind = function () {};

  proto.isHeartRateAvailable = function () {
    return false;
  };

  proto.backgroundRunEnable = function () {
    tizen.power.request("CPU", "CPU_AWAKE");
    tizen.power.request('SCREEN', 'SCREEN_NORMAL');
  };

  proto.backgroundRunDisable = function () {
    tizen.power.release("CPU");
    tizen.power.release('SCREEN');
  };

  HardwareDriverTizen.prototype = proto;
  root.HardwareDriverTizen = HardwareDriverTizen;
})(window);

/***/ }),

/***/ "./src/js/model/drivers/tizen/app.drivers.tizen.network.js":
/*!*****************************************************************!*\
  !*** ./src/js/model/drivers/tizen/app.drivers.tizen.network.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

__webpack_require__(/*! ../app.drivers.network */ "./src/js/model/drivers/app.drivers.network.js");

(function (root) {
  var NetworkDriverTizen = function NetworkDriverTizen() {};

  var proto = new NetworkDriver();

  proto.bind = function () {
    var _this = this,
        systeminfo = null;

    if ((typeof tizen === "undefined" ? "undefined" : _typeof(tizen)) === 'object' && _typeof(tizen.systeminfo) === 'object') {
      var systeminfo = tizen.systeminfo;
    } else {
      console.warn('tizen.systeminfo not available');
    }

    try {
      systeminfo.getPropertyValue('NETWORK', function (network) {
        _this.onGetNetworkTypeSuccess(network);
      }, function onGetPropertyValueError(error) {
        console.warn('Couldn\'t get network type value.', error);
      });
    } catch (error) {
      console.warn('Couldn\'t get network type value.', error);
    }

    try {
      systeminfo.addPropertyValueChangeListener('NETWORK', function (network) {
        _this.onNetworkTypeChange(network);
      });
    } catch (error) {
      console.warn('Network change listener was not set.', error);
    }
  };

  proto.onNetworkTypeChange = function (network) {
    this.networkType = network.networkType;
    this.commonEvents.dispatchEvent('model.network.type.changed');
  };

  proto.onGetNetworkTypeSuccess = function (network) {
    this.networkType = network.networkType;
    this.commonEvents.dispatchEvent('model.network.initialized');
  };

  NetworkDriverTizen.prototype = proto;
  root.NetworkDriverTizen = NetworkDriverTizen;
})(window);

/***/ }),

/***/ "./src/js/model/models.js":
/*!********************************!*\
  !*** ./src/js/model/models.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../common/app.common.events */ "./src/js/common/app.common.events.js");

__webpack_require__(/*! ./drivers/app.drivers.platform */ "./src/js/model/drivers/app.drivers.platform.js");

__webpack_require__(/*! ./drivers/app.driver.factory */ "./src/js/model/drivers/app.driver.factory.js");

__webpack_require__(/*! ./app.model.battery */ "./src/js/model/app.model.battery.js");

__webpack_require__(/*! ./app.model.network */ "./src/js/model/app.model.network.js");

__webpack_require__(/*! ./app.model.geolocation */ "./src/js/model/app.model.geolocation.js");

__webpack_require__(/*! ./app.model.workout */ "./src/js/model/app.model.workout.js");

__webpack_require__(/*! ./app.model.sync */ "./src/js/model/app.model.sync.js");

/***/ }),

/***/ "./src/js/workout/app.workout.base_workout.js":
/*!****************************************************!*\
  !*** ./src/js/workout/app.workout.base_workout.js ***!
  \****************************************************/
/*! exports provided: WORKOUT_TYPE_RUNNING, WORKOUT_TYPE_CYCLING, BaseWorkout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WORKOUT_TYPE_RUNNING", function() { return WORKOUT_TYPE_RUNNING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WORKOUT_TYPE_CYCLING", function() { return WORKOUT_TYPE_CYCLING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseWorkout", function() { return BaseWorkout; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

__webpack_require__(/*! ./app.workout.point */ "./src/js/workout/app.workout.point.js");

__webpack_require__(/*! ../common/app.common.calculations */ "./src/js/common/app.common.calculations.js");

var WORKOUT_STATUS_UNSAVED = 0,
    WORKOUT_STATUS_SAVED = 1,
    WORKOUT_STATE_STOPPED = 0,
    WORKOUT_STATE_RUNNING = 1,
    WORKOUT_STATE_PAUSED = 2,
    WORKOUT_STATE_AUTOPAUSED = 3;
var WORKOUT_TYPE_RUNNING = 1;
var WORKOUT_TYPE_CYCLING = 2;
/**
 * @class BaseWorkout
 * @constructor
 */

var BaseWorkout =
/*#__PURE__*/
function () {
  function BaseWorkout() {
    _classCallCheck(this, BaseWorkout);

    this.type = null;
    this.status = WORKOUT_STATUS_UNSAVED;
    /** @member {Point[]} **/

    this._points = [];
    this._distance = 0;
    this._segmentIndex = 0;
    this._state = WORKOUT_STATE_STOPPED;
  }

  _createClass(BaseWorkout, [{
    key: "init",
    value: function init() {}
  }, {
    key: "start",
    value: function start() {
      this._state = WORKOUT_STATE_RUNNING;
    }
  }, {
    key: "pause",
    value: function pause() {
      this._state = WORKOUT_STATE_PAUSED;
      this._segmentIndex++;
    }
  }, {
    key: "save",
    value: function save() {
      this.status = WORKOUT_STATUS_SAVED;
    }
    /**
     *
     * @returns {boolean}
     */

  }, {
    key: "isActive",
    value: function isActive() {
      return this._state === WORKOUT_STATE_RUNNING;
    }
    /**
     *
     * @param {Point} point
     */

  }, {
    key: "addPoint",
    value: function addPoint(point) {
      point.segment_index = this._segmentIndex;

      this._points.push(point);

      var points = this._getCalculationPoints();

      if (points) {
        this.calculate(points.pointA, points.pointB);
      }
    }
    /**
     *
     * @private
     *
     * @returns {?{pointA: Point, pointB: Point}}
     */

  }, {
    key: "_getCalculationPoints",
    value: function _getCalculationPoints() {
      var calculationPoints = null;

      if (this._points.length >= 2) {
        calculationPoints = {
          pointA: this._points[this._points.length - 2],
          pointB: this._points[this._points.length - 1]
        };
      }

      return calculationPoints;
    }
    /**
     *
     * @param {Point} pointA
     * @param {Point} pointB
     * @returns {number}
     */

  }, {
    key: "_calculateDistance",
    value: function _calculateDistance(pointA, pointB) {
      var distance = window.app.common.calculations.calculateDistance({
        latitude: pointA.lat,
        longitude: pointA.lng
      }, {
        latitude: pointB.lat,
        longitude: pointB.lng
      });
      this._distance += distance.raw;
      return distance.raw;
    }
    /**
     * Calculate the params such as distance, speed, etc
     *
     * @param {Point} pointA
     * @param {Point} pointB
     */

  }, {
    key: "calculate",
    value: function calculate(pointA, pointB) {}
    /**
     *
     * @returns {number}
     */

  }, {
    key: "toObject",

    /**
     *
     * @returns {{type: int, status: int, points: Point[]}}
     */
    value: function toObject() {
      return {
        type: this.type,
        status: this.status,
        points: this._points
      };
    }
  }, {
    key: "speed",
    get: function get() {
      return 0;
    }
    /**
     *
     * @returns {number}
     */

  }, {
    key: "distance",
    get: function get() {
      return this._distance / 1000;
    }
    /**
     *
     * @param {number} distance
     */
    ,
    set: function set(distance) {
      this._distance = distance;
    }
    /**
     *
     * @returns {Point[]}
     */

  }, {
    key: "points",
    get: function get() {
      return this._points;
    }
    /**
     *
     * @returns {int|number}
     */

  }, {
    key: "heartRate",
    get: function get() {
      return this._points.length ? this._points[this._points.length - 1].heart_rate : 0;
    }
    /**
     *
     * @returns {number}
     */

  }, {
    key: "altitude",
    get: function get() {
      return this._points.length ? this._points[this._points.length - 1].elevation : 0;
    }
  }]);

  return BaseWorkout;
}();

;


/***/ }),

/***/ "./src/js/workout/app.workout.cycling_workout.js":
/*!*******************************************************!*\
  !*** ./src/js/workout/app.workout.cycling_workout.js ***!
  \*******************************************************/
/*! exports provided: CyclingWorkout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CyclingWorkout", function() { return CyclingWorkout; });
/* harmony import */ var _app_workout_base_workout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.workout.base_workout */ "./src/js/workout/app.workout.base_workout.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

 // Milliseconds per meter to kilometers per hour

var MPS_TO_KMH = 3600; // hour = 3600 * 1000 milliseconds / kilometer = 1000 meters

var CyclingWorkout =
/*#__PURE__*/
function (_BaseWorkout) {
  _inherits(CyclingWorkout, _BaseWorkout);

  function CyclingWorkout() {
    var _this;

    _classCallCheck(this, CyclingWorkout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CyclingWorkout).call(this));
    _this.type = _app_workout_base_workout__WEBPACK_IMPORTED_MODULE_0__["WORKOUT_TYPE_CYCLING"];
    _this._speed = 0;
    return _this;
  }
  /**
   *
   * @param {Point} pointA
   * @param {Point} pointB
   * @returns {number}
   */


  _createClass(CyclingWorkout, [{
    key: "_calculateSpeed",
    value: function _calculateSpeed(pointA, pointB) {
      var distance = this._calculateDistance(pointA, pointB),
          timeDiff = pointB.time - pointA.time,
          speed = timeDiff ? MPS_TO_KMH * distance / timeDiff : 0;

      this._speed = speed;
      return speed;
    }
    /**
     * Calculate the params such as distance, speed, etc
     *
     * @param {Point} pointA
     * @param {Point} pointB
     */

  }, {
    key: "calculate",
    value: function calculate(pointA, pointB) {
      this._calculateSpeed(pointA, pointB);
    }
    /**
     *
     * @returns {number}
     */

  }, {
    key: "speed",
    get: function get() {
      return this._speed;
    }
  }]);

  return CyclingWorkout;
}(_app_workout_base_workout__WEBPACK_IMPORTED_MODULE_0__["BaseWorkout"]);



/***/ }),

/***/ "./src/js/workout/app.workout.point.js":
/*!*********************************************!*\
  !*** ./src/js/workout/app.workout.point.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

;

(function (root) {
  /**
   *
   * @param {int} segmentIndex
   * @param {number} lat
   * @param {number} lng
   * @param {int} heartRate
   * @param {number} elevation
   * @param {int} time
   * @constructor
   */
  var Point = function Point(segmentIndex, lat, lng, heartRate, elevation, time) {
    this.segment_index = segmentIndex;
    this.lat = lat;
    this.lng = lng;
    this.heart_rate = heartRate;
    this.elevation = elevation;
    this.time = time;
  };

  Point.prototype = {
    init: function init() {}
  };
  root.Point = Point;
})(window);

/***/ }),

/***/ "./src/js/workout/app.workout.running_workout.js":
/*!*******************************************************!*\
  !*** ./src/js/workout/app.workout.running_workout.js ***!
  \*******************************************************/
/*! exports provided: RunningWorkout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RunningWorkout", function() { return RunningWorkout; });
/* harmony import */ var _app_workout_base_workout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.workout.base_workout */ "./src/js/workout/app.workout.base_workout.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

 // Milliseconds per meter to minutes per kilometer

var MSEC_PER_METER_TO_MIN_PER_KM = 60; // Minute = 60 * 1000  millisecond / kilometer = 1000 meters

var RunningWorkout =
/*#__PURE__*/
function (_BaseWorkout) {
  _inherits(RunningWorkout, _BaseWorkout);

  function RunningWorkout() {
    var _this;

    _classCallCheck(this, RunningWorkout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RunningWorkout).call(this));
    _this.type = _app_workout_base_workout__WEBPACK_IMPORTED_MODULE_0__["WORKOUT_TYPE_RUNNING"];
    _this._pace = 0;
    return _this;
  }
  /**
   *
   * @param {Point} pointA
   * @param {Point} pointB
   * @returns {number}
   */


  _createClass(RunningWorkout, [{
    key: "_calculatePace",
    value: function _calculatePace(pointA, pointB) {
      var distance = this._calculateDistance(pointA, pointB),
          timeDiff = pointB.time - pointA.time,
          pace = timeDiff / distance / MSEC_PER_METER_TO_MIN_PER_KM;

      this._pace = pace;
      return this._pace;
    }
    /**
     * Calculate the params such as distance, speed, etc
     *
     * @param {Point} pointA
     * @param {Point} pointB
     */

  }, {
    key: "calculate",
    value: function calculate(pointA, pointB) {
      this._calculatePace(pointA, pointB);
    }
    /**
     *
     * @returns {number}
     */

  }, {
    key: "speed",
    get: function get() {
      return this._pace;
    }
  }]);

  return RunningWorkout;
}(_app_workout_base_workout__WEBPACK_IMPORTED_MODULE_0__["BaseWorkout"]);



/***/ }),

/***/ "./src/tests/spec/SyncModelSpec.js":
/*!*****************************************!*\
  !*** ./src/tests/spec/SyncModelSpec.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

describe("Sync", function () {
  var app = window.app || {};
  var env = jasmine.getEnv();
  env.randomizeTests(false);
  app.model.sync.init('http://tracy.test/api/login', 'http://tracy.test/api/workouts');
  beforeEach(function (done) {
    var xmlhttp = new XMLHttpRequest(),
        _this = this;

    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        _this.waypoints = JSON.parse(this.responseText);
        done();
      }
    };

    xmlhttp.open("GET", "tests/data/455.json", true);
    xmlhttp.send();
    this.modelWorkout = app.model.workout;
    this.modelGeolocation = app.model.geolocation;
    this.modelSync = app.model.sync;
    var platform = Platform.get(),
        driverFactory = new DriverFactory(platform);
    this.modelWorkout.init(driverFactory.buildHardwareDriver(platform));
    window.addEventListener('model.workout.dbready', function (e) {
      _this.modelWorkout.clear();
    });

    this.runWorkout = function (doneCallback) {
      navigator.geolocation.delay = 1;
      navigator.geolocation.repeat = false;
      navigator.geolocation.waypoints = this.waypoints;
      this.modelGeolocation.init();
      this.modelWorkout.start(this.modelWorkout.WORKOUT_TYPE_RUNNING);
      setTimeout(function () {
        _this.modelWorkout.togglePause();

        doneCallback();
      }, 300);
    };
  });
  it('should login', function (done) {
    window.addEventListener('model.sync.login.successful', function (e) {
      e.stopPropagation();
      expect(e.detail.hasOwnProperty('token')).toBeTruthy();
      expect(e.detail.token.length > 0).toBeTruthy();
      done();
    });
    this.modelSync.login('demo@email.com', '123123');
  });
  it('should login with token and upload workouts', function (done) {
    var _this = this;

    window.addEventListener('model.sync.upload.successful', function (e) {
      e.stopPropagation();
      expect(e.detail).toBeTruthy();
      done();
    });
    this.runWorkout(function () {
      _this.modelWorkout.save();

      _this.modelSync.sync();
    });
  });
});

/***/ }),

/***/ "./src/tests/spec/WorkoutModelSpec.js":
/*!********************************************!*\
  !*** ./src/tests/spec/WorkoutModelSpec.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

describe("Workout model", function () {
  var app = window.app || {};
  var env = jasmine.getEnv();
  env.randomizeTests(false);
  beforeEach(function (done) {
    var xmlhttp = new XMLHttpRequest(),
        _this = this;

    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        _this.waypoints = JSON.parse(this.responseText);
        done();
      }
    };

    xmlhttp.open("GET", "tests/data/455.json", true);
    xmlhttp.send();
    this.modelWorkout = app.model.workout;
    this.modelGeolocation = app.model.geolocation;
    var platform = Platform.get(),
        driverFactory = new DriverFactory(platform);
    this.modelWorkout.init(driverFactory.buildHardwareDriver(platform));
    window.addEventListener('model.workout.dbready', function (e) {
      _this.modelWorkout.clear();
    });

    this.runWorkout = function (doneCallback) {
      navigator.geolocation.delay = 1;
      navigator.geolocation.repeat = false;
      navigator.geolocation.waypoints = this.waypoints;
      this.modelGeolocation.init();
      this.modelWorkout.start(this.modelWorkout.WORKOUT_TYPE_RUNNING);
      setTimeout(function () {
        _this.modelWorkout.togglePause();

        doneCallback();
      }, 300);
    };
  });
  it('should start and pause workout', function (done) {
    var _this = this;

    expect(_typeof(this.modelWorkout) === 'object').toBeTruthy();

    var pauseListener = function pauseListener(e) {
      var workout = _this.modelWorkout.getWorkout();

      expect(workout.points.length).toEqual(6);
      window.removeEventListener('model.workout.paused', pauseListener);
    };

    window.addEventListener('model.workout.paused', pauseListener);
    this.runWorkout(function () {
      _this.modelWorkout.togglePause();

      done();
    });
  });
  it('should save the workout', function (done) {
    var _this = this;

    window.addEventListener('model.workout.save.successful', function (e) {
      e.stopPropagation();
      expect(e.detail).toBeTruthy();
      done();
    }, 'model.workout.save.failed', function (e) {
      e.stopPropagation();
      expect(e.detail).toBeTruthy();
      done();
    });
    this.runWorkout(function () {
      _this.modelWorkout.save();
    });
  });
  it('should load saved workouts', function (done) {
    var _this = this;

    window.addEventListener('model.workout.getlist.successful', function (e) {
      e.stopPropagation();
      expect(e.detail.length == 1).toBeTruthy();
      expect(e.detail[0].status == _this.modelWorkout.WORKOUT_STATUS_SAVED).toBeTruthy();
      done();
    }, 'model.workout.getlist.failed', function (e) {
      e.stopPropagation();
      done();
    });
    window.addEventListener('model.workout.save.successful', function (e) {
      e.stopPropagation();

      _this.modelWorkout.getList(_this.modelWorkout.WORKOUT_STATUS_SAVED);
    }, 'model.workout.save.failed', function (e) {
      e.stopPropagation();
      expect(e.detail).toBeTruthy();
      done();
    });
    this.runWorkout(function () {
      // _this.modelSync.sync = function(){};
      _this.modelWorkout.save();
    });
  }); //it('should start the workout and update UI', function (done) {
  //    var _this = this;
  //
  //    navigator.geolocation.delay = 1000;
  //    navigator.geolocation.repeat = false;
  //    navigator.geolocation.waypoints = this.waypoints;
  //
  //    this.modelGeolocation.init();
  //    expect(typeof this.modelWorkout === 'object').toBeTruthy();
  //    this.modelWorkout.start(this.modelWorkout.WORKOUT_TYPE_RUNNING);
  //
  //    window.addEventListener(
  //        'model.workout.updateui',
  //        function(e){
  //            e.stopPropagation();
  //            var data = e.detail;
  //            console.log(data);
  //        }
  //    );
  //
  //    setTimeout( function(){
  //            done();
  //        },
  //        4000);
  //});
});

/***/ }),

/***/ "./src/tests/spec/unit/DriverFactorySpec.js":
/*!**************************************************!*\
  !*** ./src/tests/spec/unit/DriverFactorySpec.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

describe("DriverFactory", function () {
  it('should create drivers for tizen', function () {
    var platform = Platform.PLATFORM_TIZEN,
        driverFactory = new DriverFactory(platform),
        batteryDriver = driverFactory.buildBatteryDriver(platform),
        networkDriver = driverFactory.buildNetworkDriver(platform),
        hardwareDriver = driverFactory.buildHardwareDriver(platform);
    expect(batteryDriver instanceof BatteryDriverTizen).toBeTruthy();
    expect(networkDriver instanceof NetworkDriverTizen).toBeTruthy();
    expect(hardwareDriver instanceof HardwareDriverTizen).toBeTruthy();
  });
  it('should create drivers for android', function () {
    var platform = Platform.PLATFORM_ANDROID,
        driverFactory = new DriverFactory(platform),
        batteryDriver = driverFactory.buildBatteryDriver(platform),
        networkDriver = driverFactory.buildNetworkDriver(platform),
        hardwareDriver = driverFactory.buildHardwareDriver(platform);
    expect(batteryDriver instanceof BatteryDriverAndroid).toBeTruthy();
    expect(networkDriver instanceof NetworkDriverAndroid).toBeTruthy();
    expect(hardwareDriver instanceof HardwareDriverAndroid).toBeTruthy();
  });
});

/***/ }),

/***/ "./src/tests/spec/unit/WorkoutSpec.js":
/*!********************************************!*\
  !*** ./src/tests/spec/unit/WorkoutSpec.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_js_workout_app_workout_cycling_workout_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../src/js/workout/app.workout.cycling_workout.js */ "./src/js/workout/app.workout.cycling_workout.js");
/* harmony import */ var _src_js_workout_app_workout_running_workout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../src/js/workout/app.workout.running_workout */ "./src/js/workout/app.workout.running_workout.js");


describe("Workout", function () {
  it('should calculate distance', function () {
    var timeA = 1551018055000,
        timeB = timeA + 20000,
        // +20 sec
    pointA = new Point(0, 45.8849114, 19.2545559, 0, 0, timeA),
        pointB = new Point(0, 45.8856601, 19.2553514, 0, 0, timeB),
        expectedDistance = 103.54782304590353,
        // meters
    workout = new _src_js_workout_app_workout_cycling_workout_js__WEBPACK_IMPORTED_MODULE_0__["CyclingWorkout"](),
        distance = workout._calculateDistance(pointA, pointB);

    expect(distance).toEqual(expectedDistance);
  });
  it('should calculate speed', function () {
    var timeA = 1551018055000,
        timeB = timeA + 20000,
        // +20 sec
    pointA = new Point(0, 45.8849114, 19.2545559, 0, 0, timeA),
        pointB = new Point(0, 45.8856601, 19.2553514, 0, 0, timeB),
        expectedSpeed = 18.638608148262635,
        workout = new _src_js_workout_app_workout_cycling_workout_js__WEBPACK_IMPORTED_MODULE_0__["CyclingWorkout"](),
        speed = workout._calculateSpeed(pointA, pointB);

    expect(speed).toEqual(expectedSpeed);
  });
  it('should calculate pace', function () {
    var timeA = 1551018055000,
        timeB = timeA + 40000,
        // +40 sec
    pointA = new Point(0, 45.8849114, 19.2545559, 0, 0, timeA),
        pointB = new Point(0, 45.8856601, 19.2553514, 0, 0, timeB),
        expectedPace = 6.438248985409653,
        workout = new _src_js_workout_app_workout_running_workout__WEBPACK_IMPORTED_MODULE_1__["RunningWorkout"](),
        pace = workout._calculatePace(pointA, pointB);

    expect(pace).toEqual(expectedPace);
  });
  it('should add points and calculate distance and pace', function () {
    var timeA = 1551018055000,
        timeB = timeA + 40000,
        // +40 sec
    pointA = new Point(0, 45.8849114, 19.2545559, 0, 0, timeA),
        pointB = new Point(0, 45.8856601, 19.2553514, 0, 0, timeB),
        expectedPace = 6.438248985409653,
        expectedDistance = 103.54782304590353 / 1000,
        // km
    workout = new _src_js_workout_app_workout_running_workout__WEBPACK_IMPORTED_MODULE_1__["RunningWorkout"]();
    workout.addPoint(pointA);
    workout.addPoint(pointB);
    expect(workout.speed).toEqual(expectedPace);
    expect(workout.distance).toEqual(expectedDistance);
  });
  it('should add points and calculate distance and speed', function () {
    var timeA = 1551018055000,
        timeB = timeA + 20000,
        // +20 sec
    pointA = new Point(0, 45.8849114, 19.2545559, 0, 0, timeA),
        pointB = new Point(0, 45.8856601, 19.2553514, 0, 0, timeB),
        expectedSpeed = 18.638608148262635,
        // km/h
    expectedDistance = 103.54782304590353 / 1000,
        // km
    workout = new _src_js_workout_app_workout_cycling_workout_js__WEBPACK_IMPORTED_MODULE_0__["CyclingWorkout"]();
    workout.addPoint(pointA);
    workout.addPoint(pointB);
    expect(workout.speed).toEqual(expectedSpeed);
    expect(workout.distance).toEqual(expectedDistance);
  });
});

/***/ }),

/***/ "./src/tests/test.js":
/*!***************************!*\
  !*** ./src/tests/test.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global document, tizen, console, window*/

/**
 * Main application module.
 * Provides a namespace for other application modules.
 * Handles application life cycle.
 *
 * @module app
 * @requires {@link app.model.battery}
 * @requires {@link app.ui}
 * @namespace app
 */
__webpack_require__(/*! ../js/model/models */ "./src/js/model/models.js");

__webpack_require__(/*! ./spec/WorkoutModelSpec */ "./src/tests/spec/WorkoutModelSpec.js");

__webpack_require__(/*! ./spec/SyncModelSpec */ "./src/tests/spec/SyncModelSpec.js");

__webpack_require__(/*! ./spec/unit/DriverFactorySpec */ "./src/tests/spec/unit/DriverFactorySpec.js");

__webpack_require__(/*! ./spec/unit/WorkoutSpec */ "./src/tests/spec/unit/WorkoutSpec.js");

/***/ }),

/***/ 1:
/*!*********************************!*\
  !*** multi ./src/tests/test.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/vernerd/www/tracy-app/src/tests/test.js */"./src/tests/test.js");


/***/ })

/******/ });
//# sourceMappingURL=test.js.map