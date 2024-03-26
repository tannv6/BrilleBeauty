import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const connect = await connectDB();
    const query = `select * from product_options where DeletedAt is null;`;
    const [result1] = await connect.execute(query);
    connect.end();
    return res.status(200).json({ data: result1 });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
