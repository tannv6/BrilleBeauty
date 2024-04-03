import Layout from "@/components/Layout";
import Link from "next/link";
import { useState } from "react";

export default function Find() {
  const [activeTab, setActiveTab] = useState("id");
  const [selectedTab, setSelectedTab] = useState("phone");
  const [selectedTab2, setSelectedTab2] = useState("phone2");

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  const handleTabChanges = (tab: any) => {
    setSelectedTab(tab);
  };

  const handleTabChanges2 = (tab: any) => {
    setSelectedTab2(tab);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    handleTabChange(name);
  };
  return (
    <Layout>
      <div className="inner-530 mt-[95px] mb-[375px]">
        <h2 className="text-[30px] text-[#252525] mb-[50px] font-medium text-center">
          Find ID/Password
        </h2>
        <div className="flex mb-[35px]">
          <button
            type="button"
            className={`w-full h-[54px] border border-[#dbdbdb] ${
              activeTab === "id" ? "btn_on" : ""
            } flex items-center justify-center text-[18px] text-[#999] border-b-[#252525] font-bold`}
            onClick={() => handleTabChange("id")}
          >
            Find ID
          </button>
          <button
            type="button"
            className={`w-full h-[54px] border border-[#dbdbdb] ${
              activeTab === "password" ? "btn_on" : ""
            } flex items-center justify-center text-[18px] text-[#999] border-b-[#252525] font-bold`}
            onClick={() => handleTabChange("password")}
          >
            Find password
          </button>
        </div>
        {activeTab === "id" && (
          <form>
            <div className="flex">
              <input
                id="phone"
                type="radio"
                name="status"
                checked={selectedTab === "phone"}
                onChange={() => handleTabChanges("phone")}
                className="hidden"
              />
              <label
                htmlFor="phone"
                className="text-[18px] text-[#252525] font-normal  peer-checked/phone"
              >
                <span className="w-8 h-8 inline-block mr-2 rounded-full border border-grey"></span>
                Find with your phone
              </label>
              <input
                id="email"
                type="radio"
                name="status"
                checked={selectedTab === "email"}
                onChange={() => handleTabChanges("email")}
                className="hidden"
              />
              <label
                htmlFor="email"
                className=" ml-[80px] text-[18px] w-1/2 text-[#252525] font-normal  peer-checked/email"
              >
                <span className="w-8 h-8 inline-block mr-2 rounded-full border border-grey"></span>
                Find by email
              </label>
            </div>
            <div className={`${selectedTab === "phone" ? "phone" : "hidden"}`}>
              <div className="mt-10">
                <div className="mt-2">
                  <input
                    type="text"
                    name="user_name"
                    className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
                    placeholder="Please enter your name"
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex gap-[10px]">
                  <div className="relative w-[160px] flex items-center after:w-[8px] after:h-[8px] after:border-black/70 after:border-b after:border-r after:transform after:rotate-45 after:absolute after:right-3">
                    <select
                      required
                      className="text-black/70 bg-white py-3 pl-2  outline-none transition-all cursor-pointer border border-gray-200 rounded-md focus:bg-white focus:ring-2 focus:ring-f04b76 appearance-none invalid:text-black/30 w-[160px]"
                    >
                      <option value="option-1">021</option>
                      <option value="option-2">022</option>
                      <option value="option-3">027</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    name="phone"
                    className="block w-[175px] rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
                  />
                  <input
                    type="text"
                    name="phone"
                    className="block w-[175px] rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
                  />
                </div>
              </div>
              <div className="mt-4">
                <button className="w-full h-[50px] border border-[#757575] flex items-center justify-center text-[16px] text-[#252525]">
                  Certification Number
                </button>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  name="confirm"
                  id="confirm"
                  placeholder="Please enter your authentication number."
                  className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
                />
              </div>
              <Link href={""}>
                <button
                  type="button"
                  className="mt-7 w-full h-[62px] flex items-center justify-center rounded bg-[#f04b76] text-[18px] text-white font-medium"
                >
                  Check
                </button>
              </Link>
            </div>
            <div className={`${selectedTab === "email" ? "email" : "hidden"}`}>
              <div className="mt-10">
                <div className="mt-2">
                  <input
                    type="text"
                    name="user_name"
                    className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
                    placeholder="Please enter your name"
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex gap-[10px]">
                  <input
                    type="text"
                    name="email"
                    className="block w-[162px] rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
                  />
                  <span className="leading-[50px]">@</span>
                  <input
                    type="text"
                    name="email"
                    className="block w-[162px] rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
                  />
                  <div className="relative w-[160px] flex items-center after:w-[8px] after:h-[8px] after:border-black/70 after:border-b after:border-r after:transform after:rotate-45 after:absolute after:right-3">
                    <select
                      required
                      className="text-black/70 bg-white py-3 pl-2  outline-none transition-all cursor-pointer border border-gray-200 rounded-md focus:bg-white focus:ring-2 focus:ring-f04b76 appearance-none invalid:text-black/30 w-[160px]"
                    >
                      <option value="option-1">gmail.com</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button className="w-full h-[50px] border border-[#757575] flex items-center justify-center text-[16px] text-[#252525]">
                  Certification Number
                </button>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  name="confirm"
                  id="confirm"
                  placeholder="Please enter your authentication number."
                  className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
                />
              </div>
              <Link href={""}>
                <button
                  type="button"
                  className="mt-7 w-full h-[62px] flex items-center justify-center rounded bg-[#f04b76] text-[18px] text-white font-medium"
                >
                  Check
                </button>
              </Link>
            </div>
          </form>
        )}
        {activeTab === "password" && (
          <form>
            <div className="flex">
              <input
                id="phone2"
                type="radio"
                name="status"
                checked={selectedTab2 === "phone2"}
                onChange={() => handleTabChanges2("phone2")}
                className="hidden"
              />
              <label
                htmlFor="phone2"
                className="text-[18px] text-[#252525] font-normal  peer-checked/phone"
              >
                <span className="w-8 h-8 inline-block mr-2 rounded-full border border-grey"></span>
                Find with your phone
              </label>
              <input
                id="email2"
                type="radio"
                name="status"
                checked={selectedTab2 === "email2"}
                onChange={() => handleTabChanges2("email2")}
                className="hidden"
              />
              <label
                htmlFor="email2"
                className=" ml-[80px] text-[18px] w-1/2 text-[#252525] font-normal  peer-checked/email"
              >
                <span className="w-8 h-8 inline-block mr-2 rounded-full border border-grey"></span>
                Find by email
              </label>
            </div>
            <div
              className={`${selectedTab2 === "phone2" ? "phone2" : "hidden"}`}
            >
              <div className="mt-10">
                <div className="mt-2">
                  <input
                    type="text"
                    name="user_id"
                    className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
                    placeholder="Please enter your id"
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    name="user_name"
                    className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
                    placeholder="Please enter your name"
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex gap-[10px]">
                  <div className="relative w-[160px] flex items-center after:w-[8px] after:h-[8px] after:border-black/70 after:border-b after:border-r after:transform after:rotate-45 after:absolute after:right-3">
                    <select
                      required
                      className="text-black/70 bg-white py-3 pl-2  outline-none transition-all cursor-pointer border border-gray-200 rounded-md focus:bg-white focus:ring-2 focus:ring-f04b76 appearance-none invalid:text-black/30 w-[160px]"
                    >
                      <option value="option-1">021</option>
                      <option value="option-2">022</option>
                      <option value="option-3">027</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    name="phone"
                    className="block w-[175px] rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
                  />
                  <input
                    type="text"
                    name="phone"
                    className="block w-[175px] rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
                  />
                </div>
              </div>
              <div className="mt-4">
                <button className="w-full h-[50px] border border-[#757575] flex items-center justify-center text-[16px] text-[#252525]">
                  Certification Number
                </button>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  name="confirm"
                  id="confirm"
                  placeholder="Please enter your authentication number."
                  className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
                />
              </div>
              <Link href={""}>
                <button
                  type="button"
                  className="mt-7 w-full h-[62px] flex items-center justify-center rounded bg-[#f04b76] text-[18px] text-white font-medium"
                >
                  Check
                </button>
              </Link>
            </div>
            <div
              className={`${selectedTab2 === "email2" ? "email2" : "hidden"}`}
            >
              <div className="mt-10">
                <div className="mt-2">
                  <input
                    type="text"
                    name="user_id"
                    className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
                    placeholder="Please enter your id"
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    name="user_name"
                    className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
                    placeholder="Please enter your name"
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex gap-[10px]">
                  <input
                    type="text"
                    name="email"
                    className="block w-[162px] rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
                  />
                  <span className="leading-[50px]">@</span>
                  <input
                    type="text"
                    name="email"
                    className="block w-[162px] rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
                  />
                  <div className="relative w-[160px] flex items-center after:w-[8px] after:h-[8px] after:border-black/70 after:border-b after:border-r after:transform after:rotate-45 after:absolute after:right-3">
                    <select
                      required
                      className="text-black/70 bg-white py-3 pl-2  outline-none transition-all cursor-pointer border border-gray-200 rounded-md focus:bg-white focus:ring-2 focus:ring-f04b76 appearance-none invalid:text-black/30 w-[160px]"
                    >
                      <option value="option-1">gmail.com</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button className="w-full h-[50px] border border-[#757575] flex items-center justify-center text-[16px] text-[#252525]">
                  Certification Number
                </button>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  name="confirm"
                  id="confirm"
                  placeholder="Please enter your authentication number."
                  className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
                />
              </div>
              <Link href={""}>
                <button
                  type="button"
                  className="mt-7 w-full h-[62px] flex items-center justify-center rounded bg-[#f04b76] text-[18px] text-white font-medium"
                >
                  Check
                </button>
              </Link>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
}
