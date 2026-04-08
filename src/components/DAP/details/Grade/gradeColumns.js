export const gradeColumns = [
    { field: "gradeNom", headerName: "الدرجة" },
    {
      field: "date",
      headerName: "تاريخ ولوج الدرجة",
      render: (row) => row.date?.slice(0, 10),
    },
    {
      field: "dateEffet",
      headerName: "الأقدمية",
      render: (row) => row.dateEffet?.slice(0, 10),
    },
    {
      field: "actif",
      headerName: "مفعل؟",
      render: (row) => (row.actif ? "نعم" : "لا"),
    },
  ];