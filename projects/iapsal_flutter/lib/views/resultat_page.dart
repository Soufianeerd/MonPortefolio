import 'dart:convert';
import 'package:flutter/material.dart';
import '../l10n/app_localizations.dart';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:printing/printing.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/salaire.dart';
import '../calculators/calcul_salaire.dart';

class ResultatPage extends StatefulWidget {
  final Salaire salaire;
  final String titre;

  const ResultatPage({super.key, required this.salaire, required this.titre});

  @override
  State<ResultatPage> createState() => _ResultatPageState();
}

class _ResultatPageState extends State<ResultatPage> {
  late Salaire _sal;
  double _sliderValue = 0;
  late double _brutDeDepart;

  @override
  void initState() {
    super.initState();
    _sal = widget.salaire;
    _brutDeDepart = widget.salaire.dBrut;
  }

  Salaire _copierSalaire(Salaire original) {
    Salaire newSal = Salaire();
    newSal.iAnnee = original.iAnnee;
    newSal.iMois = original.iMois;
    newSal.dHMC = original.dHMC;
    newSal.iclasse = original.iclasse;
    newSal.bCalculCI = original.bCalculCI;
    newSal.bCalculCIM = original.bCalculCIM;
    newSal.swTxImpots = original.swTxImpots;
    newSal.dTxImpot = original.dTxImpot;
    newSal.dAvNat = original.dAvNat;
    newSal.dDeduc = original.dDeduc;
    newSal.iMutualite = original.iMutualite;
    newSal.iBonus = original.iBonus;
    newSal.dTxSAT = original.dTxSAT;
    newSal.dTxASAC = original.dTxASAC;
    newSal.dBrut = original.dBrut;
    newSal.dNet = original.dNet;
    return newSal;
  }

  void _recalculer() {
    Salaire updatedSal = _copierSalaire(widget.salaire);
    updatedSal.dBrut = _brutDeDepart + _sliderValue;

    CalculSalaire().calculBrutNet(updatedSal);
    setState(() {
      _sal = updatedSal;
    });
  }

