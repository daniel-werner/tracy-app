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

(function defineAppUiLogin(app) {
    'use strict';

    /**
     * Page Id.
     *
     * @private
     * @const {string}
     */
    var PAGE_ID = 'login-popup',

        /**
         * Page element.
         *
         * @private
         * @type {HTMLElement}
         */
        page = null,

        /**
         * Sync model module reference.
         *
         * @private
         * @type {object}
         */
        modelSync = null,

        /**
         * UI navigation module reference.
         *
         * @private
         * @type {object}
         */
        uiLogin = null,

        /**
         * Popup shown when the workout is paused
         *
         * @type {HTMLElement}
         */
        loginPopup = null,
        loginPopupLoginButton = null,
        loginPopupCancelButton = null;

    // create namespace for the module
    app.ui = app.ui || {};
    app.ui.login = app.ui.login || {};
    uiLogin = app.ui.login;


    /**
     * Updates UI.
     *
     * @private
     */
    function updateUI(data) {
    }

    /**
     * Handles pagebeforeshow event.
     *
     * @private
     */
    function onPageBeforeShow() {
    }

    /**
     * Handles model.workout.updateui event.
     *
     * Updates workout page ui
     * according to the values provided by the workout model module.
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
            tau.closePopup(page);
            e.stopPropagation();
        }
    }


    /**
     * Handles click event on pause popup finish button click.
     *
     * @private
     */
    function onLoginPopupLoginBtnClick() {
        var email = loginPopup.querySelector('#login-email').value,
            password = loginPopup.querySelector('#login-password').value;

        console.log(email);

        modelSync.login(email, password)
    }

    /**
     * Handles click event on pause popup resume button click.
     *
     * @private
     */
    function onLoginPopupCancelBtnClick() {
    }

    /**
     * Registers event listeners.
     *
     * @private
     */
    function bindEvents() {
        page.addEventListener('pagebeforeshow', onPageBeforeShow);
        document.addEventListener('tizenhwkey', onHwKeyEvent);


        loginPopupLoginButton.addEventListener('click', onLoginPopupLoginBtnClick);
        loginPopupCancelButton.addEventListener('click', onLoginPopupCancelBtnClick);

    }

    /**
     * Shows the navigation page.
     *
     * @memberof app.ui.navigation
     * @public
     */
    uiLogin.show = function show() {
        tau.changePage('#' + PAGE_ID);
    };

    /**
     * Initializes the ui navigation module.
     *
     * @memberof app.ui.navigation
     * @public
     */
    uiLogin.init = function init() {
        modelSync = app.model.sync;
        page = document.getElementById(PAGE_ID);
        loginPopup = document.getElementById('login-popup');
        loginPopupLoginButton = loginPopup.querySelector('#login-popup-login-btn');
        loginPopupCancelButton = loginPopup.querySelector('#login-popup-cancel-btn');

        tau.openPopup(loginPopup);

        bindEvents();
    };

})(window.app);
