import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { saveFile } from "@/utils/function";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);
    const image = files.ComboImage?.[0];
    const detailImages = files["detailImage[]"];
    const {
      ComboName,
      InitPrice,
      SellPrice,
      Description,
      SaleDate,
      IsBest = 0,
      IsBigSale = 0,
      IsNew = 0,
      SaleEndDate,
      CategoryID,
      SeasonID,
    } = fields;

    let ComboImage = "";

    if (image) {
      ComboImage = (await saveFile(image, "/combo")).ufile;
    }
    const connect = await connectDB();
    const query = `INSERT INTO combo SET 
    ComboName = '${ComboName}', 
    InitPrice = '${InitPrice}', 
    SellPrice = '${SellPrice}',
    Description = '${Description}', 
    SaleDate = '${SaleDate}', 
    SaleEndDate = '${SaleEndDate}',
    SeasonID = ${SeasonID ? `'${SeasonID}'` : "SeasonID"},
    CategoryID = '${CategoryID}',
    IsBest = ${IsBest}, 
    IsBigSale = ${IsBigSale}, 
    IsNew = ${IsNew},
    ComboImage = '${ComboImage}'`;

    const [results] = await connect.execute(query);
    const lastInsertedId = (results as any).insertId;
    let queryImage = "";
    if (detailImages && detailImages?.length > 0) {
      queryImage +=
        "INSERT INTO comboimages(ComboID,ImageURL, FileName) VALUES ";
      for (let index = 0; index < detailImages.length; index++) {
        const imgName = await saveFile(detailImages[index], "/combo");
        if (index > 0) {
          queryImage += ",";
        }
        queryImage += `('${lastInsertedId}', '${imgName.ufile}', '${imgName.rfile}')`;
      }
    }
    await connect.execute(queryImage);
    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
