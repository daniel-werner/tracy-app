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
        /**
         *
         * @returns {boolean}
         */
        isHeartRateAvailable: function () {
            return false;
        },
        backgroundRunEnable: function () {

        },
        backgroundRunDisable: function () {

        },
        exit: function () {

        }
    };

    root.HardwareDriver = HardwareDriver;
})(window);
