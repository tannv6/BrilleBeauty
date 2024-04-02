import React, { FormEvent, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import connectDB from "@/app/db";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
export const getServerSideProps = async () => {
  const connect = await connectDB();
  const sql = "select * from homeset where idx = 1";
  const [result] = await connect.execute(sql);
  connect.end();
  return {
    props: {
      data: Array.isArray(result)
        ? {
            ...result[0],
            m_date: null,
          }
        : {},
    },
  };
};
const dataArr1 = [
  {
    name: "site_name",
    type: "text",
    title: "Site Name",
  },
  {
    name: "domain_url",
    type: "text",
    title: "Url",
  },
  {
    name: "admin_name",
    type: "text",
    title: "Admin Name",
  },
  {
    name: "admin_email",
    type: "text",
    title: "Admin Email",
  },
];

const dataArr2 = [
  {
    name: "browser_title",
    type: "text",
    title: "Browser Title",
  },
  {
    name: "google_verfct",
    type: "text",
    title: "Google Verify",
  },
  {
    name: "meta_tag",
    type: "text",
    title: "Meta Tag",
  },
  {
    name: "meta_keyword",
    type: "text",
    title: "Keywords",
  },
  {
    name: "og_title",
    type: "text",
    title: "Og:title",
  },
  {
    name: "og_des",
    type: "text",
    title: "Og:description",
  },
  {
    name: "og_url",
    type: "text",
    title: "Og:url",
  },
  {
    name: "og_site",
    type: "text",
    title: "Og:site",
  },
  {
    name: "og_img",
    type: "file",
    title: "Og:image",
  },
  {
    name: "favico_img",
    type: "file",
    title: "Favico",
  },
  {
    name: "logos",
    type: "file",
    title: "Logo",
  },
  {
    name: "logo_footer",
    type: "file",
    title: "Logo Footer",
  },
  {
    name: "logo_adm",
    type: "file",
    title: "Logo Admin",
  },
  {
    name: "buytext",
    type: "text",
    title: "Copyright",
  },
];
const dataArr3 = [
  {
    name: "home_name",
    type: "text",
    title: "Home Name",
  },
  {
    name: "store_service01",
    type: "text",
    title: "Business Type",
  },
  {
    name: "addr1",
    type: "text",
    title: "Address 1",
  },
  {
    name: "addr2",
    type: "text",
    title: "Address 2",
  },
  {
    name: "comnum",
    type: "text",
    title: "Company Number",
  },
  {
    name: "com_owner",
    type: "text",
    title: "Company Owner",
  },
  {
    name: "info_owner",
    type: "text",
    title: "Infor Protecter",
  },
  {
    name: "custom_phone",
    type: "text",
    title: "CS Phone",
  },
];
function WebInfo({ data = {} }: any) {
  const router = useRouter();
  const [info, setInfo] = useState<{ [key: string]: any }>({ ...data });
  const [pass, setPass] = useState<{ [key: string]: any }>({
    CurrentPassword: "",
    NewPassword: "",
  });
  function handleChange(e: any) {
    if (e.target.files) {
      setInfo({ ...info, [e.target.name]: e.target.files[0] });
    } else {
      setInfo({ ...info, [e.target.name]: e.target.value });
    }
  }

  function handleChangePass(e: any) {
    if (e.target.files) {
      setPass({ ...info, [e.target.name]: e.target.files[0] });
    } else {
      setPass({ ...info, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData();

    for (let [key, value] of Object.entries(info)) {
      formData.append(key, value);
    }
    let response;
    response = await axios.post("/api/setting/web_info", formData);

    if (response.status === 201) {
      router.reload();
    }
  }

  async function handleSubmitPass() {
    try {
      let formData = new FormData();

      for (let [key, value] of Object.entries(pass)) {
        formData.append(key, value);
      }
      let response;
      response = await axios.post("/api/admin/change_pass", formData);

      if (response.status === 200) {
        alert("PassWord has changed!")
        router.reload();
      }
    } catch (error: any) {
      alert(error?.response?.data?.message || "Wrong!");
    }
  }
  return (
    <AdminLayout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Setting Web Infomation</h1>
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
              {Array(Math.ceil(dataArr1.length / 2))
                .fill(1)
                .map((e: any, i: any) => {
                  return (
                    <tr
                      key={i}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {dataArr1[i * 2]?.title || ""}
                      </th>
                      <td className="px-6 py-2">
                        <input
                          type="text"
                          name={dataArr1[i * 2]?.name}
                          value={info[dataArr1[i * 2]?.name]}
                          id={dataArr1[i * 2]?.name}
                          onChange={handleChange}
                          className="h-[35px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {dataArr1[i * 2 + 1]?.title}
                      </th>
                      <td className="px-6 py-2">
                        <input
                          type="text"
                          name={dataArr1[i * 2 + 1]?.name}
                          value={info[dataArr1[i * 2 + 1]?.name]}
                          id={dataArr1[i * 2 + 1]?.name}
                          onChange={handleChange}
                          className="h-[35px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </td>
                    </tr>
                  );
                })}
              <tr>
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Admin PassWord
                </th>
                <td colSpan={3} className="px-6 py-2">
                  <div className="flex gap-1 items-center">
                    <span>
                      <input
                        placeholder="Current Password"
                        type="password"
                        name={"CurrentPassword"}
                        value={pass["CurrentPassword"]}
                        id={"CurrentPassword"}
                        onChange={handleChangePass}
                        className="h-[35px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </span>
                    <span>
                      <input
                        placeholder="New Password"
                        type="password"
                        name={"NewPassword"}
                        value={pass["NewPassword"]}
                        id={"NewPassword"}
                        onChange={handleChangePass}
                        className="h-[35px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </span>
                    <button
                      type="button"
                      onClick={handleSubmitPass}
                      className="h-[35px] text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-bold rounded-lg text-sm px-5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
                    >
                      Change PassWord
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <h1 className="text-2xl font-bold mb-2 mt-4">SEO Tools</h1>
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
              {dataArr2.map((e, i) => {
                return (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {e?.title}
                    </th>
                    <td className="px-6 py-2" colSpan={3}>
                      {e.type == "file" ? (
                        <div>
                          <input
                            type="file"
                            name={e?.name}
                            id={e?.name}
                            onChange={handleChange}
                            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                          />
                          <Image
                            width={100}
                            height={100}
                            src={`${CDN_URL}/${data[e.name]}`}
                            alt={""}
                          />
                        </div>
                      ) : (
                        <input
                          type="text"
                          name={e?.name}
                          value={info[e?.name]}
                          id={e?.name}
                          onChange={handleChange}
                          className="h-[35px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h1 className="text-2xl font-bold mb-2 mt-4">Business Information</h1>
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
              {Array(Math.ceil(dataArr3.length / 2))
                .fill(1)
                .map((e: any, i: any) => {
                  return (
                    <tr
                      key={i}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {dataArr3[i * 2]?.title}
                      </th>
                      <td className="px-6 py-2">
                        <input
                          type="text"
                          name={dataArr3[i * 2]?.name}
                          value={info[dataArr3[i * 2]?.name]}
                          id={dataArr3[i * 2]?.name}
                          onChange={handleChange}
                          className="h-[35px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {dataArr3[i * 2 + 1]?.title}
                      </th>
                      <td className="px-6 py-2">
                        <input
                          type="text"
                          name={dataArr3[i * 2 + 1]?.name}
                          value={info[dataArr3[i * 2 + 1]?.name]}
                          id={dataArr3[i * 2 + 1]?.name}
                          onChange={handleChange}
                          className="h-[35px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="gap-2 flex justify-center mt-3">
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

export default WebInfo;
