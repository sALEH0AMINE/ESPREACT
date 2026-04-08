import { useEffect, useState } from "react";
import { getInfoResponsabilite } from "@/services/fonctionnaire.service";
import { mapFonctionnaireInfoResponsabilite } from "@/models/fonc.mapper";

export default function Responsabilite() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getInfoResponsabilite(1);
    setData(res.map(mapFonctionnaireInfoResponsabilite));
  };

  return (
    <div dir="rtl">
      <h2>المسؤوليات</h2>

      <table className="table">
        <thead>
          <tr>
            <th>المسؤولية</th>
            <th>المصلحة</th>
            <th>تاريخ البداية</th>
            <th>تاريخ النهاية</th>
            <th>نشط</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((r) => (
              <tr key={r.id}>
                <td>{r.responsabilite}</td>
                <td>{r.entite}</td>
                <td>{r.dateDebut}</td>
                <td>{r.dateFin}</td>
                <td>{r.estActive ? "نعم" : "لا"}</td>
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