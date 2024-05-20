import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import { getSession } from "next-auth/react";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const form = formidable({});
    const [fields] = await form.parse(req);

    const { ODID } = fields;

    const session: any = await getSession({ req });

    if (session?.user?.id) {
      const connect = await connectDB();
        await connect.execute(`update orderaddress SET 
        IsDefault=0
        where 1 = 1;`);

      await connect.execute(`update orderaddress SET 
      IsDefault=1,
      UpdatedAt= now()
      where ODID = '${ODID}';`);
      connect.end();

      return res.status(201).json({ result: "OK" });
    } else {
      return res.status(401).json({ result: "OK" });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
