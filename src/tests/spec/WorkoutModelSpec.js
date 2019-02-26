import {Platform} from "../../js/model/drivers/app.drivers.platform";

describe("Workout model", function () {
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

        xmlhttp.open("GET", "tests/data/455.json", true);
        xmlhttp.send();

        this.modelWorkout = app.model.workout;
        this.modelGeolocation = app.model.geolocation;

        var platform = Platform.get(),
            driverFactory = new DriverFactory(platform);

        this.modelWorkout.init(driverFactory.buildHardwareDriver(platform));

        window.addEventListener(
            'model.workout.dbready',
            function(e){
                _this.modelWorkout.clear();
            });

        this.runWorkout = function(doneCallback){
            navigator.geolocation.delay = 1;
            navigator.geolocation.repeat = false;
            navigator.geolocation.waypoints = this.waypoints;

            this.modelGeolocation.init();
            this.modelWorkout.start(this.modelWorkout.WORKOUT_TYPE_RUNNING);

            setTimeout( function(){
                    _this.modelWorkout.togglePause();
                    doneCallback();
                },
                300);
        };

    });

    it('should start and pause workout', function (done) {
        var _this = this;

        expect(typeof this.modelWorkout === 'object').toBeTruthy();

        var pauseListener = function(e){
            var workout = _this.modelWorkout.getWorkout();
            expect(workout.points.length).toEqual(6);
            window.removeEventListener('model.workout.paused', pauseListener);
        };

        window.addEventListener(
            'model.workout.paused',
            pauseListener
        );

        this.runWorkout(function(){
            _this.modelWorkout.togglePause();
            done();
        });
    });

    it('should save the workout', function (done) {
        var _this = this;

        window.addEventListener(
            'model.workout.save.successful',
            function(e){
                e.stopPropagation();
                expect(e.detail).toBeTruthy();
                done();
            },
            'model.workout.save.failed',
            function(e){
                e.stopPropagation();
                expect(e.detail).toBeTruthy();
                done();
            }
        );

        this.runWorkout(function(){
            _this.modelWorkout.save();
        });
    });

    it('should load saved workouts', function (done) {
        var _this = this;

        window.addEventListener(
            'model.workout.getlist.successful',
            function(e){
                e.stopPropagation();
                expect(e.detail.length == 1).toBeTruthy();
                expect(e.detail[0].status == _this.modelWorkout.WORKOUT_STATUS_SAVED).toBeTruthy();
                done();
            },
            'model.workout.getlist.failed',
            function(e){
                e.stopPropagation();
                done();
            }
        );

        window.addEventListener(
            'model.workout.save.successful',
            function(e){
                e.stopPropagation();
                _this.modelWorkout.getList(_this.modelWorkout.WORKOUT_STATUS_SAVED);
            },
            'model.workout.save.failed',
            function(e){
                e.stopPropagation();
                expect(e.detail).toBeTruthy();
                done();
            }
        );

        this.runWorkout(function(){
            // _this.modelSync.sync = function(){};
            _this.modelWorkout.save();
        });
    });

    //it('should start the workout and update UI', function (done) {
    //    var _this = this;
    //
    //    navigator.geolocation.delay = 1000;
    //    navigator.geolocation.repeat = false;
    //    navigator.geolocation.waypoints = this.waypoints;
    //
    //    this.modelGeolocation.init();
    //    expect(typeof this.modelWorkout === 'object').toBeTruthy();
    //    this.modelWorkout.start(this.modelWorkout.WORKOUT_TYPE_RUNNING);
    //
    //    window.addEventListener(
    //        'model.workout.updateui',
    //        function(e){
    //            e.stopPropagation();
    //            var data = e.detail;
    //            console.log(data);
    //        }
    //    );
    //
    //    setTimeout( function(){
    //            done();
    //        },
    //        4000);
    //});

});
