import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session: any = await getServerSession(req, res, authOptions);
    if (session?.user?.id) {
      const { ObjectType, ObjectID, InteractionType } = req.body;
      const connect = await connectDB();

      const searchQuery = `select * from interactions where 
        CustomerID = '${session?.user?.id}'
        and ObjectType = '${ObjectType}'
        and ObjectID = '${ObjectID}'
        and InteractionType = '${InteractionType}'
        and DeletedAt is null`;

      const [result] = await connect.execute(searchQuery);

      if (Array.isArray(result) && result.length > 0) {
        const delQuery = `update interactions set DeletedAt = now() where
        CustomerID = '${session?.user?.id}'
        and ObjectType = '${ObjectType}'
        and ObjectID = '${ObjectID}'
        and InteractionType = '${InteractionType}'
        and DeletedAt is null;`;
        await connect.execute(delQuery);
      } else {
        const query = `insert into interactions set 
        CustomerID = '${session?.user?.id}',
        ObjectType = '${ObjectType}',
        ObjectID = '${ObjectID}',
        InteractionType = '${InteractionType}',
        CreatedAt = now()
        `;
        await connect.execute(query);
      }
      connect.end();
      return res.status(201).json({ result: "OK" });
    } else {
      return res.status(401).json({ session });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
