import 'package:dio/dio.dart';
// import 'package:http/http.dart' as http;

Future<void> request(latitude,longitude,averageSpeed,num,penalty,speedViolation) async {
  Response response;
  // response = await dio.get('http://localhost:8000/');
  // print(response.data.toString());
  final dio = Dio();
  response = await dio.post('https://hf24.onrender.com/api/mldata/mldatasync', data: {'deliveryId':"661125eb278d7470eae559c7",'latitude':latitude , 'longitude': longitude,'averagespeed':averageSpeed, 'anomalies':num,'penalty':penalty,"speedViolation":speedViolation},options: Options(validateStatus: (status) {
            return status != 400; // Do not throw for status code 400
        }),);
  print(response.data.toString());
//   var response = await http.post(Uri.parse("https://hf24.onrender.com/api/mldata/mldatasync"), body: {'deliveryId':"661125eb278d7470eae559c7",'latitude':latitude , 'longitude': longitude,'averagespeed':averageSpeed, 'anomalies':num,'penalty':penalty,"speedViolation":speedViolation});
// print('Response status: ${response.statusCode}');
// print('Response body: ${response.body}');
  // The below request is the same as above.
}