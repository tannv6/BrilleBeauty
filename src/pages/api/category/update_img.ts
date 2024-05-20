import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { saveFile } from "@/utils/function";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);
    const image = files.ImageUpload?.[0];

    let CategoryImage = "";

    if (image) {
      CategoryImage = (await saveFile(image, "/category")).ufile;
    }

    const {
        CategoryID
      } = fields;

    const connect = await connectDB();

    const query = `update categories SET 
    CategoryImage=${CategoryImage ? `'${CategoryImage}'` : "CategoryImage"}
    where CategoryID='${CategoryID}' and Level = 1;`;

    const [results] = await connect.execute(query);
    connect.end();

    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
