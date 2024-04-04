import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const params = req.query;

    const {
      page = 1,
      pageSize = 1000,
      brand,
      cate_id,
      sort,
      search_txt,
      search_mode,
      isForceSearch,
    } = params;

    if (isForceSearch && !search_txt) {
      return res.status(200).json({
        data: [],
        total: 0,
        currentPage: Number(page),
        pageSize,
        totalPage: 1,
      });
    }

    const connect = await connectDB();

    let br_select = "";
    let br_join = "";
    let br_condtion = "";
    let cate_condtion = "";
    let order = "";
    let searchStr = "";

    if (search_txt && search_txt?.length > 0) {
      if (search_mode === "all" || !search_mode) {
        searchStr = ` and s1.ProductName like '%${search_txt}%'`;
      }
    }

    if (sort === "price_desc") {
      order = " order by s1.SellPrice desc";
    } else if (sort === "price_asc") {
      order = " order by s1.SellPrice asc";
    }

    if (brand) {
      br_select = "";
      br_join = " inner join brand s3 on s1.BrandID = s3.BrandID ";
      br_condtion = ` and s1.BrandID = '${brand}'`;
    }
    if (cate_id) {
      cate_condtion = ` and s1.CategoryID = '${cate_id}'`;
    }
    const totalQuery = `SELECT s1.*, s2.CategoryName FROM products s1 
      left join categories s2 on s1.CategoryID = s2.CategoryID
      ${br_join}
      WHERE s1.DeletedAt IS NULL ${searchStr} ${br_condtion} ${cate_condtion} ${order}`;

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
      currentPage: Number(page),
      pageSize,
      totalPage: Math.ceil(total / Number(pageSize)) || 1,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
