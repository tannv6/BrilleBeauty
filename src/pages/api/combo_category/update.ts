import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
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
    const {
      CategoryID,
      CategoryName,
    } = fields;

    let CategoryImg = "";

    if (image) {
      CategoryImg = (await saveFile(image, "/Category")).ufile;
    }

    const connect = await connectDB();

    const query = `update combocategories SET
    CategoryName='${CategoryName}',
    UpdatedAt = now() where CategoryID='${CategoryID}';`;

    const [results] = await connect.execute(query);

    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
