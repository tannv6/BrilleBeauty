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
import { SRLWrapper } from "simple-react-lightbox";
import Image from "next/image";
import dynamic from "next/dynamic";
import he from "he";
const CustomEditor = dynamic(
  () => {
    return import("@/components/CkEditor");
  },
  { ssr: false }
);
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
export const getServerSideProps = async (context: { params: any }) => {
  const { params } = context;
  const { comboID } = params;
  const comboDetail = await axios.get(
    `http://localhost:3000/api/combo/detail`,
    {
      params: { comboID },
    }
  );

  const result1 = await axios.get(
    "http://localhost:3000/api/combo_category/list"
  );

  const result2 = await axios.get("http://localhost:3000/api/season/list");

  return {
    props: {
      comboDetail: comboDetail.data,
      categoryList: result1.data.data.map((e: any) => ({
        id: e.CategoryID,
        name: e.CategoryName,
        IsSeasonal: e.IsSeasonal || 0,
      })),
      seasonList: result2.data.data.map((e: any) => ({
        id: e.SeasonID,
        name: e.SeasonName,
      })),
    },
  };
};
function ComboWrite({ comboDetail, isNew, categoryList, seasonList }: any) {
  const router = useRouter();
  const [combo, setCombo] = useState<{ [key: string]: any }>({
    ComboID: comboDetail?.ComboID || "",
    ComboName: comboDetail?.ComboName || "",
    Highlight: comboDetail?.Highlight || "",
    InitPrice: comboDetail?.InitPrice || 0,
    SellPrice: comboDetail?.SellPrice || 0,
    Description: comboDetail?.Description || "",
    SaleDate: comboDetail?.SaleDate
      ? moment(comboDetail?.SaleDate).format("yyyy-MM-DD HH:mm:ss")
      : "",
    SaleEndDate: comboDetail?.SaleEndDate
      ? moment(comboDetail?.SaleEndDate).format("yyyy-MM-DD HH:mm:ss")
      : "",
    IsBest: comboDetail?.IsBest || 0,
    IsBigSale: comboDetail?.IsBigSale || 0,
    IsNew: comboDetail?.IsNew || 0,
    ComboImage: comboDetail?.ComboImage || "",
    CategoryID: comboDetail?.CategoryID || "",
    DelImage: "",
    DetailImages: comboDetail?.Images || [],
    IsSeasonal:
      categoryList.find(
        (elm: any) => elm.IsSeasonal && elm.id == comboDetail?.IsSeasonal
      ) || 0,
    SeasonID: comboDetail?.SeasonID || "",
    Quantity: comboDetail?.Quantity || "",
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

  function handleChange(e: any) {
    if (e.target.files) {
      setCombo({ ...combo, [e.target.name]: e.target.files[0] });
    } else if (["IsBest", "IsBigSale", "IsNew"].includes(e.target.name)) {
      setCombo({ ...combo, [e.target.name]: e.target.checked ? 1 : 0 });
    } else if (["CategoryID"].includes(e.target.name)) {
      setCombo({
        ...combo,
        [e.target.name]: e.target.value,
        IsSeasonal:
          categoryList.find(
            (elm: any) => elm.IsSeasonal && elm.id === e.target.value
          ) || 0,
      });
    } else {
      setCombo({ ...combo, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData();

    for (let [key, value] of Object.entries(combo)) {
      value && formData.append(key, value);
    }
    detailImage.forEach((e) => {
      formData.append("detailImage[]", e);
    });

    let response;
    if (isNew) {
      response = await axios.post("/api/combo/write", formData);
    } else {
      response = await axios.post("/api/combo/update", formData);
    }

    if (response.status === 201) {
      router.push("/admin/combo/list");
    }
  }
  const handleRemoveDetailImage = (id: number) => {
    const delImageArr: string[] = combo.DelImage.split(",").filter(
      (e: any) => e
    );
    if (!delImageArr.includes(id.toString())) {
      delImageArr.push(id.toString());
    }
    const imageArr = [...combo.DetailImages];
    const imageIdx = imageArr?.findIndex((e: any) => e.ImageID == id);
    (imageArr as any[]).splice(imageIdx, 1);
    setCombo({
      ...combo,
      DelImage: delImageArr.join(","),
      DetailImages: imageArr,
    });
  };

  const thumbSrc =
    typeof combo.ComboImage === "object"
      ? URL.createObjectURL(combo.ComboImage)
      : comboDetail?.ComboImage
      ? `${CDN_URL}/${comboDetail?.ComboImage}`
      : "";
  return (
    <AdminLayout>
      <SRLWrapper
        options={{
          thumbnails: {
            showThumbnails: false,
          },
        }}
      >
        <h1 className="text-2xl font-bold mb-4">Add New Combo</h1>
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
                    Combo Name
                  </th>
                  <td className="px-6 py-2" colSpan={3}>
                    <input
                      type="text"
                      name="ComboName"
                      value={combo.ComboName}
                      id="ComboName"
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
                    Highlight
                  </th>
                  <td className="px-6 py-2" colSpan={3}>
                    <input
                      type="text"
                      name="Highlight"
                      value={combo.Highlight}
                      id="Highlight"
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
                      containerClassName="w-[150px] me-2"
                      className="w-full h-[40px] rounded-md"
                      options={categoryList}
                      onChange={(id: number) => {
                        handleChange({
                          target: {
                            name: "CategoryID",
                            value: id,
                          },
                        });
                      }}
                      activeItem={Number(combo.CategoryID)}
                    />
                    {Boolean(combo.IsSeasonal) && (
                      <Dropdown
                        containerClassName="w-[150px]"
                        className="w-full h-[40px] rounded-md"
                        options={seasonList}
                        onChange={(id: number) => {
                          handleChange({
                            target: {
                              name: "SeasonID",
                              value: id,
                            },
                          });
                        }}
                        activeItem={Number(combo.SeasonID)}
                        placeHolder="--Season--"
                      />
                    )}
                  </td>
                  <th className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                    Quantity
                  </th>
                  <td className="px-6 py-2">
                    <input
                      type="text"
                      name="Quantity"
                      value={combo.Quantity}
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
                    SaleDate
                  </th>
                  <td className="px-6 py-2" colSpan={3}>
                    <div className="flex items-center gap-1">
                      <div>
                        <DatePicker
                          showIcon
                          dateFormat={"yyyy-MM-dd HH:mm:ss"}
                          className="inline-flex items-center border h-[35px] px-2 w-[180px] ouline-0"
                          calendarIconClassname="top-[50%] translate-y-[-50%] right-0"
                          selected={
                            combo.SaleDate ? new Date(combo.SaleDate) : null
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
                          dateFormat={"yyyy-MM-dd HH:mm:ss"}
                          className="inline-flex border h-[35px] px-2 w-[180px]"
                          calendarIconClassname="top-[50%] translate-y-[-50%] right-0"
                          selected={
                            combo.SaleEndDate
                              ? new Date(combo.SaleEndDate)
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
                      name="ComboImage"
                      onChange={handleChange}
                      className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                      type="file"
                      id="formFile"
                      accept="image/*"
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
                      value={combo.InitPrice}
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
                      value={combo.SellPrice}
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
                      accept="image/*"
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
                    {comboDetail?.ComboID ? (
                      <div className="flex flex-wrap gap-3 mt-3">
                        {combo.DetailImages?.map((e: any, i: any) => {
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
                      value={he.decode(comboDetail?.Description || "")}
                      onChange={handleChange}
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
      </SRLWrapper>
    </AdminLayout>
  );
}

export default ComboWrite;
