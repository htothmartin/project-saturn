import { TicketPriority } from '@/enums/TicketPriority';
import { v4 } from 'uuid';
import { PriorityLabel } from '../Labels/PriorityLabel';
import { updateTicket } from '@/api/ticket';
import { useParams } from 'next/navigation';
import { useAppDispatch } from '@/lib/store/hooks';
import { updateTicketSuccess } from '@/lib/store/features/project/projectSlice';
import { useMemo } from 'react';
import { DropdownSelect } from '../Input/DrowdownSelect';

type Props = {
  type: TicketPriority;
};

export const PrioritySelect = ({ type }: Props): JSX.Element => {
  const { projectId, ticketId } = useParams<{
    projectId: string;
    ticketId: string;
  }>();
  const dispatch = useAppDispatch();

  const items: SelectOption<TicketPriority>[] = useMemo(
    () =>
      Object.values(TicketPriority).map((value) => ({
        id: v4(),
        data: value,
      })),
    [PriorityLabel],
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
    <PriorityLabel type={data} />
  );

  const onSelect = async ({ data }: SelectOption<TicketPriority>) => {
    try {
      const reponse = await updateTicket(projectId, ticketId, {
        priority: data,
      });
      dispatch(updateTicketSuccess(reponse.data));
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
