// Copyright 2018 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';
import 'header.dart';
import 'colors.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: Header(),
        body: LayoutBuilder(
        builder: (BuildContext context, BoxConstraints constraints) {
          bool useVerticalLayout = constraints.maxWidth < 400.0;
        return Flex(
          direction: useVerticalLayout ? Axis.vertical : Axis.horizontal,
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
                Center(
                  child: Column(
                      children: [
                        Text('START CYCLING',
                            style:
                                TextStyle(fontSize: 30.0, color: Colors.white)),
                        IconButton(
                          onPressed: () {
                            // Navigate to the second screen using a named route.
                            Navigator.pushNamed(context, '/workout');
                          },
                          alignment: Alignment.center,
                          iconSize: 200,
                          icon: const Icon(Icons.directions_bike,
                              color: primaryGreenColor),
                        )
                      ]),
                ),
                Center(
                    child: Column(
                        children: [
                  Text('START RUNNING',
                      style: TextStyle(fontSize: 30.0, color: Colors.white)),
                  IconButton(
                    onPressed: () {
                      // Navigate to the second screen using a named route.
                      Navigator.pushNamed(context, '/workout');
                    },
                    alignment: Alignment.center,
                    iconSize: 200,
                    icon: const Icon(Icons.directions_run,
                        color: primaryGreenColor),
                  )
                ]))
              ],
            );
        })
        );
  }
}
