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
      OrderID,
      OrdersCode,
      CustomerID,
      OrderDate,
      TotalAmount,
      StatusID,
      OrderPhone,
      OrderEmail,
      OrderAddress,
      PayMethodID,
      ShippingFormID,
      Note,
      CustomerNote,
      RecieverName,
      ProvinceID,
      DistrictID,
      CommuneID,
    } = fields;

    const connect = await connectDB();

    const query = `update orders SET 
      OrderID = '${OrderID}',
      OrdersCode = '${OrdersCode}',
      CustomerID = '${CustomerID}',
      StatusID = '${StatusID}',
      ShippingFormID = '${ShippingFormID}',
      PayMethodID = '${PayMethodID}',
      TotalAmount = '${TotalAmount}',
      OrderPhone = '${OrderPhone}',
      OrderEmail = '${OrderEmail}',
      OrderAddress = '${OrderAddress}',
      Note = '${Note}',
      CustomerNote = '${CustomerNote}',
      RecieverName = '${RecieverName}',
      ProvinceID = '${ProvinceID}',
      DistrictID = '${DistrictID}',
      CommuneID = '${CommuneID}',
    UpdatedAt = now() where OrderID='${OrderID}';`;

    const [results] = await connect.execute(query);

    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
