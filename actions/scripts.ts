"use server";
export async function mapJsonGoogleToExcel(formData: FormData) {
  // objeto json de entrada
  type JsonGoogle = {
    exportFormatVersion: number;
    containerVersion: Container;
  };

  // objetos para mapeo a base de datos
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
  //---------------------------------
  try {
    const file = formData.get("file");

    if (file && typeof file === "object" && file.name) {
      const dataBuffer = await file.arrayBuffer();
      const text = new TextDecoder("utf-8").decode(dataBuffer);

      const jsonData: JsonGoogle = JSON.parse(text);
      console.log(jsonData.containerVersion.tag[0]);

      return jsonData.containerVersion;
    }
  } catch (error) {
    console.error("Error uploading file to BlobStorage:", error);
  }
}
