import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { position, count } = req.query;

    const connect = await connectDB();

    const query = `select a.*,b.Level as CategoryLevel, b.ParentID, c.ParentID as ppID
    from banners a
    left join categories b on a.CategoryID = b.CategoryID 
    left join categories c on b.ParentID = c.CategoryID 
    where a.DeletedAt is null and a.BannerCategory = '${position}' limit ${
      count || 1
    };`;

    const [result] = await connect.execute(query);
    connect.end();
    if (Array.isArray(result) && result.length > 0) {
      return res.status(200).json(result);
    } else {
      return res.status(200).json([]);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
