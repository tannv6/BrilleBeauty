import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);
    const {
      CategoryID,
      CategoryName,
    } = fields;

    const connect = await connectDB();

    const query = `update combocategories SET
    CategoryName='${CategoryName}',
    UpdatedAt = now() where CategoryID='${CategoryID}';`;

    await connect.execute(query);

    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
