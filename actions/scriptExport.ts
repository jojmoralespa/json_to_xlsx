"use server";
import XlsxPopulate from "xlsx-populate";
import { saveAs } from "file-saver";

export async function saveExcel(jsonResults) {
  "use server";
  const buffer = await populateWorkBook(jsonResults);
  const jsonBuffer = buffer.toJSON();
  const buff = new Uint8Array(jsonBuffer.data);
  const blob = new Blob([buff]);
  saveAs(blob, "file.xlsx");
}

export async function populateWorkBook(jsonResults) {
  const workBook = await XlsxPopulate.fromBlankAsync();

  for (const element of jsonResults) {
    const sheet = workBook.addSheet(element.nombre_categoria);

    let rowIndex = 1;

    if (categoria.nombre_categoria == "Gestión Documental") {
      for (const capitulo of categoria.capitulos) {
        let tableHeight = 0;

        sheet.cell(`A${rowIndex}`).value(capitulo.nombre_capitulo);
        sheet
          .range(`A${rowIndex}:D${rowIndex}`)
          .merged(true)
          .style({ bold: true, fill: "FFC900" });
        rowIndex++;
        tableHeight++;
        sheet.cell(`A${rowIndex}`).value("Nombre");
        sheet.cell(`B${rowIndex}`).value("Tipo");
        sheet.cell(`C${rowIndex}`).value("Ruta");
        sheet.cell(`D${rowIndex}`).value("Descripción");
        sheet
          .range(`A${rowIndex}:D${rowIndex}`)
          .style({ bold: true, fill: "D5D6DA" });
        sheet.column("A").width(40);
        sheet.column("C").width(50);
        sheet.column("D").width(50);
        rowIndex++;
        tableHeight++;

        for (const reporte of capitulo.reportes) {
          if (!reporte.value) {
            sheet.cell(`A${rowIndex}`).value(reporte.nombre);
            sheet.cell(`B${rowIndex}`).value(reporte.tipo);
            sheet.cell(`C${rowIndex}`).value(reporte.ruta);
            sheet.cell(`D${rowIndex}`).value(reporte.descripcion);
            sheet.cell(`C${rowIndex}`).style("wrapText", true);
            sheet.cell(`D${rowIndex}`).style("wrapText", true);
            rowIndex++;
            tableHeight++;
          }
        }
        sheet
          .range(`A${rowIndex - tableHeight}:D${rowIndex - 1}`)
          .style({ border: true });
        // sheet.range(`A${rowIndex - tableHeight + 1}:D${rowIndex - 1}`).autoFilter();
        rowIndex += 2;
      }
    } else if (categoria.nombre_categoria == "Incidencias") {
      for (const capitulo of categoria.capitulos) {
        let tableHeight = 0;

        sheet.cell(`A${rowIndex}`).value(capitulo.nombre_capitulo);
        sheet
          .range(`A${rowIndex}:D${rowIndex}`)
          .merged(true)
          .style({ bold: true, fill: "FFC900" });
        rowIndex++;
        tableHeight++;
        sheet.cell(`A${rowIndex}`).value("id");
        sheet.cell(`B${rowIndex}`).value("Incidencia");
        sheet.cell(`C${rowIndex}`).value("Tipo");
        sheet.cell(`D${rowIndex}`).value("Descripción");
        sheet
          .range(`A${rowIndex}:D${rowIndex}`)
          .style({ bold: true, fill: "D5D6DA" });
        sheet.column("B").width(40);
        sheet.column("D").width(60);
        rowIndex++;
        tableHeight++;

        for (const reporte of capitulo.reportes) {
          if (!reporte.value) {
            sheet.cell(`A${rowIndex}`).value(reporte.displayId);
            sheet.cell(`B${rowIndex}`).value(reporte.nombre);
            sheet.cell(`C${rowIndex}`).value(reporte.tipo);
            sheet.cell(`D${rowIndex}`).value(reporte.descripcion);
            sheet.cell(`D${rowIndex}`).style("wrapText", true);
            rowIndex++;
            tableHeight++;
          }
        }
        sheet
          .range(`A${rowIndex - tableHeight}:D${rowIndex - 1}`)
          .style({ border: true });
        // sheet.range(`A${rowIndex - tableHeight + 1}:D${rowIndex - 1}`).autoFilter();
        rowIndex += 2;
      }
    }
  }

  workBook.deleteSheet("Sheet1");

  const buffer = await workBook.outputAsync();
  return buffer.toJSON();
}
