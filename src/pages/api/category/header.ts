import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const connect = await connectDB();
    const data1: any = [];
    const query = `select * from categories where Level = 1 AND DeletedAt IS NULL;`;
    const [result, rows] = await connect.execute(query);
    if (Array.isArray(result) && result.length > 0) {
      for (let index = 0; index < result.length; index++) {
      const object: any = {};
      const level1: any = result[index];
      Object.assign(object, level1);
      object["child"] = [];
      const query1 = `select * from categories where ParentID = '${level1.CategoryID}' and Level = 2 AND DeletedAt IS NULL;`;
      const [result1] = await connect.execute(query1);
      if (Array.isArray(result1)) {
        for (let index1 = 0; index1 < result1.length; index1++) {
          const element: any = result1[index1];
          const query2 = `select * from categories where ParentID = '${element.CategoryID}' and Level = 3 AND DeletedAt IS NULL;`;
          const [result2] = await connect.execute(query2);
          object["child"].push({
            ...element,
            child: result2,
          });
        }
      }
      data1.push(object);
      }
      return res.status(200).json({ data: data1 });
    }
    else {
      return res.status(200).json(null);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
