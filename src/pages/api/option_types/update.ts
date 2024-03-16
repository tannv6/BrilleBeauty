import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { PotName, PotID } = req.body;
    const connect = await connectDB();
    const query = `update product_option_types set PotName = '${PotName}' where PotID = '${PotID}'`;
    const [result, rows] = await connect.execute(query);
    connect.end();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
