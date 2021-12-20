import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:geolocator/geolocator.dart';
import 'dart:developer' as developer;

class Connections extends ChangeNotifier {
  bool wifiActive = false;
  bool locationActive = false;

  final Connectivity _connectivity = Connectivity();
  late StreamSubscription<ConnectivityResult> _connectivitySubscription;
  late StreamSubscription<ServiceStatus> _serviceStatusStream;

  Connections() {
    _initConnectivity();
    _initPosition().catchError((e) => _setLocationStatus(false));
  }

  // Platform messages are asynchronous, so we initialize in an async method.
  Future<void> _initConnectivity() async {
    late ConnectivityResult result;

    _connectivitySubscription =
        _connectivity.onConnectivityChanged.listen((ConnectivityResult result) {
      _setWifiStatus(result);
    });

    // Platform messages may fail, so we use a try/catch PlatformException.
    try {
      result = await _connectivity.checkConnectivity();
    } on PlatformException catch (e) {
      developer.log('Couldn\'t check connectivity status', error: e);
      return;
    }

    _setWifiStatus(result);
  }

  /// Determine the current position of the device.
  ///
  /// When the location services are not enabled or permissions
  /// are denied the `Future` will return an error.
  Future _initPosition() async {
    bool serviceEnabled;

    _serviceStatusStream =
        Geolocator.getServiceStatusStream().listen((ServiceStatus status) {
      _setLocationStatus(status == ServiceStatus.enabled);
    });

    // Test if location services are enabled.
    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    _setLocationStatus(serviceEnabled);

    if(!serviceEnabled) {
      _checkLocationPermissions().catchError((e) => _setLocationStatus(false));
    }
  }

  Future _checkLocationPermissions() async {
    LocationPermission permission;
    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        // Permissions are denied, next time you could try
        // requesting permissions again (this is also where
        // Android's shouldShowRequestPermissionRationale
        // returned true. According to Android guidelines
        // your App should show an explanatory UI now.
        return Future.error('Location permissions are denied');
      }
    }

    if (permission == LocationPermission.deniedForever) {
      // Permissions are denied forever, handle appropriately.
      return Future.error(
          'Location permissions are permanently denied, we cannot request permissions.');
    }
  }

  void _setWifiStatus(ConnectivityResult result) {
    wifiActive = result != ConnectivityResult.none;
    notifyListeners();
  }

  void _setLocationStatus(bool status) {
    locationActive = status;
    notifyListeners();
  }
}
