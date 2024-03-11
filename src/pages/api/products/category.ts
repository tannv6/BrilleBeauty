import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const params = req.query;

    const { page = 1, pageSize = 1000, cate_id, depth } = params;

    const connect = await connectDB();

    let cate_condtion = "";

    if (cate_id) {
      cate_condtion = ` and s1.CategoryID = '${cate_id}'`;
    }
    let totalQuery = "";
    if (depth == "1") {
        totalQuery =
        `select distinct s4.* from categories s1
        inner join categories s2 on s1.CategoryID = s2.ParentID and s2.DeletedAt is null
        inner join categories s3 on s2.CategoryID = s3.ParentID and s3.DeletedAt is null
        inner join products s4 on (s4.CategoryID = s1.CategoryID or s4.CategoryID = s2.CategoryID or s4.CategoryID = s3.CategoryID) and s4.DeletedAt is null
        where s1.Level = ${depth} ${cate_condtion} and s1.DeletedAt is null`;     
    }
    else if (depth == "2") {
        totalQuery =
        `select distinct s3.* from categories s1
        inner join categories s2 on s1.CategoryID = s2.ParentID and s2.DeletedAt is null
        inner join products s3 on (s3.CategoryID = s1.CategoryID or s3.CategoryID = s2.CategoryID) and s3.DeletedAt is null
        where s1.Level = ${depth} ${cate_condtion} and s1.DeletedAt is null`; 
    }
    else {
        totalQuery =
        `select distinct s2.* from categories s1
        inner join products s2 on (s2.CategoryID = s1.CategoryID) and s2.DeletedAt is null
        where s1.Level = ${depth} ${cate_condtion} and s1.DeletedAt is null`; 
    }
 

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
      totalPage: Math.ceil(total / Number(pageSize)),
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
