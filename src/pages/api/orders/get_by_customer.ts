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
      const queryProduct = `select t1.*, t2.ProductName, t2.ProductImage, t3.PoName, t3.PoID from orderdetails t1 
      left join products t2 on t1.ProductID = t2.ProductID
      left join product_options t3 on t1.OptionID = t3.PoID;`;
      const [result1] = await connect.execute(queryProduct);
      element["products"] = result1;
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
