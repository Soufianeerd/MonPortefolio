// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Chinese (`zh`).
class AppLocalizationsZh extends AppLocalizations {
  AppLocalizationsZh([String locale = 'zh']) : super(locale);

  @override
  String get navBrutNet => '税前-税后';

  @override
  String get navNetBrut => '税后-税前';

  @override
  String get navHistory => '历史记录';

  @override
  String get navInfos => '信息';

  @override
  String get navAbout => '关于';

  @override
  String get titleBrutNet => '税前到税后计算';

  @override
  String get titleNetBrut => '税后到税前计算';

  @override
  String get subtitleBrutNet => '从税前到税后';

  @override
  String get subtitleNetBrut => '从税后到税前';

  @override
  String get descBrutNet => '输入您的详细信息，应用将计算您的税后工资。';

  @override
  String get descNetBrut => '输入期望的税后工资，应用将计算相应的税前工资。';

  @override
  String get calcYear => '计算年份';

  @override
  String get month => '月';

  @override
  String get grossSalary => '税前工资 (€)';

  @override
  String get netSalary => '税后工资 (€)';

  @override
  String get benefits => '实物福利 (€)';

  @override
  String get deductions => '扣除额 (€)';

  @override
  String get taxation => '税收';

  @override
  String get taxClass => '税级';

  @override
  String get single => '单身 (1)';

  @override
  String get married => '已婚 (2)';

  @override
  String get otherClass => '其他 (1a)';

  @override
  String get manualRate => '手动税率';

  @override
  String get ratePct => '比率 (%)';

  @override
  String get taxCreditCISP => '税收抵免 (CISP)';

  @override
  String get taxCreditCIM => '税收抵免 (CIM)';

  @override
  String get taxCreditCIE => '税收抵免 (CIE)';

  @override
  String get employerParts => '雇主部分';

  @override
  String get mutual => '互助金';

  @override
  String get class1 => '级别 1';

  @override
  String get class2 => '级别 2';

  @override
  String get class3 => '级别 3';

  @override
  String get class4 => '级别 4';

  @override
  String get accidentIns => '意外保险';

  @override
  String get bonus => '奖金';

  @override
  String get healthWork => '职业健康';

  @override
  String get btnCalculate => '计算';

  @override
  String get infoReqGross => '请输入税前工资。';

  @override
  String get infoReqNet => '请输入税后工资。';

  @override
  String get infoBenefits => '应税实物福利总额';

  @override
  String get infoDeductions => '税卡上注明的扣除总额';

  @override
  String get information => '信息';

  @override
  String get ok => '确定';

  @override
  String get saveSim => '保存模拟';

  @override
  String get save => '保存';

  @override
  String get cancel => '取消';

  @override
  String get record => '记录';

  @override
  String get noHistory => '没有保存的模拟记录。';

  @override
  String get infosTitle => '信息与词汇';

  @override
  String get socialParams => '社会参数';

  @override
  String get payrollLexicon => '薪资词汇';

  @override
  String get lexiconDesc => '了解您工资单上的各个项目。';

  @override
  String get usefulLinks => '有用链接';

  @override
  String get aboutText1 => 'Proximus NXT 还提供 3 款中小企业管理软件...';

  @override
  String get aboutText2 => '发布者对结果的解释不承担责任...';
}
