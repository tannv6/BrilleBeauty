import Layout from "@/components/Layout";
import ProductRelated from "@/components/ProductRelated";
import SubNav from "@/components/SubNav";
import axios from "axios";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { CDN_URL } from "@/utils/constants";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { DataDispatchContext } from "../_app";
import Dropdown from "@/components/Dropdown";

export default function Payment() {

  return (
    <>
      <Layout>
        <div id="main">
          <SubNav title1="Order/Payment" />
          <div className="inner-container mt-[65px] mb-[180px]">
            <div className="w-full h-[60px] bg-[#ef426f] font-bold text-white text-2xl flex items-center justify-center">Order/Payment</div>
            <div className="border-l border-r">
              <div className="w-full h-[60px] bg-[#f9f9f9]"></div>
              <div className="p-[50px]">
                <p className="text-xl mb-[25px]">Delivery address</p>
                <div className="pr-[70px]">
                  <div className="flex gap-[100px]">
                    <div className="flex items-center">
                      <input checked id="default-radio-1" type="radio" value="" name="default-radio" className="w-[22px] h-[22px] rounded-full p-1 appearance-none checked:bg-[#ef426f] bg-clip-content border-2 border-[#dbdbdb] cursor-pointer">
                      </input>
                      <label htmlFor="default-radio-1" className="ms-[10px] cursor-pointer select-none">Same as member information</label>
                    </div>
                    <div className="flex items-center">
                      <input id="default-radio-2" type="radio" value="" name="default-radio" className="w-[22px] h-[22px] rounded-full p-1 appearance-none checked:bg-[#ef426f] bg-clip-content border-2 border-[#dbdbdb] cursor-pointer">
                      </input>
                      <label htmlFor="default-radio-2" className="ms-[10px] cursor-pointer select-none">New shipping address</label>
                    </div>
                  </div>
                  <div className="my-5 flex items-center">
                    <p className="min-w-[130px]">
                      Recipient
                      <span className="text-[#ef426f]">*</span>
                    </p>
                    <input
                      type="text"
                      className="px-[10px] w-full h-[50px] border rounded-[2px]"
                      name="Recipient"
                      placeholder="Huyen My"
                    ></input>
                  </div>
                  <div className="my-5 flex items-center">
                    <p className="min-w-[130px]">
                      Address
                      <span className="text-[#ef426f]">*</span>
                    </p>
                    <input
                      type="text"
                      className="px-[10px] w-[256px] h-[50px] border rounded-[2px]"
                      name="Zipcode"
                      placeholder="Zip code"
                    ></input>
                    <button className="w-[200px] h-[50px] border border-[#757575] text-[#757575]">Address search</button>
                  </div>
                  <div className="my-5 flex items-center">
                    <p className="min-w-[130px]">
                    </p>
                    <input
                      type="text"
                      className="px-[10px] w-full h-[50px] border rounded-[2px]"
                      name="Basic address"
                      placeholder="Basic address"
                    ></input>
                  </div>
                  <div className="my-5 flex items-center">
                    <p className="min-w-[130px]">
                    </p>
                    <input
                      type="text"
                      className="px-[10px] w-full h-[50px] border rounded-[2px]"
                      name="Opt address"
                      placeholder="Remaining address (can be entered optionally)"
                    ></input>
                  </div>
                  <div className="my-5 flex items-center">
                    <p className="min-w-[130px]">
                      Cell Phone
                      <span className="text-[#ef426f]">*</span>
                    </p>
                    <div className="w-full flex items-center justify-between">
                      <Dropdown
                        options={[
                          { id: "010", name: "010" },
                          { id: "011", name: "011" },
                        ]}
                        onChange={() => { }}
                        activeItem=""
                        className="h-[50px] w-[290px] shrink-0"
                        placeHolder="000"
                      />
                      <span className="block w-[4px] h-[1px] bg-black"></span>
                      <input
                        type="text"
                        className="px-[10px] h-[50px] border rounded-[2px] basis-[290px] shrink-0"
                        name="tel2"
                      ></input>
                      <span className="block w-[4px] h-[1px] bg-black"></span>
                      <input
                        type="text"
                        className="px-[10px] h-[50px] border rounded-[2px] basis-[290px] shrink-0"
                        name="tel3"
                      ></input>
                    </div>
                  </div>
                  <div className="my-5 flex items-center">
                    <p className="min-w-[130px]">
                      Email
                      <span className="text-[#ef426f]">*</span>
                    </p>
                    <div className="w-full flex items-center justify-center">
                      <input
                        type="text"
                        className="px-[10px] w-full h-[50px] border rounded-[2px]"
                        name="Recipient"
                        placeholder=""
                      ></input>
                      <span className="mx-[10px]">@</span>
                      <input
                        type="text"
                        className="px-[10px] w-full h-[50px] border rounded-[2px]"
                        name="Recipient"
                        placeholder=""
                      ></input>
                    </div>
                  </div>
                  <div className="my-5 flex items-center">
                    <p className="min-w-[130px]">
                    </p>
                    <div className="w-full">
                      <hr className="mb-5 border-[#252525]" />
                      <Dropdown
                        options={[
                          { id: "1", name: "Please contact us in advance before shipping." },
                          { id: "2", name: "If you are absent, please leave it at the security office." },
                        ]}
                        onChange={() => { }}
                        activeItem=""
                        className="h-[50px] w-[898px]"
                        placeHolder="Select message (optional) "
                      />
                      <div className="flex gap-2 items-center mt-5">
                        <input
                          className="w-[22px] h-[22px] rounded appearance-none border checked:bg-[url('/checkbox_customer.png')] checked:border-0 cursor-pointer"
                          type="checkbox"
                          id="save"
                        />
                        <label
                          htmlFor="save"
                          className="text-[16px] font-medium text-[#252525] cursor-pointer select-none"
                        >
                          Save as default shipping address
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-[60px] bg-[#f9f9f9]"></div>
              <div className="p-[50px]">
                <p className="text-xl mb-[25px]">Ordered product</p>
                <div className="pr-[70px]">
                  <hr />
                  <div>
                    <div className="flex items-center my-5">
                      <Image src={"/payment_product_img.png"} alt={""} width={120} height={120}></Image>
                      <div className="flex flex-col pl-[30px] gap-1">
                        <p>Damage Care Perfect Serum Original (New) - 80ml</p>
                        <p className="text-[15px] text-[#999999]">Quantity: 1</p>
                        <p className="text-lg">A$16.25</p>
                      </div>
                      <button className="w-[32px] h-[32px] border border-[#dbdbdb] rounded bg-[url('/payment_product_remove_ico.png')] bg-center bg-no-repeat ml-auto"></button>
                    </div>
                    <hr />
                  </div>
                  <div>
                    <div className="flex items-center my-5">
                      <Image src={"/payment_product_img.png"} alt={""} width={120} height={120}></Image>
                      <div className="flex flex-col pl-[30px] gap-1">
                        <p>Damage Care Perfect Serum Original (New) - 80ml</p>
                        <p className="text-[15px] text-[#999999]">Quantity: 1</p>
                        <p className="text-lg">A$16.25</p>
                      </div>
                      <button className="w-[32px] h-[32px] border border-[#dbdbdb] rounded bg-[url('/payment_product_remove_ico.png')] bg-center bg-no-repeat ml-auto"></button>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
              <div className="w-full h-[46px] bg-[#ffe6e6] flex items-center justify-between px-[50px]">
                <p>Delivery fee</p>
                <p>0 (free) $</p>
              </div>
              <div className="w-full h-[60px] bg-[#f9f9f9]"></div>
              <div className="p-[50px]">
                <p className="text-xl mb-[25px]">Payment information</p>
                <div className="pr-[70px]">
                  <div className="flex justify-between mb-2">
                    <p>Ordered product</p>
                    <p>A$16.25</p>
                  </div>
                  <div className="flex justify-between mb-4">
                    <p>Delivery fee</p>
                    <p>A$ + 0</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Discount/additional payment</p>
                    <p>A$ <span className="text-[#f50e3f]">- 0</span></p>
                  </div>
                </div>
              </div>
              <div className="w-full h-[60px] bg-[#ffe6e6] flex items-center justify-between px-[50px]">
                <p className="text-xl font-bold">Final payment amount</p>
                <p className="font-bold text-[#f50e3f]">A$16.25</p>
              </div>
              <div className="w-full h-[60px] bg-[#f9f9f9]"></div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
