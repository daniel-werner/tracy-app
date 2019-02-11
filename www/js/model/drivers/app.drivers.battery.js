;(function(root){
    var BatteryDriver = function(){
        this.level = null;
        this.commonEvents = window.app.common.events;
    };

    BatteryDriver.prototype = {
        init: function(){
            console.log(this);
            this.bind();
        },
        bind: function(){

        }
    }

    root.BatteryDriver = BatteryDriver;
})(window);
