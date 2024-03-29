import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { saveFile } from "@/utils/function";
import { getSession } from "next-auth/react";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session: any = await getSession({ req });
    if (session?.user?.id) {
      const form = formidable({});
      const [fields, files] = await form.parse(req);
      const image = files.ImageUpload?.[0];
      const { FirstName, LastName, DateOfBirth } = fields;

      let BannerImg = "";

      if (image) {
        BannerImg = (await saveFile(image, "/banner")).ufile;
      }

      const connect = await connectDB();

      const query = `update customers SET 
        FirstName='${FirstName}',
        LastName='${LastName}',
        DateOfBirth='${DateOfBirth}',
        UpdatedAt = now() where CustomerID = '${session?.user?.id}';`;

      const [results] = await connect.execute(query);
      connect.end();
      return res.status(200).json({ result: "OK" });
    } else {
      return res.status(401).json({ result: "OK" });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
