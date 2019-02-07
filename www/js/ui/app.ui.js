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

/*global window, document, tau*/

/**
 * Application ui module.
 * It is responsible for the application ui initialization.
 *
 * @module app.ui
 * @requires {@link app.model.geolocation}
 * @requires {@link app.model.network}
 * @requires {@link app.ui.waiting}
 * @requires {@link app.ui.destination}
 * @requires {@link app.ui.navigation}
 * @requires {@link app.ui.finish}
 * @namespace app.ui
 * @memberof app
 */

// make sure that "app" namespace is created
window.app = window.app || {};

(function defineAppUi(app) {
    'use strict';

    /**
     * Google maps API key.
     *
     * @private
     * @const {string}
     */
    var API_KEY = '',

        /**
         * UI module reference.
         *
         * @private
         * @type {object}
         */
        ui = null,

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

        /**
         * Compass model module reference.
         *
         * @private
         * @type {object}
         */
        modelWorkout = null,

        /**
         * Compass model module reference.
         *
         * @private
         * @type {object}
         */
        modelSync = null,

        /**
         * UI waiting module reference.
         *
         * @private
         * @type {object}
         */
        uiIntro = null,

        /**
         * UI destination module reference.
         *
         * @private
         * @type {object}
         */
        uiMain = null,

        /**
         * UI navigation module reference.
         *
         * @private
         * @type {object}
         */
        uiWorkout = null,

        /**
         * UI login reference.
         *
         * @private
         * @type {object}
         */
        uiLogin = null,

        /**
         * UI info reference.
         *
         * @private
         * @type {object}
         */
        uiInfo = null,

        /**
         * Close popup element.
         *
         * @private
         * @type {HTMLElement}
         */
        closePopup = null,

        /**
         * Close popup yes button element.
         *
         * @private
         * @type {HTMLElement}
         */
        closePopupYesBtn = null,

        /**
         * Gps status indicator.
         *
         * @private
         * @type {HTMLElement}
         */
        gpsStatusIndicators = null,

        /**
         * Network status indicator.
         *
         * @private
         * @type {HTMLElement}
         */
        networkStatusIndicators = null,

        commonEvents = null;

    // create namespace for the module
    app.ui = app.ui || {};
    ui = app.ui;

    /**
     * Handles model.network.initialized event.
     *
     * @private
     */
    function onModelNetworkInitialized() {
        onModelNetworkTypeChanged();
    }

    /**
     * Handles model.network.type.changed event.
     *
     * @private
     */
    function onModelNetworkTypeChanged() {
        if( modelNetwork.isNetworkAvailable() ) {
            for (var i = 0; i < networkStatusIndicators.length; ++i) {
                var networkStatusIndicator = networkStatusIndicators[i];
                if (!networkStatusIndicator.classList.contains('network-status-active')) {
                    networkStatusIndicator.classList.add('network-status-active');
                }
                else {
                    if (networkStatusIndicator.classList.contains('network-status-active')) {
                        networkStatusIndicator.classList.remove('network-status-active');
                    }
                }
            };
        }
    }

    /**
     * Handles model.geolocation.position.available event.
     *
     * @private
     */
    function onModelGeolocationPositionAvailable() {
        for (var i = 0; i < gpsStatusIndicators.length; ++i) {
            var gpsStatusIndicator = gpsStatusIndicators[i];
            if (!gpsStatusIndicator.classList.contains('gps-status-active')) {
                gpsStatusIndicator.classList.add('gps-status-active');
            }
        };
    }

    /**
     * Handles model.geolocation.position.unavailable
     * and model.geolocation.position.lost events.
     *
     * @private
     */
    function onModelGeolocationPositionUnAvailable() {
        for (var i = 0; i < gpsStatusIndicators.length; ++i) {
            var gpsStatusIndicator = gpsStatusIndicators[i];
            if (gpsStatusIndicator.classList.contains('gps-status-active')) {
                gpsStatusIndicator.classList.remove('gps-status-active');
            }
        }
    }

    /**
     * Handles click event on close popup yes button click.
     *
     * @private
     */
    function onClosePopupYesBtnClick() {
        app.exit();
    }

    /**
     * Registers event listeners.
     *
     * @private
     */
    function bindEvents() {
        closePopupYesBtn.addEventListener('click', onClosePopupYesBtnClick);
        window.addEventListener(
            'model.network.initialized',
            onModelNetworkInitialized
        );
        window.addEventListener(
            'model.network.type.changed',
            onModelNetworkTypeChanged
        );

        window.addEventListener(
            'model.geolocation.position.available',
            onModelGeolocationPositionAvailable
        );

        window.addEventListener(
            'model.geolocation.position.unavailable',
            onModelGeolocationPositionUnAvailable
        );

        window.addEventListener(
            'model.geolocation.position.lost',
            onModelGeolocationPositionUnAvailable
        );
    }

    /**
     * Toggles close popup.
     *
     * @memberof app.ui
     * @public
     */
    ui.toggleClosePopup = function toggleClosePopup() {
        if (closePopup.classList.contains('ui-popup-active')) {
            tau.closePopup(closePopup);
        } else {
            tau.openPopup(closePopup);
        }
    };

    /**
     * Initializes the ui module.
     *
     * @memberof app.ui
     * @public
     */
    ui.init = function init() {
        modelGeolocation = app.model.geolocation;
        modelNetwork = app.model.network;
        modelWorkout = app.model.workout;
        modelSync = app.model.sync;
        uiIntro = app.ui.intro;
        uiMain = app.ui.main;
        uiWorkout = app.ui.workout;
        uiLogin = app.ui.login;
        uiInfo = app.ui.info;
        commonEvents = app.common.events;
        closePopup = document.getElementById('close-popup');
        closePopupYesBtn = closePopup.querySelector('#close-popup-yes-btn');
        gpsStatusIndicators = document.querySelectorAll('.gps-status');
        networkStatusIndicators = document.querySelectorAll('.network-status');
        bindEvents();
        uiInfo.init();
        uiIntro.init();
        uiMain.init();
        uiWorkout.init();
        uiLogin.init();
        modelNetwork.init();
        modelGeolocation.init();
        modelWorkout.init();
        modelSync.init();

        window.addEventListener(
            'model.workout.dbready',
            function(e){
                modelSync.uploadWorkouts();
            });

        window.addEventListener(
            'model.workout.save.successful',
            function(e){
                modelSync.uploadWorkouts();
            });

        window.addEventListener(
            'model.sync.upload.successful',
            function(e){
                commonEvents.dispatchEvent( 'ui.info.show', 'Workouts synced successfully!');
            });

        window.addEventListener(
            'model.sync.upload.failed',
            function(e){
                commonEvents.dispatchEvent( 'ui.info.show', 'Workout sync failed!');
            });



    };

})(window.app);
