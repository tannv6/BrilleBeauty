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
      const { options, productID, ComboID, Quantity, TotalAmount } = fields;
      const connect = await connectDB();
      const OrdersCode = generateOrderId();
      const query = `insert into orders SET 
                    OrdersCode='${OrdersCode}',
                    CustomerID='${session?.user?.id}',
                    TotalAmount='${TotalAmount}',
                    StatusID = 1,
                    CreatedAt= now();`;

      const [results] = await connect.execute(query);
      const lastInsertedId = (results as any).insertId;
      let InitPrice = 0;
      let SalePrice = 0;
      let cartOptions;
    if (typeof options === "string") {
        cartOptions = JSON.parse(options);
    }

    if (ComboID) {
        const [result1]: any = await connect.execute(
            `select * from combo where ComboID = '${ComboID}'`
        );
        const detail = result1[0];
        InitPrice = detail?.InitPrice;
        SalePrice = detail?.SellPrice;
        const sql1 = `insert into orderdetails set 
                        OrderID='${lastInsertedId}',
                        ComboID='${ComboID}',
                        Quantity='${Quantity}',
                        Subtotal='${SalePrice * Number(Quantity)}',
                        InitPrice='${InitPrice}',
                        SalePrice='${SalePrice}',
                        OptionID='0'
                        `;
                await connect.execute(sql1);
    } else {
        if (cartOptions && cartOptions?.length > 0) {
            for (let index = 0; index < cartOptions.length; index++) {
                if(Number(cartOptions[index].PoID) == 0){
                    const [result1]: any = await connect.execute(
                        `select * from products where ProductID = '${productID}'`
                    );
                    const detail = result1[0];
                    InitPrice = detail?.InitPrice;
                    SalePrice = detail?.SellPrice;
                }else{
                    const [result1]: any = await connect.execute(
                        `select * from product_options where PoID = '${cartOptions[index].PoID}'`
                    );
                    const detail = result1[0];
                    InitPrice = detail?.PoInitPrice;
                    SalePrice = detail?.PoSellPrice;
                }

                const sql1 = `insert into orderdetails set 
                        OrderID='${lastInsertedId}',
                        ProductID=${productID},
                        Quantity='${cartOptions[index].PoNum}',
                        Subtotal='${SalePrice * (cartOptions[index].PoNum || 1)}',
                        InitPrice='${InitPrice}',
                        SalePrice='${SalePrice}',
                        OptionID='${cartOptions[index].PoID || 0}'
                        `;
                await connect.execute(sql1);
              }       
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
