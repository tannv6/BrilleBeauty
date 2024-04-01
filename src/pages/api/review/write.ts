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
    const form = formidable({});
    const [fields, files] = await form.parse(req);

    const session : any= await getSession({ req });
    const UserID = session?.user?.id;
    const UserName = session?.user?.name;

    const {
      ProductID,
      Title,
      ReviewDes,
      Start,
      Post,
    } = fields;

    const connect = await connectDB();
    let Img1 = "";
    let Img2 = "";
    let Img3 = "";
    let Img4 = "";
    let Img5 = "";

    if (files.Img1) {
      Img1 = (await saveFile(files.Img1[0], "/review")).ufile;
    }
    if (files.Img2) {
      Img2 = (await saveFile(files.Img2[0], "/review")).ufile;
    }
    if (files.Img3) {
      Img3 = (await saveFile(files.Img3[0], "/review")).ufile;
    }
    if (files.Img4) {
      Img4 = (await saveFile(files.Img4[0], "/review")).ufile;
    }
    if (files.Img5) {
      Img5 = (await saveFile(files.Img5[0], "/review")).ufile;
    }

    const query = `INSERT INTO review SET 
      UserID ='${UserID}',
      UserName ='${UserName}',
      Title='${Title}',
      ReviewDes='${ReviewDes}',
      Start = '${Start}',
      ProductID = '${ProductID}',
      Post = '${Post}',
      Img1 = '${Img1}',
      Img2 = '${Img2}',
      Img3 = '${Img3}',
      Img4 = '${Img4}',
      Img5 = '${Img5}',
      CreatedAt=NOW();`;

    await connect.execute(query);
    connect.end();
    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
