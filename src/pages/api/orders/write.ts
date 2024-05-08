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
    const session: any = await getSession({ req });
    if (session?.user?.id) {
      const {
        TotalAmount,
        OrderPhone,
        ProvinceID,
        DistrictID,
        CommuneID,
        CountryID,
        OrderAddress,
      } = fields;

      const connect = await connectDB();
      const OrdersCode = "938479";
      const query = `insert into orders SET 
    OrdersCode='${OrdersCode}',
    CustomerID='${session?.user?.id}',
    TotalAmount='${TotalAmount}',
    OrderPhone='${OrderPhone}',
    ProvinceID='${ProvinceID}',
    DistrictID='${DistrictID}',
    CommuneID='${CommuneID}',
    CountryID='${CountryID}',
    StatusID = 1,
    OrderAddress='${OrderAddress}',
    CreatedAt= now();`;

      const [results] = await connect.execute(query);
      connect.end();

      return res.status(201).json({ result: "OK", OrdersCode });
    } else {
      return res.status(401).json({ result: "OK" });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
