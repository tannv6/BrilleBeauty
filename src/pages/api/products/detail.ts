import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { productID, session } = req.query;

    const sessionObject = JSON.parse((session as any) || "{}");
    const CustomerID = sessionObject?.user?.id;
    
    const connect = await connectDB();
    const query = `select a.*,b.Level as CategoryLevel, b.ParentID, c.ParentID as ppID from products a 
    left join categories b on a.CategoryID = b.CategoryID 
    left join categories c on b.ParentID = c.CategoryID 
    where a.ProductID = '${productID}' AND a.DeletedAt IS NULL;`;
    const queryOption = `select * from product_options where ProductID = '${productID}' AND DeletedAt IS NULL;`;
    const queryImage = `select * from productimages where ProductID = '${productID}' AND DeletedAt IS NULL;`;
    const [result] = await connect.execute(query);
    const [result1] = await connect.execute(queryOption);
    const [result2] = await connect.execute(queryImage);
    if (Array.isArray(result) && result.length > 0) {
      const product: any = result[0];
      product["Options"] = result1;
      product["Images"] = result2;
      if (CustomerID) {
        const [result3]: any =
          await connect.execute(`select count(*) as cnt from interactions 
            where ObjectType = 'product' and InteractionType = 'like' and ObjectID = '${productID}' and CustomerID = '${CustomerID}' and DeletedAt is NULL`);
        if (Number(result3?.[0]?.["cnt"]) > 0) {
          product["liked"] = true;
        } else {
          product["liked"] = false;
        }
      }
      connect.end();
      return res.status(200).json(product);
    } else {
      connect.end();
      return res.status(200).json(null);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
