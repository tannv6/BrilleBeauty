import connectDB from "@/app/db";
import { getCookieValue } from "@/utils/cookie";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.setHeader('Access-Control-Allow-Credentials', "true");
    const params = req.query;
    const cookies2 = parse(req.headers.cookie || '');

    const { page = 1, pageSize = 1000, cookies1 } = params;
    
    const cookies = JSON.parse(cookies1?.toString() || "{}" )
    const connect = await connectDB();
    const totalQuery = `select * from popups where DeletedAt is null and IsShow = 1 order by PopupID desc`;

    const [resultTotal]: any = await connect.execute(totalQuery);

    const total = resultTotal.length;

    const query =
      totalQuery +
      ` limit ${(Number(page) - 1) * Number(pageSize)}, ${Number(pageSize)};`;

    const [result] = await connect.execute(query);
    connect.end();
    return res.status(200).json({
      data: (result as any[]).filter((e) => {
        const cookieValue = cookies[`pop_${e.PopupID}`];
        return !cookieValue;
      }),
      total,
      currentPage: page,
      pageSize,
      totalPage: Math.ceil(total / Number(pageSize)),
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
