require('../app.drivers.battery')

;(function(root){
    var BatteryDriverTizen = function(){

    };

    var proto = new BatteryDriver();

    proto.bind = function(){
        var _this = this,
            systeminfo = null;

        if (typeof tizen === 'object' && typeof tizen.systeminfo === 'object') {
            var systeminfo = tizen.systeminfo;
        } else {
            console.warn('tizen.systeminfo not available');
        }
        try {
            systeminfo.addPropertyValueChangeListener(
                'BATTERY',
                function change(battery) {
                    _this.level = battery.level;

                    if (!battery.isCharging && battery.level < _this.LOW_BATTERY) {
                        _this.commonEvents.dispatchEvent('model.battery.low');
                    }
                },
                null,
                function errorCallback(error) {
                    console.warn('Battery state listener was not set.', error);
                }
            );
        } catch (error) {
            console.warn('Battery state listener was not set.', error);
        }
    }

    BatteryDriverTizen.prototype = proto;
    root.BatteryDriverTizen = BatteryDriverTizen;
})(window);
