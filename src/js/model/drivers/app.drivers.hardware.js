class HardwareDriver {
    constructor() {
        this.commonEvents = window.app.common.events;
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
}

export {HardwareDriver}

