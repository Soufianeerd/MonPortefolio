import '../models/salaire.dart';
import 'impots.dart';
import 'cls_maths.dart';

class CalculSalaire {
  final ClsMaths _maths = ClsMaths();

  bool calculBrutNet(Salaire voSalaire) {
    return _calculSalaire(voSalaire);
  }

  bool calculNetBrut(Salaire voSalaire) {
    double netRecherche = voSalaire.dNet;
    double dNet = 0;

    if (voSalaire.dBrut == 0) {
      voSalaire.dBrut = netRecherche;
    }

    while (dNet < netRecherche) {
      bool lResult = _calculSalaire(voSalaire);

      if (lResult) {
        dNet = voSalaire.dNet;

        if (dNet < netRecherche) {
          double diff = netRecherche - dNet;

          if (diff > 10000000) {
            voSalaire.dBrut += 100000;
          } else if (diff > 5000000) {
            voSalaire.dBrut += 500000;
          } else if (diff > 2000000) {
            voSalaire.dBrut += 2000000;
          } else if (diff > 1000000) {
            voSalaire.dBrut += 1000000;
          } else if (diff > 500000) {
            voSalaire.dBrut += 500000;
          } else if (diff > 200000) {
            voSalaire.dBrut += 200000;
          } else if (diff > 100000) {
            voSalaire.dBrut += 100000;
          } else if (diff > 50000) {
            voSalaire.dBrut += 50000;
          } else if (diff > 20000) {
            voSalaire.dBrut += 20000;
          } else if (diff > 10000) {
            voSalaire.dBrut += 10000;
          } else if (diff > 5000) {
            voSalaire.dBrut += 5000;
          } else if (diff > 1000) {
            voSalaire.dBrut += 1000;
          } else if (diff > 500) {
            voSalaire.dBrut += 500;
          } else if (diff > 400) {
            voSalaire.dBrut += 400;
          } else if (diff > 300) {
            voSalaire.dBrut += 300;
          } else if (diff > 200) {
            voSalaire.dBrut += 200;
          } else if (diff > 100) {
            voSalaire.dBrut += 100;
          } else if (diff > 50) {
            voSalaire.dBrut += 50;
          } else if (diff > 40) {
            voSalaire.dBrut += 40;
          } else if (diff > 30) {
            voSalaire.dBrut += 30;
          } else if (diff > 20) {
            voSalaire.dBrut += 20;
          } else if (diff > 10) {
            voSalaire.dBrut += 10;
          } else if (diff > 9) {
            voSalaire.dBrut += 9;
          } else if (diff > 8) {
            voSalaire.dBrut += 8;
          } else if (diff > 7) {
            voSalaire.dBrut += 7;
          } else if (diff > 6) {
            voSalaire.dBrut += 6;
          } else if (diff > 5) {
            voSalaire.dBrut += 5;
          } else if (diff > 4) {
            voSalaire.dBrut += 4;
          } else if (diff > 3) {
            voSalaire.dBrut += 3;
          } else if (diff > 2) {
            voSalaire.dBrut += 2;
          } else if (diff > 1) {
            voSalaire.dBrut += 1;
          } else if (diff > 0.9) {
            voSalaire.dBrut += 0.9;
          } else if (diff > 0.8) {
            voSalaire.dBrut += 0.8;
          } else if (diff > 0.7) {
            voSalaire.dBrut += 0.7;
          } else if (diff > 0.6) {
            voSalaire.dBrut += 0.6;
          } else if (diff > 0.5) {
            voSalaire.dBrut += 0.5;
          } else if (diff > 0.4) {
            voSalaire.dBrut += 0.4;
          } else if (diff > 0.3) {
            voSalaire.dBrut += 0.3;
          } else if (diff > 0.2) {
            voSalaire.dBrut += 0.2;
          } else if (diff > 0.1) {
            voSalaire.dBrut += 0.1;
          } else if (diff > 0.09) {
            voSalaire.dBrut += 0.09;
          } else if (diff > 0.08) {
            voSalaire.dBrut += 0.08;
          } else if (diff > 0.07) {
            voSalaire.dBrut += 0.07;
          } else if (diff > 0.06) {
            voSalaire.dBrut += 0.06;
          } else if (diff > 0.05) {
            voSalaire.dBrut += 0.05;
          } else if (diff > 0.04) {
            voSalaire.dBrut += 0.04;
          } else if (diff > 0.03) {
            voSalaire.dBrut += 0.03;
          } else if (diff > 0.02) {
            voSalaire.dBrut += 0.02;
          } else if (diff > 0.01) {
            voSalaire.dBrut += 0.01;
          } else if (diff > 0.005) {
            voSalaire.dBrut += 0.005;
          } else if (diff > 0.001) {
            voSalaire.dBrut += 0.001;
          } else {
            netRecherche = 0;
          }
        }
      }
    }
    return true;
  }

