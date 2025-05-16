import { TicketStatus } from "@/enums/TicketStatus";
import { useAppDispatch } from "@/lib/store/hooks";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { v4 } from "uuid";
import { StatusLabel } from "../Labels/StatusLabel";
import { updateTicket } from "@/api/ticket";
import { updateTicketSuccess } from "@/lib/store/features/project/projectSlice";
import { DropdownSelect } from "../Input/DrowdownSelect";
import { SelectOption } from "../Input/type";

type Props = {
  type: TicketStatus;
  ticketId: number;
};

export const StatusSelect = ({ type, ticketId }: Props): React.JSX.Element => {
  const { projectId } = useParams<{
    projectId: string;
  }>();
  const dispatch = useAppDispatch();

  const items: SelectOption<TicketStatus>[] = useMemo(
    () =>
      Object.values(TicketStatus).map((value) => ({
        id: v4(),
        data: value,
      })),
    [],
  );

  const render = ({ data }: SelectOption<TicketStatus>) => (
    <StatusLabel type={data as TicketStatus} />
  );

  const onSelect = async ({ data }: SelectOption<TicketStatus>) => {
    try {
      const response = await updateTicket(projectId, ticketId.toString(), {
        status: data as TicketStatus,
      });
      dispatch(updateTicketSuccess(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownSelect
      item={{ id: v4(), data: type }}
      render={render}
      items={items}
      onSelect={onSelect}
    />
  );
};
