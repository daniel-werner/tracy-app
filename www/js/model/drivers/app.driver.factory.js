;(function(root){
    var DriverFactory = function(platform){
        this.platform = platform;
    };

    DriverFactory.prototype = {
        buildNetworkDriver: function(){
            var networkDriver = new NetworkDriver();

            switch(this.platform){
                case Platform.PLATFORM_TIZEN:
                    networkDriver = new NetworkDriverTizen();
                    break;
                case Platform.PLATFORM_ANDROID:
                    networkDriver = new NetworkDriverAndroid();
                    break;
            }

            return networkDriver;
        },
        buildBatteryDriver: function(){
            var batteryDriver = new BatteryDriver();

            switch(this.platform){
                case Platform.PLATFORM_TIZEN:
                    batteryDriver = new BatteryDriverTizen();
                    break;
                case Platform.PLATFORM_ANDROID:
                    batteryDriver = new BatteryDriverAndroid();
                    break;
            }

            return batteryDriver;
        },
        buildHarwareDriver: function(){
            var hardwareDriver = new HardwareDriver();

            switch(this.platform){
                case Platform.PLATFORM_TIZEN:
                    hardwareDriver = new HardwareDriverTizen();
                    break;
                case Platform.PLATFORM_ANDROID:
                    hardwareDriver = new HardwareDriverAndroid();
                    break;
            }

            return hardwareDriver;
        }
    };

    root.DriverFactory = DriverFactory;
})(window);
