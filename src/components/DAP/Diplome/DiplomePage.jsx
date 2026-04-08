import React, { useEffect, useState } from "react";
import { DemandeService } from "@/services/fonctionnaireservice";
import DemandeForm from "../DemandeForm";
import DemandeList from "../DemandeList";

export default function DemandePage({ fonctId }) {
  const [demandes, setDemandes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadDemandes = async () => {
    try {
      setLoading(true);
      const data = await DemandeService.getAll(fonctId);
      setDemandes(data?.ExistingDemandes || []);
    } catch (err) {
      console.error("Erreur chargement demandes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDemandes();
  }, [fonctId]);

  const handleSubmit = async (model) => {
    try {
      if (editing) {
        await DemandeService.update(model);
        setEditing(null);
      } else {
        await DemandeService.create(model);
      }
      loadDemandes();
    } catch (err) {
      console.error("Erreur submit", err);
    }
  };

  return (
    <div>
      <h2>Gestion des demandes</h2>

      <DemandeForm
        onSubmit={handleSubmit}
        initialData={editing}
        onCancel={() => setEditing(null)}
      />

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <DemandeList
          demandes={demandes}
          onEdit={setEditing}
          onDownload={DemandeService.download}
        />
      )}
    </div>
  );
}