window.addEventListener('load', function(){
    navigator.geolocation.delay = 1000;
    navigator.geolocation.repeat = true;

    var startTime = 1551018055000;

    navigator.geolocation.waypoints = [
        {coords : {latitude : 45.8849114, longitude : 19.2545559, accuracy: 65 }, timestamp: startTime},
        {coords : {latitude : 45.8856601, longitude : 19.2553514, accuracy: 65 }, timestamp: startTime + 30000},
        {coords : {latitude : 45.8849114, longitude : 19.2545559, accuracy: 65 }, timestamp: startTime + 55000},
        {coords : {latitude : 45.8856601, longitude : 19.2553514, accuracy: 65 }, timestamp: startTime + 75000},
        {coords : {latitude : 45.8849114, longitude : 19.2545559, accuracy: 65 }, timestamp: startTime + 90000},
    ];
});
