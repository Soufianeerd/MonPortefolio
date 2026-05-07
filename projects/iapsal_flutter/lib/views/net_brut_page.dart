import 'package:flutter/material.dart';
import '../l10n/app_localizations.dart';
import '../models/salaire.dart';
import '../calculators/calcul_salaire.dart';
import 'resultat_page.dart';

class NetBrutPage extends StatefulWidget {
  const NetBrutPage({super.key});

  @override
  State<NetBrutPage> createState() => _NetBrutPageState();
}

class _NetBrutPageState extends State<NetBrutPage> {
  int _iAnnee = 2026;
  int _iMoisCalcul = 1;
  int _iclsImpots = 100;
  int _iclsMutu = 1;
  int _iclsBonus = 1;

  bool _swTxImpots = false;
  bool _bCalculCI = true;
  bool _bCalculCIM = true;
  bool _bCalculCIE = false;
  bool _showCIE = false;

  final TextEditingController _netController = TextEditingController();
  final TextEditingController _hmcController = TextEditingController(
    text: "173.00",
  );
  final TextEditingController _avNatController = TextEditingController();
  final TextEditingController _deducController = TextEditingController();
  final TextEditingController _txImpotController = TextEditingController();
  final TextEditingController _txAAController = TextEditingController(
    text: "0.65",
  );
  final TextEditingController _txSTController = TextEditingController(
    text: "0.14",
  );

  @override
  void initState() {
    super.initState();
    _updateAnnee(_iAnnee);
  }

  void _updateAnnee(int annee) {
    setState(() {
      _iAnnee = annee;
      if (annee == 2026 || annee == 2025 || annee == 2024) {
        _iMoisCalcul = annee == 2025 ? 5 : 1;
        _txAAController.text = annee == 2026 ? "0.65" : "0.70";
        _showCIE = false;
        _bCalculCIE = false;
      } else if (annee == 2023) {
        _iMoisCalcul = 9;
        _txAAController.text = "0.75";
        _showCIE = true;
      } else {
        _iMoisCalcul = 1;
        _txAAController.text = "0.70";
        _showCIE = true;
      }
    });
  }

