import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { saveFile } from "@/utils/function";
import he from "he";
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
      IsBest,
      IsBigSale,
      IsNew,
      SaleEndDate,
      CategoryID,
      SeasonID,
      Highlight,
    } = fields;

    const des = he.encode(he.decode(Description?.[0] || ""));

    let ComboImage = "";

    if (image) {
      ComboImage = (await saveFile(image, "/combo")).ufile;
    }
    const connect = await connectDB();
    const query = `INSERT INTO combo SET 
    ComboName = ${ComboName?.[0] ? `'${ComboName}'` : "ComboName"}, 
    Highlight = ${Highlight?.[0] ? `'${Highlight}'` : "Highlight"}, 
    InitPrice = ${InitPrice?.[0] ? `'${InitPrice}'` : "InitPrice"}, 
    SellPrice = ${SellPrice?.[0] ? `'${SellPrice}'` : "SellPrice"},
    Description = '${des}', 
    SaleDate = ${SaleDate?.[0] ? `'${SaleDate}'` : "SaleDate"}, 
    SaleEndDate = '${SaleEndDate}',
    SeasonID = ${SeasonID?.[0] ? `'${SeasonID}'` : "SeasonID"},
    CategoryID = ${CategoryID?.[0] ? `'${CategoryID}'` : "CategoryID"},
    IsBest = ${IsBest?.[0] ? `'${IsBest}'` : "IsBest"}, 
    IsBigSale = ${IsBigSale?.[0] ? `'${IsBigSale}'` : "IsBigSale"}, 
    IsNew = ${IsNew?.[0] ? `'${IsNew}'` : "IsNew"},
    ComboImage = ${ComboImage ? `'${ComboImage}'` : "ComboImage"}`;

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
    connect.end();
    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
