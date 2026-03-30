import api from "./api";

export const queueService = {
  getDoctors: async () => {
    return api.get("/doctors");
  },

  getStats: async () => {
    return api.get("/stats");
  },

  getNotifications: async (userId) => {
    return api.get(`/notifications?userId=${userId}`);
  },
};
