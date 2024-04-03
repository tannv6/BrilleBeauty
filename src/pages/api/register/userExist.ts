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

    const { user_name, user_email2, mode } = fields;

    const connect = await connectDB();
    let query = "";
    if (mode?.[0] === "user_name") {
      query = `SELECT * FROM customers WHERE UserName = '${user_name}' `;
    } else {
      query = `SELECT * FROM customers WHERE Email = '${user_email2}' `;
    }
    const [results]: any = await connect.execute(query);

    return res.status(201).json({ data: results.length > 0 });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
