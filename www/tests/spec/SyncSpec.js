describe("Sync", function () {
    var app = window.app || {};

    var env = jasmine.getEnv();
    env.randomizeTests(false);

    app.model.sync.init(
        'http://tracy.test/api/login',
        'http://tracy.test/api/workouts'
    );

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

        var platform = Platform.get(),
            driverFactory = new DriverFactory(platform);

        this.modelWorkout.init(driverFactory.buildHarwareDriver(platform));

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

    it('should login', function (done) {
        window.addEventListener(
            'model.sync.login.successful',
            function(e){
                e.stopPropagation();
                expect(e.detail.hasOwnProperty('token')).toBeTruthy();
                expect(e.detail.token.length > 0).toBeTruthy();
                done();
            });

        this.modelSync.login( 'demo@email.com', '123123' );
    });

    it('should login with token and upload workouts', function (done) {
        var _this = this;


        window.addEventListener(
            'model.sync.upload.successful',
            function(e){
                e.stopPropagation();
                expect(e.detail).toBeTruthy();
                done();
            });

        this.runWorkout(function(){
            _this.modelWorkout.save();
            _this.modelSync.sync();
        });
    });

});
