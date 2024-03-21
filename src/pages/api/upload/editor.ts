import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { saveFile } from "@/utils/function";
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

    return res.status(200).json({
      resourceType: "Files",
      currentFolder: {
        url: "/ckfinder/userfiles/files/",
      },
      fileName: "fileName.jpg",
      uploaded: 1,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
