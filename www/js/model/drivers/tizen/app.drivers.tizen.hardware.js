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
            tizen.power.request("CPU", "CPU_AWAKE");
            tizen.power.request('SCREEN', 'SCREEN_NORMAL');
        };
        proto.backgroundRunDisable = function () {
            tizen.power.release("CPU");
            tizen.power.release('SCREEN');
        };

    HardwareDriverTizen.prototype = proto;
    root.HardwareDriverTizen = HardwareDriverTizen;
})(window);