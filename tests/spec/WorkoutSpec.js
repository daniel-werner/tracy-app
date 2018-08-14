describe("Workout", function () {
    var app = window.app || {};

    var env = jasmine.getEnv();
    env.randomizeTests(false);

    beforeEach(function (done) {
        var xmlhttp = new XMLHttpRequest(),
            _this = this;

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                _this.waypoints = JSON.parse(this.responseText);
                done();
            }
        };

        xmlhttp.open("GET", "tests/spec/455.json", true);
        xmlhttp.send();

        this.modelWorkout = app.model.workout;
        this.modelGeolocation = app.model.geolocation;
        this.modelSync = app.model.sync;

        this.modelSync.init();
        this.modelWorkout.init();

    });


    it('should start and pause workout', function (done) {
        var _this = this;

        navigator.geolocation.delay = 1;
        navigator.geolocation.repeat = false;
        navigator.geolocation.waypoints = this.waypoints;

        expect(typeof this.modelWorkout === 'object').toBeTruthy();
        this.modelGeolocation.init();

        this.modelWorkout.start(this.modelWorkout.WORKOUT_TYPE_RUNNING);

        window.addEventListener(
            'model.workout.paused',
            function(){
                var workout = _this.modelWorkout.getWorkout();
                expect(workout.points.length).toEqual(421);
            }
        );

        setTimeout( function(){
            _this.modelWorkout.togglePause();
            done();
        },
        3000);
    });

    it('should save the workout', function (done) {
        window.addEventListener(
            'model.workout.save.successful',
            function(e){
                expect(e.detail).toBeTruthy();
                done();
            },
            'model.workout.save.failed',
            function(e){
                expect(e.detail).toBeTruthy();
                done();
            }
        );

        this.modelWorkout.save();

    });

    it('should start the workout and update UI', function (done) {
        var _this = this;

        navigator.geolocation.delay = 1000;
        navigator.geolocation.repeat = false;
        navigator.geolocation.waypoints = this.waypoints;

        this.modelGeolocation.init();
        expect(typeof this.modelWorkout === 'object').toBeTruthy();
        this.modelWorkout.start(this.modelWorkout.WORKOUT_TYPE_RUNNING);

        window.addEventListener(
            'model.workout.updateui',
            function(e){
                var data = e.detail;
                console.log(data);
            }
        );

        setTimeout( function(){
                done();
            },
            4000);
    });

    it('should login', function () {
        this.modelSync.login();
    });

});
