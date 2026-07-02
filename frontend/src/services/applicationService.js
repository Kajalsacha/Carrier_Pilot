import api from "./api";

export const getApplications = async ( company, status ) => {
  const response = await api.get("/applications", { params: {  company, status,},});};

export const deleteApplication = async (id) => {
  const response = await api.delete(`/applications/${id}`);
  return response.data;
};

export const updateStatus = async (id, status) => {
  const response = await api.put(`/applications/${id}`, {
    status,
  });

  return response.data;
};