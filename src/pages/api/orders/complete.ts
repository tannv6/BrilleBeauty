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

    const {
      OrdersCode,
      StatusCode,
      OrderPhone,
      OrderEmail,
      OrderBasicAddress,
      OrderDetailAddress,
      RecieverName,
      PayMethodID,
      ShippingFormID,
      CustomerNote,
      DeliveryFee,
      TotalPayment,
    } = fields;
    const session: any = await getSession({ req });
    if (session?.user?.id) {
      const connect = await connectDB();
      const [result1]: any = await connect.execute(
        `SELECT * FROM brillebeauty.status where StatusCategory = 'order' and StatusCode = '${StatusCode}'`
      );
      const query = `update orders SET 
                    CustomerID = '${session?.user?.id}',
                    StatusID = '${result1?.[0]?.StatusID}',
                    StatusCode = '${StatusCode}',
                    DeliveryFee = '${DeliveryFee}',
                    TotalPayment = '${TotalPayment}',
                    ShippingFormID = '${ShippingFormID}',
                    PayMethodID = '${PayMethodID}',
                    OrderPhone = '${OrderPhone}',
                    OrderEmail = '${OrderEmail}',
                    OrderBasicAddress = '${OrderBasicAddress}',
                    OrderDetailAddress = '${OrderDetailAddress}',
                    CustomerNote = '${CustomerNote?.[0] ? CustomerNote : ""}',
                    RecieverName = '${RecieverName}',
                    OrderDate = now(),
                    UpdatedAt = now() where OrdersCode='${OrdersCode}';`;

      const [results] = await connect.execute(query);
      connect.end();

      return res.status(201).json({ result: "OK" });
    } else {
      return res.status(401).json({ req });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
