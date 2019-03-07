class HardwareDriver {
    constructor() {
        this.commonEvents = window.app.common.events;
        this._heartRate = 0;
    }

    init() {
        this.bind();
    }

    bind() {

    }

    /**
     *
     * @returns {boolean}
     */
    isHeartRateAvailable() {
        return false;
    }

    backgroundRunEnable() {

    }

    backgroundRunDisable() {

    }

    exit() {

    }

    get heartRate(){
        return this._heartRate;
    }

    startHeartRateSensor(){

    }

    stopHeartRateSensor(){

    }
}

export {HardwareDriver}

