import {BatteryDriver} from "../app.drivers.battery";

class BatteryDriverAndroid extends BatteryDriver {
    constructor() {
        super();
    }

    bind() {
        var _this = this;

        document.addEventListener("deviceready", function () {
            window.addEventListener("batterystatus", onBatteryStatus, false);

            function onBatteryStatus(status) {
                _this.level = status.level;
            }

            window.addEventListener("batterylow", onBatteryLow, false);

            function onBatteryLow(status) {
                _this.commonEvents.dispatchEvent('model.battery.low');
            }
        }, false);
    }
}

export {BatteryDriverAndroid}