import api from "./api";

export const generateWeekPlan = async (roadmapId, week) => {

  const response = await api.post(
    "/week",
    {
      roadmapId,
      week,
    }
  );

  return response.data;

};