  Future<void> _sauvegarderSimulation() async {
    final l10n = AppLocalizations.of(context)!;
    TextEditingController nomController = TextEditingController();

    String? nomSauvegarde = await showDialog<String>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(l10n.saveSim),
        content: TextField(
          controller: nomController,
          decoration: const InputDecoration(
            hintText: "Ex: Offre Google, Promo 2026...",
          ),
          autofocus: true,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(l10n.cancel),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(context, nomController.text),
            child: Text(l10n.record),
          ),
        ],
      ),
    );

    if (nomSauvegarde == null || nomSauvegarde.isEmpty) return;

    _sal.titreSauvegarde = nomSauvegarde;
    _sal.dateSauvegarde =
        "${DateTime.now().day.toString().padLeft(2, '0')}/${DateTime.now().month.toString().padLeft(2, '0')}/${DateTime.now().year}";

    final prefs = await SharedPreferences.getInstance();
    final List<String> jsonList =
        prefs.getStringList('historique_salaires') ?? [];

    jsonList.add(jsonEncode(_sal.toJson()));
    await prefs.setStringList('historique_salaires', jsonList);

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Simulation "$nomSauvegarde" sauvegardée !'),
          backgroundColor: Colors.green,
        ),
      );
    }
  }

  Future<void> _genererEtPartagerPDF() async {
    final pdf = pw.Document();

    pdf.addPage(
      pw.Page(
        pageFormat: PdfPageFormat.a4,
        build: (pw.Context context) {
          return pw.Column(
            crossAxisAlignment: pw.CrossAxisAlignment.stretch,
            children: [
              pw.Text(
                "Simulation Salariale - iApsal",
                style: pw.TextStyle(
                  fontSize: 24,
                  fontWeight: pw.FontWeight.bold,
                  color: PdfColors.purple800,
                ),
              ),
              pw.SizedBox(height: 30),

              _buildPdfLigne("Brut :", _sal.dBrut),
              _buildPdfLigne("Avantage en Nature :", _sal.dAvNat),
              _buildPdfLigne(
                "Total Brut :",
                _sal.totalBrut(),
                isBold: true,
                color: PdfColors.purple800,
              ),

              pw.Divider(),
              pw.Text(
                "Cotisations :",
                style: pw.TextStyle(
                  fontWeight: pw.FontWeight.bold,
                  color: PdfColors.purple800,
                ),
              ),
              _buildPdfLigne("Soins (2,8%) :", _sal.dCotisCMS, indent: true),
              _buildPdfLigne("Espèce (0,25%) :", _sal.dCotisCME, indent: true),
              _buildPdfLigne(
                "Pension (${_sal.dTxCMP.toStringAsFixed(2)}%) :",
                _sal.dCotisCMP,
                indent: true,
              ),
              _buildPdfLigne(
                "Total cotisations :",
                _sal.partsTrav(),
                isBold: true,
                color: PdfColors.purple800,
              ),

              pw.Divider(),
              pw.Text(
                "Contributions :",
                style: pw.TextStyle(
                  fontWeight: pw.FontWeight.bold,
                  color: PdfColors.purple800,
                ),
              ),
              _buildPdfLigne("Abattements :", _sal.dDeduc, indent: true),
              _buildPdfLigne("Imposable :", _sal.dimposable, indent: true),
              _buildPdfLigne(
                "Impôts :",
                _sal.dImpot,
                isBold: true,
                color: PdfColors.purple800,
              ),
              _buildPdfLigne("CISSM :", _sal.dCISSM, indent: true),
              _buildPdfLigne("Crédit d'impôt :", _sal.dCI, indent: true),
              if (_sal.dCIE > 0)
                _buildPdfLigne("CIE :", _sal.dCIE, indent: true),
              if (_sal.dCIM > 0)
                _buildPdfLigne("CIM :", _sal.dCIM, indent: true),
              if (_sal.iAnnee >= 2024)
                _buildPdfLigne("CI-CO2 :", _sal.dCICO2, indent: true)
              else if (_sal.dCIC > 0)
                _buildPdfLigne("CIC :", _sal.dCIC, indent: true),

              pw.Divider(),
              _buildPdfLigne(
                "Avantage en Nature :",
                _sal.dAvNat,
                color: PdfColors.purple800,
              ),
              _buildPdfLigne(
                "Caisse Dépendance (1,4%) :",
                _sal.dCotisDep,
                color: PdfColors.purple800,
              ),

              pw.Divider(thickness: 2),
              _buildPdfLigne(
                "Salaire Net :",
                _sal.dNet,
                isBold: true,
                color: PdfColors.purple800,
              ),

              pw.SizedBox(height: 30),
              _buildPdfLigne(
                "Coût patronal :",
                _sal.partsPtronales(),
                color: PdfColors.grey700,
              ),
              _buildPdfLigne(
                "Coût total :",
                _sal.coutPtronales(),
                color: PdfColors.grey700,
              ),

              pw.Spacer(),
              pw.Text(
                "(c) Proximus NXT Apsal - Calculs basés sur les paramètres ${_sal.iMois}/${_sal.iAnnee}",
                textAlign: pw.TextAlign.center,
                style: const pw.TextStyle(color: PdfColors.red, fontSize: 10),
              ),
            ],
          );
        },
      ),
    );

    await Printing.sharePdf(
      bytes: await pdf.save(),
      filename: 'simulation_iApsal.pdf',
    );
  }

  pw.Widget _buildPdfLigne(
    String label,
    double valeur, {
    bool isBold = false,
    PdfColor? color,
    bool indent = false,
  }) {
    return pw.Padding(
      padding: pw.EdgeInsets.only(top: 4, bottom: 4, left: indent ? 20.0 : 0.0),
      child: pw.Row(
        mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
        children: [
          pw.Text(
            label,
            style: pw.TextStyle(
              fontWeight: isBold ? pw.FontWeight.bold : pw.FontWeight.normal,
              color: color,
              fontSize: 12,
            ),
          ),
          pw.Text(
            valeur.toStringAsFixed(2),
            style: pw.TextStyle(
              fontWeight: isBold ? pw.FontWeight.bold : pw.FontWeight.normal,
              color: color,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLigne(
    String label,
    double valeur, {
    bool isBold = false,
    Color? color,
    bool indent = false,
  }) {
    return Padding(
      padding: EdgeInsets.only(
        top: 6.0,
        bottom: 6.0,
        left: indent ? 16.0 : 0.0,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: TextStyle(
              fontWeight: isBold ? FontWeight.bold : FontWeight.normal,
              color: color,
              fontSize: 14,
            ),
          ),
          Text(
            valeur.toStringAsFixed(2),
            style: TextStyle(
              fontWeight: isBold ? FontWeight.bold : FontWeight.normal,
              color: color,
              fontSize: 14,
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    Color purpleColor = Theme.of(context).primaryColor;
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    final l10n = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.titre),
        actions: [
          IconButton(
            icon: const Icon(Icons.save_outlined),
            tooltip: l10n.save,
            onPressed: _sauvegarderSimulation,
          ),
          IconButton(
            icon: const Icon(Icons.ios_share),
            tooltip: "Partager PDF",
            onPressed: _genererEtPartagerPDF,
          ),
        ],
      ),
      body: Center(
        child: Container(
          constraints: const BoxConstraints(maxWidth: 600),
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                _buildLigne("Brut :", _sal.dBrut),
                _buildLigne("Avantage en Nature :", _sal.dAvNat),
                _buildLigne(
                  "Total Brut :",
                  _sal.totalBrut(),
                  color: purpleColor,
                  isBold: true,
                ),

                const SizedBox(height: 10),
                Text(
                  "Cotisations :",
                  style: TextStyle(
                    color: purpleColor,
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                  ),
                ),
                _buildLigne("Soins (2,8%) :", _sal.dCotisCMS, indent: true),
                _buildLigne("Espèce (0,25%) :", _sal.dCotisCME, indent: true),
                _buildLigne(
                  "Pension (${_sal.dTxCMP.toStringAsFixed(2)}%) :",
                  _sal.dCotisCMP,
                  indent: true,
                ),
                _buildLigne(
                  "Total cotisations :",
                  _sal.partsTrav(),
                  color: purpleColor,
                  isBold: true,
                ),

                const SizedBox(height: 10),
                Text(
                  "Contributions :",
                  style: TextStyle(
                    color: purpleColor,
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                  ),
                ),
                _buildLigne("Abattements :", _sal.dDeduc, indent: true),
                _buildLigne("Imposable :", _sal.dimposable, indent: true),
                _buildLigne(
                  "Impôts :",
                  _sal.dImpot,
                  color: purpleColor,
                  isBold: true,
                ),
                _buildLigne("CISSM :", _sal.dCISSM, indent: true),
                _buildLigne("Crédit d'impôt :", _sal.dCI, indent: true),
                if (_sal.dCIE > 0)
                  _buildLigne("CIE :", _sal.dCIE, indent: true),
                if (_sal.dCIM > 0)
                  _buildLigne("CIM :", _sal.dCIM, indent: true),
                if (_sal.iAnnee >= 2024)
                  _buildLigne("CI-CO2 :", _sal.dCICO2, indent: true)
                else if (_sal.dCIC > 0)
                  _buildLigne("CIC :", _sal.dCIC, indent: true),

                const SizedBox(height: 10),
                _buildLigne(
                  "Avantage en Nature :",
                  _sal.dAvNat,
                  color: purpleColor,
                ),
                _buildLigne(
                  "Caisse Dépendance (1,4%) :",
                  _sal.dCotisDep,
                  color: purpleColor,
                ),

                const SizedBox(height: 10),
                _buildLigne(
                  "Salaire Net :",
                  _sal.dNet,
                  color: purpleColor,
                  isBold: true,
                ),

                const SizedBox(height: 20),
                _buildLigne(
                  "Coût patronal :",
                  _sal.partsPtronales(),
                  color: Colors.grey,
                ),
                _buildLigne(
                  "Coût total :",
                  _sal.coutPtronales(),
                  color: Colors.grey,
                ),

                const SizedBox(height: 30),
                Text(
                  "Modifiez le résultat en bougeant le curseur",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 12,
                    color: isDarkMode ? Colors.white70 : Colors.black87,
                  ),
                ),
                Slider(
                  value: _sliderValue,
                  min: -5000,
                  max: 5000,
                  activeColor: purpleColor,
                  inactiveColor: isDarkMode
                      ? const Color(0xFF1C1C1E)
                      : Colors.grey.shade300,
                  onChanged: (val) {
                    setState(() {
                      _sliderValue = val;
                      _recalculer();
                    });
                  },
                ),
                const SizedBox(height: 10),
                Text(
                  "(c) Proximus NXT Apsal - Calculs basés sur les paramètres ${_sal.iMois}/${_sal.iAnnee}",
                  textAlign: TextAlign.center,
                  style: const TextStyle(color: Colors.red, fontSize: 10),
                ),
                const SizedBox(height: 20),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
