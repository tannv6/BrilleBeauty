import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { comboID } = req.query;
    const connect = await connectDB();
    const query = `select * from combo where ComboID = '${comboID}' AND DeletedAt IS NULL;`;
    const [result, rows] = await connect.execute(query);
    const queryImage = `select * from comboimages where ComboID = '${comboID}' AND DeletedAt IS NULL;`;
    const [result2] = await connect.execute(queryImage);
    if (Array.isArray(result) && result.length > 0) {
        const combo: any = result[0];
        combo["IsBest"] = combo["IsBest"][0];
        combo["IsBigSale"] = combo["IsBigSale"][0];
        combo["IsNew"] = combo["IsNew"][0];
        combo['Images'] = result2;
        return res.status(200).json(combo);
      } else {
        return res.status(200).json(null);
      }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
