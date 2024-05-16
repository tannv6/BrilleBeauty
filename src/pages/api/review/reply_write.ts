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
        ReviewID,
        ProductID,
        ComboID,
        ReplyDes
    } = fields;

    const connect = await connectDB();

    let query = `INSERT INTO review_reply SET 
    ReviewID = '${ReviewID}',
    ProductID = ${ProductID ? "'" + ProductID + "'" : "''"},
    ComboID = ${ComboID ? "'" + ComboID + "'" : "''"},
    ReplyDes='${ReplyDes}',
    CreatedAt=NOW();`;

    await connect.execute(query);
    connect.end();
    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
