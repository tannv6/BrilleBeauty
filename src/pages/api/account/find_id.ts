import connectDB from "@/app/db";
import { sendEmail } from "@/lib/mailer";
import { NextApiRequest, NextApiResponse } from "next";
import Cache from "memory-cache";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const params = req.body;

    const { FullName, Email, verify_code }: any = params;

    const query = `select * from customers where Email = '${Email}'`;

    const connect = await connectDB();

    const [results] = await connect.execute(query);

    connect.end();

    if (Array.isArray(results) && results.length > 0) {
      const info: any = results[0];
      const CacheData = Cache.get(`user_${info.CustomerID}`);
      if (!CacheData) {
        return res.status(200).json({
          message: "Please get a opt number!",
        });
      }
      if (CacheData !== Number(verify_code)) {
        return res.status(200).json({
          message: "Your opt number is not match!",
        });
      }
      const sended = await sendEmail(
        Email,
        "[FIND ID]",
        `<h3>Your ID is: ${info.UserName}</h3>`
      );
      if (sended) {
        return res.status(200).json({ result: "OK" });
      } else {
        return res.status(500).json(null);
      }
    } else {
      return res.status(200).json(null);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
