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

    if (Array.isArray(result) && result.length > 0) {
      const order: any = result[0];
      const queryDetails = `select *, s1.Quantity as detailQuantity from orderdetails s1 inner join products s2 on s1.ProductID = s2.ProductID
      where s1.OrderID = '${order.OrderID}'`;

      const [result2] = await connect.execute(queryDetails);
      connect.end();
      return res.status(200).json({ order, detail: result2 });
    } else {
      connect.end();
      return res.status(200).json(null);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
