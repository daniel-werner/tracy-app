const NETWORKS = ['2G', '2.5G', '3G', '4G', 'WIFI', 'ETHERNET', 'UNKNOWN'];

class NetworkDriver {
    constructor() {
        this.commonEvents = window.app.common.events;
        this.networkType = 'NONE';
    }

    init() {
        this.bind();
    }

    bind() {

    }

    isNetworkAvailable() {
        return NETWORKS.indexOf(this.networkType) !== -1;
    }

    getNetworkType() {
        return this.networkType;
    }
}

export {NetworkDriver}
