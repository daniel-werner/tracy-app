;(function(root){
    var HardwareDriver = function(){
        this.commonEvents = window.app.common.events;
    };

    HardwareDriver.prototype = {
        init: function(){
            this.bind();
        },
        bind: function(){

        },
        isHeartRateAvailable: function () {
            return false;
        },
        backgroundRunEnable: function () {

        },
        backgroundRunDisable: function () {

        }
    };

    root.HardwareDriver = HardwareDriver;
})(window);
