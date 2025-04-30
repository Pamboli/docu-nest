"use server";

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("The file was not found");
  }

  const bufferArray = await file.arrayBuffer();
  const buffer = Buffer.from(bufferArray);

  const text = buffer.toString("utf-8");

  console.log(text);
}
