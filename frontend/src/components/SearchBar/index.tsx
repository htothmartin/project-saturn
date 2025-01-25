import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '@/lib/store/hooks';
import {
  fetchProjects,
  setSearchValue,
} from '@/lib/store/features/project/projectSlice';
import clsx from 'clsx';

type Props = {
  value: string;
  className?: string;
};

export const SearchBar = ({ value, className }: Props): JSX.Element => {
  const [searchBoxValue, setSearchBoxValue] = useState<string>(value);
  const dispatch = useAppDispatch();

  const handleSearchClick = () => {
    dispatch(setSearchValue(searchBoxValue));
    dispatch(fetchProjects());
  };

  return (
    <div className={clsx('flex flex-row', className)}>
      <Input
        className="w-56"
        value={searchBoxValue}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSearchBoxValue(event.target.value)
        }
      />
      <Button variant="ghost" onClick={handleSearchClick}>
        <Search />
      </Button>
    </div>
  );
};
