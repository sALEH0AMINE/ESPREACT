import { useEffect, useState } from "react";
import { getInfoSituationAdm } from "@/services/fonctionnaire.service";
import { mapFonctionnaireInfoSituationAdm } from "@/models/fonc.mapper";

export default function SituationAdministrative() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getInfoSituationAdm(1);
    setData(res.map(mapFonctionnaireInfoSituationAdm));
  };

  return (
    <div dir="rtl">
      <h2>الوضعيات المهنية</h2>

      <table className="table">
        <thead>
          <tr>
            <th>الوضعية</th>
            <th>الإدارة</th>
            <th>تاريخ البداية</th>
            <th>تاريخ النهاية</th>
            <th>ملاحظات</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((s) => (
              <tr key={s.id}>
                <td>{s.situationAdministrativeNom}</td>
                <td>{s.administrationPubliqueNom}</td>
                <td>{s.dateDebut}</td>
                <td>{s.dateFin}</td>
                <td>{s.remarques}</td>
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