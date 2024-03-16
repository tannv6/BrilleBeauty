import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { brandID } = req.query;
    const connect = await connectDB();
    const query = `select * from brand where BrandID = '${brandID}' AND DeletedAt IS NULL;`;
    const [result, rows] = await connect.execute(query);
    connect.end();
    if (Array.isArray(result) && result.length > 0) {
        const brand: any = result[0];
        return res.status(200).json(brand);
    } else {
        return res.status(200).json(null);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
