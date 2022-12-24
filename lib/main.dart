// Copyright 2018 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'home.dart';
import 'models/connections.dart';
import 'workout.dart';
import 'package:catcher/catcher.dart';

void main() {
  /// STEP 1. Create catcher configuration.
  /// Debug configuration with dialog report mode and console handler. It will show dialog and once user accepts it, error will be shown   /// in console.
  CatcherOptions debugOptions = CatcherOptions(SilentReportMode(), [
    SnackbarHandler(
      const Duration(seconds: 20),
      backgroundColor: Colors.red,
      elevation: 2,
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.all(16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      behavior: SnackBarBehavior.floating,
      action: SnackBarAction(
          label: "OK", textColor: Colors.white, onPressed: () {}),
      textStyle: const TextStyle(
        color: Colors.white,
        fontSize: 16,
      ),
    ),
  ]);

  /// Release configuration. Same as above, but once user accepts dialog, user will be prompted to send email with crash to support.
  CatcherOptions releaseOptions = CatcherOptions(DialogReportMode(), [
    ConsoleHandler()
    // EmailManualHandler(["daniel@wdev.rs"])
  ]);

  /// STEP 2. Pass your root widget (MyApp) along with Catcher configuration:
  Catcher(
      rootWidget: Tracy(),
      debugConfig: debugOptions,
      releaseConfig: releaseOptions);
// runApp(Tracy());
}

const Color primaryGreenColor = Color(0xFFAFFD58);

class Tracy extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
        providers: [
          ChangeNotifierProvider(create: (context) => Connections()),
          // Provider(create: (context) => SomeOtherClass()),
        ],
        child: Consumer<Connections>(builder: (context, connection, child) {
          return MaterialApp(
              title: 'Tracy App',
              theme: ThemeData(
                // Define the default brightness and colors.
                brightness: Brightness.dark,
                primaryColor: primaryGreenColor,

                // Define the default font family.
                fontFamily: 'Verdana',
                appBarTheme: AppBarTheme(
                    titleTextStyle: TextStyle(
                        fontSize: 20.0,
                        fontWeight: FontWeight.bold,
                        color: primaryGreenColor),
                    iconTheme: IconThemeData(color: primaryGreenColor),
                    backgroundColor: Colors.black),

                scaffoldBackgroundColor: Colors.black,

                // Define the default `TextTheme`. Use this to specify the default
                // text styling for headlines, titles, bodies of text, and more.
                textTheme: const TextTheme(
                  headline1:
                      TextStyle(fontSize: 30.0, color: primaryGreenColor),
                  bodyText1:
                      TextStyle(fontSize: 14.0, color: primaryGreenColor),
                  bodyText2:
                      TextStyle(fontSize: 14.0, color: primaryGreenColor),
                ),
              ),

              /// STEP 3. Add navigator key from Catcher. It will be used to navigate user to report page or to show dialog.
              navigatorKey: Catcher.navigatorKey,
              initialRoute: '/',
              routes: {
                '/': (context) => const Home(),
                '/workout': (context) => const Workout(),
              });
        }));
  }
}
