import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGroups } from "../hooks/useGroups";
import { Card } from "../components/ui/Card";
import { ProgressBar } from "../components/ui/ProgressBar";

export const GroupDetailPage = () => {
  const { id } = useParams();
  const { groups } = useGroups();

  const group = groups.find((g) => g.id === id);

  if (!group) return <div>Group not found</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{group.name}</h1>
      <Card>
        <p>{group.description}</p>
        <p>
          <strong>Members:</strong> {group.members.length}
        </p>
        <p>
          <strong>Total Saved:</strong> ${group.totalSaved}
        </p>
        {group.target && (
          <ProgressBar current={group.totalSaved} total={group.target} label="Savings Goal" />
        )}
      </Card>
    </div>
  );
};
