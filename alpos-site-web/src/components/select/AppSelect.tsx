import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type SelectItemType = {
  value: string;
  label: string;
};

interface ISelectProps {
  options: SelectItemType[];
  value?: string;
  placeholder?: string;
  onValueChange: (val: string) => void;
}

const AppSelect = (props: ISelectProps) => {
  const {
    options,
    value,
    onValueChange,
    placeholder = "Pick an option",
  } = props;

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="SelectTrigger">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options?.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AppSelect;
