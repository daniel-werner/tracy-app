;(function (root) {

    var WORKOUT_STATUS_UNSAVED = 0,
        WORKOUT_STATUS_SAVED = 1,

        WORKOUT_STATE_STOPPED = 0,
        WORKOUT_STATE_RUNNING = 1,
        WORKOUT_STATE_PAUSED = 2,
        WORKOUT_STATE_AUTOPAUSED = 3;

    /**
     * @class BaseWorkout
     * @constructor
     */
    var BaseWorkout = function () {
        this.type = null;
        this.status = WORKOUT_STATUS_UNSAVED;
        this.distance = 0;
        /** @member {Point[]} **/
        this.points = [];

        this._segmentIndex = 0;
        this._state = WORKOUT_STATE_STOPPED;
    };

    BaseWorkout.WORKOUT_TYPE_RUNNING = 1;
    BaseWorkout.WORKOUT_TYPE_CYCLING = 2;

    // Milliseconds per meter to kilometers per hour
    BaseWorkout.MPS_TO_KMH = 3600; // hour = 3600 * 1000 milliseconds / kilometer = 1000 meters

    // Milliseconds per meter to minutes per kilometer
    BaseWorkout.MSEC_PER_METER_TO_MIN_PER_KM = 60;// Minute = 60 * 1000  millisecond / kilometer = 1000 meters

    BaseWorkout.prototype = {
        init: function () {
        },
        start: function () {
            this._state = WORKOUT_STATE_RUNNING;
        },
        pause: function () {
            this._state = WORKOUT_STATE_PAUSED;
            this._segmentIndex++;
        },
        save: function () {
            this.status = WORKOUT_STATUS_SAVED;
        },
        /**
         *
         * @returns {boolean}
         */
        isActive: function(){
            return this._state === WORKOUT_STATE_RUNNING;
        },
        /**
         *
         * @param {Point} point
         */
        addPoint: function(point){
            point.segment_index = this._segmentIndex;

            this.points.push(point);
        },
        /**
         *
         * @returns {{type: int, status: int, points: Point[]}}
         */
        serialize: function(){
            return {
                type: this.type,
                status: this.status,
                points: this.points
            }
        }
    };

    root.BaseWorkout = BaseWorkout;
})(window);
