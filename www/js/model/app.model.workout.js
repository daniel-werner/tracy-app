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

        // Milliseconds per meter to kilometers per hour
        MPS_TO_KMH = 3600, // hour = 3600 * 1000 milliseconds / kilometer = 1000 meters

        // Milliseconds per meter to minutes per kilometer
        MSEC_PER_METER_TO_MIN_PER_KM = 60,// Minute = 60 * 1000  millisecond / kilometer = 1000 meters

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
            distance: 0,
            points: [{
                segment_index: 0,
                lat: null,
                lng: null,
                heart_rate: null,
                elevation: null,
                time: null
            }]
        },

        workoutDB = null,
        isDBready = false;

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
     * @fires model.workout.updateui
     */
    function updateUI(){
        if( workout.points.length > 1) {
            var currentPosition = workout.points[workout.points.length - 1],
                lastPosition = workout.points[workout.points.length - 2],
                distance = commonCalculations.calculateDistance(
                    {latitude: lastPosition.lat, longitude: lastPosition.lng},
                    {latitude: currentPosition.lat, longitude: currentPosition.lng}
                );

            if( distance.raw > 0.1 ){
                var timediff = currentPosition.time - lastPosition.time,
                speed = timediff ? MPS_TO_KMH * distance.raw / timediff : 0,
                pace = ( timediff / distance.raw ) / MSEC_PER_METER_TO_MIN_PER_KM,
                heartRate = currentPosition.heart_rate,
                altitude = currentPosition.elevation;

                workout.distance += distance.raw;

                var data = {
                    distance: workout.distance / 1000,
                    speed: speed,
                    pace: pace,
                    heartRate: heartRate,
                    altitude: altitude
                };


                commonEvents.dispatchEvent('model.workout.updateui', data);
            }

        }

    }

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

            updateUI();
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

    function initDatabase() {
        workoutDB = new IDBStore({
            dbVersion: 1,
            storeName: 'workouts',
            keyPath: 'id',
            autoIncrement: true,
            onStoreReady: function(){
                commonEvents.dispatchEvent('model.workout.dbready');
                isDBready = true;

            }
        });
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
        initDatabase();
    };

    modelWorkout.start = function start(type) {
        segmentIndex = 0;
        workout.type = type;
        workout.status = modelWorkout.WORKOUT_STATUS_UNSAVED;
        workout.distance = 0;
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
            commonEvents.dispatchEvent('model.workout.resumed');
        }
        else{
            commonEvents.dispatchEvent('model.workout.paused');
        }

        active ^= true;

    };

    modelWorkout.save = function save(){
        workout.status = modelWorkout.WORKOUT_STATUS_SAVED;

        var onsuccess = function(id){
            console.log('Successfully inserted! insertId is: ' + id);
            commonEvents.dispatchEvent('model.workout.save.successful', true);
        };
        var onerror = function(error){
            console.log('Workout save failed!', error);
            commonEvents.dispatchEvent('model.workout.save.failed');
        };

        workoutDB.put(workout, onsuccess, onerror);

        return false;
    };

    modelWorkout.clear = function clear(){
        var onsuccess = function () {
            console.log('Database celared');
            commonEvents.dispatchEvent('model.workout.clear.successful');
        };
        var onerror = function (error) {
            console.log('Database clear failed!', error);
            commonEvents.dispatchEvent('model.workout.clear.failed');
        };

        workoutDB.clear(onsuccess, onerror);
    };

    modelWorkout.getList = function getList( status ) {
        var onsuccess = function (data) {
            data = data.filter(function(item){
                return item.status == status;
            });

            commonEvents.dispatchEvent('model.workout.getlist.successful', data);
        };
        var onerror = function (error) {
            console.log('Workout save failed!', error);
            commonEvents.dispatchEvent('model.workout.getlist.failed');
        };

        workoutDB.getAll(onsuccess, onerror);
    };

    modelWorkout.getItemsToSync = function getItemsToSync( ) {
        return modelWorkout.getList( modelWorkout.WORKOUT_STATUS_SAVED );
    };

    modelWorkout.getWorkout = function getWorkout() {
        return workout;
    };

})(window.app);