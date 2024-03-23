import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { PotName } = req.body;
    const connect = await connectDB();
    const query = `insert into product_option_types set PotName = '${PotName}'`;
    const [result, rows] = await connect.execute(query);
    connect.end();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
