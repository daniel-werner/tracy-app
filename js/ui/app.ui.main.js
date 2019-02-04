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

/*global window, tau, google, document*/

/**
 * Application destination page module.
 * It is responsible for destination page layout and logic.
 *
 * @module app.ui.destinaton
 * @requires {@link app.model.geolocation}
 * @requires {@link app.model.network}
 * @requires {@link app.ui.navigation}
 * @requires {@link app.ui.waiting}
 * @namespace app.ui.destinaton
 * @memberof app.ui
 */

// make sure that "app" namespace is created
window.app = window.app || {};

(function defineAppUiMain(app) {
    'use strict';

    /**
     * Page Id.
     *
     * @private
     * @const {string}
     */
    var PAGE_ID = 'main',

         /**
         * Page element.
         *
         * @private
         * @type {HTMLElement}
         */
        page = null,

        /**
         * Geolocation model module reference.
         *
         * @private
         * @type {object}
         */
        modelGeolocation = null,

        /**
         * Network model module reference.
         *
         * @private
         * @type {object}
         */
        modelNetwork = null,

        modelWorkout = null,

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
        uiMain = null,

        workoutStartCyclingButton = null,
        workoutStartRunningButton = null;


    // create namespace for the module
    app.ui = app.ui || {};
    app.ui.main = app.ui.main || {};
    uiMain = app.ui.main;



    /**
     * Handles pagebeforeshow event.
     *
     * @private
     */
    function onPageBeforeShow() {

    }

    function onWorkoutStartCycling() {
        modelWorkout.start(modelWorkout.WORKOUT_TYPE_CYCLING);
        tau.changePage('#workout');
    }

    function onWorkoutStartRunning() {
        modelWorkout.start(modelWorkout.WORKOUT_TYPE_RUNNING);
        tau.changePage('#workout');
    }
    /**
     * Registers event listeners.
     *
     * @private
     */
    function bindEvents() {
        page.addEventListener('pagebeforeshow', onPageBeforeShow);

        workoutStartCyclingButton.addEventListener('click', onWorkoutStartCycling);
        workoutStartRunningButton.addEventListener('click', onWorkoutStartRunning);
    }

    /**
     * Shows the destination page.
     *
     * @memberof app.ui.destination
     * @public
     * @param {object} data
     */
    uiMain.show = function show(data) {
        tau.changePage('#' + PAGE_ID);
    };

    /**
     * Initializes the ui destination module.
     *
     * @memberof app.ui.destination
     * @public
     */
    uiMain.init = function init() {
        modelGeolocation = app.model.geolocation;
        modelNetwork = app.model.network;
        modelWorkout = app.model.workout;
        uiWaiting = app.ui.waiting;
        page = document.getElementById(PAGE_ID);
        workoutStartCyclingButton = page.querySelector('.workout-start-cycling');
        workoutStartRunningButton = page.querySelector('.workout-start-running');
        bindEvents();
    };

})(window.app);
