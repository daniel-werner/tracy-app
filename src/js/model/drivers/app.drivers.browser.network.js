import {NetworkDriver} from "./app.drivers.network";

class NetworkDriverBrowser extends NetworkDriver {
    init() {
        this.bind();
    }

    bind() {

    }

    isNetworkAvailable() {
        return true;
    }

    getNetworkType() {
        return this.networkType;
    }
}

export {NetworkDriverBrowser}
