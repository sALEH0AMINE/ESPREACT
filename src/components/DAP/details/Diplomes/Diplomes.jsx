import { useEffect, useState } from "react";
import { getInfoDiplome } from "@/services/fonctionnaire.service";
import { mapFonctionnaireInfoDiplome } from "@/models/fonc.mapper";

export default function Diplomes() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getInfoDiplome(1);
    setData(res.map(mapFonctionnaireInfoDiplome));
  };

  return (
    <div dir="rtl">
      <h2>الدبلومات</h2>

      <table className="table">
        <thead>
          <tr>
            <th>الدبلوم</th>
            <th>التخصص</th>
            <th>التاريخ</th>
            <th>المؤسسة</th>
          </tr>
        </thead>

        <tbody>
          {data.map((d) => (
            <tr key={d.id}>
              <td>{d.libelle}</td>
              <td>{d.specialite}</td>
              <td>{d.dateObtention}</td>
              <td>{d.etablissement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}