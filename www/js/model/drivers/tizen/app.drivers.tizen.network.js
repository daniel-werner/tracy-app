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
                this.onGetNetworkTypeSuccess,
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
                this.onNetworkTypeChange
            );
        } catch (error) {
            console.warn('Network change listener was not set.', error);
        }

    }

    proto.onNetworkTypeChange = function(network) {
        this.networkType = network.networkType;
        commonEvents.dispatchEvent('model.network.type.changed');
    }
    proto.onGetNetworkTypeSuccess = function(network) {
        this.networkType = network.networkType;
        commonEvents.dispatchEvent('model.network.initialized');
    }

    NetworkDriverTizen.prototype = proto;
    root.NetworkDriverTizen = NetworkDriverTizen;
})(window);