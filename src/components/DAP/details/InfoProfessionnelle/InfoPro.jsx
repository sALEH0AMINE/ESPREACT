import { useEffect, useState } from "react";
import { getInfoProf } from "@/services/fonctionnaire.service";
import { mapFonctionnaireInfoProf } from "@/models/fonc.mapper";

export default function InfoPro() {
  const [data, setData] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getInfoProf(1);
    setData(mapFonctionnaireInfoProf(res));
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div dir="rtl">
      <h2>معلومات مهنية</h2>

      <p>الدرجة: {data.grade}</p>
      <p>الرتبة: {data.echelon}</p>
      <p>المنصب: {data.poste}</p>
      <p>المصلحة: {data.entite}</p>
    </div>
  );
}