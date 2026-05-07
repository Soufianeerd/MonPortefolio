import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_ar.dart';
import 'app_localizations_de.dart';
import 'app_localizations_en.dart';
import 'app_localizations_es.dart';
import 'app_localizations_fr.dart';
import 'app_localizations_it.dart';
import 'app_localizations_lb.dart';
import 'app_localizations_pt.dart';
import 'app_localizations_ru.dart';
import 'app_localizations_zh.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'l10n/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale)
    : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates =
      <LocalizationsDelegate<dynamic>>[
        delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[
    Locale('ar'),
    Locale('de'),
    Locale('en'),
    Locale('es'),
    Locale('fr'),
    Locale('it'),
    Locale('lb'),
    Locale('pt'),
    Locale('ru'),
    Locale('zh'),
  ];

  /// No description provided for @navBrutNet.
  ///
  /// In fr, this message translates to:
  /// **'Brut-Net'**
  String get navBrutNet;

  /// No description provided for @navNetBrut.
  ///
  /// In fr, this message translates to:
  /// **'Net-Brut'**
  String get navNetBrut;

  /// No description provided for @navHistory.
  ///
  /// In fr, this message translates to:
  /// **'Historique'**
  String get navHistory;

  /// No description provided for @navInfos.
  ///
  /// In fr, this message translates to:
  /// **'Infos'**
  String get navInfos;

  /// No description provided for @navAbout.
  ///
  /// In fr, this message translates to:
  /// **'À propos'**
  String get navAbout;

  /// No description provided for @titleBrutNet.
  ///
  /// In fr, this message translates to:
  /// **'Calcul Brut-Net'**
  String get titleBrutNet;

  /// No description provided for @titleNetBrut.
  ///
  /// In fr, this message translates to:
  /// **'Calcul Net-Brut'**
  String get titleNetBrut;

  /// No description provided for @subtitleBrutNet.
  ///
  /// In fr, this message translates to:
  /// **'Du brut au net'**
  String get subtitleBrutNet;

  /// No description provided for @subtitleNetBrut.
  ///
  /// In fr, this message translates to:
  /// **'Du net au brut'**
  String get subtitleNetBrut;

  /// No description provided for @descBrutNet.
  ///
  /// In fr, this message translates to:
  /// **'Renseignez vos données, iApsal calcule votre salaire net.'**
  String get descBrutNet;

  /// No description provided for @descNetBrut.
  ///
  /// In fr, this message translates to:
  /// **'Renseignez le net désiré, iApsal calcule le brut correspondant.'**
  String get descNetBrut;

  /// No description provided for @calcYear.
  ///
  /// In fr, this message translates to:
  /// **'Année de calcul'**
  String get calcYear;

  /// No description provided for @month.
  ///
  /// In fr, this message translates to:
  /// **'Mois'**
  String get month;

  /// No description provided for @grossSalary.
  ///
  /// In fr, this message translates to:
  /// **'Salaire brut (€)'**
  String get grossSalary;

  /// No description provided for @netSalary.
  ///
  /// In fr, this message translates to:
  /// **'Salaire Net (€)'**
  String get netSalary;

  /// No description provided for @benefits.
  ///
  /// In fr, this message translates to:
  /// **'Avantage en nature (€)'**
  String get benefits;

  /// No description provided for @deductions.
  ///
  /// In fr, this message translates to:
  /// **'Déductions (€)'**
  String get deductions;

  /// No description provided for @taxation.
  ///
  /// In fr, this message translates to:
  /// **'Fiscalité'**
  String get taxation;

  /// No description provided for @taxClass.
  ///
  /// In fr, this message translates to:
  /// **'Classe d\'impôt'**
  String get taxClass;

  /// No description provided for @single.
  ///
  /// In fr, this message translates to:
  /// **'Célibataire (1)'**
  String get single;

  /// No description provided for @married.
  ///
  /// In fr, this message translates to:
  /// **'Marié (2)'**
  String get married;

  /// No description provided for @otherClass.
  ///
  /// In fr, this message translates to:
  /// **'Autre (1a)'**
  String get otherClass;

  /// No description provided for @manualRate.
  ///
  /// In fr, this message translates to:
  /// **'Taux manuel'**
  String get manualRate;

  /// No description provided for @ratePct.
  ///
  /// In fr, this message translates to:
  /// **'Taux (%)'**
  String get ratePct;

  /// No description provided for @taxCreditCISP.
  ///
  /// In fr, this message translates to:
  /// **'Crédit d\'impôt (CISP)'**
  String get taxCreditCISP;

  /// No description provided for @taxCreditCIM.
  ///
  /// In fr, this message translates to:
  /// **'Crédit d\'impôt (CIM)'**
  String get taxCreditCIM;

  /// No description provided for @taxCreditCIE.
  ///
  /// In fr, this message translates to:
  /// **'Crédit d\'impôt (CIE)'**
  String get taxCreditCIE;

  /// No description provided for @employerParts.
  ///
  /// In fr, this message translates to:
  /// **'Parts Patronales'**
  String get employerParts;

  /// No description provided for @mutual.
  ///
  /// In fr, this message translates to:
  /// **'Mutualité'**
  String get mutual;

  /// No description provided for @class1.
  ///
  /// In fr, this message translates to:
  /// **'Classe 1'**
  String get class1;

  /// No description provided for @class2.
  ///
  /// In fr, this message translates to:
  /// **'Classe 2'**
  String get class2;

  /// No description provided for @class3.
  ///
  /// In fr, this message translates to:
  /// **'Classe 3'**
  String get class3;

  /// No description provided for @class4.
  ///
  /// In fr, this message translates to:
  /// **'Classe 4'**
  String get class4;

  /// No description provided for @accidentIns.
  ///
  /// In fr, this message translates to:
  /// **'Ass. Accident'**
  String get accidentIns;

  /// No description provided for @bonus.
  ///
  /// In fr, this message translates to:
  /// **'Bonus'**
  String get bonus;

  /// No description provided for @healthWork.
  ///
  /// In fr, this message translates to:
  /// **'Santé au Travail'**
  String get healthWork;

  /// No description provided for @btnCalculate.
  ///
  /// In fr, this message translates to:
  /// **'Calculer'**
  String get btnCalculate;

  /// No description provided for @infoReqGross.
  ///
  /// In fr, this message translates to:
  /// **'Veuillez renseigner un salaire brut s.v.p.'**
  String get infoReqGross;

  /// No description provided for @infoReqNet.
  ///
  /// In fr, this message translates to:
  /// **'Veuillez renseigner un salaire net s.v.p.'**
  String get infoReqNet;

  /// No description provided for @infoBenefits.
  ///
  /// In fr, this message translates to:
  /// **'Total des avantages en nature imposables'**
  String get infoBenefits;

  /// No description provided for @infoDeductions.
  ///
  /// In fr, this message translates to:
  /// **'Total des déductions indiquées sur votre fiche d\'impôts'**
  String get infoDeductions;

  /// No description provided for @information.
  ///
  /// In fr, this message translates to:
  /// **'Information'**
  String get information;

  /// No description provided for @ok.
  ///
  /// In fr, this message translates to:
  /// **'OK'**
  String get ok;

  /// No description provided for @saveSim.
  ///
  /// In fr, this message translates to:
  /// **'Sauvegarder la simulation'**
  String get saveSim;

  /// No description provided for @save.
  ///
  /// In fr, this message translates to:
  /// **'Sauvegarder'**
  String get save;

  /// No description provided for @cancel.
  ///
  /// In fr, this message translates to:
  /// **'Annuler'**
  String get cancel;

  /// No description provided for @record.
  ///
  /// In fr, this message translates to:
  /// **'Enregistrer'**
  String get record;

  /// No description provided for @noHistory.
  ///
  /// In fr, this message translates to:
  /// **'Aucune simulation sauvegardée.'**
  String get noHistory;

  /// No description provided for @infosTitle.
  ///
  /// In fr, this message translates to:
  /// **'Informations & Lexique'**
  String get infosTitle;

  /// No description provided for @socialParams.
  ///
  /// In fr, this message translates to:
  /// **'Paramètres sociaux'**
  String get socialParams;

  /// No description provided for @payrollLexicon.
  ///
  /// In fr, this message translates to:
  /// **'Lexique de la paie'**
  String get payrollLexicon;

  /// No description provided for @lexiconDesc.
  ///
  /// In fr, this message translates to:
  /// **'Comprendre les éléments de votre fiche de paie.'**
  String get lexiconDesc;

  /// No description provided for @usefulLinks.
  ///
  /// In fr, this message translates to:
  /// **'Liens utiles'**
  String get usefulLinks;

  /// No description provided for @aboutText1.
  ///
  /// In fr, this message translates to:
  /// **'Proximus NXT, c\'est aussi 3 progiciels pour la gestion des PME/PMI. Ces derniers sont multi-postes, multi sociétés...'**
  String get aboutText1;

  /// No description provided for @aboutText2.
  ///
  /// In fr, this message translates to:
  /// **'L\'éditeur ne saura être tenu responsable sur l\'interprétation que l\'utilisateur fait des résultats qui en découlent...'**
  String get aboutText2;
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) => <String>[
    'ar',
    'de',
    'en',
    'es',
    'fr',
    'it',
    'lb',
    'pt',
    'ru',
    'zh',
  ].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'ar':
      return AppLocalizationsAr();
    case 'de':
      return AppLocalizationsDe();
    case 'en':
      return AppLocalizationsEn();
    case 'es':
      return AppLocalizationsEs();
    case 'fr':
      return AppLocalizationsFr();
    case 'it':
      return AppLocalizationsIt();
    case 'lb':
      return AppLocalizationsLb();
    case 'pt':
      return AppLocalizationsPt();
    case 'ru':
      return AppLocalizationsRu();
    case 'zh':
      return AppLocalizationsZh();
  }

  throw FlutterError(
    'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
    'an issue with the localizations generation tool. Please file an issue '
    'on GitHub with a reproducible sample app and the gen-l10n configuration '
    'that was used.',
  );
}
