import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const params = req.query;

    const { session }: any = params;

    
    const sessionObj = JSON.parse(session);
    
    console.log(sessionObj);

    const query = `select * from customers where CustomerID = '${sessionObj?.user?.id}'`;

    const connect = await connectDB();

    const [results] = await connect.execute(query);

    connect.end();

    if (Array.isArray(results) && results.length > 0) {
      const info: any = results[0];
      return res.status(200).json(info);
    } else {
      return res.status(200).json(null);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
