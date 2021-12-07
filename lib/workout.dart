// Copyright 2018 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';
import 'header.dart';
import 'colors.dart';

class Workout extends StatelessWidget {
  const Workout({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: Header(
          title: const Text('Workout'),
          wifiActive: true,
        ),
        body: LayoutBuilder(
            builder: (BuildContext context, BoxConstraints constraints) {
          bool useVerticalLayout = constraints.maxWidth < 400.0;
          return Flex(
            direction: useVerticalLayout ? Axis.vertical : Axis.horizontal,
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Center(
                child: Column(children: [
                  Text('Speed',
                      style: TextStyle(fontSize: 25.0, color: Colors.white)),
                  Text('100.25', style: TextStyle(fontSize: 80.0, fontWeight: FontWeight.bold)),
                  Text('km/h',
                      style: TextStyle(fontSize: 25.0, color: Colors.white)),
                ]),
              ),
              Center(
                  child: Column(children: [
                Text('Distance',
                    style: TextStyle(fontSize: 25.0, color: Colors.white)),
                Text('110.25', style: TextStyle(fontSize: 80.0, fontWeight: FontWeight.bold)),
                Text('km',
                    style: TextStyle(fontSize: 25.0, color: Colors.white)),
              ]))
            ],
          );
        }));
  }
}
