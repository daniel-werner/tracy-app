import {PLATFORMS} from "./app.drivers.platform";

import {HardwareDriver} from "./app.drivers.hardware";
import {HardwareDriverTizen} from "./tizen/app.drivers.tizen.hardware";
import {HardwareDriverAndroid} from "./android/app.drivers.android.hardware";

import {BatteryDriver} from "./app.drivers.battery";
import {BatteryDriverTizen} from "./tizen/app.drivers.tizen.battery";
import {BatteryDriverAndroid} from "./android/app.drivers.android.battery";

import {NetworkDriver} from "./app.drivers.network";
import {NetworkDriverTizen} from "./tizen/app.drivers.tizen.network";
import {NetworkDriverAndroid} from "./android/app.drivers.android.network";

class DriverFactory {
    constructor(platform) {
        this.platform = platform;
    }

    buildNetworkDriver() {
        var networkDriver = new NetworkDriver();

        switch (this.platform) {
            case PLATFORMS.TIZEN:
                networkDriver = new NetworkDriverTizen();
                break;
            case PLATFORMS.ANDROID:
                networkDriver = new NetworkDriverAndroid();
                break;
        }

        return networkDriver;
    }


    buildBatteryDriver() {
        var batteryDriver = new BatteryDriver();

        switch (this.platform) {
            case PLATFORMS.TIZEN:
                batteryDriver = new BatteryDriverTizen();
                break;
            case PLATFORMS.ANDROID:
                batteryDriver = new BatteryDriverAndroid();
                break;
        }

        return batteryDriver;
    }

    buildHardwareDriver() {
        var hardwareDriver = new HardwareDriver();

        switch (this.platform) {
            case PLATFORMS.TIZEN:
                hardwareDriver = new HardwareDriverTizen();
                break;
            case PLATFORMS.ANDROID:
                hardwareDriver = new HardwareDriverAndroid();
                break;
        }

        return hardwareDriver;
    }
}

export {DriverFactory}