;(function(root){
    var Platform = {
        PLATFORM_TIZEN: 'tizen',
        PLATFORM_ANDROID: 'android',

        get: function(){
            var platform = this.PLATFORM_ANDROID;

            if( typeof tizen === 'object' && typeof tizen.systeminfo === 'object'){
                platform = this.PLATFORM_TIZEN;
            }
            else if(typeof device === 'object' && device.platform === 'android'){
                platform = this.PLATFORM_ANDROID;
            }

            return platform;
        }
    }

    root.Platform = Platform;
})(window);
