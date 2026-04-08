import { useEffect, useState } from "react";
import {
  getListOfAutorisationAnnuelle,
  getListOfSolde
} from "@/services/fonctionnaire.service";

import { mapSolde, mapAutorisationAnnuelle } from "@/models/fonctionnaire.model";

import SoldesTable from "./SoldesTable";
import AutorisationTable from "./AutorisationTable";

export default function AutorisationAnnEtSolde({ id }) {
  const [soldes, setSoldes] = useState([]);
  const [autorisations, setAutorisations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [soldeData, autoData] = await Promise.all([
          getListOfSolde(id),
          getListOfAutorisationAnnuelle(id)
        ]);

        setSoldes(soldeData.map(mapSolde));
        setAutorisations(autoData.map(mapAutorisationAnnuelle));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <SoldesTable data={soldes} />
      <AutorisationTable data={autorisations} />
    </>
  );
}