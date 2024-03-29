import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = req.body;
    const connect = await connectDB();
    let queryUpdate = "";
    let queryDelete = "";
    if (data.mod?.length > 0) {
      queryUpdate = `UPDATE categories
    SET CategoryName = CASE `;
      data.mod.forEach((element: any) => {
        queryUpdate += ` WHEN CategoryID = '${element.CategoryID}' THEN '${element.CategoryName}' `;
      });
      queryUpdate += ` ELSE CategoryName
    END, UpdatedAt = CASE `;
      data.mod.forEach((element: any) => {
        queryUpdate += ` WHEN CategoryID = '${element.CategoryID}' THEN CURRENT_TIMESTAMP `;
      });
      queryUpdate += ` ELSE UpdatedAt
    END;`;
    }
    if (data.del?.length > 0) {
      queryDelete = `UPDATE categories
    SET DeletedAt = CASE `;
      data.del.forEach((element: any) => {
        queryDelete += ` WHEN CategoryID = '${element.CategoryID}' THEN CURRENT_TIMESTAMP `;
      });
      queryDelete += ` ELSE DeletedAt
    END;`;
    }
    queryUpdate && (await connect.execute(queryUpdate));
    queryDelete && (await connect.execute(queryDelete));
    connect.end();
    return res.status(200).json({ status: "success" });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
