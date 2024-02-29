import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { bannerID } = req.query;

    const connect = await connectDB();

    const query = `select * from banners where DeletedAt is null and BannerID = '${bannerID}'`;

    const [result] = await connect.execute(query);

    if (Array.isArray(result) && result.length > 0) {
      const banner: any = result[0];
      return res.status(200).json(banner);
    } else {
      return res.status(200).json(null);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
