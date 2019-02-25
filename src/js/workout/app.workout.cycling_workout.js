import {BaseWorkout, WORKOUT_TYPE_CYCLING} from "./app.workout.base_workout";

// Milliseconds per meter to kilometers per hour
const MPS_TO_KMH = 3600; // hour = 3600 * 1000 milliseconds / kilometer = 1000 meters

class CyclingWorkout extends BaseWorkout {
    constructor() {
        super();

        this.type = WORKOUT_TYPE_CYCLING;

        this._speed = 0;
    }

    /**
     *
     * @param {Point} pointA
     * @param {Point} pointB
     * @returns {number}
     */
    _calculateSpeed(pointA, pointB) {
        let distance = this._calculateDistance(pointA, pointB),
            timeDiff = pointB.time - pointA.time;

        if( distance > 1){
            this._speed = timeDiff ? MPS_TO_KMH * distance / timeDiff : 0;
        }

        return this._speed;
    }

    /**
     * Calculate the params such as distance, speed, etc
     *
     * @param {Point} pointA
     * @param {Point} pointB
     */
    calculate(pointA, pointB){
        this._calculateSpeed(pointA, pointB);
    }

    /**
     *
     * @returns {number}
     */
    get speed(){
        return this._speed;
    }
}

export {CyclingWorkout}