import {HardwareDriver} from "../app.drivers.hardware";

class HardwareDriverTizen extends HardwareDriver {
    constructor() {
        super();
    }

    bind() {

    }

    isHeartRateAvailable() {
        return true;
    }

    backgroundRunEnable() {
        tizen.power.request("CPU", "CPU_AWAKE");
        tizen.power.request('SCREEN', 'SCREEN_NORMAL');
    }

    backgroundRunDisable() {
        tizen.power.release("CPU");
        tizen.power.release('SCREEN');
    }

    exit() {
        try {
            tizen.application.getCurrentApplication().exit();
        } catch (error) {
            console.warn('Application exit failed.', error.message);
        }
    };

    _storeHeartRate(heartRate){
        this._heartRate = heartRate;
    }

    startHeartRateSensor(){
        let _this = this;

        tizen.humanactivitymonitor.start('HRM', function(hrmInfo){
            _this._storeHeartRate(hrmInfo.heartRate);
        });

    }

    stopHeartRateSensor(){
        tizen.humanactivitymonitor.stop('HRM');
    }
}

export {HardwareDriverTizen}
