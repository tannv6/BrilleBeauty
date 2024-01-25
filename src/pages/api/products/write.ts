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
    `./public/products/${file.newFilename}.${getFileExtension(
      file.originalFilename || ""
    )}`,
    data
  );
  await fs.unlinkSync(file.filepath);
  return;
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);
    const image = files.ProductImage?.[0];
    console.log(image);
    if (image) {
      await saveFile(image);
    }
    const {
      ProductName,
      InitPrice,
      SellPrice,
      Description,
      SaleDate,
      IsBest,
      IsBigSale,
      IsNew,
      CategoryID,
    } = fields;
    const connect = await connectDB();
    const query = `INSERT INTO products SET 
    ProductName = '${ProductName}', 
    InitPrice = '${InitPrice}', 
    SellPrice = '${SellPrice}',
    Description = '${Description}', 
    SaleDate = '${SaleDate}', 
    IsBest = '${IsBest}', 
    IsBigSale = '${IsBigSale}', 
    IsNew = '${IsNew}', 
    ProductImage = '${
      image
        ? image.newFilename + getFileExtension(image.originalFilename || "")
        : ""
    }',
    CategoryID = '${CategoryID}'`;
    const [result] = await connect.execute(query);
    return res.status(200).json({ result: fields });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
