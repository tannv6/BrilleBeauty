import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { productID } = req.query;
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
    connect.end();
    if (Array.isArray(result) && result.length > 0) {
        const product: any = result[0];
        product["IsBest"] = product["IsBest"][0];
        product["IsBigSale"] = product["IsBigSale"][0];
        product["IsNew"] = product["IsNew"][0];
        product['Options'] = result1;
        product['Images'] = result2;
        return res.status(200).json(product);
      } else {
        return res.status(200).json(null);
      }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
