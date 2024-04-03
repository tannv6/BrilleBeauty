import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const params = req.query;

    const { page = 1, pageSize = 1000, cate_id, depth, sort, brand } = params;

    const connect = await connectDB();

    let cate_condition = "";

    if (cate_id) {
      cate_condition = ` and s1.CategoryID = '${cate_id}'`;
    }
    let sort_condtion = "";

    if (sort) {
      if (sort === "price_desc") {
        sort_condtion = ` , prd.SellPrice desc `;
      } else if (sort === "price_asc") {
        sort_condtion = ` , prd.SellPrice asc `;
      }
    }
    let brand_condtion = "";

    if (brand) {
      brand_condtion = ` and prd.BrandID = '${brand}'`;
    }
    let totalQuery = "";
    if (depth == "1") {
      totalQuery = `select distinct prd.* from categories s1
        inner join categories s2 on s1.CategoryID = s2.ParentID and s2.DeletedAt is null
        inner join categories s3 on s2.CategoryID = s3.ParentID and s3.DeletedAt is null
        inner join products prd on (prd.CategoryID = s1.CategoryID or prd.CategoryID = s2.CategoryID or prd.CategoryID = s3.CategoryID) and prd.DeletedAt is null
        where s1.Level = ${depth} ${cate_condition} ${brand_condtion} and s1.DeletedAt is null order by prd.ProductID desc ${sort_condtion}`;
    } else if (depth == "2") {
      totalQuery = `select distinct prd.* from categories s1
        inner join categories s2 on s1.CategoryID = s2.ParentID and s2.DeletedAt is null
        inner join products prd on (prd.CategoryID = s1.CategoryID or prd.CategoryID = s2.CategoryID) and prd.DeletedAt is null
        where s1.Level = ${depth} ${cate_condition} ${brand_condtion} and s1.DeletedAt is null order by prd.ProductID desc ${sort_condtion}`;
    } else {
      totalQuery = `select distinct prd.* from categories s1
        inner join products prd on (prd.CategoryID = s1.CategoryID) and prd.DeletedAt is null
        where s1.Level = ${depth} ${cate_condition} ${brand_condtion} and s1.DeletedAt is null order by prd.ProductID desc ${sort_condtion}`;
    }

    const cateThumbnailSql = `select s4.*,s1.CategoryID as c1, s2.CategoryID c2, s3.CategoryID c3 from categories s1 
                              left join categories s2 on s2.CategoryID = s1.ParentID
                              left join categories s3 on s3.CategoryID = s2.ParentID
                              left join banners s4 on s4.CategoryID = s1.CategoryID or s4.CategoryID = s2.CategoryID or s4.CategoryID = s3.CategoryID
                              where s1.CategoryID = '${cate_id}' and s4.DeletedAt is null group by s4.BannerID;`;
    const [resultThumbnail]: any = await connect.execute(cateThumbnailSql);

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
      thumbnail: resultThumbnail,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
