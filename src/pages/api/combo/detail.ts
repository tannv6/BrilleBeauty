import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { comboID, session } = req.query;
    const sessionObject = JSON.parse((session as any) || "{}");
    const CustomerID = sessionObject?.user?.id;
    const connect = await connectDB();
    const query = `select s1.*, s2.IsSeasonal from combo s1 left join combocategories s2 on
    s1.CategoryID = s2.CategoryID where ComboID = '${comboID}' AND s1.DeletedAt IS NULL;`;
    const [result, rows] = await connect.execute(query);
    const queryImage = `select * from comboimages where ComboID = '${comboID}' AND DeletedAt IS NULL;`;
    const [result2] = await connect.execute(queryImage);
    if (Array.isArray(result) && result.length > 0) {
      const combo: any = result[0];
      combo["Images"] = result2;
      if (CustomerID) {
        const [result3]: any =
          await connect.execute(`select count(*) as cnt from interactions 
        where ObjectType = 'combo' and InteractionType = 'like' and ObjectID = '${comboID}' and CustomerID = '${CustomerID}'`);
        if (Number(result3?.[0]?.["cnt"]) > 0) {
          combo["liked"] = true;
        } else {
          combo["liked"] = false;
        }
      }
      connect.end();
      return res.status(200).json(combo);
    } else {
      connect.end();
      return res.status(200).json(null);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
