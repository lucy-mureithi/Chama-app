import api from './api';

export const withdrawalService = {
  request: async (groupId, data) => {
    const response = await api.post(`/groups/${groupId}/withdrawal-request`, data);
    return response.data;
  },

  getPending: async (groupId) => {
    const response = await api.get(`/groups/${groupId}/pending-withdrawals`);
    return response.data;
  },

  approve: async (withdrawalId) => {
    const response = await api.post(`/withdrawals/${withdrawalId}/approve`);
    return response.data;
  },

  reject: async (withdrawalId, reason) => {
    const response = await api.post(`/withdrawals/${withdrawalId}/reject`, { reason });
    return response.data;
  },

  getHistory: async (groupId) => {
    const response = await api.get(`/groups/${groupId}/withdrawals`);
    return response.data;
  },
};