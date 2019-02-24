window.addEventListener('load', function(){
    var xmlhttp = new XMLHttpRequest(),
        _this = this;

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            navigator.geolocation.waypoints = JSON.parse(this.responseText);
        }
    };

    xmlhttp.open("GET", "tests/data/455.json", true);
    xmlhttp.send();

    navigator.geolocation.delay = 1000;
    navigator.geolocation.repeat = true;

});
