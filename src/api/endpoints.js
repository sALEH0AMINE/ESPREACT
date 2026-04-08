export const DAP_ENDPOINTS = {
    DIPLOMES: (id) => `/DAP_InfoDiplome/GetFonctInfoDiplomes/${id}`,
    ECHELON: (id) => `/DAP_InfoEchelon/GetInfoFoncEchelon/${id}`,
    EPOUX: `/DAP_InfoEpoux/GetFonctInfoEpoux`,
    FILS: `/DAP_InfoFils/GetFonctionnaireInfoFils`,
    GRADES: (id) => `/DAP_InfoGrade/GetInfoFoncGrade/${id}`,
    INFO_PERSO: `/DAP_InfoPersonnelles/getFonctionnaireInfoPerso`,
    INFO_PRO: `/DAP_InfoProfessionnelles/getFonctionnaireInfoProf`,
    RESPONSABILITE: `/DAP_InfoResponsabilite/getFonctionnaireInfoResponsabilite`,
    SITUATION_ADM: (id) => `/DAP_InfoSituationAdministrative/GetInfoFoncSituAdmGrade/${id}`,
    SITUATION_CONSEIL: `/DAP_InfoSituationConseil/getFonctionnaireInfoSituationConseil`,
    SITUATION_FAM: `/DAP_InfoSituationFamiliale/getFonctionnaireInfoSituationFamiliale`,
    AUTORISATION: `/DAP_AutorisationAnnuelle/getFoncInfoAutorisation`,
    SOLDE: (id) => `/DAP_AutorisationAnnuelle/GetFoncSolde/${id}`,
    
  };
  export const DIPLOME_ENDPOINTS = {
    GET_ALL: (id) => `/api/DAP_InfoDiplome/getInfoDiplomeObtenu?idFonc=${id}`,
    CREATE: `/api/DAP_InfoDiplome/ajouterFonctDiplomeObtenu`,
    UPDATE: `/api/DAP_InfoDiplome/modifierFonctDiplomeObtenu`,
  };


  