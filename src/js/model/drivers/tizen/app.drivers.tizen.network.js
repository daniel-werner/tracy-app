import {NetworkDriver} from "../app.drivers.network";

class NetworkDriverTizen extends NetworkDriver {
    constructor() {
        super();
    }

    bind() {
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
                function (network) {
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
                function (network) {
                    _this.onNetworkTypeChange(network);
                }
            );
        } catch (error) {
            console.warn('Network change listener was not set.', error);
        }

    }

    onNetworkTypeChange(network) {
        this.networkType = network.networkType;
        this.commonEvents.dispatchEvent('model.network.type.changed');
    }

    onGetNetworkTypeSuccess(network) {
        this.networkType = network.networkType;
        this.commonEvents.dispatchEvent('model.network.initialized');
    }

}

export {NetworkDriverTizen}