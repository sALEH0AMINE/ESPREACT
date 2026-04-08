/**
 * Mappers for C# ViewModels → React-friendly objects
 * Conventions:
 * - Remove prefixes (e.g., SOLDE_, FONC_, DPLM_)
 * - Primary key "XXX_ID" → "id"
 * - Foreign key "FONC_ID" → "fonctionnaireId"
 * - Boolean fields get "est" prefix when appropriate
 * - Lists are mapped with .map()
 * - Nullable values pass through as null/undefined
 */

// ==================== Solde & Autorisation ====================

export const mapSolde = (s) => ({
    id: s.SOLDE_ID,
    fonctionnaireId: s.FONC_ID,
    annee: s.SOLDE_ANNEE,
    nombre: s.SOLDE_NBRE,
    estAnnule: s.EST_ANNULLE,
  });
  
  export const mapAutorisationAnnuelle = (a) => ({
    id: a.AUTORISATION_ANN_ID,
    dateDebut: a.AUTORISATION_ANN_DT_DEBUT,
    dateFin: a.AUTORISATION_ANN_DT_FIN,
    fonctionnaireId: a.FONC_ID,
    nombreJours: a.AUTORISATION_ANN_NBR_JOURS,
    soldeId: a.SOLDE_ID,
    soldeAnnee: a.SOLDE_ANNEE,
    soldeNombre: a.SOLDE_NBRE,
    estAnnule: a.EST_ANNULLE,
    soldeSuffisant: a.SOLDE_SUFF,
    dateFinEffet: a.AUTORISATION_ANN_DT_FIN_EFFET,
    remarques: a.AUTORISATION_ANN_REMARQUES,
  });
  
  export const mapAutorisationAnnEtSolde = (data) => ({
    soldes: data.Soldes?.map(mapSolde) ?? [],
    autorisationAnnuelle: data.AutorisationAnnuelle?.map(mapAutorisationAnnuelle) ?? [],
  });
  
  // ==================== Congé ====================
  
  export const mapCongeAdministratif = (c) => ({
    id: c.Id,
    dateDebut: c.DateDebut,
    dateFin: c.DateFin,
    nbrJours: c.NbrJours,
    dateReel: c.DateReel,
    dateStatus: c.DateStatus,
    remarqueFonctionnaire: c.RemarqueFonctionnaire,
    remarqueResponsable: c.RemarqueResponsable,
    idfonc: c.IDFONC,
    idfoncAdjoint: c.IDFONC_ADJOINT,
  });
  
  export const mapCongeAdministViewModel = (data) => ({
    idfonc: data.IDFONC,
    existingCongeAdministratifs: data.ExistingCongeAdministratifs?.map(mapCongeAdministratif) ?? [],
    newCongeAdministratif: data.NewCongeAdministratif ? mapCongeAdministratif(data.NewCongeAdministratif) : null,
  });
  
  // ==================== Diplôme ====================
  
  export const mapDiplomeDTO = (d) => ({
    id: d.DIPLOME_ID,
    libelle: d.LibelleDiplome,
    type: d.TypeDiplome,
    dateObtention: d.DateObtention,
    etablissement: d.DiplomeEtablissment,
    langue: d.DPLM_LANGUE,
    nombreAnnees: d.DPLM_NBR_ANNEES,
    specialite: d.DPLM_SPECIALITE,
    mention: d.DPLM_MENTION,
    sujet: d.DPLM_SUJET,
    documentName: d.DocumentName,
    idfonc: d.IDFONC,
  });
  
  export const mapDiplomeViewModel = (data) => ({
    idfonc: data.IDFONC,
    existingDiplomes: data.ExistingDiplomes?.map(mapDiplomeDTO) ?? [],
    newDiplome: data.NewDiplome ? mapDiplomeDTO(data.NewDiplome) : null,
  });
  
  export const mapFonctionnaireInfoDiplome = (d) => ({
    id: d.FONC_DPLM_ID,
    fonctionnaireId: d.FONC_ID,
    diplomeId: d.DIPLOME_ID,
    etablissement: d.DPLM_ETABLISSEMENT,
    dateObtention: d.DPLM_DT_OBTENTION,
    langue: d.DPLM_LANGUE,
    langueId: d.LANGUE_ID,
    nombreAnnees: d.DPLM_NBR_ANNEES,
    specialite: d.DPLM_SPECIALITE,
    mention: d.DPLM_MENTION,
    sujet: d.DPLM_SUJET,
    diplomeIdRef: d.DPLM_ID,
    libelle: d.DPLM_LIBELLE,
    estTravail: d.DLM_FONC_TRAVAIL,
    estActive: d.DLM_FONC_ACTIVE,
  });
  
  // ==================== Échelon / Grade ====================
  
  export const mapFonctionnaireInfoEchelon = (e) => ({
    id: e.FONC_ECH_ID,
    fonctionnaireId: e.FONC_ID,
    echelonId: e.ECHELON_ID,
    echelonNom: e.ECHELON_NOM,
    gradeNom: e.GRADE_NOM,
    gradeId: e.GRADE_ID,
    estActif: e.ECHELON_Active,
    date: e.ECHELON_DATE,
    indice: e.ECHELON_INDICE,
  });
  
  export const mapFonctionnaireInfoGrade = (g) => ({
    id: g.FONC_GRD_ID,
    fonctionnaireId: g.FONC_ID,
    gradeId: g.GRADE_ID,
    gradeNom: g.GRADE_NOM,
    actif: g.GradeActive,
    date: g.GRADE_DATE,
    dateEffet: g.GRADE_EFFET_DATE,
  });
  
  // ==================== Famille (Époux, Fils, Situation Fam) ====================
  
  export const mapFonctionnaireInfoEpoux = (e) => ({
    id: e.EpouxID,
    nom: e.EpouxNom,
    prenom: e.EpouxPrenom,
    dateNaissance: e.EpouxDateNaissance,
    lieuNaissance: e.EpouxLieuNaissance,
    profession: e.EpouxProfession,
    lieuTravail: e.EpouxLieuDeTravail,
    cin: e.EpouxCin,
    actif: e.EpouxActive,
    fonctionnaireId: e.FoncID,
    professionId: e.EpouxProfessionId,
  });
  
  export const mapFonctionnaireInfoFils = (f) => ({
    id: f.FilsID,
    prenom: f.FilsPrenom,
    parent: f.FilsParent,
    dateNaissance: f.FilsDateNaissance,
    lieuNaissance: f.FilsLieuNaissance,
    profession: f.FilsProfession,
    lieuTravail: f.FilsLieuDeTravail,
    situationFamiliale: f.FilsSituationFamiliale,
    cin: f.FilsCin,
    etatSante: f.FilsEtatSante,
    fonctionnaireId: f.FoncID,
    professionId: f.FilsProfessionId,
    situationFamilialeId: f.FilsSituationFamilialeId,
  });
  
  export const mapFonctionnaireInfoSituationFam = (f) => ({
    id: f.FonctionnaireSituatFamilID,
    fonctionnaireId: f.FonctionnaireID,
    situationFamilialeId: f.SituationFamilialeID,
    situationFamilialeNom: f.SituationFamilialeNom,
    date: f.SituationFamilialeDate,
    estActive: f.EstActive,
  });
  
  // ==================== Professionnel (InfoProf, Responsabilité, Situation Adm, Situation Conseil) ====================
  
  export const mapFonctionnaireInfoProf = (p) => ({
    id: p.FonctionnaireID,
    ppr: p.FonctionnairePPR,
    categorie: p.FonctionnaireCategorie,
    dateCategorie: p.FonctionnaireDateCategorie,
    poste: p.FonctionnairePoste,
    dateAffectationPoste: p.FonctionnaireDateAffectationPoste,
    situationAdministrative: p.FonctionnaireSituationAdministrative,
    dateDebutSituationAdministrative: p.FonctionnaireDateDebutSituationAdministrative,
    situationActuelle: p.FonctionnaireSituationActuelle,
    dateDebutSituationActuelle: p.FonctionnaireDateDebutSituationActuelle,
    typeContrat: p.FonctionnaireTypeContrat,
    dateDebutTypeContrat: p.FonctionnaireDateDebutTypeContrat,
    entite: p.FonctionnaireEntite,
    dateAffectationEntite: p.FonctionnaireDateAffectationEntite,
    grade: p.FonctionnaireGrade,
    dateGrade: p.FonctionnaireDateGrade,
    echelon: p.FonctionnaireEchelon,
    dateEchelon: p.FonctionnaireDateEchelon,
    dateAccesAdministration: p.FonctionnaireDateAccesAdministration,
    dateAccesConseil: p.FonctionnaireDateAccesConseil,
  });
  
  export const mapFonctionnaireInfoResponsabilite = (r) => ({
    id: r.FonctionnaireResponsabiliteID,
    entite: r.FonctionnaireEntite,
    entiteId: r.FonctionnaireEntiteID,
    dateDebut: r.DateDebutResponsabilite,
    dateFin: r.DateFinResponsabilite,
    estActive: r.EstActive,
    responsabiliteId: r.ResponsabiliteID,
    responsabilite: r.FonctionnaireResponsabilite,
    referenceDecision: r.ReferenceDecision,
    estHorsConseil: r.Est_hors_conseil,
    respHorsConseil: r.Resp_Hors_Conseil,
    respLieuAffectationHorsConseil: r.Resp_Lieu_Affectation_Hors_Conseil,
    dateDecision: r.DateDecision,
    fonctionnaireId: r.FonctionnaireID,
  });
  
  export const mapFonctionnaireInfoSituationAdm = (s) => ({
    id: s.FONC_SIT_ADM_ID,
    fonctionnaireId: s.FONC_ID,
    situationAdministrativeId: s.SIT_ADM_ID,
    publicationId: s.FONC_SIT_ADM_PUB_ID,
    dateDebut: s.FONC_SIT_ADM_DT_DEBUT,
    dateFin: s.FONC_SIT_ADM_DT_FIN,
    motif: s.FONC_SIT_ADM_MOTIF,
    reference: s.FONC_SIT_ADM_REFERENCE,
    date: s.FONC_SIT_ADM_DATE,
    remarques: s.FONC_SIT_ADM_REMARQUES,
    estActive: s.FONC_SIT_ADM_ACTIVE,
    administrationPubliqueNom: s.ADM_PUB_NOM,
    situationAdministrativeNom: s.SIT_ADM_NOM,
  });
  
  export const mapFonctionnaireInfoSituationConseil = (c) => ({
    id: c.FonctionnaireSituationConseilID,
    fonctionnaireId: c.FonctionnaireID,
    poste: c.FonctionnairePoste,
    posteId: c.FonctionnairePosteID,
    entite: c.FonctionnaireEntite,
    entiteId: c.FonctionnaireEntiteID,
    dateDebut: c.FonctionnaireDateDebutSituationConseil,
    dateFin: c.FonctionnaireDateFinSituationConseil,
    responsabiliteId: c.ResponsabiliteID,
    estActive: c.EstActive,
    estResponsable: c.EstResponsable,
  });
  
  // ==================== Personnel (InfoPerso) ====================
  
  export const mapFonctionnaireInfoPerso = (p) => ({
    id: p.FonctionnaireID,
    nomAr: p.FonctionnaireNomAr,
    prenomAr: p.FonctionnairePrenomAr,
    nomFr: p.FonctionnaireNomFr,
    prenomFr: p.FonctionnairePrenomFr,
    cin: p.FonctionnaireCin,
    lieuNaissance: p.FonctionnaireLieuxNaissance,
    dateNaissance: p.FonctionnaireDateNaissance,
    adresse: p.FonctionnaireAdresse,
    telephoneMobile: p.FonctionnaireTelephoneMobile,
    telephoneFixe: p.FonctionnaireTelephoneFixe,
    email: p.FonctionnaireEmail,
    situationFamiliale: p.FonctionnaireSituationFamiliale,
    sexe: p.FonctionnaireSexe,
    nombreEnfants: p.FonctionnaireNombreEnfants,
    imgDataURL: p.imgDataURL,
  });