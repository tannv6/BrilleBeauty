import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const connect = await connectDB();

    const query = `select * from homeset where idx = 1`;

    const [result] = await connect.execute(query);

    if (Array.isArray(result) && result.length > 0) {
      return res.status(200).json(result[0]);
    } else {
      return res.status(200).json({});
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
