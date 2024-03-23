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

    if (cate_id) {
      cate_condtion = `and s1.CategoryID = '${cate_id}'`;
    }
    const totalQuery = 
        `select distinct s1.CategoryName from categories s1
        where s1.Level = ${depth} ${cate_condtion} and s1.DeletedAt is null limit 1`;     

 

    const [result] = await connect.execute(totalQuery);
    connect.end();
    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
