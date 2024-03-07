import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const params = req.query;

    const { page = 1, pageSize = 1000, brand, cate_id } = params;

    const connect = await connectDB();

    let br_select = "";
    let br_join = "";
    let br_condtion = "";
    let cate_condtion = "";

    if (brand) {
      br_select = '';
      br_join =  ' inner join brand s3 on s1.BrandID = s3.BrandID ';
      br_condtion = ` and s1.BrandID = '${brand}'`;
    }
    if (cate_id) {
      cate_condtion = ` and s1.CategoryID = '${cate_id}'`;
    }
    const totalQuery =
      `SELECT s1.*, s2.CategoryName FROM products s1 
      inner join categories s2 on s1.CategoryID = s2.CategoryID
      ${br_join}
      WHERE s1.DeletedAt IS NULL ${br_condtion} ${cate_condtion}`;

      console.log(totalQuery);
      

    const [resultTotal]: any = await connect.execute(totalQuery);

    const total = resultTotal.length;

    const query =
      totalQuery +
      ` limit ${(Number(page) - 1) * Number(pageSize)}, ${Number(pageSize)};`;
    const [result] = await connect.execute(query);
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
