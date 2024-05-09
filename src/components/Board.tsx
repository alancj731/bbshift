/**
 * v0 by Vercel.
 * @see https://v0.dev/t/rJRkuTfg9Ap
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FileSelect from "@/components/FileSelect";
import WeekSelect from "@/components/WeekSelect";
import { useState, useEffect } from "react";
import { upload, download, listFiles } from "@/lib/transfer";
import { StorageReference } from "firebase/storage";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { UploadIcon, DownloadIcon } from "@/components/Icons";

export default function Board() {
  // local file selected for upload
  const [publishFile, setPublishFiles] = useState(null);
  // next_week or after_next
  const [week, setWeek] = useState("");
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [fileList, setFileList] = useState<StorageReference[]>([]);
  const [fileToDownload, setFileToDownload] = useState<string | null>(null);

  const { user, error, isLoading } = useUser();
  const admin = user?.email === "admin@bestbuy.ca";

  useEffect(() => {
    updateFileList();
  }, []);

  // get files list from server
  const updateFileList = async () => {
    const result = await listFiles();
    if (result) {
      setFileList(result);
    }
  };

  // select the file to upload
  const handleSelectFile = (event: any) => {
    setUploadStatus("idle");
    if (!event.target.files[0]) return;
    const selectedFile = event.target.files[0];
    const extension = selectedFile.name.split(".").pop();
    if (extension !== "xls" && extension !== "xlsx") {
      setPublishFiles(null);
      setUploadStatus("invalid");
      return;
    }
    setPublishFiles(selectedFile);
  };

  // upload file to firebase
  const handleUpload = async () => {
    if (!publishFile) {
      console.log("No file selected");
      return;
    }

    setUploadStatus("uploading");

    try {
      const uploadedFileUrl = await upload(publishFile, week);
      setUploadStatus("success");
      updateFileList();
    } catch (error) {
      console.log(error);
      setUploadStatus("error");
    }
  };

  // download file from server
  const handleDownload = () => {
    if (!fileToDownload) {
      console.log("No file selected");
      return;
    }

    const selectedRef = fileList.find((ref) => ref.name === fileToDownload);
    if (!selectedRef) {
      console.log("Invalid file selected");
      return;
    }
    download(selectedRef);
  };

  return (
    <div className="h-screen bg-[#4c6ef5] flex items-center justify-center">
      <div className="w-full max-w-6xl h-[80%] rounded-lg bg-[#4c6ef5] px-4 py-8 md:px-10 md:py-16">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 h-full">
          <div className="rounded-lg bg-gray-100 p-6 shadow-md h-full">
            <h2 className="mb-6 text-xl font-bold">Publish A Schedule</h2>
            <div className="flex justify-between">
              <Button
                onClick={handleUpload}
                disabled={!publishFile || week === "" || !admin}
                className="flex justify-center items-center space-x-2 bg-[#4c6ef5] rounded-lg px-4 py-2 w-1/3 hover:bg-[#503bdb]"
              >
                <UploadIcon className="h-5 w-5 text-white" />
                Publish
              </Button>

              <Button className=" text-white bg-black hover:bg-red-500 px-4 py-2 w-1/3">
                <Link href="/api/auth/logout">Logout</Link>
              </Button>
            </div>

            <div className="mt-6 grid gap-6">
              {admin && (
                <Input
                  className="w-full"
                  type="file"
                  onChange={(event) => handleSelectFile(event)}
                />
              )}

              {admin && <WeekSelect setWeek={setWeek} />}

              <div className="ml-1 mt-2 font-semibold">
                {uploadStatus === "uploading" && <p>Uploading...</p>}
                {uploadStatus === "invalid" && (
                  <p>Please choose .xls or .xlsx file.</p>
                )}
                {uploadStatus === "success" && <p>File upload successful.</p>}
                {uploadStatus === "error" && <p>File upload failed.</p>}
              </div>
            </div>
          </div>
          {/* left side ended here */}
          <div className="rounded-lg bg-gray-100 p-6 shadow-md h-full">
            <h2 className="mb-6 text-xl font-bold">Download A Schedule</h2>
            <div className="flex justify-between">
              <Button
                className="bg-[#4c6ef5] text-white hover:bg-[#503bdb] px-4 py-2 w-1/3"
                onClick={handleDownload}
              >
                <DownloadIcon className="h-5 w-5 mr-2" />
                Download
              </Button>
            </div>

            <div className="mt-6 grid gap-4">
              <FileSelect
                files={fileList}
                setDownloadFile={setFileToDownload}
              />
              {/* <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a week..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week1">Week 1</SelectItem>
                  <SelectItem value="week2">Week 2</SelectItem>
                  <SelectItem value="week3">Week 3</SelectItem>
                  <SelectItem value="week4">Week 4</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
