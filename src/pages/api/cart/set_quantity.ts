import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { count, CartID } = req.body;

    const connect : any = await connectDB();

    const [result]: any = await connect.execute(`update cart set Quantity = '${count}' where CartID = '${CartID}'`);
    connect.end();   

    return res.status(201).json(count);
    
  } catch (error) {
    return res.status(500).json({ error });
  }
}
