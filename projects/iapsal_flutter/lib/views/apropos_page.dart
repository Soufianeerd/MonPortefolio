import 'package:flutter/material.dart';
import '../l10n/app_localizations.dart';
import 'package:url_launcher/url_launcher.dart';

class AProposPage extends StatelessWidget {
  const AProposPage({super.key});

  Future<void> _launchUrl(String urlString) async {
    final Uri url = Uri.parse(urlString);
    if (!await launchUrl(url)) {
      throw Exception('Could not launch $url');
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(height: 20),
              Center(
                child: Image.asset(
                  'assets/PNG-PXS_NXT_logo_CMYK_V_Col_pos.png',
                  height: 100,
                  errorBuilder: (context, error, stackTrace) => const Text(
                    "Proximus NXT",
                    style: TextStyle(
                      color: Color(0xFF6B2B8E),
                      fontSize: 30,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 30),

              Text(
                l10n.aboutText1,
                textAlign: TextAlign.justify,
                style: const TextStyle(fontSize: 14, height: 1.4),
              ),
              const SizedBox(height: 50),

              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  _buildAppButton(
                    "Apsal",
                    'assets/apsal-icon-blue.png',
                    "https://www.proximusnxt.lu/fr/apsal",
                    Colors.blue,
                  ),
                  _buildAppButton(
                    "Gesall",
                    'assets/G-B.png',
                    "https://www.proximusnxt.lu/fr/gesallnet",
                    Colors.lightBlueAccent,
                  ),
                  _buildAppButton(
                    "Facturation",
                    'assets/F.png',
                    "https://www.proximusnxt.lu/fr/facturation",
                    Colors.orange,
                  ),
                ],
              ),

              const SizedBox(height: 60),

              Text(
                l10n.aboutText2,
                textAlign: TextAlign.justify,
                style: const TextStyle(
                  fontSize: 12,
                  color: Colors.grey,
                  height: 1.4,
                ),
              ),
              const SizedBox(height: 40),

              const Text(
                "© Proximus Luxembourg - iApsal v.2.11.17",
                style: TextStyle(fontSize: 10, color: Colors.grey),
              ),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildAppButton(
    String title,
    String imagePath,
    String url,
    Color fallbackColor,
  ) {
    return GestureDetector(
      onTap: () => _launchUrl(url),
      child: Column(
        children: [
          Text(title, style: const TextStyle(fontSize: 14)),
          const SizedBox(height: 10),
          Image.asset(
            imagePath,
            height: 60,
            width: 60,
            fit: BoxFit.contain,
            errorBuilder: (context, error, stackTrace) =>
                Icon(Icons.apps, size: 60, color: fallbackColor),
          ),
        ],
      ),
    );
  }
}
