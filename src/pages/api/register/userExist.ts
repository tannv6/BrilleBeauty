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
        user_email2,
        password2,
        first_name,
        last_name,
        birth,
    } = fields;

    const connect = await connectDB();
    const query = `SELECT * FROM customers WHERE Email = '${user_email2}' `;
    
    const [results] = await connect.execute(query);
    
    return res.status(201).json({ data: results });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
