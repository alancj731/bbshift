import {Dispatch, SetStateAction, useState} from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FileSelectProps {
  files: string[],
  setDownloadFile: Dispatch<SetStateAction<string | null>>
}

export default function FileSelect({files, setDownloadFile}: FileSelectProps) {


  const handleSelectChange = (value:string) => {
    setDownloadFile(value);
  };


  return (
    <Select onValueChange={(value)=>handleSelectChange(value)}>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Select a file to download" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            files.map((file) => (
              <SelectItem key={file} value={file}>{file}</SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
