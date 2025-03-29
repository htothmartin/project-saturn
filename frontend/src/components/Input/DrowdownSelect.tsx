import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

type Props<T> = {
  item: T;
  render: (item: T) => React.JSX.Element;
  filterItems?: (search: string) => T[];
  items?: T[];
  onSelect: (item: T) => void;
  searchPlaceHolder?: string;
};

export const DropdownSelect = <T extends { id: string }>({
  item,
  render,
  filterItems,
  items,
  onSelect,
  searchPlaceHolder,
}: Props<T>): React.JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const filteredItems = filterItems ? filterItems(search) : items;

  const onSelectItem = (item: T) => {
    setOpen(false);
    onSelect(item);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <div onClick={() => setOpen(true)}>{render(item)}</div>
        </PopoverTrigger>
        <PopoverContent className="w-fit" align="start">
          <Command shouldFilter={false}>
            {searchPlaceHolder && (
              <CommandInput
                value={search}
                onValueChange={(value) =>
                  setSearch(value.toLowerCase().trimStart())
                }
                placeholder={searchPlaceHolder}
              />
            )}
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {filteredItems?.map((item) => (
                  <CommandItem
                    key={`item-${item.id}`}
                    value={item.id.toString()}
                    onSelect={() => onSelectItem(item)}
                  >
                    {render(item)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
