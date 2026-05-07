// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Russian (`ru`).
class AppLocalizationsRu extends AppLocalizations {
  AppLocalizationsRu([String locale = 'ru']) : super(locale);

  @override
  String get navBrutNet => 'Брутто-Нетто';

  @override
  String get navNetBrut => 'Нетто-Брутто';

  @override
  String get navHistory => 'История';

  @override
  String get navInfos => 'Инфо';

  @override
  String get navAbout => 'О нас';

  @override
  String get titleBrutNet => 'Расчет Брутто-Нетто';

  @override
  String get titleNetBrut => 'Расчет Нетто-Брутто';

  @override
  String get subtitleBrutNet => 'От брутто к нетто';

  @override
  String get subtitleNetBrut => 'От нетто к брутто';

  @override
  String get descBrutNet =>
      'Введите ваши данные, приложение рассчитает вашу чистую зарплату.';

  @override
  String get descNetBrut =>
      'Введите желаемую чистую зарплату, приложение рассчитает брутто.';

  @override
  String get calcYear => 'Год расчета';

  @override
  String get month => 'Месяц';

  @override
  String get grossSalary => 'Зарплата брутто (€)';

  @override
  String get netSalary => 'Зарплата нетто (€)';

  @override
  String get benefits => 'Натуральные льготы (€)';

  @override
  String get deductions => 'Вычеты (€)';

  @override
  String get taxation => 'Налогообложение';

  @override
  String get taxClass => 'Налоговый класс';

  @override
  String get single => 'Холост/Не замужем (1)';

  @override
  String get married => 'Женат/Замужем (2)';

  @override
  String get otherClass => 'Другое (1a)';

  @override
  String get manualRate => 'Ручная ставка';

  @override
  String get ratePct => 'Ставка (%)';

  @override
  String get taxCreditCISP => 'Налоговый вычет (CISP)';

  @override
  String get taxCreditCIM => 'Налоговый вычет (CIM)';

  @override
  String get taxCreditCIE => 'Налоговый вычет (CIE)';

  @override
  String get employerParts => 'Взносы работодателя';

  @override
  String get mutual => 'Взаимопомощь';

  @override
  String get class1 => 'Класс 1';

  @override
  String get class2 => 'Класс 2';

  @override
  String get class3 => 'Класс 3';

  @override
  String get class4 => 'Класс 4';

  @override
  String get accidentIns => 'Страхование от НС';

  @override
  String get bonus => 'Бонус';

  @override
  String get healthWork => 'Охрана труда';

  @override
  String get btnCalculate => 'Рассчитать';

  @override
  String get infoReqGross => 'Пожалуйста, введите зарплату брутто.';

  @override
  String get infoReqNet => 'Пожалуйста, введите зарплату нетто.';

  @override
  String get infoBenefits => 'Общая сумма налогооблагаемых льгот';

  @override
  String get infoDeductions => 'Общая сумма вычетов в налоговой карте';

  @override
  String get information => 'Информация';

  @override
  String get ok => 'ОК';

  @override
  String get saveSim => 'Сохранить расчет';

  @override
  String get save => 'Сохранить';

  @override
  String get cancel => 'Отмена';

  @override
  String get record => 'Записать';

  @override
  String get noHistory => 'Нет сохраненных расчетов.';

  @override
  String get infosTitle => 'Информация и Глоссарий';

  @override
  String get socialParams => 'Социальные параметры';

  @override
  String get payrollLexicon => 'Глоссарий заработной платы';

  @override
  String get lexiconDesc => 'Разберитесь в элементах вашего расчетного листка.';

  @override
  String get usefulLinks => 'Полезные ссылки';

  @override
  String get aboutText1 =>
      'Proximus NXT также предлагает 3 программных продукта для управления МСБ...';

  @override
  String get aboutText2 =>
      'Издатель не несет ответственности за интерпретацию результатов...';
}
