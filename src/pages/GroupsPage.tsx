import { useEffect } from "react";
import { useGroups } from "../hooks/useGroups";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { GroupList } from "../features/groups/GroupList";

export const GroupsPage = () => {
  const { groups, loading, error, fetchGroups } = useGroups();

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  if (loading) return <div>Loading groups...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>All Groups</h1>
      <Button variant="primary">Create New Group</Button>
      <div style={{ marginTop: "2rem" }}>
        <GroupList groups={groups} loading={loading} />
      </div>
    </div>
  );
};
