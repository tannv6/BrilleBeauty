import connectDB from "@/app/db";
import { sendEmail } from "@/lib/mailer";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const params = req.query;

    // const { FullName, Email }: any = params;

    // const query = `select * from customers where Email = '${Email}'`;

    // const connect = await connectDB();

    // const [results] = await connect.execute(query);

    // connect.end();

    // if (Array.isArray(results) && results.length > 0) {
    //   const info: any = results[0];
    //   await sendEmail()
    //   return res.status(200).json({ result: "OK" });
    // } else {
    //   return res.status(200).json(null);
    // }
    await sendEmail("pxp95211@naver.com", "[TEST]", `<h3>Hi</h3>`);
    return res.status(200).json({ result: "OK" });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
