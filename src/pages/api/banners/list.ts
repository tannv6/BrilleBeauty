import connectDB from "@/app/db";
import { bannerCategories } from "@/utils/constants";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const params = req.query;

    const { page = 1, pageSize = 1000,cate } = params;

    let cateSql = "";

    if (typeof cate === "string" && Object.keys(bannerCategories).includes(cate)) {
      cateSql = `and BannerCategory = '${cate}'`
    }

    const connect = await connectDB();
    const totalQuery = `select * from banners where DeletedAt is null ${cateSql} order by BannerID desc`;

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
      currentPage: page,
      pageSize,
      totalPage: Math.ceil(total / Number(pageSize)) || 1,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
