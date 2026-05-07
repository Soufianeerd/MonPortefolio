import 'package:flutter/material.dart';
import '../l10n/app_localizations.dart';
import 'brut_net_page.dart';
import 'net_brut_page.dart';
import 'historique_page.dart';
import 'infos_page.dart';
import 'apropos_page.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const BrutNetPage(),
    const NetBrutPage(),
    const HistoriquePage(),
    const InfosPage(),
    const AProposPage(),
  ];

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    final l10n = AppLocalizations.of(context)!;

    return Scaffold(
      body: _screens[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        backgroundColor: isDarkMode ? const Color(0xFF1C1C1E) : Colors.white,
        type: BottomNavigationBarType.fixed,
        selectedItemColor: const Color(0xFFD694D1),
        unselectedItemColor: Colors.grey,
        selectedFontSize: 12,
        unselectedFontSize: 12,
        items: [
          BottomNavigationBarItem(
            icon: const Icon(Icons.download),
            label: l10n.navBrutNet,
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.upload),
            label: l10n.navNetBrut,
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.history),
            label: l10n.navHistory,
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.info),
            label: l10n.navInfos,
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.help),
            label: l10n.navAbout,
          ),
        ],
      ),
    );
  }
}
