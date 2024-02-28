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
      CustomerID,
      FirstName,
      LastName,
      Email,
      CustomerPhone,
      Province,
      District,
      Village,
      Address,
    } = fields;

    const connect = await connectDB();

    const query = `update customers SET 
    FirstName='${FirstName}',
    LastName='${LastName}',
    Email='${Email}',
    CustomerPhone='${CustomerPhone}',
    Province='${Province}',
    District='${District}',
    Village='${Village}',
    Address='${Address}',
    UpdatedAt = now() where CustomerID='${CustomerID}';`;

    const [results] = await connect.execute(query);

    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
