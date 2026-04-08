import api from "../api/axiosInstance";

export const getOptions = async (path, searchParamName, searchValue) => {
  const params = {};
  if (searchValue) {
    params[searchParamName] = searchValue;
  }

  const { data } = await api.get(path, { params });
  return data;
};

