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

    const {ODID,
      FirstName,
      LastName,
      PhoneNumber,
      CountryID,
      ProvinceID,
      DistrictID,
      CommuneID,
      DetailAddress,
      ComName,
      ZipCode,
      Email,
      BasicAddress,
    } = fields;

    const session: any = await getSession({ req });

    if (session?.user?.id) {
      const connect = await connectDB();

      const query = `update orderaddress SET
        FirstName='${FirstName}',
        LastName='${LastName}',
        PhoneNumber='${PhoneNumber}',
        Email='${Email}',
        BasicAddress='${BasicAddress}',
        DetailAddress='${DetailAddress}',
        ComName='${ComName}',
        ZipCode='${ZipCode}',
        UpdatedAt= now()
        where ODID = '${ODID}';`;

      const [results] = await connect.execute(query);
      connect.end();

      return res.status(201).json({ result: "OK" });
    } else {
      return res.status(401).json({ result: "OK" });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
