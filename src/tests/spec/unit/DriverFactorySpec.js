import {PLATFORMS} from "../../../js/model/drivers/app.drivers.platform";
import {HardwareDriverTizen} from "../../../js/model/drivers/tizen/app.drivers.tizen.hardware";
import {HardwareDriverAndroid} from "../../../js/model/drivers/android/app.drivers.android.hardware";
import {BatteryDriverTizen} from "../../../js/model/drivers/tizen/app.drivers.tizen.battery";
import {BatteryDriverAndroid} from "../../../js/model/drivers/android/app.drivers.android.battery";
import {NetworkDriverTizen} from "../../../js/model/drivers/tizen/app.drivers.tizen.network";
import {NetworkDriverAndroid} from "../../../js/model/drivers/android/app.drivers.android.network";

import {DriverFactory} from "../../../js/model/drivers/app.driver.factory";


describe("DriverFactory", function () {
    it('should create drivers for tizen', function () {

        var platform = PLATFORMS.TIZEN,
            driverFactory = new DriverFactory(platform),
            batteryDriver = driverFactory.buildBatteryDriver(platform),
            networkDriver = driverFactory.buildNetworkDriver(platform),
            hardwareDriver = driverFactory.buildHardwareDriver(platform);

        expect(batteryDriver instanceof BatteryDriverTizen).toBeTruthy();
        expect(networkDriver instanceof NetworkDriverTizen).toBeTruthy();
        expect(hardwareDriver instanceof HardwareDriverTizen).toBeTruthy();
    });

    it('should create drivers for android', function () {

        var platform = PLATFORMS.ANDROID,
            driverFactory = new DriverFactory(platform),
            batteryDriver = driverFactory.buildBatteryDriver(platform),
            networkDriver = driverFactory.buildNetworkDriver(platform),
            hardwareDriver = driverFactory.buildHardwareDriver(platform);

        expect(batteryDriver instanceof BatteryDriverAndroid).toBeTruthy();
        expect(networkDriver instanceof NetworkDriverAndroid).toBeTruthy();
        expect(hardwareDriver instanceof HardwareDriverAndroid).toBeTruthy();
    });
});
