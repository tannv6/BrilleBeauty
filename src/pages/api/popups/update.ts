import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
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
      PopupID,
      PopupTitle,
      PopupContent,
      PositionTop,
      PositionLeft,
      StartDate,
      EndDate,
      IsShow,
      PopupLink,
      PopupScreen,
    } = fields;

    let PopupImage = "";

    if (image) {
      PopupImage = (await saveFile(image, "/popup")).ufile;
    }

    const connect = await connectDB();

    const query = `update popups SET 
    PopupTitle='${PopupTitle}',
    PopupContent='${PopupContent}',
    PositionTop='${PositionTop}',
    PopupImage=${PopupImage ? `'${PopupImage}'` : "PopupImage"},
    PositionLeft='${PositionLeft}',
    StartDate='${StartDate}',
    EndDate='${EndDate}',
    IsShow=${Number(IsShow)||0},
    PopupLink='${PopupLink}',
    PopupScreen='${PopupScreen}',
    UpdatedAt = now() where PopupID='${PopupID}';`;

    const [results] = await connect.execute(query);

    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
