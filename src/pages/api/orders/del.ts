import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const params = req.body;

    const { OrderID } = params;

    const connect = await connectDB();

    const query = `update orders SET 
    DeletedAt = now() where OrderID='${OrderID}';`;

    const [results] = await connect.execute(query);
    connect.end();

    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
