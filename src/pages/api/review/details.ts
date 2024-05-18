import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    const { reviewID } = req.query;
    const connect = await connectDB();
    const query = `select s1.*, s2.ProductName, s2.InitPrice, s2.ProductImage,
    s3.ComboName, s3.InitPrice, s3.ComboImage  
    from review s1
    left join products s2 on s1.ProductID = s2.ProductID
    left join combo s3 on s1.ComboID = s3.ComboID
    where s1.ReviewID = '${reviewID}' AND s1.DeletedAt IS NULL;`;
    const [result] = await connect.execute(query);
    connect.end();
    if (Array.isArray(result) && result.length > 0) {
      const review: any = result[0];
      return res.status(200).json(review);
    } else {
      return res.status(200).json(null);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}