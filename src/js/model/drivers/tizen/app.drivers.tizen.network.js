require('../app.drivers.network')

;(function(root){
    var NetworkDriverTizen = function(){

    };

    var proto = new NetworkDriver();

    proto.bind = function(){
        var _this = this,
            systeminfo = null;

        if (typeof tizen === 'object' && typeof tizen.systeminfo === 'object') {
            var systeminfo = tizen.systeminfo;
        } else {
            console.warn('tizen.systeminfo not available');
        }

        try {
            systeminfo.getPropertyValue(
                'NETWORK',
                function(network){
                    _this.onGetNetworkTypeSuccess(network);
                },
                function onGetPropertyValueError(error) {
                    console.warn('Couldn\'t get network type value.', error);
                }
            );
        } catch (error) {
            console.warn('Couldn\'t get network type value.', error);
        }

        try {
            systeminfo.addPropertyValueChangeListener(
                'NETWORK',
            function(network){
                _this.onNetworkTypeChange(network);
            }
        );
        } catch (error) {
            console.warn('Network change listener was not set.', error);
        }

    };

    proto.onNetworkTypeChange = function(network) {
        this.networkType = network.networkType;
        this.commonEvents.dispatchEvent('model.network.type.changed');
    };

    proto.onGetNetworkTypeSuccess = function(network) {
        this.networkType = network.networkType;
        this.commonEvents.dispatchEvent('model.network.initialized');
    };

    NetworkDriverTizen.prototype = proto;
    root.NetworkDriverTizen = NetworkDriverTizen;
})(window);
