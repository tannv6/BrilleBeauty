import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { idx } = req.query;
    const connect = await connectDB();
    const query = `select * from combo where ComboID = '${idx}' AND DeletedAt IS NULL;`;
    const [result, rows] = await connect.execute(query);
    if (Array.isArray(result) && result.length > 0) {
        const combo: any = result[0];
        return res.status(200).json(combo);
      } else {
        return res.status(200).json(null);
      }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
