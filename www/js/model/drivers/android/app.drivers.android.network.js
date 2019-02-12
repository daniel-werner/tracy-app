;(function(root){
    var NetworkDriverAndroid = function(){

    };

    var proto = new NetworkDriver();

    proto.bind = function(){
        var _this = this;

        document.addEventListener("offline",
        function(){
            _this.onNetworkTypeChange()
        }, false);
        document.addEventListener("online",
        function(){
            _this.onNetworkTypeChange()
        }, false);
    };

    proto.isNetworkAvailable = function () {
        return navigator.connection.type !== Connection.NONE;
    };

    proto.onNetworkTypeChange = function(network) {
        this.networkType = navigator.connection.type;
        this.commonEvents.dispatchEvent('model.network.type.changed');
    };

    proto.onGetNetworkTypeSuccess = function(network) {
        this.networkType = navigator.connection.type;
        this.commonEvents.dispatchEvent('model.network.initialized');
    };

    NetworkDriverAndroid.prototype = proto;
    root.NetworkDriverAndroid = NetworkDriverAndroid;
})(window);
