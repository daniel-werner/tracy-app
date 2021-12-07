import 'package:flutter/material.dart';
import 'colors.dart';

class Header extends AppBar {
  Header({
    Key? key,
    this.title = const Text('Tracy'),
    this.wifiActive = false,
    this.locationActive = false,
  }) : super(
          key: key,
          title: title,
          actions: [
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Icon(Icons.location_on, color: (locationActive ? primaryGreenColor : Colors.grey)),
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Icon(
                Icons.wifi,
                color: (wifiActive ? primaryGreenColor : Colors.grey),
              ),
            ),
          ],
        );

  final Text title;
  final bool wifiActive;
  final bool locationActive;
}
