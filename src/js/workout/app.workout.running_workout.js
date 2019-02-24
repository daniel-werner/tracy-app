import {BaseWorkout, WORKOUT_TYPE_RUNNING} from "./app.workout.base_workout";

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
    calculateSpeed(pointA, pointB) {
        let distance = this.calculateDistance(pointA, pointB);

        return distance.raw;
    }
}

 export {RunningWorkout};