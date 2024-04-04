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
      ReviewID,
      ProductID,
      Title,
      ReviewDes,
      Start,
    } = fields;

    const connect = await connectDB();
    const imgFiles = ["Img1", "Img2", "Img3", "Img4", "Img5"];
    const fileNames: string[] = [];
    const imgUrls: string[] = [];
    
    for (let i = 0; i < imgFiles.length; i++) {
      const imgField = imgFiles[i];
      const file = files[imgField];
      
      if (file) {
        const { rfile, ufile } = await saveFile(file[0], "/review");
        imgUrls.push(ufile);
        fileNames.push(rfile !== null ? rfile : "");
      } else {
        imgUrls.push("");
        fileNames.push("");
      }
    }
    
    const [FileName1, FileName2, FileName3, FileName4, FileName5] = fileNames;
    const [Img1, Img2, Img3, Img4, Img5] = imgUrls;

    const query = `UPDATE review SET 
      UserID ='${UserID}',
      UserName ='${UserName}',
      Title='${Title}',
      ReviewDes='${ReviewDes}',
      Start = '${Start}',
      ProductID = '${ProductID}',
      Img1=${imgUrls[0] ? `'${imgUrls[0]}'` : "Img1"},
      Img2=${imgUrls[1] ? `'${imgUrls[1]}'` : "Img2"},
      Img3=${imgUrls[2] ? `'${imgUrls[2]}'` : "Img3"},
      Img4=${imgUrls[3] ? `'${imgUrls[3]}'` : "Img4"},
      Img5=${imgUrls[4] ? `'${imgUrls[4]}'` : "Img5"},
      FileName1=${fileNames[0]? `'${fileNames[0]}'` : "FileName1"},
      FileName2=${fileNames[1]? `'${fileNames[1]}'` : "FileName2"},
      FileName3=${fileNames[2]? `'${fileNames[2]}'` : "FileName3"},
      FileName4=${fileNames[3]? `'${fileNames[3]}'` : "FileName4"},
      FileName5=${fileNames[4]? `'${fileNames[4]}'` : "FileName5"},
      UpdatedAt=NOW()
      WHERE ReviewID = '${ReviewID}' ;`;

    await connect.execute(query);
    connect.end();
    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
