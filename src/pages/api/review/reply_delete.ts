import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const params = req.body;

    const { ReplyID } = params;

    const connect = await connectDB();

    const query = `update review_reply SET 
    DeletedAt = now() where ReplyID='${ReplyID}';`;

    const [results] = await connect.execute(query);
    connect.end();

    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
