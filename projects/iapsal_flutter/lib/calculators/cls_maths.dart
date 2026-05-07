import 'dart:math';

class ClsMaths {
  double myRound(double dbVal, int nPlaces) {
    double temp = pow(10.0, nPlaces).toDouble();
    return ((dbVal * temp + 0.5).floorToDouble()) / temp;
  }

  double roundUP(double dbVal, int decPlace) {
    return (dbVal * 100).ceilToDouble() / 100;
  }
}