import api from "@/api/axiosInstance";

const unwrapData = (payload) => {
  if (payload == null) return payload;
  if (payload.data !== undefined) return unwrapData(payload.data);
  if (payload.result !== undefined) return unwrapData(payload.result);
  if (payload.value !== undefined) return unwrapData(payload.value);
  if (payload.$values !== undefined) return payload.$values;
  return payload;
};

// 🔁 Normalisation liste
export const normalizeList = (data) => {
  const normalized = unwrapData(data);
  if (Array.isArray(normalized)) return normalized;
  if (Array.isArray(normalized?.items)) return normalized.items;
  if (Array.isArray(normalized?.rows)) return normalized.rows;
  if (Array.isArray(normalized?.$values)) return normalized.$values;
  return [];
};

// 🔁 Normalisation objet
export const normalizeObject = (data) => {
  const normalized = unwrapData(data);
  return normalized ?? null;
};

// 🌐 GET universel
export const getRequest = async (url, config = {}, isList = true) => {
  const { data } = await api.get(url, config);
  return isList ? normalizeList(data) : normalizeObject(data);
};

// 🌐 POST universel
export const postRequest = async (url, payload, config = {}) => {
  const { data } = await api.post(url, payload, config);
  return normalizeObject(data);
};

// 🌐 PUT universel
export const putRequest = async (url, payload, config = {}) => {
  const { data } = await api.put(url, payload, config);
  return normalizeObject(data);
};

// 🌐 DELETE universel
export const deleteRequest = async (url, config = {}) => {
  const { data } = await api.delete(url, config);
  return normalizeObject(data);
};