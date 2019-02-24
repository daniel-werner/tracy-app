
import { CyclingWorkout } from '../../../../src/js/workout/app.workout.cycling_workout.js';

describe("Workout", function () {
    it('should calculate distance', function () {
        let pointA = new Point(
                0,
                45.8849114,
                19.2545559,
                0,
                0,
                1551018055000
            ),

            pointB = new Point(
                0,
                45.8856601,
                19.2553514,
                0,
                0,
                1551018060000
            ),

            expectedDistance = 103.54782304590353,
            workout = new CyclingWorkout(),
            distance = workout.calculateDistance(pointA, pointB);

        expect(distance).toEqual(expectedDistance);
    });

    it('should calculate speed', function(){
        let pointA = new Point(
                0,
                45.8849114,
                19.2545559,
                0,
                0,
                1551018055000
            ),

            pointB = new Point(
                0,
                45.8856601,
                19.2553514,
                0,
                0,
                1551018060000
            ),

            expectedSpeed = 18.638608148262635,
            workout = new CyclingWorkout(),
            speed = workout.calculateSpeed(pointA, pointB);

        expect(speed).toEqual(expectedSpeed);


    })
});
