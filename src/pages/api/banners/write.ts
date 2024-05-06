import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { saveFile } from "@/utils/function";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);

    const image = files.ImageUpload?.[0];
    const {
      BannerCategory,
      BannerName,
      BannerDes,
      BannerTitle,
      BannerLink,
      ShowDate,
      ShowEndDate,
      CategoryID1,
      CategoryID2,
      CategoryID3,
    } = fields;

    const connect = await connectDB();
    let BannerImg = "";

    if (image) {
      BannerImg = (await saveFile(image, "/banner")).ufile;
    }

    const query = `insert into banners SET 
    BannerCategory='${BannerCategory}',
    BannerName='${BannerName}',
    BannerDes='${BannerDes}',
    BannerImg=${BannerImg ? `'${BannerImg}'` : "BannerImg"},
    BannerTitle='${BannerTitle}',
    BannerLink='${BannerLink}',
    ShowDate='${ShowDate}',
    ShowEndDate='${ShowEndDate}',
    CategoryID = '${
      Number(CategoryID3) || Number(CategoryID2) || Number(CategoryID1)
    }',
    CreatedAt= now();`;

    const [results] = await connect.execute(query);
    connect.end();
    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
