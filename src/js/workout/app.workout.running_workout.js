import {BaseWorkout, WORKOUT_TYPE_RUNNING} from "./app.workout.base_workout";

// Milliseconds per meter to minutes per kilometer
const MSEC_PER_METER_TO_MIN_PER_KM = 60;// Minute = 60 * 1000  millisecond / kilometer = 1000 meters


class RunningWorkout extends BaseWorkout {
    constructor() {
        super();

        this.type = WORKOUT_TYPE_RUNNING;
    }

    /**
     *
     * @param {Point} pointA
     * @param {Point} pointB
     * @returns {number}
     */
    calculatePace(pointA, pointB) {
        let distance = this.calculateDistance(pointA, pointB),
            timeDiff = pointB.time - pointA.time,
            pace = ( timeDiff / distance ) / MSEC_PER_METER_TO_MIN_PER_KM;

        return pace;
    }
}

 export {RunningWorkout};