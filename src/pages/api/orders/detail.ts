import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { OrderID } = req.query;

    const connect = await connectDB();

    const query = `select * from orders where DeletedAt is null and OrderID = '${OrderID}'`;

    const [result] = await connect.execute(query);

    if (Array.isArray(result) && result.length > 0) {
      const customer: any = result[0];
      return res.status(200).json(customer);
    } else {
      return res.status(200).json(null);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
