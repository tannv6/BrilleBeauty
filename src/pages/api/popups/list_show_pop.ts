import connectDB from "@/app/db";
import { getCookieValue } from "@/utils/cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const params = req.query;

    const { page = 1, pageSize = 1000 } = params;

    const connect = await connectDB();
    const totalQuery = `select * from popups where DeletedAt is null order by PopupID desc`;

    const [resultTotal]: any = await connect.execute(totalQuery);

    const total = resultTotal.length;

    const query =
      totalQuery +
      ` limit ${(Number(page) - 1) * Number(pageSize)}, ${Number(pageSize)};`;

    const [result] = await connect.execute(query);
    connect.end();
    return res.status(200).json({
      data: (result as any[]).filter((e) => {
        const cookieValue = getCookieValue({ req, res }, `pop_${e.PopupID}`);
        console.log(cookieValue);
        
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
