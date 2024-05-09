import { Dispatch, SetStateAction } from "react";
import { StorageReference } from "firebase/storage";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WeekSelectProps {
  setWeek: Dispatch<SetStateAction<string>>;
}

export default function WeekSelect({ setWeek }: WeekSelectProps) {
  const handleSelectChange = (value: string) => {
    setWeek(value);
  };

  return (
    <Select onValueChange={(value) => handleSelectChange(value)}>
      <SelectTrigger >
        <SelectValue placeholder="Select a week" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem key={1} value={"next_week"}>
            Next week
          </SelectItem>
          <SelectItem key={2} value={"after_next"}>
            Week after next
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
