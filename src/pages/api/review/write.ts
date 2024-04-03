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

    let query = `INSERT INTO review SET 
    UserID ='${UserID}',
    UserName ='${UserName}',
    Title='${Title}',
    ReviewDes='${ReviewDes}',
    Start = '${Start}',
    ProductID = '${ProductID}',
    Post = '${Post}',`;
  
  const imgFields = ['Img1', 'Img2', 'Img3', 'Img4', 'Img5'];
  const fileNameFields = ['FileName1', 'FileName2', 'FileName3', 'FileName4', 'FileName5'];
  
  for (let i = 0; i < imgFields.length; i++) {
    query += `
      ${imgFields[i]} = '${imgUrls[i]}',
      ${fileNameFields[i]} = '${fileNames[i]}',`;
  }
  
  query += `
    CreatedAt=NOW();`;

    await connect.execute(query);
    connect.end();
    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
