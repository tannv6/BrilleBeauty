import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const params = req.body;

    const { PopupID } = params;

    const connect = await connectDB();

    connect.end();

    return res.status(201).json({ result: process.env.CLIENT_ID });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
