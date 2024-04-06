import 'dart:async';
import 'dart:io';
import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:geocode/geocode.dart';
import 'package:geocoding/geocoding.dart';
import 'package:geolocator/geolocator.dart';
import 'package:iotdevice/dio.dart';
import 'package:shake_detector/shake_detector.dart';

late List<CameraDescription> _cameras;

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  _cameras = await availableCameras();
  runApp(
      const MaterialApp(debugShowCheckedModeBanner: false, home: IotDevice()));
}

class IotDevice extends StatefulWidget {
  const IotDevice({super.key});

  @override
  State<IotDevice> createState() => _IotDeviceState();
}

class _IotDeviceState extends State<IotDevice> {
  CameraController? controller;
  List<Placemark>? placemarks;
  var _currentAddress;
  Position? position;
  var flag=0;
  var imagePath = "";
  var num = 0;
  var position1;
  var date;
  Placemark? place;
  @override
  void initState() {
    // getlocation();
    Timer.periodic(Duration(seconds:1), (Timer timer) {
      getlocation();
    });
    ShakeDetector.autoStart(
        onShake: () => {
              setState(() {
                num = num + 1;
                debugPrint(num.toString());
              })
            });
    controller = CameraController(_cameras[1], ResolutionPreset.max);
    controller?.initialize().then((_) {
      if (!mounted) {
        return;
      }
      setState(() {});
    });
    super.initState();
  }

  @override
  void dispose() {
    controller!.dispose();
    super.dispose();
  }

  Future<void> getlocation() async {
       position1 = await _determinePosition();
      // GeoCode geoCode = GeoCode();
      // Address address = await geoCode.reverseGeocoding(latitude: position!.latitude, longitude: position!.longitude);
      // print(address.toString());
      setState(() {
        position = position1;
        date= DateTime.now();
        flag = 1;
        request(position?.latitude??"",position?.longitude??"",position?.speed??"",num);
      });
    // _locationData = await location.getLocation();
  }

  Future<Position> _determinePosition() async {
    // Check if location services are enabled
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      // Location services are not enabled return an error message
      return Future.error('Location services are disabled.');
    }

    // Check location permissions
    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        return Future.error('Location permissions are denied');
      }
    }

    if (permission == LocationPermission.deniedForever) {
      return Future.error(
          'Location permissions are permanently denied, we cannot request permissions.');
    }

    // If permissions are granted, return the current location
    return await Geolocator.getCurrentPosition();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text("Testing images"),
        ),
        body:Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            // if (imagePath != "")
            //   Container(
            //       width: 300,
            //       height: 300,
            //       child: Image.file(
            //         File(imagePath),
            //       )),
            // Center(
            //   child: TextButton(
            //       onPressed: () async {
            //         try {
            //           final image = await controller!.takePicture();
            //           setState(() {
            //             imagePath = image.path;
            //           });
            //         } catch (e) {
            //           print(e);
            //         }
            //       },
            //       child: const Text("click Photo")),
            // ),
            Text(
              num.toString(),
              style: const TextStyle(fontSize: 20, color: Colors.red),
            ),
            Text(
              "${position?.latitude??""} ${position?.longitude??""}",
              style: const TextStyle(fontSize: 20, color: Colors.red),
            ),
            // Center(
            //   child: TextButton(
            //       onPressed: () async{
            //         // var position1 = await _determinePosition();
            //         setState(() {
            //           position = position1;
            //           flag=1;
            //         });
            //       },
            //       child: const Text("click for location")),
            // ),
            (flag==1)?Center(
              child: Text(
                "lat:${position?.latitude}\nlong:${position?.longitude}\nspeed:${position?.speed.toStringAsFixed(1)}\ntime:${date}",
                style: const TextStyle(fontSize: 20, color: Colors.red),
              ),
            ):Container(),
          ],
        ));
  }
}
