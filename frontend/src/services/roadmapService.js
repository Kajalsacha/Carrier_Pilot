import api, { API_BASE_URL } from "./api";

export const generateRoadmap = async (roadmapData) => {
  const response = await api.post( "/ai/roadmap",roadmapData );

  return response.data;
};

export const getRoadmaps = async () => {
  const response = await api.get("/ai/roadmaps");
  return response.data;
};

export const getRoadmap = async (id) => {
  const response = await api.get(`/ai/roadmaps/${id}`);
  return response.data;
};

export const deleteRoadmap = async (id) => {
  const response = await api.delete(`/ai/roadmaps/${id}`);
  return response.data;
};

export const downloadRoadmap = (id) => {
  window.open(`${API_BASE_URL}/api/ai/roadmaps/${id}/pdf`, "_blank");
};