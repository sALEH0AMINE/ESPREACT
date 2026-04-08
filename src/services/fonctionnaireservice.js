import { DAP_ENDPOINTS } from "../api/endpoints";
import { getRequest } from "@/utils/apiHelper";
import { LOCAL_FONCT_ID } from "@/config/devLocal";

const resolveFonctId = (id) => encodeURIComponent(LOCAL_FONCT_ID ?? id);
const resolveFonctParams = (id) => ({ params: { id: LOCAL_FONCT_ID ?? id } });

// 🎓 Diplomes
export const getInfoDiplome = (id) =>
  getRequest(DAP_ENDPOINTS.DIPLOMES(resolveFonctId(id)));

// 📊 Echelon
export const getInfoEchelon = (id) =>
  getRequest(DAP_ENDPOINTS.ECHELON(resolveFonctId(id)));

// 💍 Epoux
export const getInfoEpoux = (id) =>
  getRequest(DAP_ENDPOINTS.EPOUX, resolveFonctParams(id));

// 👶 Fils
export const getInfoFils = (id) =>
  getRequest(DAP_ENDPOINTS.FILS, resolveFonctParams(id));

// 🎖️ Grades
export const getInfoGrade = (id) =>
  getRequest(DAP_ENDPOINTS.GRADES(resolveFonctId(id)));

// 🧍 Info Perso (objet ❗)
export const getInfoPerso = (id) =>
  getRequest(DAP_ENDPOINTS.INFO_PERSO, resolveFonctParams(id), false);

// 💼 Info Pro (objet ❗)
export const getInfoProf = (id) =>
  getRequest(DAP_ENDPOINTS.INFO_PRO, resolveFonctParams(id), false);

// 🧑‍💼 Responsabilite
export const getInfoResponsabilite = (id) =>
  getRequest(DAP_ENDPOINTS.RESPONSABILITE, resolveFonctParams(id));

// 📄 Situation Admin
export const getInfoSituationAdm = (id) =>
  getRequest(DAP_ENDPOINTS.SITUATION_ADM(resolveFonctId(id)));

// 🏛️ Situation Conseil
export const getInfoSituationConseil = (id) =>
  getRequest(DAP_ENDPOINTS.SITUATION_CONSEIL, resolveFonctParams(id));

// 👨‍👩‍👧 Situation Familiale
export const getInfoSituationFam = (id) =>
  getRequest(DAP_ENDPOINTS.SITUATION_FAM, resolveFonctParams(id));

// 🏖️ Autorisation
export const getListOfAutorisationAnnuelle = (id) =>
  getRequest(DAP_ENDPOINTS.AUTORISATION, resolveFonctParams(id));

// 💰 Solde
export const getListOfSolde = (id) =>
  getRequest(DAP_ENDPOINTS.SOLDE(resolveFonctId(id)));