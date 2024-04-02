import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { search, page = 1, pageSize = 1000 } = req.query;
    const connect = await connectDB();
    const totalQuery = `select * from brand where DeletedAt is null ${
      search ? ` and BrandName like '%${search}%'` : ""
    }`;
    const [resultTotal]: any = await connect.execute(totalQuery);

    const total = resultTotal.length;
    const query =
      totalQuery +
      ` limit ${(Number(page) - 1) * Number(pageSize)}, ${Number(pageSize)};`;
    const [result] = await connect.execute(query);
    connect.end();
    return res.status(200).json({
      data: result,
      total,
      currentPage: Number(page) || 1,
      pageSize,
      totalPage: Math.ceil(total / Number(pageSize)),
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
