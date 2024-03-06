import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const connect = await connectDB();
    const query = ` select s1.*, count(s2.BrandID) as hit_cnt from brand s1 
                    left join brandhit s2 on s1.BrandID = s2.BrandID
                    where DeletedAt is null
                    group by s1.BrandID
                    order by hit_cnt desc
                    limit 1 `;
    const [result] = await connect.execute(query);
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