  void _montrerInfo(String message) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(AppLocalizations.of(context)!.information),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: Text(AppLocalizations.of(context)!.ok),
          ),
        ],
      ),
    );
  }

  void _calculer() {
    final l10n = AppLocalizations.of(context)!;
    if (_netController.text.isEmpty) {
      _montrerInfo(l10n.infoReqNet);
      return;
    }

    Salaire loSalaire = Salaire();
    loSalaire.iAnnee = _iAnnee;
    loSalaire.iMois = _iMoisCalcul;
    loSalaire.dHMC =
        double.tryParse(_hmcController.text.replaceAll(',', '.')) ?? 173.0;
    loSalaire.dNet =
        double.tryParse(_netController.text.replaceAll(',', '.')) ?? 0;
    loSalaire.dBrut = 0;
    loSalaire.iclasse = _iclsImpots;
    loSalaire.bCalculCI = _bCalculCI;
    loSalaire.bCalculCIM = _bCalculCIM;
    loSalaire.swTxImpots = _swTxImpots;
    loSalaire.dTxImpot =
        double.tryParse(_txImpotController.text.replaceAll(',', '.')) ?? 0;
    loSalaire.dAvNat =
        double.tryParse(_avNatController.text.replaceAll(',', '.')) ?? 0;
    loSalaire.dDeduc =
        double.tryParse(_deducController.text.replaceAll(',', '.')) ?? 0;
    loSalaire.iMutualite = _iclsMutu;
    loSalaire.iBonus = _iclsBonus;
    loSalaire.dTxSAT =
        double.tryParse(_txSTController.text.replaceAll(',', '.')) ?? 0.14;
    loSalaire.dTxASAC =
        double.tryParse(_txAAController.text.replaceAll(',', '.')) ?? 0.75;

    bool lResult = CalculSalaire().calculNetBrut(loSalaire);

    if (lResult) {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) =>
              ResultatPage(salaire: loSalaire, titre: l10n.titleNetBrut),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(title: Text(l10n.titleNetBrut)),
      body: GestureDetector(
        onTap: () => FocusScope.of(context).unfocus(),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 650),
            child: ListView(
              padding: const EdgeInsets.all(16.0),
              children: [
                Text(
                  l10n.subtitleNetBrut,
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Theme.of(context).primaryColor,
                  ),
                ),
                const SizedBox(height: 8),
                Text(l10n.descNetBrut),
                const SizedBox(height: 24),

                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Wrap(
                          alignment: WrapAlignment.spaceBetween,
                          crossAxisAlignment: WrapCrossAlignment.center,
                          spacing: 8.0,
                          runSpacing: 8.0,
                          children: [
                            Text(
                              l10n.calcYear,
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                DropdownButton<int>(
                                  value: _iMoisCalcul,
                                  items: [1, 4, 5, 9]
                                      .map(
                                        (m) => DropdownMenuItem(
                                          value: m,
                                          child: Text("${l10n.month} $m"),
                                        ),
                                      )
                                      .toList(),
                                  onChanged: (val) =>
                                      setState(() => _iMoisCalcul = val!),
                                ),
                                const SizedBox(width: 8),
                                IconButton(
                                  icon: const Icon(Icons.remove_circle_outline),
                                  onPressed: _iAnnee > 2022
                                      ? () => _updateAnnee(_iAnnee - 1)
                                      : null,
                                ),
                                Text(
                                  "$_iAnnee",
                                  style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 16,
                                  ),
                                ),
                                IconButton(
                                  icon: const Icon(Icons.add_circle_outline),
                                  onPressed: _iAnnee < 2026
                                      ? () => _updateAnnee(_iAnnee + 1)
                                      : null,
                                ),
                              ],
                            ),
                          ],
                        ),
                        const Divider(),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            Expanded(
                              flex: 2,
                              child: TextFormField(
                                controller: _netController,
                                keyboardType:
                                    const TextInputType.numberWithOptions(
                                      decimal: true,
                                    ),
                                decoration: InputDecoration(
                                  labelText: l10n.netSalary,
                                ),
                              ),
                            ),
                            const SizedBox(width: 16),
                            Expanded(
                              flex: 1,
                              child: TextFormField(
                                controller: _hmcController,
                                keyboardType:
                                    const TextInputType.numberWithOptions(
                                      decimal: true,
                                    ),
                                decoration: const InputDecoration(
                                  labelText: "HMC",
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                        TextFormField(
                          controller: _avNatController,
                          keyboardType: const TextInputType.numberWithOptions(
                            decimal: true,
                          ),
                          decoration: InputDecoration(
                            labelText: l10n.benefits,
                            suffixIcon: IconButton(
                              icon: const Icon(Icons.info_outline),
                              onPressed: () => _montrerInfo(l10n.infoBenefits),
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),
                        TextFormField(
                          controller: _deducController,
                          keyboardType: const TextInputType.numberWithOptions(
                            decimal: true,
                          ),
                          decoration: InputDecoration(
                            labelText: l10n.deductions,
                            suffixIcon: IconButton(
                              icon: const Icon(Icons.info_outline),
                              onPressed: () =>
                                  _montrerInfo(l10n.infoDeductions),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),

                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          l10n.taxation,
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                        const SizedBox(height: 16),
                        DropdownButtonFormField<int>(
                          decoration: InputDecoration(labelText: l10n.taxClass),
                          initialValue: _iclsImpots,
                          items: [
                            DropdownMenuItem(
                              value: 100,
                              child: Text(l10n.single),
                            ),
                            DropdownMenuItem(
                              value: 200,
                              child: Text(l10n.married),
                            ),
                            DropdownMenuItem(
                              value: 300,
                              child: Text(l10n.otherClass),
                            ),
                          ],
                          onChanged: (val) =>
                              setState(() => _iclsImpots = val!),
                        ),
                        const SizedBox(height: 16),
                        Row(
                          children: [
                            Expanded(
                              child: SwitchListTile(
                                title: Text(l10n.manualRate),
                                value: _swTxImpots,
                                onChanged: (val) =>
                                    setState(() => _swTxImpots = val),
                                contentPadding: EdgeInsets.zero,
                              ),
                            ),
                            Expanded(
                              child: TextFormField(
                                controller: _txImpotController,
                                enabled: _swTxImpots,
                                keyboardType:
                                    const TextInputType.numberWithOptions(
                                      decimal: true,
                                    ),
                                decoration: InputDecoration(
                                  labelText: l10n.ratePct,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const Divider(),
                        SwitchListTile(
                          title: Text(l10n.taxCreditCISP),
                          value: _bCalculCI,
                          onChanged: (val) => setState(() => _bCalculCI = val),
                          contentPadding: EdgeInsets.zero,
                        ),
                        SwitchListTile(
                          title: Text(l10n.taxCreditCIM),
                          value: _bCalculCIM,
                          onChanged: (val) => setState(() => _bCalculCIM = val),
                          contentPadding: EdgeInsets.zero,
                        ),
                        if (_showCIE)
                          SwitchListTile(
                            title: Text(l10n.taxCreditCIE),
                            value: _bCalculCIE,
                            onChanged: (val) =>
                                setState(() => _bCalculCIE = val),
                            contentPadding: EdgeInsets.zero,
                          ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),

                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          l10n.employerParts,
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                        const SizedBox(height: 16),
                        DropdownButtonFormField<int>(
                          decoration: InputDecoration(labelText: l10n.mutual),
                          initialValue: _iclsMutu,
                          items: [
                            DropdownMenuItem(
                              value: 1,
                              child: Text(l10n.class1),
                            ),
                            DropdownMenuItem(
                              value: 2,
                              child: Text(l10n.class2),
                            ),
                            DropdownMenuItem(
                              value: 3,
                              child: Text(l10n.class3),
                            ),
                            DropdownMenuItem(
                              value: 4,
                              child: Text(l10n.class4),
                            ),
                          ],
                          onChanged: (val) => setState(() => _iclsMutu = val!),
                        ),
                        const SizedBox(height: 16),
                        Row(
                          children: [
                            Expanded(
                              flex: 2,
                              child: TextFormField(
                                controller: _txAAController,
                                keyboardType:
                                    const TextInputType.numberWithOptions(
                                      decimal: true,
                                    ),
                                decoration: InputDecoration(
                                  labelText: l10n.accidentIns,
                                ),
                              ),
                            ),
                            const SizedBox(width: 16),
                            Expanded(
                              flex: 2,
                              child: DropdownButtonFormField<int>(
                                decoration: InputDecoration(
                                  labelText: l10n.bonus,
                                ),
                                initialValue: _iclsBonus,
                                items: const [
                                  DropdownMenuItem(
                                    value: 1,
                                    child: Text("0,85"),
                                  ),
                                  DropdownMenuItem(
                                    value: 2,
                                    child: Text("1,00"),
                                  ),
                                  DropdownMenuItem(
                                    value: 3,
                                    child: Text("1,10"),
                                  ),
                                  DropdownMenuItem(
                                    value: 4,
                                    child: Text("1,50"),
                                  ),
                                ],
                                onChanged: (val) =>
                                    setState(() => _iclsBonus = val!),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                        TextFormField(
                          controller: _txSTController,
                          keyboardType: const TextInputType.numberWithOptions(
                            decimal: true,
                          ),
                          decoration: InputDecoration(
                            labelText: l10n.healthWork,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                const SizedBox(height: 24),

                FilledButton(
                  onPressed: _calculer,
                  child: Text(
                    l10n.btnCalculate,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                const SizedBox(height: 40),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
