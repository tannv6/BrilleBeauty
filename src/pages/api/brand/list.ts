import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { search } = req.query;
    const connect = await connectDB();
    const query = `select * from brand where DeletedAt is null ${
      search ? ` and BrandName like '%${search}%'` : ""
    }`;
    const [result] = await connect.execute(query);
    connect.end();
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
