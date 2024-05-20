import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session: any = await getSession({ req });
    const params = req.query;

    const customerID = session?.user?.id;
    const { options, productID, Quantity, ComboID } = params;

    let cartOptions;
    if (typeof options === "string") {
      cartOptions = JSON.parse(options);
    }

    const connect: any = await connectDB();
    if (ComboID) {
      const [result]: any = await connect.execute(`
            insert into cart set ComboID = '${ComboID}', Quantity = '${Quantity}', CustomerID = '${customerID}'
        `);
    } else {
      let queryImage = "";
      if (cartOptions && cartOptions?.length > 0) {
        queryImage +=
          "INSERT INTO cart(CustomerID, ProductID, PoID, Quantity) VALUES ";
        for (let index = 0; index < cartOptions.length; index++) {
          if (index > 0) {
            queryImage += ",";
          }
          queryImage += `('${customerID}', '${productID}', '${cartOptions[index].PoID}', '${cartOptions[index].PoNum}')`;
        }
      }

      const [result]: any = await connect.execute(queryImage);
    }
    connect.end();
    return res.status(201).json({ result: "OK" });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
