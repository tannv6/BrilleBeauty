import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const connect = await connectDB();
    const query = `select * from categories where DeletedAt is null`;
    const [result] = await connect.execute(query);
    connect.end();
    const catObject: any = {
      level1: [],
      level2: [],
      level3: [],
    };

    (result as any[]).forEach((e: any, i: any) => {
      if (e.Level === 1) {
        catObject.level1.push({
          ...e,
          id: e.CategoryID,
          name: e.CategoryName,
        });
      } else if (e.Level === 2) {
        catObject.level2.push({
          ...e,
          id: e.CategoryID,
          name: e.CategoryName,
        });
      } else if (e.Level === 3) {
        catObject.level3.push({
          ...e,
          id: e.CategoryID,
          name: e.CategoryName,
        });
      }
    });
    return res.status(200).json(catObject);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
