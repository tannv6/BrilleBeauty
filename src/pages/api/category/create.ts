import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = req.body;
    const connect = await connectDB();
    let queryNew = "";
    queryNew = `INSERT INTO categories(CreatedAt, ParentID, Level) VALUES `;
    queryNew += ` (CURRENT_TIMESTAMP, ${data.ParentID || "null"}, '${
      data.Level
    }')`;
    const [results] = await connect.execute(queryNew);
    const lastInsertedId = (results as any).insertId;
    return res.status(200).json({ lastInsertedId });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
