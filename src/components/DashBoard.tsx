"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BellIcon, DownloadIcon, Package2Icon, ShareIcon } from "./Icons";
import FileSelect from "./FileSelect";
import WeekSelect from "./WeekSelect";
import { useState, useEffect } from "react";
import { upload, download, listFiles } from "@/lib/transfer";
import { StorageReference } from "firebase/storage";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function DashBoard() {
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
    <div className="grid min-h-screen w-full grid-cols-[360px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center justify-between border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <Package2Icon className="h-6 w-6" />
              <span className="">Best Buy Pembina</span>
            </Link>
            <div>
              <BellIcon className="h-4 w-4" />
            </div>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <div>
                <Button
                  className="flex items-center gap-3 rounded-lg px-3 py-2 mb-4 text-gray-900 transition-all hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-50"
                  variant="ghost"
                  onClick={handleUpload}
                  disabled={!publishFile || week === "" || !admin}
                >
                  <ShareIcon className="h-4 w-4" />
                  Publish a New Schedule
                </Button>
                {admin && (
                  <input
                    type="file"
                    onChange={(event) => handleSelectFile(event)}
                    className="px-3"
                  ></input>
                )}

                {admin && (
                  <div className="px-2 py-5">
                    <WeekSelect setWeek={setWeek} />
                  </div>
                )}

                <div className="px-3 mb-2">
                  {uploadStatus === "uploading" && <p>Uploading...</p>}
                  {uploadStatus === "invalid" && (
                    <p>Please choose .xls or .xlsx file!</p>
                  )}
                  {uploadStatus === "success" && <p>File upload successful!</p>}
                  {uploadStatus === "error" && <p>File upload failed!</p>}
                </div>

                <Button variant="destructive" className="ml-1.5 mt-2">
                  <Link href="/api/auth/logout">Logout</Link>
                </Button>


              </div>
            </nav>
            <nav></nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <div className="w-full flex-1">
            <FileSelect files={fileList} setDownloadFile={setFileToDownload} />
          </div>
          <Button
            className="shrink-0"
            variant="outline"
            onClick={handleDownload}
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download
          </Button>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6" />
      </div>
    </div>
  );
}
