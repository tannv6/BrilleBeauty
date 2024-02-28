import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const connect = await connectDB();
    const query = `select distinct s1.*, count(distinct(s4.ProductID)) as totalProducts from categories s1
    left join categories s2
    on s1.CategoryID = s2.ParentID and s2.DeletedAt is null
    left join categories s3 on s2.CategoryID = s3.ParentID and s3.DeletedAt is null
    left join products s4 on (s4.CategoryID = s1.CategoryID or s4.CategoryID = s2.CategoryID or s4.CategoryID = s3.CategoryID) and s4.DeletedAt is null
    where s1.Level = 1 and s1.DeletedAt is null group by s1.CategoryID`;
    const [result] = await connect.execute(query);
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
