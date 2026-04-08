import { useEffect, useState } from "react";
import { getInfoFils } from "@/services/fonctionnaire.service";
import { mapFonctionnaireInfoFils } from "@/models/fonc.mapper";

export default function Fils() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getInfoFils(1);
    setData(res.map(mapFonctionnaireInfoFils));
  };

  return (
    <div dir="rtl">
      <h2>الأولاد</h2>

      <table className="table">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>تاريخ الازدياد</th>
            <th>الوضعية</th>
          </tr>
        </thead>

        <tbody>
          {data.map((f) => (
            <tr key={f.id}>
              <td>{f.prenom}</td>
              <td>{f.dateNaissance}</td>
              <td>{f.situationFamiliale}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}