"use client";
import { mapJsonGoogleToExcel } from "@/actions/scripts";
import Button from "@/components/Button";
import Input from "@/components/Input";
import FileImport from "@/components/svg/FileImport";
import Image from "next/image";
import { useState } from "react";
const ExportButton = require("./ReportButton").default;

type Container = {
  tag: Tag[];
  trigger: Trigger[];
  variable: Variable[];
};

type Tag = {
  name: string;
  type: string;
};

type Trigger = {
  name: string;
  type: string;
};

type Variable = {
  name: string;
  type: string;
};

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [jsonInfo, setJsonInfo] = useState<Container>();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  }

  async function onSubmitJson(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("name", selectedFile.name);
        formData.append("file", selectedFile);
        const jsonInfo = await mapJsonGoogleToExcel(formData);
        // console.log(jsonInfo);
        setJsonInfo(jsonInfo);
      }
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="border-rounded-bg-gray-500 flex h-full w-full flex-col items-center justify-center gap-6 p-2">
      <form className="flex flex-col gap-2" onSubmit={onSubmitJson}>
        <Input
          label="Json:"
          typeInput={"file"}
          id="file"
          type="file"
          name="file"
          accept=".json"
          onChange={handleFileChange}
          addStartContent={<FileImport />}
        />
        {selectedFile && (
          <Button
            type="submit"
            // onClick={() => onSubmitJson()}
            variant={"blackSolid"}
          >
            Json to xslx
          </Button>
        )}
      </form>
      {jsonInfo && (
        // <div>{jsonInfo.tag[0].name}</div>

        <ExportButton jsonData={jsonInfo} />
      )}
    </div>
  );
}
