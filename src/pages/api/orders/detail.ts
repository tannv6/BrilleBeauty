import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { OrderID, mode } = req.query;

    const connect = await connectDB();

    const query = `select s1.*, s2.FirstName, s2.LastName from orders s1 left join customers s2 
    on s1.CustomerID = s2.CustomerID where s1.DeletedAt is null and ${
      mode == "code" ? "s1.OrdersCode" : "s1.OrderID"
    } = '${OrderID}'`;

    const [result] = await connect.execute(query);
    let detailList = [];
    if (Array.isArray(result) && result.length > 0) {
      const order: any = result[0];
      const queryDetails = `select *, s1.Quantity as detailQuantity from orderdetails s1 left join products s2 on s1.ProductID = s2.ProductID
      where s1.OrderID = '${order.OrderID}'`;

      const [result2]: any = await connect.execute(queryDetails);
      if (Array.isArray(result2) && result2.length > 0) {
        for (let index = 0; index < result2.length; index++) {
          const e = result2[index];
          if (e?.PoID) {
            const [result1]: any = await connect.execute(
              `select t1.SalePrice, t2.ProductName, t2.ProductImage from product_options t1 join products t2 on t1.ProductID = t2.ProductID where t1.PoID = '${e?.PoID}'`
            );
            const detail = result1[0];
            detailList.push({
              ProductImage: detail?.ProductImage,
              SalePrice: e.SalePrice,
              ProductName: detail?.ProductName,
              Quantity: e.detailQuantity,
              Subtotal: e.Subtotal,
            });
          } else if (e?.ProductID) {
            const [result1]: any = await connect.execute(
              `select * from products where ProductID = '${e?.ProductID}'`
            );
            const detail = result1[0];
            detailList.push({
              ProductImage: detail?.ProductImage,
              SalePrice: e.SalePrice,
              ProductName: detail?.ProductName,
              Quantity: e.detailQuantity,
              Subtotal: e.Subtotal,
            });
          } else if (e?.ComboID) {
            const [result1]: any = await connect.execute(
              `select * from combo where ComboID = '${e?.ComboID}'`
            );
            const detail = result1[0];
            detailList.push({
              ProductImage: detail?.ComboImage,
              SalePrice: e.SalePrice,
              ProductName: detail?.ComboName,
              Quantity: e.detailQuantity,
              Subtotal: e.Subtotal,
            });
          }
        }
      }
      connect.end();
      return res.status(200).json({ order, detailList });
    } else {
      connect.end();
      return res.status(200).json(null);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
