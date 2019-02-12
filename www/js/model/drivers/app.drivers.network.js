;(function(root){
    var NetworkDriver = function(){
        this.commonEvents = window.app.common.events;
        this.networkType = 'NONE';
    };

    var NETWORKS = ['2G', '2.5G', '3G', '4G', 'WIFI', 'ETHERNET', 'UNKNOWN'];

    NetworkDriver.prototype = {
        init: function(){
            this.bind();
        },
        bind: function(){

        },
        isNetworkAvailable: function () {
            return NETWORKS.indexOf(this.networkType) !== -1;
        },
        getNetworkType: function () {
            return this.networkType;
        }
    };

    root.NetworkDriver = NetworkDriver;
})(window);
