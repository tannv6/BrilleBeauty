import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const params = req.query;

    const { page = 1, scale = 1000 } = params;

    const connect = await connectDB();

    const totalQuery = "SELECT s1.*, s2.CategoryName FROM products s1 inner join categories s2 on s1.CategoryID = s2.CategoryID";

    const [resultTotal]: any = await connect.execute(totalQuery);

    const total = resultTotal.length;

    const query =
      totalQuery +
      ` limit ${(Number(page) - 1) * Number(scale)}, ${
        Number(page) * Number(scale)
      };`;
    const [result] = await connect.execute(query);
    return res.status(200).json({
      data: result,
      total,
      currentPage: page,
      scale,
      totalPage: Math.ceil(total / Number(scale)),
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
