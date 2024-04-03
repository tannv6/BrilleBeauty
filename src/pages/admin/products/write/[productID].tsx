import React, { FormEvent, useState } from "react";
import Dropdown from "@/components/Dropdown";
import axios from "axios";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdminLayout from "../../components/AdminLayout";
import Checkbox from "../../components/Checkbox";
import Link from "next/link";
import Input from "../../components/Input";
import moment from "moment";
import Image from "next/image";
import dynamic from "next/dynamic";
import he from "he";
import SearchDropdown from "@/components/SearchDropdown";
import { debounce } from "@/lib/functions";

const CustomEditor = dynamic(
  () => {
    return import("@/components/CkEditor");
  },
  { ssr: false }
);
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
export const getServerSideProps = async (context: { params: any }) => {
  const { params } = context;
  const { productID } = params;
  const productDetail = await axios.get(
    `http://localhost:3000/api/products/detail`,
    {
      params: { productID },
    }
  );
  const result = await axios.get("http://localhost:3000/api/category/all");

  const catObject = result.data;

  const result1 = await axios.get(
    "http://localhost:3000/api/option_types/list"
  );

  const result2 = await axios.get("http://localhost:3000/api/brand/list");

  return {
    props: {
      catObject,
      productDetail: productDetail.data,
      optionTypes: result1.data.data,
      brandList: result2.data.data.map((e: any) => ({
        ...e,
        id: e.BrandID,
        name: e.BrandName,
      })),
    },
  };
};
function ProductWrite({
  catObject,
  productDetail,
  isNew,
  optionTypes,
  brandList,
}: any) {
  const { level1, level2, level3 } = catObject;

  const [brandListSearch, setBrandListSearch] = useState(brandList || []);

  const [level2List, setLevel2List] = useState(
    productDetail?.CategoryLevel === 1
      ? level2.filter((e: any) => e.ParentID === productDetail?.CategoryID)
      : productDetail?.CategoryLevel === 2
      ? level2.filter((e: any) => e.ParentID === productDetail?.ParentID)
      : productDetail?.CategoryLevel === 3
      ? level2.filter((e: any) => e.ParentID === productDetail?.ppID)
      : []
  );
  const [level3List, setLevel3List] = useState(
    productDetail?.CategoryLevel === 2
      ? level3.filter((e: any) => e.ParentID === productDetail?.CategoryID)
      : productDetail?.CategoryLevel === 3
      ? level3.filter((e: any) => e.ParentID === productDetail?.ParentID)
      : []
  );

  const router = useRouter();
  const [product, setProduct] = useState<{ [key: string]: any }>({
    ProductID: productDetail?.ProductID || "",
    ProductName: productDetail?.ProductName || "",
    InitPrice: productDetail?.InitPrice || 0,
    SellPrice: productDetail?.SellPrice || 0,
    Description: productDetail?.Description || "",
    SaleDate: productDetail?.SaleDate
      ? moment(productDetail?.SaleDate).format("yyyy-MM-DD HH:mm:ss")
      : "",
    SaleEndDate: productDetail?.SaleEndDate
      ? moment(productDetail?.SaleEndDate).format("yyyy-MM-DD HH:mm:ss")
      : "",
    PriceOnSaleDate: productDetail?.PriceOnSaleDate || "",
    IsBest: productDetail?.IsBest || 0,
    IsBigSale: productDetail?.IsBigSale || 0,
    IsNew: productDetail?.IsNew || 0,
    ProductImage: productDetail?.ProductImage || "",
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
    PotID: productDetail?.PotID || null,
    BrandID: productDetail?.BrandID || null,
    DelImage: "",
    DetailImages: productDetail?.Images || [],
    Quantity: productDetail?.Quantity || 0,
  });

  const [detailImage, setDetailImage] = useState<any[]>([]);

  const handleChangeImage = (e: any) => {
    e.target.files?.length > 0 &&
      setDetailImage([...detailImage, ...e.target.files]);
    e.target.value = "";
  };

  const handleRemoveFile = (idx: number) => {
    const newImages = [...detailImage];
    newImages.splice(idx, 1);
    setDetailImage(newImages);
  };

  const handleRemoveDetailImage = (id: number) => {
    const delImageArr: string[] = product.DelImage.split(",").filter(
      (e: any) => e
    );
    if (!delImageArr.includes(id.toString())) {
      delImageArr.push(id.toString());
    }
    const imageArr = [...product.DetailImages];
    const imageIdx = imageArr?.findIndex((e: any) => e.ImageID == id);
    (imageArr as any[]).splice(imageIdx, 1);
    setProduct({
      ...product,
      DelImage: delImageArr.join(","),
      DetailImages: imageArr,
    });
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
        value && formData.append(key, value);
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
    const option = options.find((e: any) => e.PoID === id);
    option[e.target.name] = e.target.value;
    option["isEdit"] = true;
    setProduct({
      ...product,
      Options: options,
    });
  };
  const handleDelOption = (id: number) => {
    const options = product.Options;
    const option = options.find((e: any) => e.PoID === id);
    option["isDel"] = true;
    setProduct({
      ...product,
      Options: options,
    });
  };

  const handleChangeSearch = debounce(async (e: any) => {
    const result2 = await axios.get("/api/brand/list", {
      params: {
        search: e.target.value,
      },
    });
    setBrandListSearch(
      result2.data.data.map((e: any) => ({
        ...e,
        id: e.BrandID,
        name: e.BrandName,
      }))
    );
  }, 300);

  const thumbSrc =
    typeof product.ProductImage === "object"
      ? URL.createObjectURL(product.ProductImage)
      : productDetail?.ProductImage
      ? `${CDN_URL}/${productDetail?.ProductImage}`
      : "";
  return (
    <AdminLayout>
      <>
        <div className="flex justify-between items-center">
          <h3 className="mb-4">{isNew ? "Add New Product" : "Edit Product"}</h3>
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
                    Quantity
                  </th>
                  <td className="px-6 py-2">
                    <input
                      type="text"
                      name="Quantity"
                      value={product.Quantity}
                      id="Quantity"
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
                    Sale Date
                  </th>
                  <td className="px-6 py-2" colSpan={3}>
                    <div className="flex items-center gap-1 flex-wrap">
                      <div>
                        <DatePicker
                          showIcon
                          icon={<i className="far fa-calendar-alt"></i>}
                          toggleCalendarOnIconClick
                          dateFormat={"yyyy-MM-dd HH:mm:ss"}
                          className="outline-0 inline-flex items-center border h-[35px] px-2 w-[180px] ouline-0"
                          calendarIconClassname="top-[50%] translate-y-[-50%] right-0"
                          selected={
                            product.SaleDate ? new Date(product.SaleDate) : null
                          }
                          onChange={(date) =>
                            handleChange({
                              target: {
                                name: "SaleDate",
                                value: moment(date).format(
                                  "yyyy-MM-DD HH:mm:ss"
                                ),
                              },
                            })
                          }
                        />
                      </div>
                      ~
                      <div>
                        <DatePicker
                          showIcon
                          icon={<i className="far fa-calendar-alt"></i>}
                          toggleCalendarOnIconClick
                          dateFormat={"yyyy-MM-dd HH:mm:ss"}
                          className="outline-0 inline-flex border h-[35px] px-2 w-[180px]"
                          calendarIconClassname="top-[50%] translate-y-[-50%] right-0"
                          selected={
                            product.SaleEndDate
                              ? new Date(product.SaleEndDate)
                              : null
                          }
                          onChange={(date) =>
                            handleChange({
                              target: {
                                name: "SaleEndDate",
                                value: moment(date).format(
                                  "yyyy-MM-DD HH:mm:ss"
                                ),
                              },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        Price
                        <input
                          type="text"
                          name="PriceOnSaleDate"
                          value={product.PriceOnSaleDate}
                          id="PriceOnSaleDate"
                          onChange={handleChange}
                          className="h-[35px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[150px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>
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
                    {thumbSrc && (
                      <Image
                        className="mt-2"
                        width={100}
                        height={100}
                        src={thumbSrc}
                        alt=""
                      />
                    )}
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
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                    {product.Options.filter((e: any) => !e.isDel).map(
                      (e: any, i: any) => {
                        return (
                          <div
                            className={`flex gap-2 ${i > 0 ? "mt-2" : "mt-2"}`}
                            key={i}
                          >
                            <div className="flex items-center gap-1">
                              <span className="font-semibold">Name</span>
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
                              <span className="text-nowrap font-semibold">
                                Init Price
                              </span>{" "}
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
                              <span className="text-nowrap font-semibold">
                                Sell Price
                              </span>{" "}
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
                      }
                    )}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Brand
                  </th>
                  <td className="px-6 py-2">
                    <SearchDropdown
                      containerClassName="w-[150px]"
                      className="w-full h-[35px] rounded-md"
                      options={brandListSearch}
                      onChange={(id: number) => {
                        handleChange({
                          target: { name: "BrandID", value: id },
                        });
                      }}
                      activeItem={Number(product.BrandID)}
                      placeHolder="--Brand--"
                      onChangeSearch={handleChangeSearch}
                    />
                  </td>
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
                      multiple
                      hidden
                      onChange={handleChangeImage}
                    />
                    <label
                      className="inline-block cursor-pointer border border-gray-400 rounded p-2"
                      htmlFor="file1"
                    >
                      Choose Files
                    </label>
                    <div className="flex flex-wrap gap-3 mt-3">
                      {detailImage.map((e: File, i) => {
                        const imageUrl = URL.createObjectURL(e);
                        return (
                          <div key={i} className="relative">
                            <Image
                              width={100}
                              height={100}
                              src={imageUrl}
                              alt=""
                            />
                            <button
                              type="button"
                              className="bg-gray-200 rounded-full text-rose-500 text-[20px] absolute top-[-7px] right-[-7px]"
                              onClick={() => handleRemoveFile(i)}
                            >
                              <i className="fas fa-times-circle"></i>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    {productDetail?.ProductID ? (
                      <div className="flex flex-wrap gap-3 mt-3">
                        {product.DetailImages?.map((e: any, i: any) => {
                          return (
                            <div key={i} className="relative">
                              <Image
                                width={100}
                                height={100}
                                src={`${CDN_URL}/${e.ImageURL}`}
                                alt=""
                              />
                              <button
                                type="button"
                                className="bg-gray-200 rounded-full text-rose-500 text-[20px] absolute top-[-7px] right-[-7px]"
                                onClick={() =>
                                  handleRemoveDetailImage(e.ImageID)
                                }
                              >
                                <i className="fas fa-times-circle"></i>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}
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
                    <CustomEditor
                      name="Description"
                      value={he.decode(productDetail?.Description || "")}
                      onChange={handleChange}
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
      </>
    </AdminLayout>
  );
}

export default ProductWrite;
