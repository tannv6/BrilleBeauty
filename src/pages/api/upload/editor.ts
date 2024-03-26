import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { saveFile } from "@/utils/function";
import { CDN_URL } from "@/utils/constants";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);
    const image = files?.upload?.[0];
    let ImageURL = "";

    if (image) {
      ImageURL = (await saveFile(image, "/editor")).ufile;
    }

    if (ImageURL) {
      return res.status(200).json({
        success: true,
        url: CDN_URL + "/" + ImageURL,
        name: image?.originalFilename,
        size: image?.size,
        type: "image/jpeg",
      });
    } else {
      return res.status(200).json({
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
