import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session : any = await getSession({ req });
    const params = req.query;  
    
    const customerID = session?.user?.id;
    const { CartID } = params;

    const connect = await connectDB();
    const query = ` DELETE FROM cart WHERE CartID = '${CartID}' AND CustomerID = '${customerID}'`;

    await connect.execute(query);
    

    const queryCart = `select c1.*, p1.ProductName, p1.SellPrice, p1.ProductImage, p2.PoName, p2.PoSellPrice, p3.PotName from cart as c1 
            left join products as p1 on c1.ProductID = p1.ProductID
            left join product_options as p2 on c1.PoID = p2.PoID
            left join product_option_types as p3 on p3.PotID = p2.PotID
            where c1.CustomerID = '${customerID}'and p2.DeletedAt is null and p3.DeletedAt is null`;
   
    const [result] = await connect.execute(queryCart)

    connect.end();

    if (Array.isArray(result) && result.length > 0) {
        const cart: any = result;
        return res.status(201).json(cart);
    } else {
        return res.status(201).json(null);
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
