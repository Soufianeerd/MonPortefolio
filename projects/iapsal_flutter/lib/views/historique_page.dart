import 'dart:convert';
import 'package:flutter/material.dart';
import '../l10n/app_localizations.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/salaire.dart';
import '../calculators/calcul_salaire.dart';
import 'resultat_page.dart';

class HistoriquePage extends StatefulWidget {
  const HistoriquePage({super.key});

  @override
  State<HistoriquePage> createState() => _HistoriquePageState();
}

class _HistoriquePageState extends State<HistoriquePage> {
  List<Salaire> _sauvegardes = [];

  @override
  void initState() {
    super.initState();
    _chargerHistorique();
  }

  Future<void> _chargerHistorique() async {
    final prefs = await SharedPreferences.getInstance();
    final List<String>? jsonList = prefs.getStringList('historique_salaires');

    if (jsonList != null) {
      setState(() {
        _sauvegardes = jsonList
            .map((jsonStr) => Salaire.fromJson(jsonDecode(jsonStr)))
            .toList();
      });
    }
  }

  Future<void> _supprimerSauvegarde(int index) async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _sauvegardes.removeAt(index);
    });

    final List<String> updatedJsonList = _sauvegardes
        .map((s) => jsonEncode(s.toJson()))
        .toList();
    await prefs.setStringList('historique_salaires', updatedJsonList);
  }

  void _ouvrirSimulation(Salaire salaireSauvegarde) {
    CalculSalaire().calculBrutNet(salaireSauvegarde);

    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => ResultatPage(
          salaire: salaireSauvegarde,
          titre: salaireSauvegarde.titreSauvegarde,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    final l10n = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(title: Text(l10n.navHistory)),
      body: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 650),
          child: _sauvegardes.isEmpty
              ? Center(
                  child: Text(
                    l10n.noHistory,
                    style: TextStyle(color: Colors.grey.shade500, fontSize: 16),
                  ),
                )
              : ListView.builder(
                  padding: const EdgeInsets.all(16.0),
                  itemCount: _sauvegardes.length,
                  itemBuilder: (context, index) {
                    final sal = _sauvegardes[index];
                    return Card(
                      margin: const EdgeInsets.only(bottom: 12),
                      child: ListTile(
                        contentPadding: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 8,
                        ),
                        title: Text(
                          sal.titreSauvegarde,
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                        subtitle: Text(
                          "${sal.dateSauvegarde}\nBrut: ${sal.dBrut.toStringAsFixed(2)} €  •  Net: ${sal.dNet.toStringAsFixed(2)} €",
                          style: TextStyle(
                            color: isDarkMode ? Colors.white70 : Colors.black87,
                          ),
                        ),
                        trailing: IconButton(
                          icon: const Icon(
                            Icons.delete_outline,
                            color: Colors.red,
                          ),
                          onPressed: () => _supprimerSauvegarde(index),
                        ),
                        onTap: () => _ouvrirSimulation(sal),
                      ),
                    );
                  },
                ),
        ),
      ),
    );
  }
}
