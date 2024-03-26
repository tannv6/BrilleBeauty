import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { objectTypes } from "@/utils/constants";

export const getInteractions = async (params: any) => {
  const {
    page = 1,
    pageSize = 1000,
    InteractionType,
    ObjectType,
    ObjectID,
    user,
  } = params;

  const connect = await connectDB();

  let joinQuery = "";

  if (ObjectType === objectTypes.product.id) {
    joinQuery = " inner join products t2 on t1.ObjectID = t2.ProductID "
  }

  const totalQuery = `select * from interactions t1 ${joinQuery} where
  InteractionType = ${
    InteractionType ? `'${InteractionType}'` : "InteractionType"
  }
  and ObjectType = ${ObjectType ? `'${ObjectType}'` : "ObjectType"}
  and ObjectID = ${ObjectID ? `'${ObjectID}'` : "ObjectID"}
  and CustomerID = '${user?.id}' and t1.DeletedAt is null group by t1.ObjectID`;

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
    const session: any = await getServerSession(req, res, authOptions);
    if (session?.user?.id) {
      const params = req.query;

      return res.status(200).json(getInteractions({ ...params, ...session }));
    } else {
      return res.status(401).json({ req });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
