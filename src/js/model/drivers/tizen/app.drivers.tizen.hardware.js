import {HardwareDriver} from "../app.drivers.hardware";

class HardwareDriverTizen extends HardwareDriver {
    constructor() {
        super();
        this.commonEvents = window.app.common.events;
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
}

export {HardwareDriverTizen}
