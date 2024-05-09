import {Dispatch, SetStateAction} from "react"
import { StorageReference } from "firebase/storage";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FileSelectProps {
  files: StorageReference[],
  setDownloadFile: Dispatch<SetStateAction<string | null>>
}

export default function FileSelect({files, setDownloadFile}: FileSelectProps) {


  const handleSelectChange = (value:string) => {
    setDownloadFile(value);
  };


  return (
    <Select onValueChange={(value)=>handleSelectChange(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Select a file to download" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            files.map((ref) => (
              <SelectItem key={ref.name} value={ref.name}>{ref.name}</SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
