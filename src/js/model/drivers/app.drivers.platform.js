const PLATFORMS = {
    TIZEN: 'tizen',
    ANDROID: 'android',
    BROWSER: 'browser'
};

class Platform {
    static get() {
        var platform = PLATFORMS.BROWSER;

        if (typeof tizen === 'object' && typeof tizen.systeminfo === 'object') {
            platform = PLATFORMS.TIZEN;
        } else if (typeof device === 'object' && device.platform === 'Android') {
            platform = PLATFORMS.ANDROID;
        }

        return platform;
    }
}

export {Platform, PLATFORMS};