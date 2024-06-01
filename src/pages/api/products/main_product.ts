import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const params = req.query;
    // const session: any = await getServerSession(req, res, authOptions);
    // const CustomerID = session?.user?.id;

    const { page = 1, pageSize = 1000, type = "", session }: any = params;

    const sessionObject = JSON.parse((session as any) || "{}");
    const CustomerID = sessionObject?.user?.id;

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
    const [result]: any = await connect.execute(query);
    for (let index = 0; index < result.length; index++) {
      const element = result[index];
      const [res]: any =
        await connect.execute(`select count(*) as cnt from interactions 
            where ObjectType = 'product' and InteractionType = 'like' and ObjectID = '${element.ProductID}' and DeletedAt is null`);
      const [res1]: any =
        await connect.execute(`select count(*) as cnt, avg(Start) as avg from review 
            where ProductID = '${element.ProductID}' and DeletedAt is null`);
      const like = res[0]?.cnt || 0;
      const reviewCnt = res1[0]?.cnt || 0;
      const reviewAvg = Math.round(res1[0]?.avg * 20) / 20 || 0;
      if (CustomerID) {
        const [result3]: any =
          await connect.execute(`select count(*) as cnt from interactions 
        where ObjectType = 'product' and InteractionType = 'like' and ObjectID = '${element.ProductID}' and CustomerID = '${CustomerID}' and DeletedAt is null`);
        if (Number(result3?.[0]?.["cnt"]) > 0) {
          element["liked"] = true;
        } else {
          element["liked"] = false;
        }
      }
      element["like"] = like;
      element["reviewCnt"] = reviewCnt;
      element["reviewAvg"] = reviewAvg;
    }
    connect.end();
    return res.status(200).json({
      list: result,
      total,
      currentPage: Number(page),
      pageSize: Number(pageSize),
      totalPage: Math.ceil(total / Number(pageSize)),
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
