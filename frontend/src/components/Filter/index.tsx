import { SearchIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const FIlter = (): JSX.Element => {
  return (
    <div className="ml-auto flex gap-2 align-middle">
      <Input></Input>
      <Button>
        <SearchIcon className="m-2" />
      </Button>
    </div>
  );
};
