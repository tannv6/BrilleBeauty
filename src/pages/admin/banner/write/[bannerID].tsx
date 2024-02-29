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
  const { bannerID } = params;
  const bannerDetail = await axios.get(
    `http://localhost:3000/api/banners/detail`,
    {
      params: { bannerID },
    }
  );

  return {
    props: {
      bannerDetail: bannerDetail.data,
    },
  };
};
function BannerWrite({
  bannerDetail,
  isNew,
}: any) {

  const router = useRouter();
  const [banner, setBanner] = useState<{
    BannerID: any;
    BannerCategory: any;
    BannerName: any;
    BannerImg: any;
    BannerDes: any;
    BannerLink: any;
  }>({
    BannerID: bannerDetail?.BannerID,
    BannerCategory: bannerDetail?.BannerCategory,
    BannerName: bannerDetail?.BannerName,
    BannerImg: bannerDetail?.BannerImg,
    BannerDes: bannerDetail?.BannerDes,
    BannerLink: bannerDetail?.BannerLink,
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
      setBanner({ ...banner, [e.target.name]: e.target.files[0] });
    } else {
      setBanner({ ...banner, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData();

    for (let [key, value] of Object.entries(banner)) {
      formData.append(key, value);
    }
    detailImage.forEach((e) => {
      formData.append("detailImage[]", e);
    });
    let response;
    if (isNew) {
      response = await axios.post("/api/banners/write", formData);
    } else {
      response = await axios.post("/api/banners/update", formData);
    }

    if (response.status === 201) {
      router.push("/admin/banner/list");
    }
  }

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">
          {isNew ? "Add New Banner" : "Edit Banner"}
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
                  BannerID
                </th>
                <td className="px-6 py-2">
                  <input
                    type="text"
                    name="BannerID"
                    value={banner.BannerID}
                    id="BannerID"
                    onChange={handleChange}
                    className="h-[35px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </td>
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  BannerCategory
                </th>
                <td className="px-6 py-2">
                  <div className="flex gap-1">
                    <Dropdown
                      containerClassName="w-[120px]"
                      className="w-full h-[35px] rounded-md"
                      options={[{id: "top",
                        name: "top"}]}
                      onChange={(id: number) => {
                        handleChange({
                          target: { name: "BannerCategory", value: id },
                        });
                      }}
                      activeItem={Number(banner.BannerCategory)}
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
                  BannerDescription
                </th>
                <td className="px-6 py-2" colSpan={3}>
                  <input
                    type="text"
                    name="BannerDes"
                    value={banner.BannerDes}
                    id="BannerDes"
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
                  BannerLink
                </th>
                <td className="px-6 py-2" colSpan={3}>
                  <input
                    type="text"
                    name="BannerLink"
                    value={banner.BannerLink}
                    id="BannerLink"
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
                  Banner Image
                </th>
                <td className="px-6 py-2" colSpan={3}>
                    <input
                      name="BannerImg"
                      onChange={handleChange}
                      className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                      type="file"
                      id="formFile"
                    />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="gap-2 flex justify-center mt-3">
          <Link
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            href="/admin/banners/list"
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

export default BannerWrite;
