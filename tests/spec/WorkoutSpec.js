describe("Workout", function() {
  var app = window.app || {};

  beforeEach(function() {

  });


  it('Start workout', function(){
    var modelGeolocation = app.model.geolocation,
        modelWorkout = app.model.workout,
        commonEvents = app.common.events;


    navigator.geolocation.waypoints = [
      {
        coords: {
          latitude: 52.5168,
          longitude: 13.3889,
          accuracy: 1500,
          altitude: 100
        },
        timestamp: new Date().getTime()
      }, {
        coords: {
          latitude: 53.5162,
          longitude: 13.3890,
          accuracy: 1334,
          altitude: 110
        },
        timestamp: new Date().getTime()
      }
    ];

    modelGeolocation.init();
    modelWorkout.init();

    expect(typeof modelWorkout === 'object').toBeTruthy();

  })

});
