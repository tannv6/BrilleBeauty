import React, { FormEvent, useState } from "react";
import Dropdown from "@/components/Dropdown";
import axios from "axios";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Layout from "../../components/Layout";
import Checkbox from "../../components/Checkbox";
import Link from "next/link";
import Input from "../../components/Input";
import moment from "moment";
export const getServerSideProps = async (context: { params: any }) => {
  const { params } = context;
  const { productID } = params;
  const productDetail = await axios.get(
    `http://localhost:3000/api/products/detail`,
    {
      params: { productID },
    }
  );
  const result = await axios.get("http://localhost:3000/api/category/list");

  const categories = result.data.data;

  const result1 = await axios.get(
    "http://localhost:3000/api/option_types/list"
  );

  const catObject: any = {
    level1: [],
    level2: [],
    level3: [],
  };

  categories.forEach((e: any, i: any) => {
    if (e.Level === 1) {
      catObject.level1.push({
        ...e,
        id: e.CategoryID,
        name: e.CategoryName,
      });
    } else if (e.Level === 2) {
      catObject.level2.push({
        ...e,
        id: e.CategoryID,
        name: e.CategoryName,
      });
    } else if (e.Level === 3) {
      catObject.level3.push({
        ...e,
        id: e.CategoryID,
        name: e.CategoryName,
      });
    }
  });

  return {
    props: {
      catObject,
      productDetail: productDetail.data,
      optionTypes: result1.data.data,
    },
  };
};
function ProductWrite({ catObject, productDetail, isNew, optionTypes }: any) {
  const { level1, level2, level3 } = catObject;

  const [level2List, setLevel2List] = useState(
    productDetail?.CategoryLevel === 2
      ? level2.filter((e: any) => e.ParentID === productDetail?.ParentID)
      : []
  );
  const [level3List, setLevel3List] = useState(
    productDetail?.CategoryLevel === 3
      ? level3.filter((e: any) => e.ParentID === productDetail?.ParentID)
      : []
  );

  const router = useRouter();
  const [product, setProduct] = useState<{ [key: string]: any }>({
    ProductID: productDetail?.ProductID || "",
    ProductName: productDetail?.ProductName || "",
    InitPrice: productDetail?.InitPrice || "",
    SellPrice: productDetail?.SellPrice || "",
    Description: productDetail?.Description || "",
    SaleDate: moment(productDetail?.SaleDate).format("yyyy-MM-DD HH:mm:ss"),
    SaleEndDate: moment(productDetail?.SaleEndDate).format(
      "yyyy-MM-DD HH:mm:ss"
    ),
    IsBest: 0,
    IsBigSale: 0,
    IsNew: 0,
    ProductImage: "",
    CategoryID: productDetail?.CategoryID,
    CategoryLevel: productDetail?.CategoryLevel,
    CategoryID1:
      productDetail?.CategoryLevel === 1
        ? productDetail?.CategoryID
        : productDetail?.CategoryLevel === 2
        ? productDetail?.ParentID
        : productDetail?.CategoryLevel === 3
        ? productDetail?.ppID
        : "0",
    CategoryID2:
      productDetail?.CategoryLevel === 2
        ? productDetail?.CategoryID
        : productDetail?.CategoryLevel === 3
        ? productDetail?.ParentID
        : "0",
    CategoryID3:
      productDetail?.CategoryLevel === 3 ? productDetail?.CategoryID : "0",
    Options: productDetail?.Options || [],
    PotID: productDetail?.PotID || "0",
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
      if (key === "Options") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    }
    detailImage.forEach((e) => {
      formData.append("detailImage[]", e);
    });
    let response;
    if (isNew) {
      response = await axios.post("/api/products/write", formData);
    } else {
      response = await axios.post("/api/products/update", formData);
    }

    if (response.status === 201) {
      router.push("/admin/products/list");
    }
  }

  const handleChangeCate = (level: number, id: number) => {
    if (level === 1) {
      setProduct({
        ...product,
        CategoryID1: id,
        CategoryID2: 0,
        CategoryID3: 0,
      });
      setLevel2List(level2.filter((e: any) => e.ParentID === id));
    }
    if (level === 2) {
      setProduct({ ...product, CategoryID2: id, CategoryID3: 0 });
      setLevel3List(level3.filter((e: any) => e.ParentID === id));
    }
    if (level === 3) {
    }
  };
  const handleAddOption = () => {
    const prdNew: any = {};
    Object.assign(prdNew, product);
    prdNew.Options.push({
      PoID: Date.now(),
      isNew: true,
      PoName: "",
      PoInitPrice: "",
      PoSellPrice: "",
    });
    setProduct(prdNew);
  };
  const handleChangeOptions = (e: any, id: number) => {
    const options = product.Options;
    const option = options.find((e: any) => (e.PoID === id));
    option[e.target.name] = e.target.value;
    option["isEdit"] = true;
    setProduct({
      ...product,
      Options: options,
    });
  };
  const handleDelOption = (id: number) => {
    const options = product.Options;
    const option = options.find((e: any) => (e.PoID === id));
    option["isDel"] = true;
    setProduct({
      ...product,
      Options: options,
    });
  };

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">
          {isNew ? "Add New Product" : "Edit Product"}
        </h1>
      </div>
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
                  <div className="flex gap-1">
                    <Dropdown
                      containerClassName="w-[150px]"
                      className="w-full h-[40px] rounded-md"
                      options={level1}
                      onChange={(id: number) => {
                        handleChangeCate(1, id);
                      }}
                      activeItem={Number(product.CategoryID1)}
                    />
                    <Dropdown
                      containerClassName="w-[150px]"
                      className="w-full h-[40px] rounded-md"
                      options={level2List}
                      onChange={(id: number) => {
                        handleChangeCate(2, id);
                      }}
                      activeItem={Number(product.CategoryID2)}
                    />
                    <Dropdown
                      containerClassName="w-[150px]"
                      className="w-full h-[40px] rounded-md"
                      options={level3List}
                      onChange={(id: number) => {
                        handleChange({
                          target: { name: "CategoryID3", value: id },
                        });
                      }}
                      activeItem={Number(product.CategoryID3)}
                    />
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  SaleDate
                </th>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-1">
                    <DatePicker
                      showIcon
                      dateFormat={"yyyy-MM-dd HH:mm:ss"}
                      className="inline-flex items-center border h-[35px] px-2 w-[150px] ouline-0"
                      calendarIconClassname="top-[50%] translate-y-[-50%] right-0"
                      selected={
                        product.SaleDate
                          ? new Date(product.SaleDate)
                          : new Date()
                      }
                      onChange={(date) =>
                        handleChange({
                          target: {
                            name: "SaleDate",
                            value: moment(date).format("yyyy-MM-DD HH:mm:ss"),
                          },
                        })
                      }
                    />
                    ~
                    <DatePicker
                      showIcon
                      dateFormat={"yyyy-MM-dd HH:mm:ss"}
                      className="inline-flex border h-[35px] px-2 w-[150px]"
                      calendarIconClassname="top-[50%] translate-y-[-50%] right-0"
                      selected={
                        product.SaleEndDate
                          ? new Date(product.SaleEndDate)
                          : new Date()
                      }
                      onChange={(date) =>
                        handleChange({
                          target: {
                            name: "SaleEndDate",
                            value: moment(date).format("yyyy-MM-DD HH:mm:ss"),
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
                  Thumbnail Image
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
                <th className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                  Options
                </th>
                <td className="px-6 py-2" colSpan={3}>
                  <Dropdown
                    containerClassName="w-[150px]"
                    className="w-full h-[35px] rounded-md"
                    options={optionTypes.map((e: any, i: any) => {
                      return {
                        id: e.PotID,
                        name: e.PotName,
                      };
                    })}
                    onChange={(id: number) => {
                      handleChange({
                        target: { name: "PotID", value: id },
                      });
                    }}
                    activeItem={Number(product.PotID)}
                    placeHolder="--Option type--"
                  />
                  <button
                    onClick={() => handleAddOption()}
                    type="button"
                    className="h-[35px] ms-1 px-3 ms-0 border rounded bg-cyan-400 text-white py-1"
                  >
                    +
                  </button>
                  {product.Options.filter((e:any)=>!e.isDel).map((e: any, i: any) => {
                    return (
                      <div
                        className={`flex gap-2 ${i > 0 ? "mt-2" : "mt-2"}`}
                        key={i}
                      >
                        <div className="flex items-center gap-1">
                          Name
                          <Input
                            name={"PoName"}
                            value={e.PoName}
                            width={0}
                            type={"input"}
                            onChange={(evt: any) =>
                              handleChangeOptions(evt, e.PoID)
                            }
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-nowrap">Init Price</span>{" "}
                          <Input
                            name={"PoInitPrice"}
                            value={e.PoInitPrice}
                            width={0}
                            type={"input"}
                            onChange={(evt: any) =>
                              handleChangeOptions(evt, e.PoID)
                            }
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-nowrap">Sell Price</span>{" "}
                          <Input
                            name={"PoSellPrice"}
                            value={e.PoSellPrice}
                            width={0}
                            type={"input"}
                            onChange={(evt: any) =>
                              handleChangeOptions(evt, e.PoID)
                            }
                          />
                        </div>
                        <button
                          type="button"
                          className="border rounded bg-rose-600 text-white px-3 py-1 ms-1"
                          onClick={() => handleDelOption(e.PoID)}
                        >
                          <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                      </div>
                    );
                  })}
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                ></th>
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
                  Description
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
        <div className="gap-2 flex justify-center mt-3">
          <Link
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            href="/admin/products/list"
          >
            Back to List
          </Link>
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

export default ProductWrite;
