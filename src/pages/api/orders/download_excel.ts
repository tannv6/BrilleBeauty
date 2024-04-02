import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import ExcelJS from "exceljs";
import { writeFile } from "fs";
import { promisify } from "util";
import moment from "moment";
import { format } from 'ssf';
const writeFileAsync = promisify(writeFile);
const dateToSerial = (date: Date): number => {
  const timezoneOffset = date.getTimezoneOffset() / (60 * 24);
  const msDate = date.getTime() / 86400000 + (25569 - timezoneOffset);
  return msDate;
};
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const params = req.query;

    const { page = 1, pageSize = 1000 } = params;

    const connect = await connectDB();
    const totalQuery = `select * from orders where DeletedAt is null order by OrderID desc`;

    const [resultTotal]: any = await connect.execute(totalQuery);

    const total = resultTotal.length;

    const query =
      totalQuery +
      ` limit ${(Number(page) - 1) * Number(pageSize)}, ${Number(pageSize)};`;

    const [result] = await connect.execute(query);
    connect.end();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");
    worksheet.addRow([
      "ID",
      "Order Code",
      "Member Name",
      "Email",
      "Phone",
      "Order Time",
    ]);
    if (Array.isArray(result)) {
      result.forEach((row: any, i) => {
        worksheet.addRow([
          total - (Number(page) - 1) * Number(pageSize) - i,
          row.OrdersCode,
          row.RecieverName,
          row.OrderEmail,
          row.OrderPhone,
          moment(row.CreatedAt).format("yyyy-MM-DD HH:mm:ss"),
        ]);
      });
    }
    worksheet.columns.forEach((column, i) => {
      const numFmt = column.numFmt;
      let maxLength = 6;
      if (column && column.eachCell) {
        column.eachCell({ includeEmpty: true }, (cell: ExcelJS.Cell) => {
          let columnLength: number;
          if (numFmt && cell.value != undefined) {
            switch (cell.type) {
              case ExcelJS.ValueType.Date:
                const serialDate = dateToSerial(cell.value as Date);
                const formattedDate = format(numFmt, serialDate);
                columnLength = formattedDate.length;
                break;
              case ExcelJS.ValueType.Number:
                const formattedNumber = format(numFmt, cell.value as Number);
                columnLength = formattedNumber.length;
                break;
              default:
                const formatted = format(numFmt, cell.value);
                columnLength = formatted.length;
                break;
            }
          } else {
            columnLength = cell.text.length;
          }
          maxLength = Math.max(maxLength, columnLength);
        });
        column.width = maxLength + 5;
      }
    });
    const excelBuffer = await workbook.xlsx.writeBuffer();
    const fileName = `${Date.now()}.xlsx`;
    await writeFileAsync(
      `../data/brillebeauty/orders/${fileName}`,
      excelBuffer as any
    );
    return res.status(200).json({
      filePath: `/orders/${fileName}`,
      fileName,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
