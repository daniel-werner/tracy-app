import {BaseWorkout, WORKOUT_TYPE_CYCLING} from "./app.workout.base_workout";

class CyclingWorkout extends BaseWorkout {
    constructor() {
        super();

        this.type = WORKOUT_TYPE_CYCLING;
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

export {CyclingWorkout}