import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export const getOrderByCustomer = async (params: any) => {
  const { page = 1, pageSize = 1000, user } = params;

  const connect = await connectDB();
  const totalQuery = `select * from orders where DeletedAt is null
                        and CustomerID = '${user?.id}' order by OrderID desc`;

  const [resultTotal]: any = await connect.execute(totalQuery);

  const total = resultTotal.length;

  const query =
    totalQuery +
    ` limit ${(Number(page) - 1) * Number(pageSize)}, ${Number(pageSize)};`;

  const [result] = await connect.execute(query);
  connect.end();
  return JSON.parse(
    JSON.stringify({
      data: result,
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
