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
    const image = files.ProductImage?.[0];
    const detailImages = files["detailImage[]"];
    const {
      ProductName,
      InitPrice,
      SellPrice,
      Description,
      SaleDate,
      IsBest,
      IsBigSale,
      IsNew,
      CategoryID1,
      CategoryID2,
      CategoryID3,
      SaleEndDate,
      PriceOnSaleDate,
      PotID,
      Options,
      BrandID,
      Quantity
    } = fields;

    const des = he.encode(he.decode(Description?.[0] || ""));

    const CategoryID =
    Number(CategoryID3?.[0]) ||
    Number(CategoryID2?.[0]) ||
    Number(CategoryID1?.[0]);

    let ProductImage = "";

    if (image) {
      ProductImage = (await saveFile(image, "/products")).ufile;
    }
    const connect = await connectDB();
    const query = `INSERT INTO products SET 
    ProductName = '${ProductName?.[0] || ""}', 
    InitPrice = '${InitPrice?.[0] || 0}', 
    SellPrice = '${SellPrice?.[0] || 0}',
    Quantity = '${Quantity?.[0] || 0}',
    Description = '${des}', 
    SaleDate = ${SaleDate?.[0] ? `'${SaleDate}'` : "SaleDate"}, 
    SaleEndDate = ${SaleEndDate?.[0] ? `'${SaleEndDate}'` : "SaleEndDate"},
    PriceOnSaleDate = '${PriceOnSaleDate?.[0] || 0}',
    IsBest = ${IsBest?.[0] || 0}, 
    IsBigSale = ${IsBigSale?.[0] || 0}, 
    IsNew = ${IsNew?.[0] || 0},
    ProductImage = ${ProductImage ? `'${ProductImage}'` : "ProductImage"},
    CategoryID = ${CategoryID ? `'${CategoryID}'` : "CategoryID"},
    PotID = ${PotID?.[0] ? `'${PotID}'` : "PotID"},
    BrandID = ${BrandID?.[0] ? `'${BrandID}'` : "BrandID"}`;

    const [results] = await connect.execute(query);
    const lastInsertedId = (results as any).insertId;
    let queryImage = "";
    if (detailImages && detailImages?.length > 0) {
      queryImage +=
        "INSERT INTO productimages(ProductID,ImageURL, FileName) VALUES ";
      for (let index = 0; index < detailImages.length; index++) {
        const imgName = await saveFile(detailImages[index], "/products");
        if (index > 0) {
          queryImage += ",";
        }
        queryImage += `('${lastInsertedId}', '${imgName.ufile}', '${imgName.rfile}')`;
      }
    }
    queryImage && (await connect.execute(queryImage));
    if (Options) {
      const OptionsArray = JSON.parse(Options[0]);
      for (let index = 0; index < OptionsArray.length; index++) {
        const element = OptionsArray[index];
        if (element.isDel && !element.isNew) {
          const sql = `update product_options set DeletedAt = now() where PoID = ${element.PoID}`;
          await connect.execute(sql);
        } else if (element.isNew && !element.isDel) {
          const sql = `insert into product_options set ProductID = '${lastInsertedId}', PotID = '${PotID}', 
          PoName = '${element.PoName}', PoInitPrice = '${element.PoInitPrice}', PoSellPrice = '${element.PoSellPrice}'`;
          await connect.execute(sql);
        } else if (element.isEdit) {
          const sql = `update product_options set PoName = '${element.PoName}', PoInitPrice = '${element.PoInitPrice}', 
          PoSellPrice = '${element.PoSellPrice}' where PoID = ${element.PoID}`;
          await connect.execute(sql);
        }
      }
    }
    connect.end();
    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
