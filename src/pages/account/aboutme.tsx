import Layout from "@/components/Layout";
import MypageNav from "@/components/MypageNav";
import SubNav from "@/components/SubNav";
import { getWebSetting } from "@/lib/functions";
import axios from "axios";
import { parse } from "cookie";
import moment from "moment";
import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const getServerSideProps = (async (context: any) => {
  const cookies = parse(context.req.headers.cookie || "");
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/member/login",
        permanent: false,
      },
    };
  }
  const response = await axios.get("http://localhost:3000/api/account/info", {
    params: { session: JSON.stringify(session) },
  });

  return {
    props: {
      userInfo: response.data,
      ...(await getWebSetting(cookies)),
    },
  };
}) satisfies GetServerSideProps<{ userInfo: any }>;

export default function AboutMe({ userInfo = {}, ...props }: any) {
  const router = useRouter();
  const [info, setInfo] = useState<{ [key: string]: any }>({
    ...userInfo,
    CurrentPassword: "",
    NewPassword: "",
    ConfirmNewPassword: "",
  });
  const {
    FirstName,
    LastName,
    DateOfBirth,
    CurrentPassword,
    NewPassword,
    ConfirmNewPassword,
  } = info;
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };
  async function handleSubmit(type: "update" | "change_pass") {
    let formData = new FormData();

    for (let [key, value] of Object.entries(info)) {
      formData.append(key, value);
    }
    let response;
    if (type === "update") {
      response = await axios.post("/api/account/update", formData);
    } else if (type === "change_pass") {
      response = await axios.post("/api/account/change_pass", formData);
    }

    if (response?.status === 200) {
      router.reload();
    }
  }
  return (
      <Layout {...props}>
        <div id="main">
          <SubNav title1="My Account" title2="About Me" />
          <div className="inner-container mt-[75px] mb-[135px]">
            <div className="flex flex-row gap-[60px]">
              <MypageNav></MypageNav>
              <div className="grow mt-[17px]">
                <p className="text-2xl pb-4 border-b border-black">About Me</p>
                <table className="table-auto min-w-full">
                  <colgroup>
                    <col width="25%" />
                    <col width="*" />
                  </colgroup>
                  <tbody>
                    <tr className="border-b border-[#757575]">
                      <th scope="row" className="text-lg bg-[#fefafa]">
                        Personal Info
                      </th>
                      <td>
                        <div className="flex flex-col">
                          <div className="flex items-center py-5 pl-5 justify-between border-b">
                            <p>
                              Name<span className="text-[#ef426f]">*</span>
                            </p>
                            <div className="flex gap-[10px]">
                              <input
                                type="text"
                                placeholder="First Name"
                                className="px-[10px] w-[220px] h-[50px] border rounded-[2px]"
                                name="FirstName"
                                value={FirstName}
                                onChange={handleChange}
                              />
                              <input
                                type="text"
                                placeholder="LastName"
                                className="px-[10px] w-[220px] h-[50px] border rounded-[2px]"
                                name="LastName"
                                value={LastName}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="py-5 pl-5 flex items-center justify-between">
                            <p>
                              Date of Birth
                              <span className="text-[#ef426f]">*</span>
                            </p>
                            <DatePicker
                              showIcon
                              dateFormat={"yyyy-MM-dd"}
                              className="px-[10px] w-[450px] h-[50px] border rounded-[2px]"
                              calendarIconClassname="top-[50%] translate-y-[-50%] right-0"
                              selected={
                                DateOfBirth ? new Date(DateOfBirth) : new Date()
                              }
                              onChange={(date) =>
                                handleChange({
                                  target: {
                                    name: "DateOfBirth",
                                    value: moment(date).format("yyyy-MM-DD"),
                                  },
                                })
                              }
                            />
                            {/* <input
                              type="datetime-local"
                              className="px-[10px] w-[450px] h-[50px] border rounded-[2px]"
                              name="DateOfBirth"
                              value={DateOfBirth}
                              onChange={handleChange}
                            ></input> */}
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <div className="flex justify-end mt-[30px] mb-[40px]">
                          <button
                            onClick={() => handleSubmit("update")}
                            className="w-[220px] h-[60px] rounded bg-[#f04b76] text-lg text-[#fff]"
                          >
                            Update
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-t border-[#757575]">
                      <th scope="row" className="text-lg bg-[#fefafa]">
                        Change Password
                      </th>
                      <td>
                        <div className="flex flex-col">
                          <div className="py-5 pl-5 flex items-center justify-between border-b">
                            <p>
                              Current Password
                              <span className="text-[#ef426f]">*</span>
                            </p>
                            <input
                              type="password"
                              className="px-[10px] w-[450px] h-[50px] border rounded-[2px]"
                              name="CurrentPassword"
                              value={CurrentPassword}
                              onChange={handleChange}
                            ></input>
                          </div>
                          <div className="py-5 pl-5 border-b">
                            <div className="flex items-center justify-between">
                              <p>
                                New Password
                                <span className="text-[#ef426f]">*</span>
                              </p>
                              <input
                                type="password"
                                className="px-[10px] w-[450px] h-[50px] border rounded-[2px]"
                                name="NewPassword"
                                value={NewPassword}
                                onChange={handleChange}
                              ></input>
                            </div>
                            {/* <p className="pl-[162px] pt-1">
                              Password Strength: No Password
                            </p> */}
                          </div>
                          <div className="py-5 pl-5 flex items-center justify-between border-b">
                            <p>
                              Confirm New Password
                              <span className="text-[#ef426f]">*</span>
                            </p>
                            <input
                              type="password"
                              className="shrink-0 px-[10px] w-[450px] h-[50px] border rounded-[2px]"
                              name="ConfirmNewPassword"
                              value={ConfirmNewPassword}
                              onChange={handleChange}
                            ></input>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-end mt-[50px]">
                  <button
                    onClick={() => handleSubmit("change_pass")}
                    className="w-[220px] h-[60px] rounded bg-[#f04b76] text-lg text-[#fff]"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
}
