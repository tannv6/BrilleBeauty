import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import { getSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
export const config = {
  api: {
    bodyParser: false,
  },
};
function generateOrderId() {
  const prefix = "ORD";
  const date = new Date();
  const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
  const formattedTime = date.toTimeString().slice(0, 8).replace(/:/g, ""); // HHMMSS
  const uniquePart = uuidv4().split("-")[0]; // Shorten UUID
  return `${prefix}-${formattedDate}-${formattedTime}-${uniquePart}`.toUpperCase();
}
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
        CartList,
      } = fields;
      const connect = await connectDB();
      const OrdersCode = generateOrderId();
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
      const lastInsertedId = (results as any).insertId;
      const list = CartList?.toString()?.split(",");

      if (list && list?.length > 0) {
        for (let index = 0; index < list.length; index++) {
          const element = list[index];
          const sql = `select * from cart where CartID = '${element}'`;
          
          const [result]: any = await connect.execute(sql);
          const cart = result[0];
          const sql1 = `insert into orderdetails set 
                        OrderID='${lastInsertedId}',
                        ProductID=${cart?.ProductID},
                        ComboID=${cart?.ComboID},
                        Quantity='${cart?.Quantity}',
                        Subtotal='${1}',
                        InitPrice='${1}',
                        SalePrice='${1}',
                        OptionID='${cart?.PoID}'
                        `;
            await connect.execute(sql1);
        }
      }

      connect.end();

      return res.status(201).json({ result: "OK", OrdersCode });
    } else {
      return res.status(401).json({ result: "OK" });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
