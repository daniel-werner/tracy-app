;(function(root){
    /**
     *
     * @param {int} segmentIndex
     * @param {number} lat
     * @param {number} lng
     * @param {int} heartRate
     * @param {number} elevation
     * @param {int} time
     * @constructor
     */
    var Point = function(segmentIndex, lat, lng, heartRate, elevation, time){
        this.segment_index = segmentIndex;
        this.lat = lat;
        this.lng = lng;
        this.heart_rate = heartRate;
        this.elevation = elevation;
        this.time = time;
    };

    Point.prototype = {
        init: function(){

        }
    };

    root.Point = Point;
})(window);
