import {CyclingWorkout} from '../../../../src/js/workout/app.workout.cycling_workout.js';
import {RunningWorkout} from "../../../../src/js/workout/app.workout.running_workout";

describe("Workout", function () {
    it('should calculate distance', function () {
        let timeA = 1551018055000,
            timeB = timeA + 20000, // 20 sec
            pointA = new Point(
            0,
            45.8849114,
            19.2545559,
            0,
            0,
                timeA
            ),

            pointB = new Point(
                0,
                45.8856601,
                19.2553514,
                0,
                0,
                timeB
            ),

            expectedDistance = 103.54782304590353,
            workout = new CyclingWorkout(),
            distance = workout.calculateDistance(pointA, pointB);

        expect(distance).toEqual(expectedDistance);
    });

    it('should calculate speed', function () {
        let timeA = 1551018055000,
            timeB = timeA + 20000, // 20 sec
            pointA = new Point(
            0,
            45.8849114,
            19.2545559,
            0,
            0,
            timeA
            ),

            pointB = new Point(
                0,
                45.8856601,
                19.2553514,
                0,
                0,
                timeB
            ),

            expectedSpeed = 18.638608148262635,
            workout = new CyclingWorkout(),
            speed = workout.calculateSpeed(pointA, pointB);

        expect(speed).toEqual(expectedSpeed);
    })

    it('should calculate pace', function () {
        let timeA = 1551018055000,
            timeB = timeA + 40000, // 40 sec
            pointA = new Point(
            0,
            45.8849114,
            19.2545559,
            0,
            0,
            timeA
            ),

            pointB = new Point(
                0,
                45.8856601,
                19.2553514,
                0,
                0,
                timeB
            ),

            expectedPace = 6.438248985409653,
            workout = new RunningWorkout(),
            pace = workout.calculatePace(pointA, pointB);

        expect(pace).toEqual(expectedPace);
    })
});
