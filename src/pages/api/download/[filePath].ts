import { CDN_URL } from "@/utils/constants";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {
        query: { filePath }
      } = req;
  res.redirect(`${CDN_URL}${filePath}`);
}
