;(function(root){
    var HardwareDriverTizen = function(){
        this.commonEvents = window.app.common.events;
    };

    var proto = new HardwareDriver();

        proto.bind = function(){

        };
        proto.isHeartRateAvailable = function () {
            return false;
        };
        proto.backgroundRunEnable = function () {

        };
        proto.backgroundRunDisable = function () {

        };

    HardwareDriverTizen.prototype = proto;
    root.HardwareDriverTizen = HardwareDriverTizen;
})(window);
