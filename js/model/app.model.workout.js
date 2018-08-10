/*global window, console, geolocation, setTimeout*/

/**
 * Application geolocation model module.
 * It is responsible for providing information about user location.
 *
 * @module app.model.geolocation
 * @requires {@link app.common.events}
 * @requires {@link app.common.calculations}
 * @namespace app.model.geolocation
 * @memberof app.model
 */

// make sure that "app" namespace is created
window.app = window.app || {};

(function defineAppModelWorkout(app) {
    'use strict';

    /**
     * Geolocation checking interval (in milliseconds).
     *
     * @private
     * @const {number}
     */

       var type = null,

        /**
         * Workout model module reference.
         *
         * @private
         * @type {object}
         */
        modelWorkout = null,

        /**
         * Geolocation model module reference.
         *
         * @private
         * @type {object}
         */
        modelGeolocation = app.model.geolocation,

        /**
         * Common events module reference.
         *
         * @private
         * @type {object}
         */
        commonEvents = app.common.events,

        /**
         * Common calculations module reference.
         *
         * @private
         * @type {object}
         */
        commonCalculations = app.common.calculations,


        /**
         * Started flag.
         *
         * @private
         * @type boolean
         */
        active = false,

        /**
         * Count the segments (pause and resume).
         *
         * @private
         * @type int
         */
        segmentIndex = 0,

        /**
         * Workout data.
         *
         * @private
         * @type {object}
         */
        workout = {
            type: null,
            status: null,
            points: [{
                segment_index: 0,
                lat: null,
                lng: null,
                heart_rate: null,
                elevation: null,
                time: null
            }]
        };

    // create namespace for the module
    app.model = app.model || {};
    app.model.workout = app.model.workout || {};
    modelWorkout = app.model.workout;

    modelWorkout.WORKOUT_TYPE_RUNNING = 1;
    modelWorkout.WORKOUT_TYPE_CYCLING = 2;

    modelWorkout.WORKOUT_STATUS_UNSAVED = 0;
    modelWorkout.WORKOUT_STATUS_SAVED = 1;
    modelWorkout.WORKOUT_STATUS_SYNCED = 2;


    /**
     * Handles model.geolocation.position.available event.
     *
     * @private
     */
    function onModelGeolocationPositionAvailable() {
        var currentPosition = modelGeolocation.getCurrentPosition();
        if(active){
            workout.points.push({
                segment_index: segmentIndex,
                lat: currentPosition.coords.latitude,
                lng: currentPosition.coords.longitude,
                heart_rate: null,
                elevation: currentPosition.coords.altitude,
                time: currentPosition.timestamp
            });

        }
    }

    /**
     * Registers event listeners.
     *
     * @private
     */
    function bindEvents() {
        window.addEventListener(
            'model.geolocation.position.available',
            onModelGeolocationPositionAvailable
        );
    }
    /**
     * Initializes the workout model module.
     *
     * @memberof app.model.workout
     * @public
     * @fires model.geolocation.available
     * @fires model.geolocation.unavailable
     */
    modelWorkout.init = function init() {
        bindEvents();
    };

    modelWorkout.start = function start(type) {
        segmentIndex = 0;
        workout.type = type;
        workout.status = modelWorkout.WORKOUT_STATUS_UNSAVED;
        workout.points = [];

        active = true;
    };

    /**
     *
     * @fires model.workout.paused
     */
    modelWorkout.togglePause = function togglePause(){
        if(!active){
            segmentIndex++;
        }

        active ^= true;
        commonEvents.dispatchEvent('model.workout.paused');
    };

    modelWorkout.save = function save(){
        workout.status = modelWorkout.WORKOUT_STATUS_SAVED;

        var tizenDB = {};
        var objStore = null;

        var indexedDB = window.webkitIndexedDB || window.indexedDB;

        var request = indexedDB.open('TizenIndexedDB');

        request.onsuccess = function(e) {
            tizenDB.db = e.target.result;

            var trans = tizenDB.db.transaction('tizenStore', 'readwrite');
            var tizenStore = trans.objectStore('tizenStore');

            console.log(workout);
            var request = tizenStore.put(workout);
            request.onsuccess = function(e) {
                tizenDB.db.objectStoreId = request.result;
                commonEvents.dispatchEvent('model.workout.save.successful', true);
            };
            request.onerror = function(e) {
                commonEvents.dispatchEvent('model.workout.save.failed');
            };
        };

        request.onupgradeneeded = function(e) {
            tizenDB.db = e.target.result;
            try {
                 objStore = tizenDB.db.createObjectStore('tizenStore', {autoIncrement: true});

            }
            catch(e){
                console.error(e);
            }
        };



        return false;
    };

    modelWorkout.getWorkout = function getWorkout() {
        return workout;
    }

})(window.app);