  bool _calculSalaire(Salaire voSalaire) {
    double cms = 0.028;
    double cme = 0.0025;
    double cmp = 0.08;
    double cdep = 0.014;
    double plafondSecu = 12541.18;

    // --- REPRISE DE LA LOGIQUE IOS ---
    // L'app iOS utilise le champ UI "Santé au travail"
    double sat = voSalaire.dTxSAT / 100.0;

    // L'app iOS utilise directement la valeur du menu déroulant "Bonus" pour l'Assurance Accident
    double asac = 0.0085;
    if (voSalaire.iBonus == 1) {
      asac = 0.0085;
    } else if (voSalaire.iBonus == 2)
      asac = 0.0100;
    else if (voSalaire.iBonus == 3)
      asac = 0.0110;
    else if (voSalaire.iBonus == 4)
      asac = 0.0150;

    double mutu1 = 0.0051;
    double mutu2 = 0.0123;
    double mutu3 = 0.0183;
    double mutu4 = 0.0292;

    switch (voSalaire.iAnnee) {
      case 2026:
        // Ton app iOS utilise 0.72% pour arriver à ses 397.80
        mutu1 = 0.0072;
        mutu2 = 0.0099;
        mutu3 = 0.0148;
        mutu4 = 0.0264;
        plafondSecu = 13518.68;
        cmp = 0.085;
        break;
      case 2025:
        mutu1 = 0.0072;
        mutu2 = 0.0099;
        mutu3 = 0.0148;
        mutu4 = 0.0264;
        plafondSecu = 13518.68;
        break;
      case 2024:
        mutu1 = 0.0072;
        mutu2 = 0.0122;
        mutu3 = 0.0176;
        mutu4 = 0.0284;
        plafondSecu = 12854.64;
        break;
      case 2023:
        plafondSecu = 12541.18;
        mutu1 = 0.0072;
        mutu2 = 0.0122;
        mutu3 = 0.0176;
        mutu4 = 0.0284;
        if (voSalaire.iMois == 9 || voSalaire.iMois > 9) {
          plafondSecu = 12854.64;
        }
        break;
      case 2022:
        plafondSecu = 10355.50;
        mutu1 = 0.0060;
        mutu2 = 0.0113;
        mutu3 = 0.0166;
        mutu4 = 0.0298;
        break;
      default:
        plafondSecu = 10355.50;
        mutu1 = 0.0041;
        mutu2 = 0.0107;
        mutu3 = 0.0163;
        mutu4 = 0.0279;
        break;
    }

    voSalaire.dCotisSecuPatr = 0;
    voSalaire.dCotisMutuPatr = 0;
    voSalaire.dCotisASACPatr = 0;
    voSalaire.dCotisSATPatr = 0;
    voSalaire.dTxCMP = cmp * 100;

    if (voSalaire.dHMC == 0) voSalaire.dHMC = 173.0;

    double cotisable = (voSalaire.dBrut + voSalaire.dAvNat);
    if (cotisable > plafondSecu) cotisable = plafondSecu;

    voSalaire.dCotisCMS = _calculCotis(cotisable, cms);

    double cotisCME = _maths.myRound(voSalaire.dBrut, 2);
    if (cotisCME > plafondSecu) cotisCME = plafondSecu;
    voSalaire.dCotisCME = _calculCotis(cotisCME, cme);

    voSalaire.dCotisCMP = _calculCotis(cotisable, cmp);

    voSalaire.dHMC = _maths.myRound(voSalaire.dHMC, 0);
    double dDeducDep = _maths.myRound(
      (plafondSecu / 20 * 1000).truncateToDouble() / 1000,
      2,
    );
    dDeducDep = _maths.myRound(
      ((dDeducDep * voSalaire.dHMC) / 173 * 1000).truncateToDouble() / 1000,
      2,
    );

    double baseDep = ((voSalaire.dBrut + voSalaire.dAvNat) - dDeducDep);
    if (baseDep < 0) baseDep = 0;
    voSalaire.dCotisDep = _maths.myRound(
      (baseDep * cdep * 1000).truncateToDouble() / 1000,
      2,
    );

    // Application des taxes patronales qui génèrent le 397.80€
    voSalaire.dCotisSATPatr = _calculCotis(cotisable, sat);
    voSalaire.dCotisASACPatr = _calculCotis(cotisable, asac);

    double txMutu = 0;
    switch (voSalaire.iMutualite) {
      case 1:
        txMutu = mutu1;
        break;
      case 2:
        txMutu = mutu2;
        break;
      case 3:
        txMutu = mutu3;
        break;
      case 4:
        txMutu = mutu4;
        break;
      default:
        txMutu = mutu1;
        break;
    }
    voSalaire.dCotisMutuPatr = _calculCotis(cotisable, txMutu);

    Impots monCalculImpot = Impots();
    monCalculImpot.classe = voSalaire.iclasse;
    monCalculImpot.imposable =
        voSalaire.dBrut +
        voSalaire.dAvNat -
        voSalaire.partsTrav() -
        voSalaire.dDeduc;
    voSalaire.dimposable = monCalculImpot.imposable;
    monCalculImpot.iAnnee = voSalaire.iAnnee;

    if (!voSalaire.swTxImpots) {
      if (monCalculImpot.calculImpot()) {
        voSalaire.dImpot = monCalculImpot.impot;
      }
    } else {
      double dTemp = _maths.myRound(
        ((voSalaire.dimposable * voSalaire.dTxImpot).truncateToDouble()) / 100,
        2,
      );
      voSalaire.dImpot = ((dTemp * 10) + 0.0001).floorToDouble() / 10;
    }

    voSalaire.dCISSM = _calculCISSM(
      voSalaire.dBrut + voSalaire.dAvNat,
      voSalaire.dHMC,
      voSalaire.iAnnee,
      voSalaire.iMois,
    );

    if (!voSalaire.bCalculCI) {
      voSalaire.dCI = 0;
    } else {
      voSalaire.dCI = _calculCI(
        voSalaire.dBrut + voSalaire.dAvNat,
        voSalaire.iAnnee,
      );
      if (voSalaire.iAnnee >= 2024) {
        voSalaire.dCICO2 = _calculCICO2(
          voSalaire.dBrut + voSalaire.dAvNat,
          voSalaire.iAnnee,
        );
      }
      if (voSalaire.iAnnee < 2024) {
        if (voSalaire.iAnnee == 2023 && voSalaire.iMois >= 6) {
          voSalaire.dCIC = _calculCIC(voSalaire.dBrut + voSalaire.dAvNat);
        }
      }
    }

    if (voSalaire.iAnnee == 2023 && voSalaire.iMois < 4) {
      voSalaire.dCIE = _calculCIE(voSalaire.dBrut + voSalaire.dAvNat);
    }

    double dResNet =
        voSalaire.dBrut -
        voSalaire.partsTrav() -
        voSalaire.dCotisDep -
        voSalaire.dImpot +
        voSalaire.dCI +
        voSalaire.dCICO2 +
        voSalaire.dCIC +
        voSalaire.dCISSM;

    voSalaire.dNet = _maths.myRound(
      (dResNet * 1000).truncateToDouble() / 1000,
      2,
    );

    return true;
  }

