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
  const { comboID } = params;
  const comboDetail = await axios.get(
    `http://localhost:3000/api/combo/detail`,
    {
      params: { comboID },
    }
  );


  return {
    props: {
      comboDetail: comboDetail.data,
    },
  };
};
function ComboWrite({comboDetail, isNew }: any) {
  const router = useRouter();
  const [combo, setCombo] = useState<{ [key: string]: any }>({
    ComboID: comboDetail?.ComboID || "",
    ComboName: comboDetail?.ComboName || "",
    InitPrice: comboDetail?.InitPrice || "",
    SellPrice: comboDetail?.SellPrice || "",
    Description: comboDetail?.Description || "",
    SaleDate: moment(comboDetail?.SaleDate).format("yyyy-MM-DD HH:mm:ss"),
    SaleEndDate: moment(comboDetail?.SaleEndDate).format("yyyy-MM-DD HH:mm:ss"),
    IsBest: 0,
    IsBigSale: 0,
    IsNew: 0,
    ComboImage: "",
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
      setCombo({ ...combo, [e.target.name]: e.target.files[0] });
    } else if (["IsBest", "IsBigSale", "IsNew"].includes(e.target.name)) {
      setCombo({ ...combo, [e.target.name]: e.target.checked ? 1 : 0 });
    } else {
      setCombo({ ...combo, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData();

    for (let [key, value] of Object.entries(combo)) {
      formData.append(key, value);
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

  return (
    <Layout>
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
                  SaleDate
                </th>
                <td className="px-6 py-2" colSpan={3}>
                  <div className="flex items-center gap-1">
                    <DatePicker
                      showIcon
                      dateFormat={"yyyy-MM-dd HH:mm:ss"}
                      className="inline-flex items-center border h-[35px] px-2 w-[180px] ouline-0"
                      calendarIconClassname="top-[50%] translate-y-[-50%] right-0"
                      selected={
                        combo.SaleDate ? new Date(combo.SaleDate) : new Date()
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
                      className="inline-flex border h-[35px] px-2 w-[180px]"
                      calendarIconClassname="top-[50%] translate-y-[-50%] right-0"
                      selected={
                        combo.SaleEndDate
                          ? new Date(combo.SaleEndDate)
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
                    name="ComboImage"
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
                    checked={combo.IsBest}
                    onChange={handleChange}
                    label={"Best"}
                  />
                  <Checkbox
                    name="IsBigSale"
                    checked={combo.IsBigSale}
                    onChange={handleChange}
                    label={"Big Sale"}
                  />
                  <Checkbox
                    name="IsNew"
                    checked={combo.IsNew}
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
                    value={combo.Description}
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

export default ComboWrite;
