import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export const getOrderByCustomer = async (params: any) => {
  const { page = 1, pageSize = 1000, user } = params;

  const connect = await connectDB();
  const totalQuery = `select t1.*, sum(t2.Subtotal) as totalPrice from orders t1
                      left join orderdetails t2 on t1.OrderID = t2.OrderID
                      where t1.DeletedAt is null
                      and t1.CustomerID = '${user?.id}' group by t1.OrderID order by t1.OrderID desc`;

  const [resultTotal]: any = await connect.execute(totalQuery);

  const total = resultTotal.length;

  const query =
    totalQuery +
    ` limit ${(Number(page) - 1) * Number(pageSize)}, ${Number(pageSize)};`;

  const [result] = await connect.execute(query);

  const orders = [];

  if (Array.isArray(result)) {
    for (let index = 0; index < result.length; index++) {
      const element: any = result[index];
      let detailList = [];
      const queryDetails = `select * from orderdetails where OrderID = '${element?.OrderID}';`;
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
      element["products"] = detailList;
      orders.push(element);
    }
  }

  connect.end();
  return JSON.parse(
    JSON.stringify({
      data: orders,
      total,
      currentPage: page,
      pageSize,
      totalPage: Math.ceil(total / Number(pageSize)),
    })
  );
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session: any = await getSession({ req });

    if (session) {
      return res.status(200).json(getOrderByCustomer);
    }
    return res.status(401).json({});
  } catch (error) {
    return res.status(500).json({ error });
  }
}
