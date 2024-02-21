import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
export const config = {
  api: {
    bodyParser: false,
  },
};

function getFileExtension(filename: string) {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

const saveFile = async (file: formidable.File) => {
  const data = fs.readFileSync(file.filepath);
  await fs.writeFileSync(
    `./public/uploads/products/${file.newFilename}.${getFileExtension(
      file.originalFilename || ""
    )}`,
    data
  );
  await fs.unlinkSync(file.filepath);
  return {
    ufile: `/products/${file.newFilename}.${getFileExtension(
      file.originalFilename || ""
    )}`,
    rfile: file.originalFilename,
  };
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);
    const image = files.ProductImage?.[0];
    const detailImages = files["detailImage[]"];
    const {
      ProductName,
      InitPrice,
      SellPrice,
      Description,
      SaleDate,
      IsBest = 0,
      IsBigSale = 0,
      IsNew = 0,
      CategoryID1,
      CategoryID2,
      CategoryID3,
      SaleEndDate,
    } = fields;

    let ProductImage = "";

    if (image) {
      ProductImage = (await saveFile(image)).ufile;
    }
    const connect = await connectDB();
    const query = `INSERT INTO products SET 
    ProductName = '${ProductName}', 
    InitPrice = '${InitPrice}', 
    SellPrice = '${SellPrice}',
    Description = '${Description}', 
    SaleDate = '${SaleDate}', 
    SaleEndDate = '${SaleEndDate}',
    IsBest = ${IsBest}, 
    IsBigSale = ${IsBigSale}, 
    IsNew = ${IsNew},
    ProductImage = '${ProductImage}',
    CategoryID = '${CategoryID3 || CategoryID2 || CategoryID1}'`;

    const [results] = await connect.execute(query);
    const lastInsertedId = (results as any).insertId;
    let queryImage = "";
    if (detailImages && detailImages?.length > 0) {
      queryImage +=
        "INSERT INTO productimages(ProductID,ImageURL, FileName) VALUES ";
      for (let index = 0; index < detailImages.length; index++) {
        const imgName = await saveFile(detailImages[index]);
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
