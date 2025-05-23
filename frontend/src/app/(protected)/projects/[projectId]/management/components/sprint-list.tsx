"use client";

import { deleteSprint } from "@/api/sprint/sprint";
import { ConfirmModal } from "@/components/Modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { fetchActiveProject } from "@/lib/store/features/project/projectSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { Sprint } from "@/model/sprint";
import { X } from "lucide-react";
import { useParams } from "next/navigation";

type Props = {
  sprints: Sprint[];
};

export const SprintList = ({ sprints }: Props): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { projectId } = useParams<{
    projectId: string;
  }>();

  const handleDelete = async (sprintId: number) => {
    await deleteSprint(sprintId);
    dispatch(fetchActiveProject(projectId));
  };

  return (
    <div className="flex flex-col gap-4">
      {sprints.map((sprint) => (
        <div className="relative rounded bg-secondary p-4" key={sprint.id}>
          <ConfirmModal
            trigger={
              <Button
                size="icon"
                className="absolute right-2 top-2"
                variant="ghost"
              >
                <X />
              </Button>
            }
            title="Delete sprint"
            description="Are you sure you want to delete this sprint?"
            onConfirm={() => handleDelete(sprint.id)}
          />

          <div className="font-semibold">{sprint.name}</div>
          <div>
            {new Date(sprint.startDate).toDateString()} -{" "}
            {new Date(sprint.endDate).toDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};
