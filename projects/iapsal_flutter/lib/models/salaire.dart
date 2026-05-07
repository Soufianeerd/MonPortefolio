class Salaire {
  // --- Ajouts pour l'historique ---
  String titreSauvegarde = "";
  String dateSauvegarde = "";

  int iAnnee = -1;
  int iMois = -1;
  double dHMC = 0;
  int iCotis = -1;
  double dBrut = 0;
  double dNet = 0;
  double dAvNat = 0;
  double dDeduc = 0;
  int iclasse = -1;
  double dimposable = 0;
  int iTxImpot = -1;
  bool swTxImpots = false;
  double dTxImpot = 0;
  bool bCalculCI = false;
  bool bCalculCIM = false;
  int iMutualite = 1;
  double dTxSAT = 0;
  double dTxASAC = 0;
  int iBonus = 1;
  double dTxCMP = 0;
  
  double dCotisCMS = 0;
  double dCotisCME = 0;
  double dCotisCMP = 0;
  double dCotisSurprime = 0;
  double dCotisDep = 0;

  double dCotisSecuPatr = 0;
  double dCotisMutuPatr = 0;
  double dCotisASACPatr = 0;
  double dCotisSATPatr = 0;
  double dCoutTotPatr = 0;

  double dImpot = 0;
  double dImpotEQBT = 0;
  double dCI = 0;
  double dCIM = 0;
  double dCICO2 = 0;
  double dCIC = 0;
  double dCIE = 0;
  double dCISSM = 0;

  Salaire(); 

  double totalBrut() {
    return dBrut + dAvNat;
  }

  double partsTrav() {
    return dCotisCMS + dCotisCME + dCotisCMP;
  }

  double partsPtronales() {
    return dCotisCMS + dCotisCME + dCotisCMP + dCotisSecuPatr + dCotisMutuPatr + dCotisASACPatr + dCotisSATPatr;
  }

  double coutPtronales() {
    return dBrut + dCotisCMS + dCotisCME + dCotisCMP + dCotisSecuPatr + dCotisMutuPatr + dCotisASACPatr + dCotisSATPatr;
  }

  // --- FONCTIONS DE SAUVEGARDE (SÉRIALISATION) ---
  Map<String, dynamic> toJson() {
    return {
      'titreSauvegarde': titreSauvegarde,
      'dateSauvegarde': dateSauvegarde,
      'iAnnee': iAnnee,
      'iMois': iMois,
      'dHMC': dHMC,
      'dBrut': dBrut,
      'dNet': dNet,
      'dAvNat': dAvNat,
      'dDeduc': dDeduc,
      'iclasse': iclasse,
      'swTxImpots': swTxImpots,
      'dTxImpot': dTxImpot,
      'bCalculCI': bCalculCI,
      'bCalculCIM': bCalculCIM,
      'iMutualite': iMutualite,
      'iBonus': iBonus,
      'dTxSAT': dTxSAT,
      'dTxASAC': dTxASAC,
    };
  }

  factory Salaire.fromJson(Map<String, dynamic> json) {
    Salaire s = Salaire();
    s.titreSauvegarde = json['titreSauvegarde'] ?? "";
    s.dateSauvegarde = json['dateSauvegarde'] ?? "";
    s.iAnnee = json['iAnnee'] ?? 2026;
    s.iMois = json['iMois'] ?? 1;
    s.dHMC = json['dHMC'] ?? 173.0;
    s.dBrut = json['dBrut'] ?? 0.0;
    s.dNet = json['dNet'] ?? 0.0;
    s.dAvNat = json['dAvNat'] ?? 0.0;
    s.dDeduc = json['dDeduc'] ?? 0.0;
    s.iclasse = json['iclasse'] ?? 100;
    s.swTxImpots = json['swTxImpots'] ?? false;
    s.dTxImpot = json['dTxImpot'] ?? 0.0;
    s.bCalculCI = json['bCalculCI'] ?? true;
    s.bCalculCIM = json['bCalculCIM'] ?? true;
    s.iMutualite = json['iMutualite'] ?? 1;
    s.iBonus = json['iBonus'] ?? 1;
    s.dTxSAT = json['dTxSAT'] ?? 0.14;
    s.dTxASAC = json['dTxASAC'] ?? 0.75;
    return s;
  }
}