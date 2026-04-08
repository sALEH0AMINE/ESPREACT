import { useEffect, useState } from "react";
import { getInfoSituationConseil } from "@/services/fonctionnaire.service";
import { mapFonctionnaireInfoSituationConseil } from "@/models/fonc.mapper";

export default function SituationConseil() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getInfoSituationConseil(1);
    setData(res.map(mapFonctionnaireInfoSituationConseil));
  };

  return (
    <div dir="rtl">
      <h2>الوضعية بالمجلس</h2>

      <table className="table">
        <thead>
          <tr>
            <th>المنصب</th>
            <th>المصلحة</th>
            <th>تاريخ البداية</th>
            <th>تاريخ النهاية</th>
            <th>مفعل</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((c) => (
              <tr key={c.id}>
                <td>{c.poste}</td>
                <td>{c.entite}</td>
                <td>{c.dateDebut}</td>
                <td>{c.dateFin}</td>
                <td>{c.estActive ? "نعم" : "لا"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">لا توجد بيانات</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}