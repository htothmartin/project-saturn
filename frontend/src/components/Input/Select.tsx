import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Select as ShadCNSelect,
} from "../ui/select";
import { SelectOption } from "./type";

type Props<T> = {
  label: string;
  placeholder: string;
  selectedValue?: SelectOption<T>;
  options: SelectOption<string>[];
  onSelect: (id: T) => void;
};

export const Select = <T extends string>({
  label,
  placeholder,
  selectedValue,
  options,
  onSelect,
}: Props<T>) => {
  return (
    <ShadCNSelect onValueChange={onSelect}>
      <SelectTrigger className="w-[180px]">
        {selectedValue ? (
          <SelectValue placeholder={placeholder}>
            {selectedValue.data}
          </SelectValue>
        ) : (
          <SelectValue placeholder={placeholder} />
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((value, index) => (
            <SelectItem key={`select-${index}-value`} value={value.id}>
              {value.data}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </ShadCNSelect>
  );
};