  double _calculCotis(double dMntCotisable, double taux) {
    int iTemp = (dMntCotisable * taux * 1000).truncate();
    return _maths.myRound(iTemp / 1000, 2);
  }

  double _calculCISSM(double dMntBrut, double dHMC, int annee, int mois) {
    double mntCISSM = 0;
    double hmcSecu = _hmcSecu(annee, mois).toDouble();
    if (dHMC == 0) return 0;

    double dMntBrutCISSM = _maths.myRound(
      ((dMntBrut / dHMC) * hmcSecu * 1000).truncateToDouble() / 1000,
      2,
    );

    if (dMntBrutCISSM >= 1800.0 && dMntBrutCISSM < 3000.0) {
      mntCISSM = 70.00;
    } else if (dMntBrutCISSM >= 3000.0 && dMntBrutCISSM <= 3600.0) {
      mntCISSM = (70 / 600) * (3600 - dMntBrutCISSM);
      mntCISSM = (mntCISSM * 100).ceilToDouble() / 100;
      if (mntCISSM > 70) mntCISSM = 70;
    } else {
      mntCISSM = 0;
    }
    return mntCISSM;
  }

  double _calculCICO2(double dMntBrut, int annee) {
    double mntCICO2 = 0;
    double dTemp = dMntBrut * 12;

    if (annee >= 2026) {
      if (dTemp < 936) {
        mntCICO2 = 0;
      } else if (dTemp < 40000) {
        mntCICO2 = 18;
      } else if (dTemp < 80000) {
        mntCICO2 = (216 - (dTemp - 40000) * 0.0054) / 12;
      } else {
        mntCICO2 = 0;
      }
    } else if (annee == 2025) {
      if (dTemp < 936) {
        mntCICO2 = 0;
      } else if (dTemp < 40000) {
        mntCICO2 = 16;
      } else if (dTemp < 80000) {
        mntCICO2 = (192 - (dTemp - 40000) * 0.0048) / 12;
      } else {
        mntCICO2 = 0;
      }
    } else if (annee == 2024) {
      if (dTemp < 936) {
        mntCICO2 = 0;
      } else if (dTemp < 40000) {
        mntCICO2 = 14;
      } else if (dTemp < 80000) {
        mntCICO2 = (168 - (dTemp - 40000) * 0.0042) / 12;
      } else {
        mntCICO2 = 0;
      }
    } else {
      if (dTemp < 936) {
        mntCICO2 = 0;
      } else if (dTemp < 40000) {
        mntCICO2 = 12;
      } else if (dTemp < 80000) {
        mntCICO2 = (144 - (dTemp - 40000) * 0.0036) / 12;
      } else {
        mntCICO2 = 0;
      }
    }
    return _maths.roundUP(mntCICO2, 2);
  }

