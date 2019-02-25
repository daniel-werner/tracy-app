describe("DriverFactory", function () {
    it('should create drivers for tizen', function () {

        var platform = Platform.PLATFORM_TIZEN,
            driverFactory = new DriverFactory(platform),
            batteryDriver = driverFactory.buildBatteryDriver(platform),
            networkDriver = driverFactory.buildNetworkDriver(platform),
            hardwareDriver = driverFactory.buildHardwareDriver(platform);

            expect( batteryDriver instanceof BatteryDriverTizen ).toBeTruthy();
            expect( networkDriver instanceof NetworkDriverTizen ).toBeTruthy();
            expect( hardwareDriver instanceof HardwareDriverTizen ).toBeTruthy();
    });

    it('should create drivers for android', function () {

        var platform = Platform.PLATFORM_ANDROID,
            driverFactory = new DriverFactory(platform),
            batteryDriver = driverFactory.buildBatteryDriver(platform),
            networkDriver = driverFactory.buildNetworkDriver(platform),
            hardwareDriver = driverFactory.buildHardwareDriver(platform);

            expect( batteryDriver instanceof BatteryDriverAndroid ).toBeTruthy();
            expect( networkDriver instanceof NetworkDriverAndroid ).toBeTruthy();
            expect( hardwareDriver instanceof HardwareDriverAndroid ).toBeTruthy();
    });
});
