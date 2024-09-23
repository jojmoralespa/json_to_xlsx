import React from "react";
import { saveAs } from "file-saver";
import { populateWorkBook } from "../actions/Export";
const Button = require("../components/Button").default;

export default function SimetriaReportExportButton({ jsonData }) {
  async function handleExportReport(data) {
    const jsonBuffer = await populateWorkBook(data);
    const buff = new Uint8Array(jsonBuffer.data);
    const blob = new Blob([buff]);
    saveAs(blob, `${"file"}.xlsx`);
  }

  return (
    <Button
      className="w-min whitespace-nowrap"
      onClick={() => {
        handleExportReport(jsonData);
      }}
    >
      Descargar reporte
    </Button>
  );
}
