// Generated by CoffeeScript 2.3.1
(function() {
  /*
  (c) 2011 Jan Monschke
  v1.0.2
  GeoMock is licensed under the MIT license.
  */
  (function() {
    if (typeof navigator === "undefined" || navigator === null) {
      window.navigator = {};
    }
    if (navigator.geolocation == null) {
      window.navigator.geolocation = {};
    }
    navigator.geolocation.delay = 1000;
    navigator.geolocation.shouldFail = false;
    navigator.geolocation.repeat = true;
    navigator.geolocation.failsAt = -1;
    navigator.geolocation.errorMessage = "There was an error retrieving the position!";
    navigator.geolocation.currentTimeout = -1;
    navigator.geolocation.lastPosReturned = 0;
    navigator.geolocation._sanitizeLastReturned = function() {
      if (this.lastPosReturned > this.waypoints.length - 1) {
        this.lastPosReturned = 0;
        if (this.repeat === false) {
          return clearInterval(this.currentTimeout);
        }
      }
    };
    navigator.geolocation._geoCall = function(method, success, error) {
      if (this.shouldFail && (error != null)) {
        return this.currentTimeout = window[method].call(null, () => {
          return error(this.errorMessage);
        }, this.delay);
      } else {
        if (success != null) {
          return this.currentTimeout = window[method].call(null, () => {
            success(this.waypoints[this.lastPosReturned++]);
            return this._sanitizeLastReturned();
          }, this.delay);
        }
      }
    };
    navigator.geolocation.getCurrentPosition = function(success, error) {
      return this._geoCall("setTimeout", success, error);
    };
    navigator.geolocation.watchPosition = function(success, error) {
      this._geoCall("setInterval", success, error);
      return this.currentTimeout;
    };
    navigator.geolocation.clearWatch = function(id) {
      return clearInterval(id);
    };
    return navigator.geolocation.waypoints = [
      {
        coords: {
          latitude: 52.5168,
          longitude: 13.3889,
          accuracy: 1500
        }
      },
      {
        coords: {
          latitude: 52.5162,
          longitude: 13.3890,
          accuracy: 1334
        }
      },
      {
        coords: {
          latitude: 52.5154,
          longitude: 13.3890,
          accuracy: 631
        }
      },
      {
        coords: {
          latitude: 52.5150,
          longitude: 13.3890,
          accuracy: 361
        }
      },
      {
        coords: {
          latitude: 52.5144,
          longitude: 13.3890,
          accuracy: 150
        }
      },
      {
        coords: {
          latitude: 52.5138,
          longitude: 13.3890,
          accuracy: 65
        }
      },
      {
        coords: {
          latitude: 52.5138,
          longitude: 13.3895,
          accuracy: 65
        }
      },
      {
        coords: {
          latitude: 52.5139,
          longitude: 13.3899,
          accuracy: 65
        }
      },
      {
        coords: {
          latitude: 52.5140,
          longitude: 13.3906,
          accuracy: 65
        }
      },
      {
        coords: {
          latitude: 52.5140,
          longitude: 13.3910,
          accuracy: 65
        }
      }
    ];
  })();

}).call(this);

//# sourceMappingURL=geomock.js.map
