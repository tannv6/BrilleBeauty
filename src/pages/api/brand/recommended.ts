import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session: any = await getSession({ req });
    let listBrand: any[] = [];

    const connect = await connectDB();
    const query = ` select s1.*, count(s2.BrandID) as hit_cnt from brand s1 
                    left join brandhit s2 on s1.BrandID = s2.BrandID
                    where DeletedAt is null
                    group by s1.BrandID
                    order by case when hit_cnt > 0 then hit_cnt else RAND() end desc`;
    const [result]: any[][] = await connect.execute(query);
    let listOfUser: string | any[] = [];
    if (session?.user?.id) {
      const query1 = ` select s1.*, count(s2.BrandID) as hit_cnt from brand s1 
                    left join brandhit s2 on s1.BrandID = s2.BrandID
                    where DeletedAt is null and s2.CustomerID = '${session?.user?.id}'
                    group by s1.BrandID
                    order by hit_cnt desc limit 15`;
      const [result1] = await connect.execute(query1);
      if (Array.isArray(result1)) {
        listOfUser = [...result1];
        listBrand = [...result1];
      }
    }
    
    result.forEach((e, i) => {
      if (i < 15 - listOfUser.length) {
        listBrand.push(e);
      }
    });
    
    connect.end();
    return res.status(200).json({ data: listBrand });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
