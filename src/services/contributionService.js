import api from './api';

export const contributionService = {
  contribute: async (groupId, amount) => {
    const response = await api.post(`/groups/${groupId}/contribute`, { amount });
    return response.data;
  },

  getGroupContributions: async (groupId) => {
    const response = await api.get(`/groups/${groupId}/contributions`);
    return response.data;
  },

  getUserContributions: async (groupId) => {
    const response = await api.get(`/groups/${groupId}/my-contributions`);
    return response.data;
  },
};