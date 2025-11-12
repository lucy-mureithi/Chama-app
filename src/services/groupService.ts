import api from './api';

export const groupService = {
  // Get all groups
  getAll: async () => {
    const response = await api.get('/groups');
    return response.data;
  },

  // Get single group by ID
  getById: async (id) => {
    const response = await api.get(`/groups/${id}`);
    return response.data;
  },

  // Create new group
  create: async (groupData) => {
    const response = await api.post('/groups', groupData);
    return response.data;
  },

  // Join a group
  join: async (groupId) => {
    const response = await api.post(`/groups/${groupId}/join`);
    return response.data;
  },

  // Leave a group
  leave: async (groupId) => {
    const response = await api.post(`/groups/${groupId}/leave`);
    return response.data;
  },

  // Get group members
  getMembers: async (groupId) => {
    const response = await api.get(`/groups/${groupId}/members`);
    return response.data;
  },

  // Get user's groups
  getMyGroups: async () => {
    const response = await api.get('/groups/my-groups');
    return response.data;
  },
};