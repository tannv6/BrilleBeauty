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
      ProductID,
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
      DelImage,
      PotID,
      Options,
      BrandID
    } = fields;

    let ProductImage = "";

    if (image) {
      ProductImage = (await saveFile(image)).ufile;
    }
    const connect = await connectDB();
    const query = `UPDATE products SET 
    ProductName = '${ProductName}', 
    InitPrice = '${InitPrice}', 
    SellPrice = '${SellPrice}',
    Description = '${Description}', 
    SaleDate = '${SaleDate}', 
    SaleEndDate = '${SaleEndDate}',
    IsBest = ${IsBest}, 
    IsBigSale = ${IsBigSale}, 
    IsNew = ${IsNew},
    ProductImage = ${ProductImage ? `'${ProductImage}'` : "ProductImage"},
    CategoryID = '${
      Number(CategoryID3) || Number(CategoryID2) || Number(CategoryID1)
    }',
    PotID = '${PotID}',
    BrandID = '${BrandID}',
    UpdatedAt = now()
    WHERE ProductID = '${ProductID}'`;

    await connect.execute(query);
    let queryImage = "";
    if (detailImages && detailImages?.length > 0) {
      queryImage +=
        "INSERT INTO productimages(ProductID,ImageURL, FileName) VALUES ";
      for (let index = 0; index < detailImages.length; index++) {
        const imgName = await saveFile(detailImages[index]);
        if (index > 0) {
          queryImage += ",";
        }
        queryImage += `('${ProductID}', '${imgName.ufile}', '${imgName.rfile}')`;
      }
    }
    queryImage && (await connect.execute(queryImage));
    if (DelImage) {
      const queryDelImage = `UPDATE productimages SET DeletedAt = now() WHERE ImageID IN (${DelImage})`;
      await connect.execute(queryDelImage);
    }
    if (Options) {
      const OptionsArray = JSON.parse(Options[0]);
      for (let index = 0; index < OptionsArray.length; index++) {
        const element = OptionsArray[index];
        if (element.isDel && !element.isNew) {
          const sql = `update product_options set DeletedAt = now() where PoID = ${element.PoID}`;
          await connect.execute(sql);
        } else if (element.isNew && !element.isDel) {
          const sql = `insert into product_options set ProductID = '${ProductID}', PotID = '${PotID}', 
          PoName = '${element.PoName}', PoInitPrice = '${element.PoInitPrice}', PoSellPrice = '${element.PoSellPrice}'`;
          await connect.execute(sql);
        } else if (element.isEdit) {
          const sql = `update product_options set PoName = '${element.PoName}', PoInitPrice = '${element.PoInitPrice}', 
          PoSellPrice = '${element.PoSellPrice}' where PoID = ${element.PoID}`;
          await connect.execute(sql);
        }
      }
    }
    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
