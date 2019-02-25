require('../app.drivers.hardware')

;(function(root){
    var HardwareDriverTizen = function(){
        this.commonEvents = window.app.common.events;
    };

    var proto = new HardwareDriver();

        proto.bind = function(){

        };
        proto.isHeartRateAvailable = function () {
            return true;
        };
        proto.backgroundRunEnable = function () {
            tizen.power.request("CPU", "CPU_AWAKE");
            tizen.power.request('SCREEN', 'SCREEN_NORMAL');
        };
        proto.backgroundRunDisable = function () {
            tizen.power.release("CPU");
            tizen.power.release('SCREEN');
        };
        proto.exit = function(){
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (error) {
                console.warn('Application exit failed.', error.message);
            }
        };

    HardwareDriverTizen.prototype = proto;
    root.HardwareDriverTizen = HardwareDriverTizen;
})(window);
