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
    var WORKOUT_TYPE_RUNNING = 1,
        WORKOUT_TYPE_CYCLING = 2,

        type = null,

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
        commonCalculations = app.common.calculations;


    // create namespace for the module
    app.model = app.model || {};
    app.model.workout = app.model.workout || {};
    modelWorkout = app.model.workout;


    /**
     * Handles model.geolocation.position.available event.
     *
     * @private
     */
    function onModelGeolocationPositionAvailable() {
        console.log(modelGeolocation.getCurrentPosition());
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

})(window.app);
