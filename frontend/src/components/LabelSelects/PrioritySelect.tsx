import { TicketPriority } from "@/enums/TicketPriority";
import { v4 } from "uuid";
import { PriorityLabel } from "../Labels/PriorityLabel";
import { updateTicket } from "@/api/ticket";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import { updateTicketSuccess } from "@/lib/store/features/project/projectSlice";
import { useMemo } from "react";
import { DropdownSelect } from "../Input/DrowdownSelect";
import { SelectOption } from "../Input/type";

type Props = {
  type: TicketPriority;
  ticketId: number;
};

export const PrioritySelect = ({
  type,
  ticketId,
}: Props): React.JSX.Element => {
  const { projectId } = useParams<{
    projectId: string;
  }>();
  const dispatch = useAppDispatch();

  const items: SelectOption<TicketPriority>[] = useMemo(
    () =>
      Object.values(TicketPriority).map((value) => ({
        id: v4(),
        data: value,
      })),
    [],
  );

  const filteredItems = useMemo(
    () => (search: string) =>
      items.filter(
        (item) =>
          item.data.toString().toLowerCase().includes(search.toLowerCase()) &&
          item.data !== type,
      ),
    [items, type],
  );

  const render = ({ data }: SelectOption<TicketPriority>) => (
    <PriorityLabel type={data as TicketPriority} />
  );

  const onSelect = async ({ data }: SelectOption<TicketPriority>) => {
    try {
      const response = await updateTicket(projectId, ticketId.toString(), {
        priority: data as TicketPriority,
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
      filterItems={filteredItems}
      searchPlaceHolder="Search for priotity"
      onSelect={onSelect}
    />
  );
};
