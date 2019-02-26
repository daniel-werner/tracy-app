require('../app.drivers.hardware')

;(function (root) {
    var HardwareDriverAndroid = function () {
        this.commonEvents = window.app.common.events;
    };

    var proto = new HardwareDriver();

    proto.bind = function () {
        cordova.plugins.backgroundMode.on('activate', function () {
            console.log('activate background mode');
            cordova.plugins.backgroundMode.disableWebViewOptimizations();
        });
    };
    proto.isHeartRateAvailable = function () {
        return false;
    };
    proto.backgroundRunEnable = function () {
        cordova.plugins.backgroundMode.enable();
    };
    proto.backgroundRunDisable = function () {
        cordova.plugins.backgroundMode.disable();
    };
    proto.exit = function(){
        try {
            navigator.app.exitApp();
        } catch (error) {
            console.warn('Application exit failed.', error.message);
        }
    };

    HardwareDriverAndroid.prototype = proto;
    root.HardwareDriverAndroid = HardwareDriverAndroid;
})(window);
