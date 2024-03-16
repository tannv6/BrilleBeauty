import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import {hash} from "bcrypt";

export const config = {
  api: {
    bodyParser: false,
  },
};


export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const form = formidable({});
    const [fields] = await form.parse(req);

    const {
        user_email2,
        password2,
        first_name,
        last_name,
        birth,
    } = fields;

    hash(password2, 10, async function(err : any, hash : any){
        const connect = await connectDB();
        const query = `INSERT INTO customers SET 
                                Email = '${user_email2}'
                                , Password = '${hash}'
                                , FirstName = '${first_name}'
                                , LastName = '${last_name}'
                                , BirthDay = '${birth}'
                                , CreatedAt = now() `;
        
        const [results] = await connect.execute(query);
    });
    
    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
