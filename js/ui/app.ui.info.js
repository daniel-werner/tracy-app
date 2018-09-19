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
 * Application info popup module.
 * It is responsible showing info popup.
 *
 * @module app.ui.info
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
    var PAGE_ID = 'info-popup',

        /**
         * Page element.
         *
         * @private
         * @type {HTMLElement}
         */
        page = null,

        /**
         * UI navigation module reference.
         *
         * @private
         * @type {object}
         */
        uiInfo = null,

        /**
         * Popup shown when the workout is paused
         *
         * @type {HTMLElement}
         */
        infoPopup = null,
        infoPopupContent = null;

    // create namespace for the module
    app.ui = app.ui || {};
    app.ui.info = app.ui.info || {};
    uiInfo = app.ui.info;


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
    function onInfoShowHandler(e) {
        infoPopupContent.innerHTML = e.detail;
        tau.openPopup(infoPopup);
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
     * Registers event listeners.
     *
     * @private
     */
    function bindEvents() {
        page.addEventListener('pagebeforeshow', onPageBeforeShow);
        document.addEventListener('tizenhwkey', onHwKeyEvent);


        window.addEventListener('ui.info.show', onInfoShowHandler);

    }

    /**
     * Shows the navigation page.
     *
     * @memberof app.ui.navigation
     * @public
     */
    uiInfo.show = function show() {
        tau.changePage('#' + PAGE_ID);
    };

    /**
     * Initializes the ui navigation module.
     *
     * @memberof app.ui.navigation
     * @public
     */
    uiInfo.init = function init() {
        page = document.getElementById(PAGE_ID);
        infoPopup = document.getElementById('info-popup');
        infoPopupContent = document.getElementById('info-content');

        bindEvents();
    };

})(window.app);
