import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { SortOrder } from "@/enums/SortOrder";
import { ArrowDownAZ, ArrowUpAZIcon } from "lucide-react";

type Props = {
  onSearchClick: (sortOrder: SortOrder) => void;
  sort: SortOrder;
  q: string;
};

export const TopBar = ({
  onSearchClick,
  sort,
  q,
}: Props): React.JSX.Element => {
  return (
    <div className="flex items-center gap-2 p-4">
      <h3 className="text-2xl font-bold">Your projects</h3>
      <div className="ml-auto">Sorting order:</div>
      {sort === "asc" ? (
        <Button
          onClick={() => onSearchClick(SortOrder.Descending)}
          variant="ghost"
        >
          <ArrowDownAZ />
        </Button>
      ) : (
        <Button
          onClick={() => onSearchClick(SortOrder.Ascending)}
          variant="ghost"
        >
          <ArrowUpAZIcon />
        </Button>
      )}
      <SearchBar value={q} />
    </div>
  );
};
