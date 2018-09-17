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

    function getToken(){
        return localStorage.getItem('token');
    }

    function createAuthHeader(){
        var token = getToken(),
            header = false;

        console.log(token);
        if(token.length){
            header = {
                key: 'Authorization',
                value: 'Bearer ' + token,
            };
        }

        return header;
    }

    /**
     * Initializes the workout model module.
     *
     * @memberof app.model.workout
     * @public
     * @fires model.sync.login.successful
     * @fires model.sync.login.failed
     */
    modelSync.init = function init() {
        bindEvents();
    };

    modelSync.login = function login() {
        var client = new XMLHttpRequest(),
            localStorage = window.localStorage;

        var data = "email=demo@email.com&password=123123";

        client.open('post', 'http://tracy.test/api/login', true);
        client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        client.send(data); /* Send to server */

        /* Check the response status */
        client.onreadystatechange = function() {
            if (client.readyState == 4 && client.status == 200) {
                //console.log(client.response);

                localStorage.setItem('token', JSON.parse(client.response));
                commonEvents.dispatchEvent('model.sync.login.successful', { token: client.response });
            }
            else{
                commonEvents.dispatchEvent('model.sync.login.failed');
            }
        };
    };

    modelSync.uploadWorkouts = function(){
        var client = new XMLHttpRequest(),
            authHeaders = createAuthHeader(),
            workouts = null;


        window.addEventListener(
            'model.workout.getlist.successful',
            function(e){
                workouts = e.detail;

                /* Check the response status */
                client.onreadystatechange = function() {
                    if (client.readyState == 4 && client.status == 200) {
                        commonEvents.dispatchEvent('model.sync.upload.successful');
                        modelWorkout.clear();
                    }
                    else{
                    }
                };

                client.open('POST', 'http://tracy.test/api/workouts', true);

                var payload = JSON.stringify({ data: workouts });

                client.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                client.setRequestHeader(authHeaders.key, authHeaders.value);
                client.send(payload); /* Send to server */
            },
            'model.workout.getlist.failed',
            function(e){
                commonEvents.dispatchEvent('model.sync.upload.failed');
            }
        );

        modelWorkout.getItemsToSync();
    }

})(window.app);
