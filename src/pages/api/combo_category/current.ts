import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const params = req.query;

    const { cate_id } = params;

    const connect = await connectDB();

    const totalQuery = 
        `select distinct s1.CategoryName FROM combocategories s1 WHERE CategoryID = '${cate_id}' and s1.DeletedAt is null limit 1`;     

    const [result] = await connect.execute(totalQuery);
    connect.end();
    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
