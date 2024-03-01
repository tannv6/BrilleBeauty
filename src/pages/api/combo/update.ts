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
      ComboID,
      ComboName,
      InitPrice,
      SellPrice,
      Description,
      SaleDate,
      IsBest = 0,
      IsBigSale = 0,
      IsNew = 0,
      SaleEndDate,
      DelImage,
      CategoryID,
      SeasonID
    } = fields;

    let ComboImage = "";

    if (image) {
      ComboImage = (await saveFile(image, "/combo")).ufile;
    }
    const connect = await connectDB();
    const query = `UPDATE Combo SET 
    ComboName = '${ComboName}', 
    InitPrice = '${InitPrice}', 
    SellPrice = '${SellPrice}',
    Description = '${Description}', 
    SaleDate = '${SaleDate}', 
    SaleEndDate = '${SaleEndDate}',
    SeasonID = ${SeasonID ? `'${SeasonID}'`: "SeasonID"},
    CategoryID = '${CategoryID}',
    IsBest = ${IsBest}, 
    IsBigSale = ${IsBigSale}, 
    IsNew = ${IsNew},
    ComboImage = ${ComboImage ? `'${ComboImage}'` : "ComboImage"}
    WHERE ComboID = '${ComboID}'`;

    await connect.execute(query);
    let queryImage = "";
    if (detailImages && detailImages?.length > 0) {
      queryImage +=
        "INSERT INTO comboimages(ComboID,ImageURL, FileName) VALUES ";
      for (let index = 0; index < detailImages.length; index++) {
        const imgName = await saveFile(detailImages[index], "/combo");
        if (index > 0) {
          queryImage += ",";
        }
        queryImage += `('${ComboID}', '${imgName.ufile}', '${imgName.rfile}')`;
      }
    }
    queryImage && (await connect.execute(queryImage));
    if (DelImage?.[0]) {
      const queryDelImage = `UPDATE comboimages SET DeletedAt = now() WHERE ImageID IN (${DelImage})`;
      await connect.execute(queryDelImage);
    }
    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
