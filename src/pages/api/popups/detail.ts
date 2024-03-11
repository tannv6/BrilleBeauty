import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { popupID } = req.query;

    const connect = await connectDB();

    const query = `select * from popups where DeletedAt is null and PopupID = '${popupID}'`;

    const [result] = await connect.execute(query);
    connect.end();

    if (Array.isArray(result) && result.length > 0) {
      const popup: any = result[0];
      popup["IsShow"] = popup["IsShow"][0];
      popup["IsFull"] = popup["IsFull"][0];
      popup["IsCentered"] = popup["IsCentered"][0];
      return res.status(200).json(popup);
    } else {
      return res.status(200).json(null);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
