import 'dart:async';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:tracy_app/models/connections.dart';
import 'colors.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'dart:developer' as developer;

class Header extends AppBar {
  Header({Key? key, Text title = const Text('')})
      : super(key: key, title: title);

  @override
  _HeaderState createState() => _HeaderState();
}

class _HeaderState extends State<Header> {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
        providers: [
          ChangeNotifierProvider(create: (context) => Connections()),
          // Provider(create: (context) => SomeOtherClass()),
        ],
        child: Consumer<Connections>(builder: (context, connection, child) {
          return AppBar(
            title: widget.title,
            actions: [
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 16),
                child: Icon(Icons.location_on,
                    color: (connection.locationActive ? primaryGreenColor : Colors.grey)),
              ),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 16),
                child: Icon(
                  Icons.wifi,
                  color: (connection.wifiActive ? primaryGreenColor : Colors.grey),
                ),
              ),
            ],
          );
        }));
  }
}
