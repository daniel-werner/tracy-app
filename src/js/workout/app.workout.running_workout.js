require('./app.workout.base_workout');

;(function (root) {

    var RunningWorkout = function () {
        BaseWorkout.call(this);

        this.type = BaseWorkout.WORKOUT_TYPE_RUNNING;
    };

    var proto = new BaseWorkout();

    RunningWorkout.prototype = proto;

    root.RunningWorkout = RunningWorkout;
})(window);
