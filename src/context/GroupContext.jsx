import { createContext, useState, useCallback } from 'react';
import { groupService } from '../services/groupService';

export const GroupContext = createContext(null);

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [myGroups, setMyGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all groups
  const fetchGroups = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await groupService.getAll();
      setGroups(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch groups');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch user's groups
  const fetchMyGroups = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await groupService.getMyGroups();
      setMyGroups(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch your groups');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single group
  const fetchGroup = useCallback(async (groupId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await groupService.getById(groupId);
      setCurrentGroup(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch group');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create group
  const createGroup = useCallback(async (groupData) => {
    setLoading(true);
    setError(null);
    try {
      const newGroup = await groupService.create(groupData);
      setGroups((prev) => [newGroup, ...prev]);
      setMyGroups((prev) => [newGroup, ...prev]);
      return newGroup;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create group');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Join group
  const joinGroup = useCallback(async (groupId) => {
    setLoading(true);
    setError(null);
    try {
      const updatedGroup = await groupService.join(groupId);
      setMyGroups((prev) => [updatedGroup, ...prev]);
      // Update in all groups list
      setGroups((prev) =>
        prev.map((g) => (g.id === groupId ? updatedGroup : g))
      );
      return updatedGroup;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to join group');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Leave group
  const leaveGroup = useCallback(async (groupId) => {
    setLoading(true);
    setError(null);
    try {
      await groupService.leave(groupId);
      setMyGroups((prev) => prev.filter((g) => g.id !== groupId));
      // Update current group if viewing it
      if (currentGroup?.id === groupId) {
        setCurrentGroup(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to leave group');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentGroup]);

  const value = {
    groups,
    myGroups,
    currentGroup,
    loading,
    error,
    fetchGroups,
    fetchMyGroups,
    fetchGroup,
    createGroup,
    joinGroup,
    leaveGroup,
  };

  return (
    <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
  );
};

const contribute = useCallback(async (groupId, amount) => {
  setLoading(true);
  try {
    const updatedGroup = await contributionService.contribute(groupId, amount);
    setGroups(groups.map(g => g.id === groupId ? updatedGroup : g));
    if (currentGroup?.id === groupId) {
      setCurrentGroup(updatedGroup);
    }
    setError(null);
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setLoading(false);
  }
}, [groups, currentGroup]);

const requestWithdrawal = useCallback(async (groupId, data) => {
  setLoading(true);
  try {
    await withdrawalService.request(groupId, data);
    setError(null);
    return true;
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setLoading(false);
  }
}, []);

const approveWithdrawal = useCallback(async (withdrawalId) => {
  setLoading(true);
  try {
    await withdrawalService.approve(withdrawalId);
    setError(null);
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setLoading(false);
  }
}, []);

// ...existing code...

const value = {
  // ...existing values...
  contribute,
  requestWithdrawal,
  approveWithdrawal,
};