import 'package:dio/dio.dart';

final dio = Dio();

void request(latitude,longitude,speed,disturbances) async {
  Response response;
  // response = await dio.get('http://localhost:8000/');
  // print(response.data.toString());
  response = await dio.post('http://localhost:8000/coordinates', data: {'latitude':latitude , 'longitude': longitude,'speed':speed, 'disturbances':disturbances});
  print(response.data.toString());
  // The below request is the same as above.
}