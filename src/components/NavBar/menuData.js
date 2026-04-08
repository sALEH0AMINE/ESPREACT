export const menuStructure = [
  {
    label: "الرئيسية",
    key: "home",
    children: [
      { label: "البيانات الشخصية", to: "/?section=infoPerso" },
    ],
  },
  {
    label: "التصريح بالشهادة أو الدبلوم",
    key: "diploma-declaration",
    to: "/diplomes",
  },

  {
    label: "بيانات عامة",
    key: "general-data",
    children: [
      { label: "المعلومات الشخصية", to: "/?section=infoPerso" },
      { label: "الوضعية العائلية", to: "/?section=situationFamiliale" },
      { label: "الوضعية المهنية", to: "/?section=infoPro" },
      { label: "الوضعية الإدارية", to: "/?section=situationAdm" },
    ],
  },

  {
    label: "التكوين",
    key: "training",
    children: [
      { label: "الدرجة", to: "/?section=grade" },
      { label: "الرتبة", to: "/?section=echelon" },
    ],
  },
  {
    label: "الانتدابات",
    key: "delegations",
    children: [
      { label: "المسؤوليات", to: "/?section=responsabilite" },
      { label: "الوضعية بالمجلس", to: "/?section=situationConseil" },
    ],
  },
  {
    label: "الطلبات",
    key: "requests",
    children: [
      { label: "طلبات شهادة العمل", to: "/?section=infoPerso" },
      { label: "الرخص السنوية", to: "/?section=autorisation" },
    ],
  },
];
