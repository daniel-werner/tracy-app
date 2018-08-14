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
        commonEvents = app.common.events;


    // create namespace for the module
    app.model = app.model || {};
    app.model.sync = app.model.sync || {};
    modelSync = app.model.sync;



    /**
     * Registers event listeners.
     *
     * @private
     */
    function bindEvents() {

    }
    /**
     * Initializes the workout model module.
     *
     * @memberof app.model.workout
     * @public
     * @fires model.geolocation.available
     * @fires model.geolocation.unavailable
     */
    modelSync.init = function init() {
        bindEvents();
    };

    modelSync.login = function login() {
        var client = new XMLHttpRequest();


        var data = "grant_type=password&client_id=2&client_secret=T4M5JKmWo7slbGltUhjTUfh5oyHArv5km8EX0Hnu&username=demo@email.com&password=123123&scope=*";

        client.open('post', 'http://dev.tracy.wernerd.info/oauth/token', true);
        client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        client.send(data); /* Send to server */

        /* Check the response status */
        client.onreadystatechange = function() {
            if (client.readyState == 4 && client.status == 200) {
                console.log(client.statusText);
            }
        };
    };

})(window.app);
