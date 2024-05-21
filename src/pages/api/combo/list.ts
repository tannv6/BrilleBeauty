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

    const totalQuery = `select s1.*, s2.IsSeasonal, s2.CategoryName from combo s1 left join combocategories s2 on
                        s1.CategoryID = s2.CategoryID where s1.DeletedAt is null`;

    const [resultTotal]: any = await connect.execute(totalQuery);

    const total = resultTotal.length;

    const query =
      totalQuery +
      ` limit ${(Number(page) - 1) * Number(pageSize)}, ${Number(pageSize)};`;
    const [result]: any = await connect.execute(query);
    for (let index = 0; index < result.length; index++) {
      const element = result[index];
      const [res]: any =
        await connect.execute(`select count(*) as cnt from interactions 
            where ObjectType = 'combo' and InteractionType = 'like' and ObjectID = '${element.ComboID}'`);
      const [res1]: any =
        await connect.execute(`select count(*) as cnt, avg(Start) as avg from review 
            where ComboID = '${element.ComboID}'`);
      const like = res[0]?.cnt || 0;
      const reviewCnt = res1[0]?.cnt || 0;
      const reviewAvg = Math.round(res1[0]?.avg * 20) / 20 || 0;
      element["like"] = like;
      element["reviewCnt"] = reviewCnt;
      element["reviewAvg"] = reviewAvg;
    }
    connect.end();
    return res.status(200).json({
      data: result,
      total,
      currentPage: page,
      pageSize,
      totalPage: Math.ceil(total / Number(pageSize)),
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
