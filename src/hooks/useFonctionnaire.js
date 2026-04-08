import { useEffect, useState } from "react";
import * as service from "@/services/fonctionnaire.service";
import {
  mapFonctionnaireInfoPerso,
  mapFonctionnaireInfoFils,
} from "@/models/fonctionnaire.model";

export function useFonctionnaire(id) {
  const [infoPerso, setInfoPerso] = useState(null);
  const [fils, setFils] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [perso, filsData] = await Promise.all([
          service.getInfoPerso(id),
          service.getInfoFils(id),
        ]);

        // 🔥 APPLY MAPPERS HERE
        setInfoPerso(perso ? mapFonctionnaireInfoPerso(perso) : null);
        setFils(filsData.map(mapFonctionnaireInfoFils));

      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  return {
    infoPerso,
    fils,
    loading,
    error,
  };
}