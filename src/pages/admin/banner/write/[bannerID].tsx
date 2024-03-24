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
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
export const getServerSideProps = async (context: { params: any }) => {
  const { params } = context;
  const { bannerID } = params;
  const bannerDetail = await axios.get(
    `http://localhost:3000/api/banners/detail`,
    {
      params: { bannerID },
    }
  );
  const result = await axios.get("http://localhost:3000/api/category/all");

  const catObject = result.data;
  return {
    props: {
      bannerDetail: bannerDetail.data,
      catObject,
    },
  };
};
function BannerWrite({ bannerDetail, isNew, catObject }: any) {
  const router = useRouter();
  const { level1, level2, level3 } = catObject;

  const [level2List, setLevel2List] = useState(
    bannerDetail?.CategoryLevel === 1
      ? level2.filter((e: any) => e.ParentID === bannerDetail?.CategoryID)
      : bannerDetail?.CategoryLevel === 2
      ? level2.filter((e: any) => e.ParentID === bannerDetail?.ParentID)
      : bannerDetail?.CategoryLevel === 3
      ? level2.filter((e: any) => e.ParentID === bannerDetail?.ppID)
      : []
  );
  const [level3List, setLevel3List] = useState(
    bannerDetail?.CategoryLevel === 2
      ? level3.filter((e: any) => e.ParentID === bannerDetail?.CategoryID)
      : bannerDetail?.CategoryLevel === 3
      ? level3.filter((e: any) => e.ParentID === bannerDetail?.ParentID)
      : []
  );
  const [banner, setBanner] = useState<{
    BannerID: any;
    BannerCategory: any;
    BannerName: any;
    BannerImg: any;
    BannerDes: any;
    BannerLink: any;
    ImageUpload: File | null;
    ShowDate: any;
    ShowEndDate: any;
    CategoryID1: any;
    CategoryID2: any;
    CategoryID3: any;
  }>({
    BannerID: bannerDetail?.BannerID,
    BannerCategory: bannerDetail?.BannerCategory || "",
    BannerName: bannerDetail?.BannerName || "",
    BannerImg: bannerDetail?.BannerImg || "",
    BannerDes: bannerDetail?.BannerDes || "",
    BannerLink: bannerDetail?.BannerLink || "",
    ImageUpload: null,
    ShowDate: moment(bannerDetail?.ShowDate || undefined).format(
      "yyyy-MM-DD HH:mm:ss"
    ),
    ShowEndDate: moment(bannerDetail?.ShowEndDate || undefined).format(
      "yyyy-MM-DD HH:mm:ss"
    ),
    CategoryID1:
      bannerDetail?.CategoryLevel === 1
        ? bannerDetail?.CategoryID
        : bannerDetail?.CategoryLevel === 2
        ? bannerDetail?.ParentID
        : bannerDetail?.CategoryLevel === 3
        ? bannerDetail?.ppID
        : "0",
    CategoryID2:
      bannerDetail?.CategoryLevel === 2
        ? bannerDetail?.CategoryID
        : bannerDetail?.CategoryLevel === 3
        ? bannerDetail?.ParentID
        : "0",
    CategoryID3:
      bannerDetail?.CategoryLevel === 3 ? bannerDetail?.CategoryID : "0",
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
  const handleChangeCate = (level: number, id: number) => {
    if (level === 1) {
      setBanner({
        ...banner,
        CategoryID1: id,
        CategoryID2: 0,
        CategoryID3: 0,
      });
      setLevel2List(level2.filter((e: any) => e.ParentID === id));
    }
    if (level === 2) {
      setBanner({ ...banner, CategoryID2: id, CategoryID3: 0 });
      setLevel3List(level3.filter((e: any) => e.ParentID === id));
    }
    if (level === 3) {
    }
  };
  const src = banner.ImageUpload
    ? URL.createObjectURL(banner.ImageUpload)
    : `${CDN_URL}/${banner.BannerImg}`;

  return (
    <AdminLayout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">
          {isNew ? "Add New Banner" : "Edit Banner"}
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <table
            style={{ tableAdminLayout: "fixed" }}
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
                  Banner Position
                </th>
                <td className="px-6 py-2" colSpan={3}>
                  <div className="flex gap-1">
                    <Dropdown
                      containerClassName="w-[120px]"
                      className="w-full h-[35px] rounded-md"
                      options={[
                        { id: "top", name: "top" },
                        { id: "middle", name: "middle" },
                        { id: "bottom", name: "bottom" },
                        { id: "main_visual", name: "main_visual" },
                        { id: "after_main_visual", name: "after_main_visual" },
                        { id: "main_middle", name: "main_middle" },
                        { id: "sub_category", name: "sub_category" },
                      ]}
                      onChange={(id: number) => {
                        handleChange({
                          target: { name: "BannerCategory", value: id },
                        });
                      }}
                      activeItem={banner.BannerCategory}
                      placeHolder="--Category--"
                    />
                    {banner.BannerCategory === "sub_category" && (
                      <div className="flex gap-1">
                        <Dropdown
                          containerClassName="w-[150px]"
                          className="w-full h-[35px] rounded-md"
                          options={level1}
                          onChange={(id: number) => {
                            handleChangeCate(1, id);
                          }}
                          activeItem={Number(banner.CategoryID1)}
                        />
                        <Dropdown
                          containerClassName="w-[150px]"
                          className="w-full h-[35px] rounded-md"
                          options={level2List}
                          onChange={(id: number) => {
                            handleChangeCate(2, id);
                          }}
                          activeItem={Number(banner.CategoryID2)}
                        />
                        <Dropdown
                          containerClassName="w-[150px]"
                          className="w-full h-[35px] rounded-md"
                          options={level3List}
                          onChange={(id: number) => {
                            handleChange({
                              target: { name: "CategoryID3", value: id },
                            });
                          }}
                          activeItem={Number(banner.CategoryID3)}
                        />
                      </div>
                    )}
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
                  <div className="flex items-center gap-1">
                    <DatePicker
                      showTimeInput
                      showIcon
                      dateFormat={"yyyy-MM-dd HH:mm:ss"}
                      className="inline-flex items-center border h-[35px] px-2 w-[180px] ouline-0"
                      calendarIconClassname="top-[50%] translate-y-[-50%] right-0"
                      selected={
                        banner.ShowDate ? new Date(banner.ShowDate) : new Date()
                      }
                      onChange={(date) =>
                        handleChange({
                          target: {
                            name: "ShowDate",
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
                        banner.ShowEndDate
                          ? new Date(banner.ShowEndDate)
                          : new Date()
                      }
                      onChange={(date) =>
                        handleChange({
                          target: {
                            name: "ShowEndDate",
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
                  Banner Description
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
                  Banner Link
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
            href="/admin/banner/list"
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
    </AdminLayout>
  );
}

export default BannerWrite;
