;(function(root){
    var BatteryDriverAndroid = function(){
    };

    var proto = new BatteryDriver();

    proto.bind = function(){
        var _this = this;

        document.addEventListener("deviceready", function(){
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

    BatteryDriverAndroid.prototype = proto;
    root.BatteryDriverAndroid = BatteryDriverAndroid;
})(window);
