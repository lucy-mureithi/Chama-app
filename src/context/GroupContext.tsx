import { createContext, useState, useCallback, ReactNode } from 'react';

export interface Group {
  id: string;
  name: string;
  description: string;
  members: string[];
  totalSaved: number;
  target?: number;
}

interface GroupContextType {
  groups: Group[];
  currentGroup: Group | null;
  loading: boolean;
  error: string | null;
  fetchGroups: () => Promise<void>;
  setCurrentGroup: (group: Group | null) => void;
}

export const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const GroupProvider = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'Savings Group A',
      description: 'Monthly savings group',
      members: ['user1', 'user2', 'user3'],
      totalSaved: 50000,
      target: 100000,
    },
  ]);
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    try {
      // Mock fetch
      await new Promise((resolve) => setTimeout(resolve, 500));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch groups');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <GroupContext.Provider value={{ groups, currentGroup, loading, error, fetchGroups, setCurrentGroup }}>
      {children}
    </GroupContext.Provider>
  );
};