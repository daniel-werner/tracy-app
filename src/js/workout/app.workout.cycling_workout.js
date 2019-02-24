import {BaseWorkout, WORKOUT_TYPE_CYCLING} from "./app.workout.base_workout";

// Milliseconds per meter to kilometers per hour
const MPS_TO_KMH = 3600; // hour = 3600 * 1000 milliseconds / kilometer = 1000 meters

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
        let distance = this.calculateDistance(pointA, pointB),
            timeDiff = pointB.time - pointA.time,
            speed = timeDiff ? MPS_TO_KMH * distance / timeDiff : 0;

        return speed;
    }
}

export {CyclingWorkout}