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
import { SRLWrapper } from "simple-react-lightbox";
import Image from "next/image";
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
export const getServerSideProps = async (context: { params: any }) => {
  const { params } = context;
  const { popupID } = params;
  const popupDetail = await axios.get(
    `http://localhost:3000/api/popups/detail`,
    {
      params: { popupID },
    }
  );

  return {
    props: {
      popupDetail: popupDetail.data,
    },
  };
};
function PopupWrite({ popupDetail, isNew }: any) {
  const router = useRouter();
  const [popup, setPopup] = useState<{
    PopupID: any;
    PopupTitle: any;
    PopupContent: any;
    PositionTop: any;
    PositionLeft: any;
    StartDate: any;
    EndDate: any;
    IsShow: any;
    PopupImage: any;
    PopupLink: any;
    PopupScreen: any;
    ImageUpload: File | null;
    IsCentered: any;
    IsFull: any;
    IsUsePosition: any;
  }>({
    PopupID: popupDetail?.PopupID || "",
    PopupTitle: popupDetail?.PopupTitle || "",
    PopupContent: popupDetail?.PopupContent || "",
    PositionTop: popupDetail?.PositionTop || 0,
    PositionLeft: popupDetail?.PositionLeft || 0,
    IsShow: popupDetail?.IsShow || "",
    IsCentered: popupDetail?.IsCentered || "",
    IsFull: popupDetail?.IsFull || "",
    PopupImage: popupDetail?.PopupImage || "",
    PopupLink: popupDetail?.PopupLink || "",
    PopupScreen: popupDetail?.PopupScreen || "",
    StartDate: moment(popupDetail?.StartDate).format("yyyy-MM-DD HH:mm:ss"),
    EndDate: moment(popupDetail?.EndDate).format("yyyy-MM-DD HH:mm:ss"),
    ImageUpload: null,
    IsUsePosition: popupDetail?.IsUsePosition || "",
  });

  function handleChange(e: any) {
    if (e.target.files) {
      setPopup({ ...popup, [e.target.name]: e.target.files[0] });
    } else if (["IsShow", "IsFull", "IsCentered", "IsUsePosition"].includes(e.target.name)) {
      setPopup({ ...popup, [e.target.name]: e.target.checked ? 1 : 0 });
    } else {
      setPopup({ ...popup, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData();

    for (let [key, value] of Object.entries(popup)) {
      formData.append(key, value);
    }

    let response;
    if (isNew) {
      response = await axios.post("/api/popups/write", formData);
    } else {
      response = await axios.post("/api/popups/update", formData);
    }

    if (response.status === 201) {
      router.push("/admin/popup/list");
    }
  }

  const src = popup.ImageUpload
    ? URL.createObjectURL(popup.ImageUpload)
    : `${CDN_URL}/${popup.PopupImage}`;
  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">
          {isNew ? "Add New Popup" : "Edit Popup"}
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="relative">
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
                  Popup Category
                </th>
                <td className="px-6 py-2" colSpan={3}>
                  <div className="flex gap-1">
                    <Dropdown
                      containerClassName="w-[120px]"
                      className="w-full h-[35px] rounded-md"
                      options={[
                        { id: "pc", name: "PC" },
                        { id: "mb", name: "Mobile" },
                      ]}
                      onChange={(id: number) => {
                        handleChange({
                          target: { name: "PopupScreen", value: id },
                        });
                      }}
                      activeItem={popup.PopupScreen}
                      placeHolder="--Category--"
                    />
                  </div>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Show Time
                </th>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-1 flex-wrap">
                    <DatePicker
                      showTimeInput
                      showIcon
                      dateFormat={"yyyy-MM-dd HH:mm:ss"}
                      className="inline-flex items-center border h-[35px] px-2 w-[180px] ouline-0"
                      calendarIconClassname="top-[50%] translate-y-[-50%] right-0"
                      selected={
                        popup.StartDate ? new Date(popup.StartDate) : new Date()
                      }
                      onChange={(date) =>
                        handleChange({
                          target: {
                            name: "StartDate",
                            value: moment(date).format("yyyy-MM-DD HH:mm:ss"),
                          },
                        })
                      }
                    />
                    ~
                    <DatePicker
                      showTimeInput
                      showIcon
                      dateFormat={"yyyy-MM-dd HH:mm:ss"}
                      className="inline-flex border h-[35px] px-2 w-[180px]"
                      calendarIconClassname="top-[50%] translate-y-[-50%] right-0"
                      selected={
                        popup.EndDate ? new Date(popup.EndDate) : new Date()
                      }
                      onChange={(date) =>
                        handleChange({
                          target: {
                            name: ".EndDate",
                            value: moment(date).format("yyyy-MM-DD HH:mm:ss"),
                          },
                        })
                      }
                    />
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Is Show
                </th>
                <td className="px-6 py-2">
                  <Checkbox
                    name="IsShow"
                    checked={popup.IsShow}
                    onChange={handleChange}
                    label={""}
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
                    name="IsCentered"
                    checked={popup.IsCentered}
                    onChange={handleChange}
                    label={"Centered"}
                  />
                  <Checkbox
                    name="IsFull"
                    checked={popup.IsFull}
                    onChange={handleChange}
                    label={"Full"}
                  />
                </td>
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Position
                </th>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-1">
                    <Checkbox
                      name="IsUsePosition"
                      checked={popup.IsUsePosition}
                      onChange={handleChange}
                      label={"UsePosition"}
                    />
                    Top
                    <input
                      type="text"
                      name="PositionTop"
                      value={popup.PositionTop}
                      id="PositionTop"
                      onChange={handleChange}
                      className="h-[35px] w-[100px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    Left
                    <input
                      type="text"
                      name="PositionLeft"
                      value={popup.PositionLeft}
                      id="PositionLeft"
                      onChange={handleChange}
                      className="h-[35px] w-[100px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Popup Title
                </th>
                <td className="px-6 py-2" colSpan={3}>
                  <input
                    type="text"
                    name="PopupTitle"
                    value={popup.PopupTitle}
                    id="PopupTitle"
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
                  Popup Description
                </th>
                <td className="px-6 py-2" colSpan={3}>
                  <input
                    type="text"
                    name="PopupContent"
                    value={popup.PopupContent}
                    id="PopupContent"
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
                  Popup Link
                </th>
                <td className="px-6 py-2" colSpan={3}>
                  <input
                    type="text"
                    name="PopupLink"
                    value={popup.PopupLink}
                    id="PopupLink"
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
                  Popup Image
                </th>
                <td className="px-6 py-2" colSpan={3}>
                  <input
                    name="ImageUpload"
                    onChange={handleChange}
                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                    type="file"
                    id="ImageUpload"
                  />
                  <SRLWrapper
                    options={{
                      thumbnails: {
                        showThumbnails: false,
                      },
                    }}
                  >
                    <Image
                      className="mt-2"
                      src={src}
                      alt={""}
                      width={100}
                      height={100}
                    />
                  </SRLWrapper>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="gap-2 flex justify-center mt-3">
          <Link
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            href="/admin/popup/list"
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

export default PopupWrite;
