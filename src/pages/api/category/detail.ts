import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { idx } = req.query;
    const connect = await connectDB();
    const object: any = {};
    const query = `select * from categories where CategoryID = '${idx}' and Level = 1 AND DeletedAt IS NULL;`;
    const [result, rows] = await connect.execute(query);
    if (Array.isArray(result) && result.length > 0) {
      const level1: any = result[0];
      Object.assign(object, level1);
      object["child"] = [];
      const query1 = `select * from categories where ParentID = '${level1.CategoryID}' and Level = 2;`;
      const [result1] = await connect.execute(query1);
      if (Array.isArray(result1)) {
        for (let index = 0; index < result1.length; index++) {
          const element: any = result1[index];
          const query2 = `select * from categories where ParentID = '${element.CategoryID}' and Level = 3;`;
          const [result2] = await connect.execute(query2);
          object["child"].push({
            ...element,
            child: result2,
          });
        }
      }
      return res.status(200).json(object);
    } else {
      return res.status(200).json(null);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
