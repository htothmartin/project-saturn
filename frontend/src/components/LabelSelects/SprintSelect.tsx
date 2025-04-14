import { useMemo } from "react";
import { SelectOption } from "../Input/type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { selectSprints } from "@/lib/store/features/project/projectSelectors";
import { Select } from "../Input/Select";
import { updateTicket } from "@/api/ticket";
import { useParams } from "next/navigation";
import { updateTicketSuccess } from "@/lib/store/features/project/projectSlice";

type Props = {
  ticketId: number;
  selectedSprintId?: number;
};

export const SprintSelect = ({
  selectedSprintId = -1,
  ticketId,
}: Props): React.JSX.Element => {
  const { projectId } = useParams<{
    projectId: string;
  }>();
  const sprints = useAppSelector(selectSprints);
  const dispatch = useAppDispatch();
  const sprintOptions: SelectOption<string>[] = useMemo(() => {
    if (!sprints) {
      return [];
    }

    const options = sprints.map((sprint) => ({
      id: sprint.id.toString(),
      data: sprint.name,
    }));

    options.push({ id: "-1", data: "None" });

    return options;
  }, [sprints]);

  const handleSelect = async (id: string) => {
    try {
      const response = await updateTicket(projectId, ticketId, {
        sprintId: id,
      });
      dispatch(updateTicketSuccess(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Select
      label="Select sprint"
      placeholder=""
      options={sprintOptions}
      selectedValue={sprintOptions.find(
        (option) =>
          selectedSprintId && option.id === selectedSprintId.toString(),
      )}
      onSelect={handleSelect}
    />
  );
};
