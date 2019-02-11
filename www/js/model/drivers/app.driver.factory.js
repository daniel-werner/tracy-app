;(function(root){
    var DriverFactory = function(platform){
        this.platform = platform;
    };

    DriverFactory.prototype = {
        buildNetworkDriver: function(){
            var networkDriver = null;

            switch(this.platform){
                case Platform.PLATTFORM_TIZEN:
                break;
                case Platform.PLATTFORM_ANDROID:
                break;
            }

            return networkDriver;
        },
        buildBatteryDriver: function(){
            var batteryDriver = new BatteryDriver();

            switch(this.platform){
                case Platform.PLATTFORM_TIZEN:
                    batteryDriver = new BatteryDriverTizen();
                    break;
                case Platform.PLATFORM_ANDROID:
                    batteryDriver = new BatteryDriverAndroid();
                    break;
            }

            return batteryDriver;
        }
    }

    root.DriverFactory = DriverFactory;
})(window);
