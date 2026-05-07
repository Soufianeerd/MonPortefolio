import 'package:flutter/material.dart';
import '../l10n/app_localizations.dart';
import 'package:url_launcher/url_launcher.dart';

class InfosPage extends StatelessWidget {
  const InfosPage({super.key});

  Future<void> _launchUrl(String urlString) async {
    final Uri url = Uri.parse(urlString);
    if (!await launchUrl(url)) {
      throw Exception('Could not launch $url');
    }
  }

  Widget _buildRow(
    String gauche,
    String droite, {
    bool isSubItem = false,
    bool isTitle = false,
    Color? titleColor,
  }) {
    return Padding(
      padding: EdgeInsets.only(
        top: 8.0,
        bottom: 8.0,
        left: isSubItem ? 16.0 : 0.0,
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            flex: 6,
            child: Row(
              children: [
                if (isSubItem)
                  const Icon(
                    Icons.subdirectory_arrow_right,
                    size: 16,
                    color: Colors.grey,
                  ),
                if (isSubItem) const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    gauche,
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: isTitle ? FontWeight.bold : FontWeight.normal,
                      color: titleColor,
                    ),
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            flex: 4,
            child: Text(
              droite,
              textAlign: TextAlign.right,
              style: TextStyle(
                fontSize: 14,
                fontWeight: isTitle ? FontWeight.bold : FontWeight.normal,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTextLink({
    required BuildContext context,
    required String title,
    required String subtitle,
    required IconData icon,
    required VoidCallback onTap,
  }) {
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
        side: BorderSide(color: Colors.grey.shade300),
      ),
      child: ListTile(
        leading: Icon(icon, color: Theme.of(context).primaryColor, size: 28),
        title: Text(
          title,
          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
        ),
        subtitle: Text(subtitle, style: const TextStyle(fontSize: 13)),
        trailing: const Icon(Icons.open_in_new, color: Colors.grey, size: 20),
        onTap: onTap,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final primaryColor = Theme.of(context).primaryColor;
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    final l10n = AppLocalizations.of(context)!;

    final List<Map<String, String>> reglesPaie = [
      {
        "titre": "Salaire Brut",
        "description":
            "C'est la rémunération de base avant toute déduction fiscale ou sociale.",
        "calcul":
            "Salaire de base + Heures supplémentaires + Primes + Avantages en nature.",
      },
      {
        "titre": "Assurance Maladie (Soins & Espèces)",
        "description":
            "Couvre les frais médicaux (Soins) et la perte de salaire en cas de maladie (Espèces).",
        "calcul":
            "Soins : 2,80% du salaire brut cotisable.\nEspèces : 0,25% du salaire brut cotisable.\nPlafonné à 5 fois le Salaire Social Minimum.",
      },
      {
        "titre": "Assurance Pension",
        "description": "Cotisation pour la retraite légale au Luxembourg.",
        "calcul":
            "8,00% du salaire brut cotisable pour l'employé (l'employeur paie aussi 8,00%).",
      },
      {
        "titre": "Assurance Dépendance",
        "description":
            "Contribution obligatoire pour financer l'aide aux personnes dépendantes.",
        "calcul":
            "1,40% du salaire brut, calculé APRÈS la déduction d'un abattement équivalent à 1/4 du Salaire Social Minimum.",
      },
      {
        "titre": "Impôt retenu à la source",
        "description":
            "L'avance sur vos impôts annuels, calculée selon votre classe (1, 1a ou 2).",
        "calcul":
            "Se calcule sur le montant imposable (Brut - Cotisations - Abattements). Barème progressif de l'État.",
      },
      {
        "titre": "CISSM (Crédit d'Impôt)",
        "description":
            "Un coup de pouce de l'État pour garantir un revenu net décent aux bas salaires.",
        "calcul":
            "Jusqu'à 70 €/mois. Diminue progressivement pour les salaires entre 3000 € et 3600 € brut.",
      },
      {
        "titre": "Avantage en Nature",
        "description":
            "Un bien ou service fourni par l'employeur (voiture, chèques repas).",
        "calcul":
            "Ajouté au Brut pour calculer les impôts, puis retiré à la fin (car déjà reçu 'en nature').",
      },
      {
        "titre": "Salaire Net (Net à payer)",
        "description":
            "C'est le montant final qui est réellement viré sur votre compte bancaire à la fin du mois.",
        "calcul":
            "Salaire Brut - Cotisations sociales (employé) - Impôts + Crédits d'impôt - Avantage en nature (déjà perçu).",
      },
      {
        "titre": "Coût Patronal (Coût total)",
        "description":
            "Ce que vous coûtez réellement à votre employeur au final.",
        "calcul":
            "Salaire Brut + Cotisations patronales (Pension, Santé, Mutualité, Assurance Accident, etc.).",
      },
    ];

    return Scaffold(
      appBar: AppBar(title: Text(l10n.infosTitle), centerTitle: true),
      body: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 650),
          child: ListView(
            padding: const EdgeInsets.all(16.0),
            children: [
              const SizedBox(height: 10),

              const Text(
                "Paramètres sociaux",
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              const Text(
                "En vigueur au 01/01/2026",
                style: TextStyle(color: Colors.grey),
              ),
              const SizedBox(height: 16),

              Card(
                elevation: 0,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                  side: BorderSide(color: Colors.grey.shade300),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _buildRow("Indice 100 :", "968,04"),
                      const Divider(),
                      _buildRow("Salaire minimum Garanti I100 :", "279,30"),
                      const Divider(),

                      _buildRow(
                        "Salaire minimum non qualifié :",
                        "",
                        isTitle: true,
                        titleColor: primaryColor,
                      ),
                      _buildRow(
                        "18 ans et +",
                        "2.703,74 €\n(15,6285 /h)",
                        isSubItem: true,
                      ),
                      _buildRow(
                        "17 à 18 ans (80%)",
                        "2.162,99 €\n(12,5028 /h)",
                        isSubItem: true,
                      ),
                      _buildRow(
                        "15 à 17 ans (75%)",
                        "2.027,80 €\n(11,7214 /h)",
                        isSubItem: true,
                      ),
                      const Divider(),

                      _buildRow(
                        "Salaire minimum qualifié :",
                        "",
                        isTitle: true,
                        titleColor: primaryColor,
                      ),
                      _buildRow(
                        "Montant",
                        "3.244,48 €\n(18,7542 /h)",
                        isSubItem: true,
                      ),
                      const Divider(),

                      _buildRow(
                        "Max. cotis. mens. (5 x SSM) :",
                        "13.518,68 €",
                        isTitle: true,
                      ),
                      _buildRow(
                        "Maximum cotisable annuel :",
                        "162.224,16 €",
                        isTitle: true,
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 40),

              Text(
                l10n.payrollLexicon,
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                l10n.lexiconDesc,
                style: const TextStyle(color: Colors.grey),
              ),
              const SizedBox(height: 16),

              ...reglesPaie.map(
                (item) => Card(
                  elevation: 0,
                  margin: const EdgeInsets.only(bottom: 8),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                    side: BorderSide(color: Colors.grey.shade300),
                  ),
                  child: ExpansionTile(
                    collapsedIconColor: primaryColor,
                    iconColor: primaryColor,
                    title: Text(
                      item["titre"]!,
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 15,
                      ),
                    ),
                    childrenPadding: const EdgeInsets.only(
                      left: 16,
                      right: 16,
                      bottom: 16,
                    ),
                    children: [
                      Align(
                        alignment: Alignment.centerLeft,
                        child: Text(
                          item["description"]!,
                          style: TextStyle(
                            fontSize: 14,
                            color: isDarkMode ? Colors.white70 : Colors.black87,
                          ),
                        ),
                      ),
                      const SizedBox(height: 12),
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: isDarkMode
                              ? Colors.grey.shade900
                              : Colors.grey.shade100,
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Icon(
                              Icons.info_outline,
                              color: primaryColor,
                              size: 18,
                            ),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                item["calcul"]!,
                                style: TextStyle(
                                  fontSize: 13,
                                  color: isDarkMode
                                      ? Colors.white60
                                      : Colors.black87,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 40),

              Text(
                l10n.usefulLinks,
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 16),

              _buildTextLink(
                context: context,
                title: "Centre commun de la sécurité sociale",
                subtitle: "ccss.public.lu",
                icon: Icons.account_balance,
                onTap: () => _launchUrl("https://ccss.public.lu/fr.html"),
              ),

              const SizedBox(height: 8),

              _buildTextLink(
                context: context,
                title: "MyGuichet.lu",
                subtitle: "guichet.public.lu",
                icon: Icons.language,
                onTap: () => _launchUrl(
                  "https://guichet.public.lu/fr/citoyens/myguichet.html",
                ),
              ),

              const SizedBox(height: 40),
            ],
          ),
        ),
      ),
    );
  }
}
