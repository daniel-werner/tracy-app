describe("Sync", function () {
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
                3000);
        };

    });

    it('should login', function (done) {
        window.addEventListener(
            'model.sync.login.successful',
            function(e){
                //console.log(e.detail);
                expect(e.detail.hasOwnProperty('token')).toBeTruthy();
                expect(e.detail.token.length > 0).toBeTruthy();
                done();
            });

        this.modelSync.login();
    });

    it('should login with token and upload workouts', function (done) {
        var _this = this;


        window.addEventListener(
            'model.sync.upload.successful',
            function(e){
                expect(e.detail).toBeTruthy();
                done();
            });

        this.runWorkout(function(){
            _this.modelWorkout.save();
            _this.modelSync.uploadWorkouts();
        });
    });

});
