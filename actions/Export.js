"use server";
import XlsxPopulate from "xlsx-populate";

// Tipos para el contenedor

// Función para generar el archivo Excel
export async function populateWorkBook(container) {
  // Crear un nuevo workbook en blanco
  const workBook = await XlsxPopulate.fromBlankAsync();

  // Definir los datos para cada hoja
  const sheetsData = [
    { name: "tag", data: container.tag },
    { name: "trigger", data: container.trigger },
    { name: "variable", data: container.variable },
  ];

  // Iterar sobre cada hoja y agregar datos
  sheetsData.forEach((sheetInfo) => {
    const sheet = workBook.addSheet(sheetInfo.name);

    let rowIndex = 1;

    // Añadir los encabezados
    sheet.cell(`A${rowIndex}`).value("Name");
    sheet.cell(`B${rowIndex}`).value("Type");
    sheet
      .range(`A${rowIndex}:B${rowIndex}`)
      .style({ bold: true, fill: "D5D6DA" });

    rowIndex++;

    // Poblar los datos
    sheetInfo.data.forEach((item) => {
      sheet.cell(`A${rowIndex}`).value(item.name);
      sheet.cell(`B${rowIndex}`).value(item.type);
      rowIndex++;
    });

    // Ajustar el ancho de las columnas
    sheet.column("A").width(40);
    sheet.column("B").width(20);

    // Añadir bordes a la tabla
    sheet.range(`A1:B${rowIndex - 1}`).style({ border: true });
  });

  // Eliminar la hoja predeterminada "Sheet1"
  workBook.deleteSheet("Sheet1");

  // Exportar el workbook como un buffer
  const buffer = await workBook.outputAsync();
  return buffer.toJSON();
}
