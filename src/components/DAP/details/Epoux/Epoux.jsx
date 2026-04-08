import { useEffect, useState } from "react";
import { getInfoEpoux } from "@/services/fonctionnaire.service";
import { mapFonctionnaireInfoEpoux } from "@/models/fonc.mapper";

export default function Epoux() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getInfoEpoux(1);
    setData(res.map(mapFonctionnaireInfoEpoux));
  };

  return (
    <div dir="rtl">
      <h2>الأزواج</h2>

      <table className="table">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>تاريخ الازدياد</th>
            <th>المهنة</th>
            <th>مفعل</th>
          </tr>
        </thead>

        <tbody>
          {data.map((e) => (
            <tr key={e.id}>
              <td>{e.nom} {e.prenom}</td>
              <td>{e.dateNaissance}</td>
              <td>{e.profession}</td>
              <td>{e.actif ? "نعم" : "لا"}</td>
            </tr>
          ))}
        </tbody>
    </table>
    </div>
  );
}