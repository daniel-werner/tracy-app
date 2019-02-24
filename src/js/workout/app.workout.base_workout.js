require('./app.workout.point');
require('../common/app.common.calculations');

var WORKOUT_STATUS_UNSAVED = 0,
    WORKOUT_STATUS_SAVED = 1,

    WORKOUT_STATE_STOPPED = 0,
    WORKOUT_STATE_RUNNING = 1,
    WORKOUT_STATE_PAUSED = 2,
    WORKOUT_STATE_AUTOPAUSED = 3;

export const WORKOUT_TYPE_RUNNING = 1;
export const WORKOUT_TYPE_CYCLING = 2;

/**
 * @class BaseWorkout
 * @constructor
 */
class BaseWorkout {

    constructor() {
        this.type = null;
        this.status = WORKOUT_STATUS_UNSAVED;

        /** @member {Point[]} **/
        this._points = [];
        this._distance = 0;

        this._segmentIndex = 0;
        this._state = WORKOUT_STATE_STOPPED;
    }

    init() {
    }

    start() {
        this._state = WORKOUT_STATE_RUNNING;
    }

    pause() {
        this._state = WORKOUT_STATE_PAUSED;
        this._segmentIndex++;
    }

    save() {
        this.status = WORKOUT_STATUS_SAVED;
    }

    /**
     *
     * @returns {boolean}
     */
    isActive() {
        return this._state === WORKOUT_STATE_RUNNING;
    }

    /**
     *
     * @param {Point} point
     */
    addPoint(point) {
        point.segment_index = this._segmentIndex;

        this._points.push(point);

        let points = this._getCalculationPoints();

        if(points){
            this.calculate(points.pointA, points.pointB);
        }

    }

    /**
     *
     * @private
     *
     * @returns {?{pointA: Point, pointB: Point}}
     */
    _getCalculationPoints(){
        let calculationPoints = null;

        if(this._points.length >= 2){
            calculationPoints =  {
                pointA: this._points[this._points.length - 2],
                pointB: this._points[this._points.length - 1]
            }
        }

        return calculationPoints;

    }

    /**
     *
     * @param {Point} pointA
     * @param {Point} pointB
     * @returns {number}
     */
    _calculateDistance(pointA, pointB) {
        let distance = window.app.common.calculations.calculateDistance(
            {latitude: pointA.lat, longitude: pointA.lng},
            {latitude: pointB.lat, longitude: pointB.lng}
        );

        this._distance = distance.raw;

        return this._distance;
    }

    /**
     * Calculate the params such as distance, speed, etc
     *
     * @param {Point} pointA
     * @param {Point} pointB
     */
    calculate(pointA, pointB){

    }



    /**
     *
     * @returns {number}
     */
    get speed(){
        return 0;
    }

    /**
     *
     * @returns {number}
     */
    get distance(){
        return this._distance;
    }

    /**
     *
     * @param {number} distance
     */
    set distance(distance){
        this._distance = distance;
    }

    /**
     *
     * @returns {Point[]}
     */
    get points(){
        return this._points;
    }

    /**
     *
     * @returns {{type: int, status: int, points: Point[]}}
     */
    toObject() {
        return {
            type: this.type,
            status: this.status,
            points: this._points
        }
    }
};

export {BaseWorkout};
