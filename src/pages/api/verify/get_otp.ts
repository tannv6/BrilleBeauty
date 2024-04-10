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

    const { FullName, Email }: any = params;

    const query = `select * from customers where Email = '${Email}'`;

    const connect = await connectDB();

    const [results]: any = await connect.execute(query);

    connect.end();

    if (Array.isArray(results) && results.length > 0) {
      const info: any = results[0];
      const verifyCode = Math.floor(100000 + Math.random() * 900000);
      const sended = await sendEmail(
        Email,
        "[VERIFY]",
        `<h3>Your verify code is: ${verifyCode} <br/>
                                            It will exprire in 60 seconds.</h3>`
      );
      if (sended) {
        Cache.put(`user_${info.CustomerID}`, verifyCode, 60000);
      } else {
        Cache.del(`user_${info.CustomerID}`);
      }
      return res.status(200).json({ result: "OK" });
    } else {
      return res.status(200).json(null);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
