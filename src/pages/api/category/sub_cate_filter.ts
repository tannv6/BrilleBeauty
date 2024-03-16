import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const params = req.query;

    const { cate_id, depth } = params;
    const connect = await connectDB();
    let cate_condtion = "";
    let query = ""
    if (cate_id) {
      cate_condtion = `s${depth}.CategoryID = '${cate_id}'`;
    }
    if (depth == "1") {
      query = `select distinct s2.* from categories s1
      left join categories s2 on s1.CategoryID = s2.ParentID and s2.DeletedAt is null
      left join categories s3 on s2.CategoryID = s3.ParentID and s3.DeletedAt is null
      where ${cate_condtion} and s1.DeletedAt is null`;
    }
    else if (depth == "2") {
      query = `select distinct s3.* from categories s1
      left join categories s2 on s1.CategoryID = s2.ParentID and s2.DeletedAt is null
      left join categories s3 on s2.CategoryID = s3.ParentID and s3.DeletedAt is null
      where ${cate_condtion} and s1.DeletedAt is null`;
    }
    else {

    }
    const [result] = await connect.execute(query);
    connect.end();
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
