require('./app.workout.base_workout');

;(function (root) {

    var CyclingWorkout = function () {
        BaseWorkout.call(this);

        this.type = BaseWorkout.WORKOUT_TYPE_CYCLING;
    };

    var proto = new BaseWorkout();

    CyclingWorkout.prototype = proto;

    root.CyclingWorkout = CyclingWorkout;
})(window);
