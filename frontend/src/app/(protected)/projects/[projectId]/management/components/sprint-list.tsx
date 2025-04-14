import { Sprint } from "@/model/sprint";

type Props = {
  sprints: Sprint[];
};

export const SprintList = ({ sprints }: Props): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-4">
      {sprints.map((sprint) => (
        <div className="rounded bg-secondary p-2" key={sprint.id}>
          {sprint.name}
          <div>
            {new Date(sprint.startDate).toDateString()} -{" "}
            {new Date(sprint.endDate).toDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};
