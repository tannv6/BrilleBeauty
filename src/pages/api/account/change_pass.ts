import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { saveFile } from "@/utils/function";
import { getSession } from "next-auth/react";
import { compare, compareSync, hashSync } from "bcrypt";
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
      const { CurrentPassword, NewPassword } = fields;

      let BannerImg = "";

      if (image) {
        BannerImg = (await saveFile(image, "/banner")).ufile;
      }

      const connect = await connectDB();

      const query1 = `select PassWord
      from customers where CustomerID='${session?.user?.id}';`;

      const [results1] = await connect.execute(query1);

      if (!Array.isArray(results1) || results1.length == 0) {
        return res.status(401).json({ result: "OK" });
      }

      const user = results1[0];

      console.log(user);
      

      const isRightPass = compareSync(
        CurrentPassword?.toString() || "",
        user?.PassWord
      );

      if (!isRightPass) {
        return res.status(401).json({ result: "OK" });
      }

      const hash = hashSync(NewPassword?.[0] || "", 10);

      const query = `update customers SET 
        Password='${hash}',
        UpdatedAt = now() where CustomerID='${session?.user?.id}';`;

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
