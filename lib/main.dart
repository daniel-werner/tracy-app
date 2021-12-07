// Copyright 2018 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';
import 'home.dart';
import 'workout.dart';

void main() => runApp(Tracy());

const Color primaryGreenColor = Color(0xFFAFFD58);

class Tracy extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Tracy App',
        theme: ThemeData(
          // Define the default brightness and colors.
          brightness: Brightness.dark,
          primaryColor: primaryGreenColor,

          // Define the default font family.
          fontFamily: 'Verdana',
          appBarTheme: AppBarTheme(
            titleTextStyle: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold, color: primaryGreenColor),
            iconTheme: IconThemeData(color: primaryGreenColor),
            backgroundColor: Colors.black
          ),

          scaffoldBackgroundColor: Colors.black,

          // Define the default `TextTheme`. Use this to specify the default
          // text styling for headlines, titles, bodies of text, and more.
          textTheme: const TextTheme(
            headline1: TextStyle(fontSize: 30.0, color: primaryGreenColor),
            bodyText1: TextStyle(fontSize: 14.0, color: primaryGreenColor),
            bodyText2: TextStyle(fontSize: 14.0, color: primaryGreenColor),
          ),
        ),
        initialRoute: '/',
        routes: {
          '/': (context) => const Home(),
          '/workout': (context) => const Workout()
        });
  }
}