  double _calculCI(double dMntBrut, int annee) {
    double mntCI = 0;
    double dTemp = dMntBrut * 12;

    if (annee >= 2026) {
      if (dTemp < 936) {
        mntCI = 0;
      } else if (dTemp < 11266) {
        mntCI = (300 + (dTemp - 936) * 0.029) / 12;
      } else if (dTemp < 40000) {
        mntCI = 50;
      } else if (dTemp < 80000) {
        mntCI = (600 - (dTemp - 40000) * 0.015) / 12;
      } else {
        mntCI = 0;
      }
    } else if (annee == 2025) {
      if (dTemp < 936) {
        mntCI = 0;
      } else if (dTemp < 11266) {
        mntCI = (300 + (dTemp - 936) * 0.029) / 12;
      } else if (dTemp < 40000) {
        mntCI = 50;
      } else if (dTemp < 80000) {
        mntCI = (600 - (dTemp - 40000) * 0.015) / 12;
      } else {
        mntCI = 0;
      }
    } else if (annee == 2024) {
      if (dTemp < 936) {
        mntCI = 0;
      } else if (dTemp < 11266) {
        mntCI = (300 + (dTemp - 936) * 0.029) / 12;
      } else if (dTemp < 40000) {
        mntCI = 50;
      } else if (dTemp < 80000) {
        mntCI = (600 - (dTemp - 40000) * 0.015) / 12;
      } else {
        mntCI = 0;
      }
    } else {
      if (dTemp < 936) {
        mntCI = 0;
      } else if (dTemp < 11266) {
        mntCI = (396 + (dTemp - 936) * 0.029) / 12;
      } else if (dTemp < 40000) {
        mntCI = 58;
      } else if (dTemp < 80000) {
        mntCI = (696 - (dTemp - 40000) * 0.0174) / 12;
      } else {
        mntCI = 0;
      }
    }
    return _maths.roundUP(mntCI, 2);
  }

  double _calculCIC(double dMntBrut) {
    double mntCIC = 0;
    if (dMntBrut < 1125) {
      mntCIC = 0;
    } else if (dMntBrut <= 1250) {
      mntCIC = (dMntBrut - 1125) * (4 / 125);
    } else if (dMntBrut <= 2100) {
      mntCIC = ((dMntBrut - 1250) * (3 / 850)) + 4;
    } else if (dMntBrut <= 4600) {
      mntCIC = ((dMntBrut - 2100) * (37 / 2500)) + 7;
    } else if (dMntBrut <= 9500) {
      mntCIC = 44;
    } else if (dMntBrut <= 9925) {
      mntCIC = ((dMntBrut - 9500) * (4 / 425)) + 44;
    } else if (dMntBrut <= 14175) {
      mntCIC = 48;
    } else if (dMntBrut <= 14916) {
      mntCIC = ((dMntBrut - 14175) * (3 / 356)) + 48;
    } else {
      mntCIC = 54.25;
    }

    return _maths.roundUP(mntCIC, 2);
  }

  double _calculCIE(double dMntBrut) {
    double mntCIE = 0;
    if (dMntBrut < 79 || dMntBrut > 8333) {
      mntCIE = 0;
    } else {
      if (dMntBrut < 3667) {
        mntCIE = 84;
      } else if (dMntBrut < 5667) {
        mntCIE = (84 - ((dMntBrut - 3667) * (8 / 2000)));
      } else if (dMntBrut < 8334) {
        mntCIE = (76 - ((dMntBrut - 5667) * (76 / 2667)));
      } else {
        mntCIE = 0;
      }
    }
    return _maths.roundUP(mntCIE, 2);
  }

  int _hmcSecu(int annee, int mois) {
    DateTime firstDay = DateTime(annee, mois, 1);
    DateTime lastDay = (mois < 12)
        ? DateTime(annee, mois + 1, 0)
        : DateTime(annee + 1, 1, 0);

    int joursOuvres = 0;
    for (int i = 0; i < lastDay.day; i++) {
      DateTime currentDay = firstDay.add(Duration(days: i));
      if (currentDay.weekday >= 1 && currentDay.weekday <= 5) {
        joursOuvres++;
      }
    }
    return joursOuvres * 8;
  }
}
