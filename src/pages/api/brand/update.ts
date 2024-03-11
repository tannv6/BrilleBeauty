import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
export const config = {
  api: {
    bodyParser: false,
  },
};


export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const form = formidable({});
    const [fields] = await form.parse(req);
    
    const {
        BrandName,BrandID
    } = fields;

    const connect = await connectDB();
    const query = `UPDATE brand SET 
    BrandName = '${BrandName}', UpdatedAt = now() WHERE BrandID = '${BrandID}'`;
    
    const [results] = await connect.execute(query);
    connect.end();
    
    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
