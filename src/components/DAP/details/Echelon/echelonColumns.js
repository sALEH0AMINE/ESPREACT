export const echelonColumns = [
    { field: "gradeNom", headerName: "الدرجة" },
    { field: "echelonNom", headerName: "الرتبة" },
    { field: "indice", headerName: "الرقم الاستدلالي" },
    {
      field: "date",
      headerName: "تاريخ ولوج الرتبة",
      render: (row) => row.date?.slice(0, 10),
    },
    {
      field: "anciennete",
      headerName: "الأقدمية",
      render: () => "-", // à calculer plus tard si besoin
    },
    {
      field: "estActif",
      headerName: "مفعل؟",
      render: (row) => (row.estActif ? "نعم" : "لا"),
    },
  ];