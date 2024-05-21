import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const params = req.query;

    const { page = 1, pageSize = 1000 } = params;

    const connect = await connectDB();
    const [result1]: any = await connect.execute(
      `select * from combocategories where IsHomepage = 1 limit 1`
    );
    if (Array.isArray(result1) && result1.length > 0) {
      const comboCate: any = result1[0];
      const totalQuery = `select s1.*, s2.IsSeasonal, s2.CategoryName from combo s1 left join combocategories s2 on
      s1.CategoryID = s2.CategoryID where s1.DeletedAt is null and s1.CategoryID = '${comboCate["CategoryID"]}'`;

      const [resultTotal]: any = await connect.execute(totalQuery);

      const total = resultTotal.length;

      const query =
        totalQuery +
        ` limit ${(Number(page) - 1) * Number(pageSize)}, ${Number(pageSize)};`;
      const [result] = await connect.execute(query);
      connect.end();
      return res.status(200).json({
        detail: comboCate,
        data: result,
        total,
        currentPage: page,
        pageSize,
        totalPage: Math.ceil(total / Number(pageSize)),
      });
    } else {
      return res.status(200).json(null);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
