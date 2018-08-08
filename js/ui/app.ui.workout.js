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

/*global window, tau, document*/

/**
 * Application navigation page module.
 * It is responsible for navigation page layout and logic.
 *
 * @module app.ui.navigation
 * @requires {@link app.common.calculations}
 * @requires {@link app.model.geolocation}
 * @requires {@link app.ui.waiting}
 * @requires {@link app.ui.destination}
 * @requires {@link app.ui.finish}
 * @namespace app.ui.navigation
 * @memberof app.ui
 */

// make sure that "app" namespace is created
window.app = window.app || {};

(function defineAppUiWorkout(app) {
    'use strict';

    /**
     * Page Id.
     *
     * @private
     * @const {string}
     */
    var PAGE_ID = 'workout',

        /**
         * Navigation path angle.
         *
         * @private
         * @const {number}
         */
        PATH_ANGLE = 60,

        /**
         * Page element.
         *
         * @private
         * @type {HTMLElement}
         */
        page = null,

        /**
         * Common calculations module reference.
         *
         * @private
         * @type {object}
         */
        commonCalculations = null,

        /**
         * Geolocation model module reference.
         *
         * @private
         * @type {object}
         */
        modelGeolocation = null,

        /**
         * Ui waiting module reference.
         *
         * @private
         * @type {object}
         */
        uiWaiting = null,

        /**
         * UI destination module reference.
         *
         * @private
         * @type {object}
         */
        uiDestination = null,

        /**
         * UI finish module reference.
         *
         * @private
         * @type {object}
         */
        uiFinish = null,

        /**
         * UI navigation module reference.
         *
         * @private
         * @type {object}
         */
        uiWorkout = null,

        /**
         * Total distance.
         *
         * @private
         * @type {number}
         */
        totalDistance = 0;

    // create namespace for the module
    app.ui = app.ui || {};
    app.ui.workout = app.ui.workout || {};
    uiWorkout = app.ui.workout;


    /**
     * Updates UI.
     *
     * @private
     */
    function updateUI() {
        var currentPosition = modelGeolocation.getCurrentPosition();

    }

    /**
     * Handles pagebeforeshow event.
     *
     * @private
     */
    function onPageBeforeShow() {
        updateUI();
    }

    /**
     * Handles model.geolocation.current.position.changed event.
     *
     * Updates navigation page ui
     * according to the values provided by the geolocation model module.
     *
     * @private
     */
    function onModelGeolocationCurrentPositionChanged() {
        if (tau.activePage.id === PAGE_ID) {
            updateUI();
        }
    }

    /**
     * Registers event listeners.
     *
     * @private
     */
    function bindEvents() {
        page.addEventListener('pagebeforeshow', onPageBeforeShow);
        window.addEventListener(
            'model.geolocation.current.position.changed',
            onModelGeolocationCurrentPositionChanged
        );
    }

    /**
     * Shows the navigation page.
     *
     * @memberof app.ui.navigation
     * @public
     */
    uiWorkout.show = function show() {
        tau.changePage('#' + PAGE_ID);
    };

    /**
     * Initializes the ui navigation module.
     *
     * @memberof app.ui.navigation
     * @public
     */
    uiWorkout.init = function init() {
        commonCalculations = app.common.calculations;
        modelGeolocation = app.model.geolocation;
        page = document.getElementById(PAGE_ID);
        bindEvents();
    };

})(window.app);
