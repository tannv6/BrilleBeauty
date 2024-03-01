import formidable from "formidable";
import fs from "fs";

export function convertDatesToNumbers(arrayOfObjects: any) {
  return arrayOfObjects.map((obj: any) => {
    const result: any = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        if (value instanceof Date) {
          result[key] = value.getTime();
        } else {
          result[key] = value;
        }
      }
    }

    return result;
  });
}

export function getFileExtension(filename: string) {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

export const saveFile = async (
  file: formidable.File,
  path = ""
) => {
  const data = fs.readFileSync(file.filepath);
  await fs.writeFileSync(
    `../data/brillebeauty${path}/${file.newFilename}.${getFileExtension(
      file.originalFilename || ""
    )}`,
    data
  );
  await fs.unlinkSync(file.filepath);
  return {
    ufile: `${path}/${file.newFilename}.${getFileExtension(
      file.originalFilename || ""
    )}`,
    rfile: file.originalFilename,
  };
};
