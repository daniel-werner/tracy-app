;(function(root){
    var HardwareDriverAndroid = function(){
        this.commonEvents = window.app.common.events;
    };

    var proto = new HardwareDriver();

        proto.bind = function(){
            document.addEventListener("deviceready", function(){
                cordova.plugins.backgroundMode.on('activate', function() {
                   cordova.plugins.backgroundMode.disableWebViewOptimizations();
                });

                window.addEventListener(
                    'model.workout.updateui',
                    function(e){
                        var distance = e.detail.distance;

                        if(cordova.plugins.backgroundMode.isActive()){
                            cordova.plugins.backgroundMode.configure({
                                text: 'Workout active, distance: ' + Math.round(distance * 100) / 100 + ' km'
                            });
                        }
                    }
                );
            });
        };
        proto.isHeartRateAvailable = function () {
            return false;
        };
        proto.backgroundRunEnable = function () {
            cordova.plugins.backgroundMode.enable();
        };
        proto.backgroundRunDisable = function () {
            cordova.plugins.backgroundMode.disable();
        };

    HardwareDriverAndroid.prototype = proto;
    root.HardwareDriverAndroid = HardwareDriverAndroid;
})(window);
