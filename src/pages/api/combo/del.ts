import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const params = req.body;

    const { ComboID } = params;

    const connect = await connectDB();

    const query = `update combo SET 
    DeletedAt = now() where ComboID='${ComboID}';`;

    const [results] = await connect.execute(query);

    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
