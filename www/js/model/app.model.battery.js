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

        driver = null;

    // create namespace for the module
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
