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
  options: SelectOption<T>[];
  onSelect: (id: T) => void;
  disabled?: boolean;
};

export const Select = <T extends string>({
  label,
  placeholder,
  selectedValue,
  options,
  onSelect,
  disabled = false,
}: Props<T>) => {
  return (
    <ShadCNSelect
      defaultValue={selectedValue?.id}
      disabled={disabled}
      onValueChange={onSelect}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={selectedValue?.data ?? placeholder} />
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
