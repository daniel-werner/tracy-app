import {HardwareDriver} from "../app.drivers.hardware";

class HardwareDriverAndroid extends HardwareDriver {
    constructor() {
        super();
        this.commonEvents = window.app.common.events;
    }

    bind() {
        cordova.plugins.backgroundMode.on('activate', function () {
            console.log('activate background mode');
            cordova.plugins.backgroundMode.disableWebViewOptimizations();
        });
    }

    isHeartRateAvailable() {
        return false;
    }

    backgroundRunEnable() {
        cordova.plugins.backgroundMode.enable();
    }

    backgroundRunDisable() {
        cordova.plugins.backgroundMode.disable();
    }

    exit() {
        try {
            navigator.app.exitApp();
        } catch (error) {
            console.warn('Application exit failed.', error.message);
        }
    }
}

export {HardwareDriverAndroid}