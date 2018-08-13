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
        totalDistance = 0,

        workoutStatus = null,
        workoutSpeed = null,
        workoutDistance = null,
        workoutHr = null,
        workoutAltitude = null,

        pausePopup = null,
        pausePopupFinishButton = null,
        pausePopupResumeButton = null,

        savePopup = null,
        savePopupDiscardButton = null,
        savePopupSaveButton = null;

    // create namespace for the module
    app.ui = app.ui || {};
    app.ui.workout = app.ui.workout || {};
    uiWorkout = app.ui.workout;


    /**
     * Updates UI.
     *
     * @private
     */
    function updateUI(data) {
        //console.log(data);
        workoutSpeed.innerText = Math.round( data.speed * 10 ) / 10;
        workoutDistance.innerText = Math.round( data.distance * 10 ) / 10;
        workoutHr.innerText = Math.round(data.heartRate);
        workoutAltitude.innerText = Math.round(data.altitude);
    }

    /**
     * Handles pagebeforeshow event.
     *
     * @private
     */
    function onPageBeforeShow() {
        modelWorkout.start();
        updateUI(
            {
                speed: 0,
                distance: 0,
                heartRate: 0,
                altitude: 0
            }
        );

        workoutStatus.style.display = 'none';
    }

    /**
     * Handles model.geolocation.current.position.changed event.
     *
     * Updates navigation page ui
     * according to the values provided by the geolocation model module.
     *
     * @private
     */
    function onModelWorkoutUpdateUI(e) {
        if (tau.activePage.id === PAGE_ID) {
            updateUI(e.detail);
        }
    }

    /**
     * Handles tizenhwkey event.
     *
     * Closes application if the back device button is pressed.
     *
     * @private
     * @param {Event} e
     */
    function onHwKeyEvent(e) {
        if (e.keyName === 'back') {
            modelWorkout.togglePause();
            e.stopPropagation();
        }
    }

    /**
     * Handles model.geolocation.current.position.changed event.
     *
     * Updates navigation page ui
     * according to the values provided by the geolocation model module.
     *
     * @private
     */
    function onModelWorkoutPaused(e) {
        if (tau.activePage.id === PAGE_ID) {
            workoutStatus.style.display = 'inline';
            tau.openPopup(pausePopup);
        }
    }

    /**
     * Handles model.geolocation.current.position.changed event.
     *
     * Updates navigation page ui
     * according to the values provided by the geolocation model module.
     *
     * @private
     */
    function onModelWorkoutResumed(e) {
        if (tau.activePage.id === PAGE_ID) {
            workoutStatus.style.display = 'none';
            tau.closePopup(pausePopup);
        }
    }

    /**
     * Handles click event on close popup yes button click.
     *
     * @private
     */
    function onPausePopupFinishBtnClick() {
        tau.openPopup(savePopup);
        //modelWorkout.save();
    }

    /**
     * Handles click event on close popup yes button click.
     *
     * @private
     */
    function onPausePopupResumeBtnClick() {
        modelWorkout.togglePause();
    }

    /**
     * Handles click event on close popup yes button click.
     *
     * @private
     */
    function onSavePopupSaveBtnClick() {
        modelWorkout.save();
        tau.changePage('#main');
    }

    /**
     * Handles click event on close popup yes button click.
     *
     * @private
     */
    function onSavePopupDiscardBtnClick() {
        tau.changePage('#main');
    }

    /**
     * Registers event listeners.
     *
     * @private
     */
    function bindEvents() {
        page.addEventListener('pagebeforeshow', onPageBeforeShow);
        document.addEventListener('tizenhwkey', onHwKeyEvent);
        window.addEventListener(
            'model.workout.updateui',
            onModelWorkoutUpdateUI
        );

        window.addEventListener(
            'model.workout.paused',
            onModelWorkoutPaused
        );

        window.addEventListener(
            'model.workout.resumed',
            onModelWorkoutResumed
        );

        pausePopupFinishButton.addEventListener('click', onPausePopupFinishBtnClick);
        pausePopupResumeButton.addEventListener('click', onPausePopupResumeBtnClick);

        savePopupSaveButton.addEventListener('click', onSavePopupSaveBtnClick);
        savePopupDiscardButton.addEventListener('click', onSavePopupDiscardBtnClick);

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
        modelWorkout = app.model.workout;
        page = document.getElementById(PAGE_ID);
        workoutStatus = page.querySelector('.workout-status');
        workoutSpeed = page.querySelector('.workout-speed');
        workoutDistance = page.querySelector('.workout-distance');
        workoutHr = page.querySelector('.workout-hr');
        workoutAltitude = page.querySelector('.workout-altitude');
        pausePopup = document.getElementById('pause-popup'),
        pausePopupFinishButton = pausePopup.querySelector('#pause-popup-yes-btn'),
        pausePopupResumeButton = pausePopup.querySelector('#pause-popup-no-btn'),
        savePopup = document.getElementById('save-popup'),
        savePopupSaveButton = savePopup.querySelector('#save-popup-yes-btn'),
        savePopupDiscardButton = savePopup.querySelector('#save-popup-no-btn');

        // Mocked geolocation data
        //var xmlhttp = new XMLHttpRequest();
        //
        //xmlhttp.onreadystatechange = function () {
        //    if (this.readyState == 4 && this.status == 200) {
        //        navigator.geolocation.waypoints = JSON.parse(this.responseText);
        //    }
        //};
        //
        //xmlhttp.open("GET", "tests/spec/455.json", true);
        //xmlhttp.send();

        //navigator.geolocation.delay = 1000;
        //navigator.geolocation.repeat = false;


        bindEvents();
    };

})(window.app);
