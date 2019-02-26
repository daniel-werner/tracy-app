import {NetworkDriver} from "../app.drivers.network";

class NetworkDriverAndroid extends NetworkDriver {
    constructor() {
        super();
    }

    bind() {
        var _this = this;

        document.addEventListener("offline",
            function () {
                _this.onNetworkTypeChange()
            }, false);
        document.addEventListener("online",
            function () {
                _this.onNetworkTypeChange()
            }, false);

        setTimeout(
            function () {
                _this.onGetNetworkTypeSuccess();
            },
            500);

    }

    isNetworkAvailable() {
        return navigator.connection.type !== Connection.NONE;
    }

    onNetworkTypeChange() {
        this.networkType = navigator.connection.type;
        this.commonEvents.dispatchEvent('model.network.type.changed');
    }

    onGetNetworkTypeSuccess() {
        this.networkType = navigator.connection.type;
        this.commonEvents.dispatchEvent('model.network.initialized');
    }
}

export {NetworkDriverAndroid}
