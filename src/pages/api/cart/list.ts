import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { customerID } = req.query;
    const connect = await connectDB();
    const query = `select c1.*, p1.ProductName, p1.ProductImage, p2.PoName, p2.PoSellPrice from cart as c1 left join products as p1 on c1.ProductID = p1.ProductID
            left join product_options as p2 on c1.PoID = p2.PoID where c1.CustomerID = '${customerID}'and  p2.DeletedAt is null`;
   
    const [result] = await connect.execute(query)

    connect.end();
    if (Array.isArray(result) && result.length > 0) {
        const cart: any = result;
        return res.status(200).json(cart);
      } else {
        return res.status(200).json(null);
      }
  } catch (error) {
    return res.status(500).json({ error });
  }
}