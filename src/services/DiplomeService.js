import { getRequest, postRequest } from "../utils/apihelper";
import { DIPLOME_ENDPOINTS } from "../api/endpoints";
import { LOCAL_FONCT_ID } from "../config/devLocal";

const resolveFonctId = (id) => encodeURIComponent(LOCAL_FONCT_ID ?? id);
const resolveFonctParams = (id) => ({ params: { id: LOCAL_FONCT_ID ?? id } });

// 📥 GET
export const getDiplomes = (id) =>
  getRequest(DIPLOME_ENDPOINTS.GET_ALL(id));

// ➕ CREATE
export const createDiplome = (model) =>
  postRequest(DIPLOME_ENDPOINTS.CREATE, model);

// ✏️ UPDATE
export const updateDiplome = (model) =>
  postRequest(DIPLOME_ENDPOINTS.UPDATE, model);