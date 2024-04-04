import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";


export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    
    const session : any= await getSession({ req });
    const customerID = session?.user?.id;

    const connect : any = await connectDB();
    const query = ` SELECT COUNT(*) AS cnt_cart FROM cart WHERE CustomerID =  '${customerID}' `;

    const [result]: any = await connect.execute(query);
    connect.end();   

    return res.status(201).json(result[0].cnt_cart);
    
  } catch (error) {
    return res.status(500).json({ error });
  }
}
