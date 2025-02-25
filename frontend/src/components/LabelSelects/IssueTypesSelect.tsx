import { IssueType } from '@/enums/IssueType';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { v4 } from 'uuid';
import { IssueTypeLabel } from '../Labels/IssueType';
import { updateTicket } from '@/api/ticket';
import { useAppDispatch } from '@/lib/store/hooks';
import { updateTicketSuccess } from '@/lib/store/features/project/projectSlice';
import { DropdownSelect } from '../Input/DrowdownSelect';

type Props = {
  type: IssueType;
  ticketId: number;
};

export const IssueTypeSelect = ({ type, ticketId }: Props): JSX.Element => {
  const { projectId } = useParams<{
    projectId: string;
  }>();
  const dispatch = useAppDispatch();

  const items: SelectOption<IssueType>[] = useMemo(
    () =>
      Object.values(IssueType)
        .filter((issueType) => issueType !== type)
        .map((value) => {
          return { id: v4(), data: value };
        }),
    [IssueType, type],
  );

  const render = ({ data }: SelectOption<IssueType>) =>
    data === type ? (
      <IssueTypeLabel type={data} />
    ) : (
      <IssueTypeLabel type={data} showText />
    );

  const onSelect = async ({ data }: SelectOption<IssueType>) => {
    try {
      const response = await updateTicket(projectId, ticketId.toString(), {
        issueType: data,
      });
      console.log(response);
      dispatch(updateTicketSuccess(response.data));
    } catch (error) {
      console.error;
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
