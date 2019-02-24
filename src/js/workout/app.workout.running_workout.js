import {BaseWorkout} from "./app.workout.base_workout";

class RunningWorkout extends BaseWorkout {
    constructor() {
        super();

        this.type = super.WORKOUT_TYPE_RUNNING;
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