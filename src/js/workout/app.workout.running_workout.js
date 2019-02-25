import {BaseWorkout, WORKOUT_TYPE_RUNNING} from "./app.workout.base_workout";

// Milliseconds per meter to minutes per kilometer
const MSEC_PER_METER_TO_MIN_PER_KM = 60;// Minute = 60 * 1000  millisecond / kilometer = 1000 meters


class RunningWorkout extends BaseWorkout {
    constructor() {
        super();

        this.type = WORKOUT_TYPE_RUNNING;

        this._pace = 0;
    }

    /**
     *
     * @param {Point} pointA
     * @param {Point} pointB
     * @returns {number}
     */
    _calculatePace(pointA, pointB) {
        let distance = this._calculateDistance(pointA, pointB),
            timeDiff = pointB.time - pointA.time;

        if (distance > 1) {
            this._pace = (timeDiff / distance) / MSEC_PER_METER_TO_MIN_PER_KM;
        }

        return this._pace;
    }

    /**
     * Calculate the params such as distance, speed, etc
     *
     * @param {Point} pointA
     * @param {Point} pointB
     */
    calculate(pointA, pointB) {
        this._calculatePace(pointA, pointB);
    }

    /**
     *
     * @returns {string}
     */
    get speedUnit() {
        return 'min/km';
    }

    /**
     *
     * @returns {string}
     */
    get speedLabel() {
        return 'Pace'
    }

    /**
     *
     * @returns {number}
     */
    get speed() {
        return this._pace;
    }
}

export {RunningWorkout};