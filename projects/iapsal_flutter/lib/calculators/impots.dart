import 'bareme_impot.dart';

class Impots {
  int iAnnee = -1;
  double imposable = 0;
  int classe = -1;
  int joursimpot = -1;
  double impot = 0;

  bool calculImpot() {
    switch (iAnnee) {
      case 2025:
      case 2026:
        impot = calculImpot2025(imposable, classe);
        break;
      case 2024:
        impot = calculImpot2024(imposable, classe);
        break;
      case 2022:
        impot = calculImpot2017(imposable, classe);
        break;
      default:
        impot = calculImpot2017(imposable, classe);
        break;
    }
    return true;
  }

  double calculImpot2025(double parimposable, int parclasse) {
    double dImpot = 0;
    double txSolid = 1.04;
    double deducSolid = 0;
    
    double mntentier1 = parimposable.floorToDouble();
    double temp1 = ((mntentier1 + 5.0001) / 10).floorToDouble();
    double temp2 = ((mntentier1 + 0.0001) / 10).floorToDouble();
    double mntentier = 0;

    if ((temp1 - temp2) > 0) {
      mntentier = ((mntentier1 / 10).floorToDouble() * 10) + 5;
    } else {
      mntentier = ((mntentier1 / 10).floorToDouble() * 10);
    }

    BaremeImpot monBareme = BaremeImpot();
    monBareme.classe = parclasse;
    monBareme.mntimposable = mntentier;

    if (monBareme.bareme2025()) {
      dImpot = ((mntentier * monBareme.pourcentage) / 100) - monBareme.mntdeductible;
      dImpot = ((dImpot * 10) + 0.0001).floorToDouble() / 10;

      txSolid = 1.07;
      deducSolid = 0;

      switch (parclasse) {
        case 100:
          if (mntentier > 12585) { txSolid = 1.09; deducSolid = 77.65; }
          break;
        case 200:
          if (mntentier > 25085) { txSolid = 1.09; deducSolid = 155.30; }
          break;
        case 300:
          if (mntentier > 12585) { txSolid = 1.09; deducSolid = 73.78; }
          break;
        default:
          txSolid = 1.07;
          deducSolid = 0;
      }

      double iTemp = (dImpot * txSolid) * 1000;
      dImpot = (iTemp / 1000) - deducSolid;
      dImpot = ((dImpot * 10) + 0.0001).floorToDouble() / 10;
    }
    return dImpot;
  }

  double calculImpot2024(double parimposable, int parclasse) {
    double dImpot = 0;
    double txSolid = 1.04;
    double deducSolid = 0;

    double mntentier1 = parimposable.floorToDouble();
    double temp1 = ((mntentier1 + 5.0001) / 10).floorToDouble();
    double temp2 = ((mntentier1 + 0.0001) / 10).floorToDouble();
    double mntentier = 0;

    if ((temp1 - temp2) > 0) {
      mntentier = ((mntentier1 / 10).floorToDouble() * 10) + 5;
    } else {
      mntentier = ((mntentier1 / 10).floorToDouble() * 10);
    }

    BaremeImpot monBareme = BaremeImpot();
    monBareme.classe = parclasse;
    monBareme.mntimposable = mntentier;

    if (monBareme.bareme2024()) {
      dImpot = ((mntentier * monBareme.pourcentage) / 100) - monBareme.mntdeductible;
      dImpot = ((dImpot * 10) + 0.0001).floorToDouble() / 10;

      txSolid = 1.07;
      deducSolid = 0;

      switch (parclasse) {
        case 100:
          if (mntentier > 12585) { txSolid = 1.09; deducSolid = 79.014; }
          break;
        case 200:
          if (mntentier > 25085) { txSolid = 1.09; deducSolid = 158.028; }
          break;
        case 300:
          if (mntentier > 12585) { txSolid = 1.09; deducSolid = 77.724; }
          break;
        default:
          txSolid = 1.07;
          deducSolid = 0;
      }

      double iTemp = (dImpot * txSolid) * 1000;
      dImpot = (iTemp / 1000) - deducSolid;
      dImpot = ((dImpot * 10) + 0.0001).floorToDouble() / 10;
    }
    return dImpot;
  }

  double calculImpot2017(double parimposable, int parclasse) {
    double dImpot = 0;
    double txSolid = 1.04;
    double deducSolid = 0;

    double mntentier1 = parimposable.floorToDouble();
    double temp1 = ((mntentier1 + 5.0001) / 10).floorToDouble();
    double temp2 = ((mntentier1 + 0.0001) / 10).floorToDouble();
    double mntentier = 0;

    if ((temp1 - temp2) > 0) {
      mntentier = ((mntentier1 / 10).floorToDouble() * 10) + 5;
    } else {
      mntentier = ((mntentier1 / 10).floorToDouble() * 10);
    }

    BaremeImpot monBareme = BaremeImpot();
    monBareme.classe = parclasse;
    monBareme.mntimposable = mntentier;

    if (monBareme.bareme2017()) {
      dImpot = ((mntentier * monBareme.pourcentage) / 100) - monBareme.mntdeductible;
      dImpot = ((dImpot * 10) + 0.0001).floorToDouble() / 10;

      txSolid = 1.07;
      deducSolid = 0;

      switch (parclasse) {
        case 100:
          if (mntentier > 12585) { txSolid = 1.09; deducSolid = 81.010; }
          break;
        case 200:
          if (mntentier > 25085) { txSolid = 1.09; deducSolid = 162.022; }
          break;
        case 300:
          if (mntentier > 12585) { txSolid = 1.09; deducSolid = 79.832; }
          break;
        default:
          txSolid = 1.07;
          deducSolid = 0;
      }

      double iTemp = (dImpot * txSolid) * 1000;
      dImpot = (iTemp / 1000) - deducSolid;
      dImpot = ((dImpot * 10) + 0.0001).floorToDouble() / 10;
    }
    return dImpot;
  }
}