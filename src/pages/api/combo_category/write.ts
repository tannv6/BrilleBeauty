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
    const { CategoryName, Description, SubDescription, IsHomepage } = fields;

    const image = files.ImageUpload?.[0];

    const connect = await connectDB();

    let ThumbImage = "";

    if (image) {
      ThumbImage = (await saveFile(image, "/combo_cat")).ufile;
    }

    const query = `insert into combocategories SET
    CategoryName='${CategoryName}',
    Description='${Description}',
    SubDescription='${SubDescription}',
    IsHomepage='${IsHomepage}',
    ThumbImage='${ThumbImage}',
    CreatedAt= now();`;

    await connect.execute(query);
    connect.end();

    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
