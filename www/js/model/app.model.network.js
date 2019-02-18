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

        modelNetwork = null;

    // create namespace for the module
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
