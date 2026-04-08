export const mapDiplome = (d) => ({
    id: d.DIPLOME_ID,
    libelle: d.LibelleDiplome,
    type: d.TypeDiplome,
    dateObtention: d.DateObtention,
    etablissement: d.DiplomeEtablissment,
    langue: d.DPLM_LANGUE,
    nbAnnees: d.DPLM_NBR_ANNEES,
    specialite: d.DPLM_SPECIALITE,
    mention: d.DPLM_MENTION,
    sujet: d.DPLM_SUJET,
    document: d.DocumentName,
    fonctionnaireId: d.IDFONC,
  });