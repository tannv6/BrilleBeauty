import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const params = req.query;

    const { page = 1, pageSize = 1000, type = "" } = params;

    if (
      type === "" ||
      (type !== "IsBest" && type !== "IsBigSale" && type !== "IsNew")
    ) {
      return res.status(200).json({
        list: [],
        total: 0,
        currentPage: page,
        pageSize,
        totalPage: 0,
      });
    }

    const connect = await connectDB();

    const totalQuery = `SELECT s1.*, s2.CategoryName FROM products s1 
      inner join categories s2 on s1.CategoryID = s2.CategoryID
      WHERE s1.DeletedAt IS NULL AND s1.${type} = 1 `;

    const [resultTotal]: any = await connect.execute(totalQuery);

    const total = resultTotal.length;

    const query =
      totalQuery +
      ` limit ${(Number(page) - 1) * Number(pageSize)}, ${Number(pageSize)};`;
    const [result] = await connect.execute(query);
    connect.end();
    return res.status(200).json({
      list: result,
      total,
      currentPage: Number(page),
      pageSize:Number(pageSize),
      totalPage: Math.ceil(total / Number(pageSize)),
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
