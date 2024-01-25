import React, { FormEvent, useState } from "react";
import Layout from "../components/Layout";
import Dropdown from "@/components/Dropdown";
import axios from "axios";
import connectDB from "@/app/db";
import { GetServerSideProps } from "next";
import { convertDatesToNumbers } from "@/utils/function";
import Checkbox from "../components/Checkbox";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import dateFormat from "dateformat";

import "react-datepicker/dist/react-datepicker.css";
export const getServerSideProps = (async () => {
  const connect = await connectDB();
  const [categories] = await connect.execute("SELECT * FROM menu");
  return {
    props: {
      categories: convertDatesToNumbers(categories).map((e: any) => ({
        id: e.MenuID,
        name: e.MenuName,
      })),
    },
  };
}) satisfies GetServerSideProps<{ categories: any }>;
function write({ categories }: any) {
  const router = useRouter();
  const [product, setProduct] = useState({
    ProductName: "",
    InitPrice: "",
    SellPrice: "",
    Description: "",
    SaleDate: "",
    SaleEndDate: "",
    IsBest: "",
    IsBigSale: "",
    IsNew: "",
    ProductImage: "",
    CategoryID: "0",
  });

  const [detailImage, setDetailImage] = useState<any[]>([]);

  const handleChangeImage = (e: any) => {
    setDetailImage([...detailImage, e.target.files[0]]);
    e.target.value = "";
  };

  const handleRemoveFile = (idx: number) => {
    const newImages = [...detailImage];
    newImages.splice(idx, 1);
    setDetailImage(newImages);
  };

  function handleChange(e: any) {
    if (e.target.files) {
      setProduct({ ...product, [e.target.name]: e.target.files[0] });
    } else if (["IsBest", "IsBigSale", "IsNew"].includes(e.target.name)) {
      setProduct({ ...product, [e.target.name]: e.target.checked ? 1 : 0 });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData();

    for (let [key, value] of Object.entries(product)) {
      formData.append(key, value);
    }
    detailImage.forEach((e) => {
      formData.append("detailImage[]", e);
    });
    const response = await axios.post("/api/products/write", formData);

    if (response.status === 201) {
      router.push("/admin/products/list");
    }
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="relative overflow-x-auto">
          <table
            style={{ tableLayout: "fixed" }}
            className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <colgroup>
              <col width={"140px"} />
              <col width={"*"} />
              <col width={"140px"} />
              <col width={"*"} />
            </colgroup>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Product Name
                </th>
                <td className="px-6 py-2" colSpan={3}>
                  <input
                    type="text"
                    name="ProductName"
                    value={product.ProductName}
                    id="ProductName"
                    onChange={handleChange}
                    className="h-[35px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Category
                </th>
                <td className="px-6 py-2">
                  <Dropdown
                    containerClassName="w-[150px]"
                    className="w-full h-[40px] rounded-md"
                    options={categories}
                    onChange={(id: number) => {
                      handleChange({
                        target: { name: "CategoryID", value: id },
                      });
                    }}
                    activeItem={Number(product.CategoryID)}
                  />
                </td>
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  SaleDate
                </th>
                <td className="px-6 py-2">
                  <div className="flex items-center">
                    <DatePicker
                      dateFormat={"yyyy-MM-DD"}
                      className="inline-flex border h-[35px] px-2 w-[150px]"
                      selected={
                        product.SaleDate
                          ? new Date(product.SaleDate)
                          : new Date()
                      }
                      onChange={(date) =>
                        handleChange({
                          target: {
                            name: "SaleDate",
                            value: dateFormat(date || undefined, "yyyy-mm-dd"),
                          },
                        })
                      }
                    />
                    ~
                    <DatePicker
                      dateFormat={"yyyy-MM-DD"}
                      className="inline-flex border h-[35px] px-2 w-[150px]"
                      selected={
                        product.SaleEndDate
                          ? new Date(product.SaleEndDate)
                          : new Date()
                      }
                      onChange={(date) =>
                        handleChange({
                          target: {
                            name: "SaleEndDate",
                            value: dateFormat(date || undefined, "yyyy-mm-dd "),
                          },
                        })
                      }
                    />
                  </div>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Image
                </th>
                <td className="px-6 py-2" colSpan={3}>
                  <input
                    name="ProductImage"
                    onChange={handleChange}
                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                    type="file"
                    id="formFile"
                  />
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Options
                </th>
                <td className="px-6 py-2">
                  <Checkbox
                    name="IsBest"
                    checked={product.IsBest}
                    onChange={handleChange}
                    label={"Best"}
                  />
                  <Checkbox
                    name="IsBigSale"
                    checked={product.IsBigSale}
                    onChange={handleChange}
                    label={"Big Sale"}
                  />
                  <Checkbox
                    name="IsNew"
                    checked={product.IsNew}
                    onChange={handleChange}
                    label={"New"}
                  />
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Original Price
                </th>
                <td className="px-6 py-2">
                  <input
                    type="text"
                    name="InitPrice"
                    id="InitPrice"
                    value={product.InitPrice}
                    onChange={handleChange}
                    className="h-[40px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </td>
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Sell Price
                </th>
                <td className="px-6 py-2">
                  <input
                    type="text"
                    name="SellPrice"
                    id="SellPrice"
                    value={product.SellPrice}
                    onChange={handleChange}
                    className="h-[40px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Detail Images
                </th>
                <td className="px-6 py-2" colSpan={3}>
                  <input
                    id="file1"
                    type="file"
                    hidden
                    onChange={handleChangeImage}
                  />
                  <label
                    className="inline-block cursor-pointer border border-gray-400 rounded p-2"
                    htmlFor="file1"
                  >
                    Choose File
                  </label>
                  {detailImage.map((e, i) => {
                    return (
                      <div key={i}>
                        {e.name}
                        <button
                          className="ms-1 px-[2px] text-[10px] text-white bg-gray-800 rounded"
                          onClick={() => handleRemoveFile(i)}
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Original Price
                </th>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    name="InitPrice"
                    id="InitPrice"
                    value={product.InitPrice}
                    onChange={handleChange}
                    className="h-[40px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Sell Price
                </th>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    name="SellPrice"
                    id="SellPrice"
                    value={product.SellPrice}
                    onChange={handleChange}
                    className="h-[40px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Detail Images
                </th>
                <td className="px-6 py-2" colSpan={3}>
                  <textarea
                    value={product.Description}
                    name="Description"
                    onChange={handleChange}
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-3">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default write;
