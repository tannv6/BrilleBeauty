import Layout from "@/components/Layout";
import SubNav from "@/components/SubNav";
import axios from "axios";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { CDN_URL } from "@/utils/constants";
import {  useEffect, useState } from "react";
import Dropdown from "@/components/Dropdown";
import { PayPalButton } from "react-paypal-button-v2";
import Modal from "../admin/components/Modal";
export const getServerSideProps = async (context: {
  params: any;
  query: any;
  req: any;
}) => {
  const { params } = context;
  const { orderID } = params;
  const session: any = await getSession(context);

  const customerID = session?.user?.id;
  const res = await axios.get("http://localhost:3000/api/orders/detail", {
    params: { OrderID: orderID, mode: "code" },
  });
  const customerDetail = await axios.get(
    `http://localhost:3000/api/customers/detail`,
    {
      params: { customerID },
    }
  );
  const result1 = await axios.get(
    `http://localhost:3000/api/order_address/list`,
    {
      params: { session: JSON.stringify(session) },
    }
  );
  const result5 = await axios.get(
    `http://localhost:3000/api/orders/shiping_form`
  );
  const result6 = await axios.get(
    `http://localhost:3000/api/orders/pay_method`
  );
  return {
    props: {
      orderDetail: res.data,
      customerDetail: customerDetail.data,
      shippingFormList: result5.data,
      payMethodList: result6.data,
      addressList: result1.data,
    },
  };
};
export default function Payment({
  orderDetail,
  customerDetail,
  shippingFormList,
  payMethodList,
  addressList,
}: any) {
  const [sdk, setSdk] = useState(false);
  const [payMethod, setPayMethod] = useState("cod");
  const [deliveryType, setdeliveryType] = useState(shippingFormList?.[0] || {});
  const getConfig = async () => {
    const res = await axios.get("/api/payment/config");
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${res.data.CLIENT_ID}`;
    script.async = true;
    script.onload = () => {
      setSdk(true);
    };
    document.body.append(script);
  };
  useEffect(() => {
    getConfig();
  }, []);
  const [addressType, setAddressType] = useState(1);
  const [state, setState] = useState<any>({
    ...(orderDetail?.order || {}),
    ZipCode: customerDetail?.ZipCode,
    Recipient: `${customerDetail?.FirstName} ${customerDetail?.LastName}`,
    BasicAddress: customerDetail?.BasicAddress,
    DetailAddress: customerDetail?.DetailAddress,
    RecipientPhone: customerDetail?.CustomerPhone,
    RecipientEmail: customerDetail?.Email,
  });
  const [address, setAddress] = useState<any>({
    ZipCode: customerDetail?.ZipCode,
    Recipient: `${customerDetail?.FirstName} ${customerDetail?.LastName}`,
    BasicAddress: customerDetail?.BasicAddress,
    DetailAddress: customerDetail?.DetailAddress,
    RecipientPhone: customerDetail?.CustomerPhone,
    RecipientEmail: customerDetail?.Email,
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };
  const [total, setTotal] = useState(
    (
      (Number(orderDetail?.order?.TotalAmount) || 0) +
      (Number(deliveryType?.ShippingFormPrice) || 0)
    ).toFixed(2)
  );
  const handleChangeDeliveryType = (e: any) => {
    setdeliveryType(e);
    setTotal(
      (
        Number(orderDetail?.order?.TotalAmount) + Number(e.ShippingFormPrice)
      ).toFixed(2)
    );
  };
  const [isOpenAddrList, setIsOpenAddrList] = useState(false);
  const defaultAddress = addressList?.data?.find(
    (e: any) => e.IsDefault == 1
  );
  const handleChangeAddressType = (type: any, address?: any) => {
    if (type === 4) {
      setAddressType(type);
      setAddress({
        ZipCode: "",
        Recipient: "",
        BasicAddress: "",
        DetailAddress: "",
        RecipientPhone: "",
        RecipientEmail: "",
      });
    } else if (type === 1) {
      setAddressType(type);
      setAddress({
        ZipCode: customerDetail?.ZipCode,
        Recipient: `${customerDetail?.FirstName} ${customerDetail?.LastName}`,
        BasicAddress: customerDetail?.BasicAddress,
        DetailAddress: customerDetail?.DetailAddress,
        RecipientPhone: customerDetail?.CustomerPhone,
        RecipientEmail: customerDetail?.Email,
      });
    } else if (type === 2) {
      setAddressType(type);
      const defaultAddress = addressList?.data?.find(
        (e: any) => e.IsDefault == 1
      );
      setAddress({
        ZipCode: defaultAddress?.ZipCode||"",
        Recipient: `${defaultAddress?.FirstName||""} ${defaultAddress?.LastName||""}`,
        BasicAddress: defaultAddress?.BasicAddress||"",
        DetailAddress: defaultAddress?.DetailAddress||"",
        RecipientPhone: defaultAddress?.PhoneNumber||"",
        RecipientEmail: defaultAddress?.Email||"",
      });
    } else if (type === 3) {
      setAddressType(type);
      setIsOpenAddrList(true);
    } else if (type === 5) {
      setAddress({
        ZipCode: address?.ZipCode,
        Recipient: `${address?.FirstName} ${address?.LastName}`,
        BasicAddress: address?.BasicAddress,
        DetailAddress: address?.DetailAddress,
        RecipientPhone: address?.PhoneNumber,
        RecipientEmail: address?.Email,
      });
      setIsOpenAddrList(false);
    }
  };
  return (
    <>
      <Layout>
        <div id="main">
          <SubNav title1="Order/Payment" />
          <div className="inner-container mt-[65px] mb-[180px] paypal-button-container">
            <div className="w-full h-[60px] bg-[#ef426f] font-bold text-white text-2xl flex items-center justify-center">
              Order/Payment/{orderDetail?.order?.OrdersCode}
            </div>
            <div className="border-l border-r">
              <div className="w-full h-[60px] bg-[#f9f9f9]"></div>
              <div className="p-[50px]">
                <div className="flex items-center justify-between">
                  <p className="text-xl mb-[25px]">Delivery address</p>
                  <i className="block w-5 h-3 bg-[url('/payment_dropdown_ico.png')]"></i>
                </div>
                <div className="pr-[70px]">
                  <div className="flex gap-[10px]">
                    <div className="flex items-center">
                      <input
                        checked={addressType === 1}
                        id="default-radio-1"
                        type="radio"
                        onChange={() => handleChangeAddressType(1)}
                        name="default-radio"
                        className="w-[22px] h-[22px] rounded-full p-1 appearance-none checked:bg-[#ef426f] bg-clip-content border-2 border-[#dbdbdb] cursor-pointer"
                      ></input>
                      <label
                        htmlFor="default-radio-1"
                        className="ms-[10px] cursor-pointer select-none"
                      >
                        Same as member information
                      </label>
                    </div>
                    {defaultAddress && <div className="flex items-center">
                      <input
                        checked={addressType === 2}
                        id="default-radio-2"
                        type="radio"
                        onChange={() => handleChangeAddressType(2)}
                        name="default-radio"
                        className="w-[22px] h-[22px] rounded-full p-1 appearance-none checked:bg-[#ef426f] bg-clip-content border-2 border-[#dbdbdb] cursor-pointer"
                      ></input>
                      <label
                        htmlFor="default-radio-2"
                        className="ms-[10px] cursor-pointer select-none"
                      >
                        Default address
                      </label>
                    </div>}
                    <div className="flex items-center">
                      <input
                        checked={addressType === 3}
                        id="default-radio-3"
                        type="radio"
                        onChange={() => handleChangeAddressType(3)}
                        name="default-radio"
                        className="w-[22px] h-[22px] rounded-full p-1 appearance-none checked:bg-[#ef426f] bg-clip-content border-2 border-[#dbdbdb] cursor-pointer"
                      ></input>
                      <label
                        htmlFor="default-radio-3"
                        className="ms-[10px] cursor-pointer select-none"
                      >
                        Select Other Address
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        checked={addressType === 4}
                        id="default-radio-4"
                        type="radio"
                        onChange={() => handleChangeAddressType(4)}
                        name="default-radio"
                        className="w-[22px] h-[22px] rounded-full p-1 appearance-none checked:bg-[#ef426f] bg-clip-content border-2 border-[#dbdbdb] cursor-pointer"
                      ></input>
                      <label
                        htmlFor="default-radio-4"
                        className="ms-[10px] cursor-pointer select-none"
                      >
                        New shipping address
                      </label>
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
                      placeholder="Recipient"
                      value={address.Recipient}
                      onChange={handleChange}
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
                      name="ZipCode"
                      placeholder="Zip code"
                      value={address.ZipCode}
                      onChange={handleChange}
                    ></input>
                    {/* <button className="w-[200px] h-[50px] border border-[#757575] text-[#757575]">
                      Address search
                    </button> */}
                  </div>
                  <div className="my-5 flex items-center">
                    <p className="min-w-[130px]"></p>
                    <input
                      type="text"
                      className="px-[10px] w-full h-[50px] border rounded-[2px]"
                      name="BasicAddress"
                      placeholder="Basic address"
                      value={address.BasicAddress}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="my-5 flex items-center">
                    <p className="min-w-[130px]"></p>
                    <input
                      type="text"
                      className="px-[10px] w-full h-[50px] border rounded-[2px]"
                      name="DetailAddress"
                      placeholder="Remaining address (can be entered optionally)"
                      value={address.DetailAddress}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="my-5 flex items-center">
                    <p className="min-w-[130px]">
                      Cell Phone
                      <span className="text-[#ef426f]">*</span>
                    </p>
                    <div className="w-full flex items-center justify-between">
                      {/* <Dropdown
                        options={[
                          { id: "010", name: "010" },
                          { id: "011", name: "011" },
                        ]}
                        onChange={() => {}}
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
                      <span className="block w-[4px] h-[1px] bg-black"></span> */}
                      <input
                        type="text"
                        className="px-[10px] h-[50px] border rounded-[2px] basis-[290px] shrink-0"
                        name="RecipientPhone"
                        value={address.RecipientPhone}
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                  <div className="my-5 flex items-center">
                    <p className="min-w-[130px]">
                      Email
                      <span className="text-[#ef426f]">*</span>
                    </p>
                    <div className="w-full flex items-center justify-center">
                      {/* <input
                        type="text"
                        className="px-[10px] w-full h-[50px] border rounded-[2px]"
                        name="Recipient"
                        placeholder=""
                      ></input>
                      <span className="mx-[10px]">@</span> */}
                      <input
                        type="text"
                        className="px-[10px] w-full h-[50px] border rounded-[2px]"
                        name="RecipientEmail"
                        placeholder="Email"
                        value={address.RecipientEmail}
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                  <div className="my-5 flex items-center">
                    <p className="min-w-[130px]"></p>
                    <div className="w-full">
                      <hr className="mb-5 border-[#252525]" />
                      <Dropdown
                        options={[
                          {
                            id: "1",
                            name: "Please contact us in advance before shipping.",
                          },
                          {
                            id: "2",
                            name: "If you are absent, please leave it at the security office.",
                          },
                        ]}
                        onChange={() => {}}
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
                <div className="flex items-center justify-between">
                  <p className="text-xl mb-[25px]">Ordered product</p>
                  <i className="block w-5 h-3 bg-[url('/payment_dropdown_ico.png')]"></i>
                </div>
                <div className="pr-[70px]">
                  <hr />
                  {orderDetail?.detailList?.map((e: any, i: number) => {
                    return (
                      <div key={i}>
                        <div className="flex items-center my-5">
                          <Image
                            src={`${CDN_URL}${e.ProductImage}`}
                            alt={""}
                            width={120}
                            height={120}
                          ></Image>
                          <div className="flex flex-col pl-[30px] gap-1">
                            <p>{e.ProductName}</p>
                            <p className="text-[15px] text-[#999999]">
                              Quantity: {e.Quantity}
                            </p>
                            <p className="text-lg">A${e.SalePrice}</p>
                          </div>
                          {/* <button className="w-[32px] h-[32px] border border-[#dbdbdb] rounded bg-[url('/payment_product_remove_ico.png')] bg-center bg-no-repeat ml-auto"></button> */}
                        </div>
                        <hr />
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* <div className="w-full h-[46px] bg-[#ffe6e6] flex items-center justify-between px-[50px] pr-[120px]">
                <p>Delivery fee</p>
                <p>0 (free) $</p>
              </div> */}
              <div className="p-[50px]">
                <p>Select delivery type</p>
                <div className="flex justify-between gap-6 h-[50px] mt-5">
                  {shippingFormList?.map((e: any, i: any) => {
                    return (
                      <button
                        key={i}
                        onClick={() => handleChangeDeliveryType(e)}
                        className={`grow ${
                          deliveryType?.ShippingFormID === e.ShippingFormID
                            ? "bg-[#ef426f] text-white"
                            : "border border-[#dbdbdb]"
                        } rounded-sm text-lg`}
                      >
                        {e.ShippingFormName}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="w-full h-[60px] bg-[#f9f9f9]"></div>
              <div className="p-[50px]">
                <div className="flex items-center justify-between">
                  <p className="text-xl mb-[25px]">Payment information</p>
                  <i className="block w-5 h-3 bg-[url('/payment_dropdown_ico.png')]"></i>
                </div>
                <div className="pr-[70px]">
                  <div className="flex justify-between mb-2">
                    <p>Ordered product</p>
                    <p>A${orderDetail?.order?.TotalAmount}</p>
                  </div>
                  <div className="flex justify-between mb-4">
                    <p>Delivery fee</p>
                    <p>A${deliveryType?.ShippingFormPrice || 0}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Discount/additional payment</p>
                    <p>
                      A$<span className="text-[#f50e3f]">0</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full h-[60px] bg-[#ffe6e6] flex items-center justify-between px-[50px] pr-[120px]">
                <p className="text-xl font-bold">Final payment amount</p>
                <p className="font-bold text-[#f50e3f]">A${total}</p>
              </div>
              <div className="w-full h-[60px] bg-[#f9f9f9]"></div>
              <div className="p-[50px]">
                <div className="flex items-center justify-between">
                  <p className="text-xl mb-[25px]">Payment method</p>
                  <i className="block w-5 h-3 bg-[url('/payment_dropdown_ico.png')]"></i>
                </div>
                <div className="pr-[70px]">
                  <p>Select payment method</p>
                  <div className="flex justify-between gap-6 h-[50px] mt-5">
                    <button
                      onClick={() => setPayMethod("cod")}
                      className={`grow ${
                        payMethod === "cod"
                          ? "bg-[#ef426f] text-white"
                          : "border border-[#dbdbdb]"
                      } rounded-sm text-lg`}
                    >
                      Ship COD
                    </button>
                    <button
                      onClick={() => setPayMethod("paypal")}
                      className={`grow ${
                        payMethod === "paypal"
                          ? "bg-[#ef426f] text-white"
                          : "border border-[#dbdbdb]"
                      } rounded-sm text-lg`}
                    >
                      Paypal
                    </button>
                  </div>
                  {/* <div className="p-[40px] bg-[#f6f6f6] mt-[30px]">
                    <div className="flex items-center">
                      <p className="min-w-[152px]">
                        Select card
                        <span className="text-[#ef426f]">*</span>
                      </p>
                      <div className="w-full">
                        <Dropdown
                          options={[
                            {
                              id: "1",
                              name: "Please contact us in advance before shipping.",
                            },
                            {
                              id: "2",
                              name: "If you are absent, please leave it at the security office.",
                            },
                          ]}
                          onChange={() => {}}
                          activeItem=""
                          className="h-[50px] w-[800px] text-[#757575]"
                          placeHolder="Please select"
                        />
                      </div>
                    </div>
                    <div className="flex items-center mt-5">
                      <p className="min-w-[152px]">
                        Installment period
                        <span className="text-[#ef426f]">*</span>
                      </p>
                      <div className="w-full">
                        <Dropdown
                          options={[
                            {
                              id: "1",
                              name: "Please contact us in advance before shipping.",
                            },
                            {
                              id: "2",
                              name: "If you are absent, please leave it at the security office.",
                            },
                          ]}
                          onChange={() => {}}
                          activeItem=""
                          className="h-[50px] w-[800px] text-[#dbdbdb]"
                          placeHolder="lump sum payment"
                        />
                      </div>
                    </div>
                    <p className="pl-[152px] text-[#757575] pt-2">
                      Interest-free Installments are not applicable to corporate
                      cards.
                    </p>
                    <div className="flex items-center mt-5">
                      <p className="min-w-[152px]">
                        Cell Phone
                        <span className="text-[#ef426f]">*</span>
                      </p>
                      <div className="w-full flex justify-between gap-[10px] h-[50px]">
                        <input
                          className="grow rounded-sm border border-[#757575] px-5 placeholder-[#757575] placeholder:text-sm"
                          type="text"
                          placeholder="Guide to issuing public certificates"
                        />
                        <input
                          className="grow rounded-sm border border-[#757575] px-5 placeholder-[#757575] placeholder:text-sm"
                          type="text"
                          placeholder="Safe Click Information"
                        />
                        <input
                          className="grow rounded-sm border border-[#757575] px-5 placeholder-[#757575] placeholder:text-sm"
                          type="text"
                          placeholder="Safe Click Information"
                        />
                      </div>
                    </div>
                    <p className="pl-[152px] text-[#757575] pt-5 text-lg">
                      Interest-free Installments are not applicable to corporate
                      cards.
                    </p>
                  </div> */}
                  {/* <div className="flex gap-2 items-center mt-5">
                    <input
                      className="w-[22px] h-[22px] rounded appearance-none border checked:bg-[url('/checkbox_customer.png')] checked:border-0 cursor-pointer"
                      type="checkbox"
                      id="save1"
                    />
                    <label
                      htmlFor="save1"
                      className="text-[16px] font-medium text-[#252525] cursor-pointer select-none"
                    >
                      The payment method and input information will also be used
                      next time.
                    </label>
                  </div> */}
                </div>
              </div>
              {/* <div className="w-full h-[60px] bg-[#f9f9f9]"></div>
              <div className="p-[50px]">
                <div className="flex items-center justify-between">
                  <p className="text-xl mb-[25px]">Accumulated benefits</p>
                  <i className="block w-5 h-3 bg-[url('/payment_dropdown_ico.png')]"></i>
                </div>
                <div className="pr-[70px]">
                  <div className="flex justify-between mb-2">
                    <p>Points for each product</p>
                    <p>A$0</p>
                  </div>
                  <div className="flex justify-between mb-4">
                    <p>Member savings</p>
                    <p>A$0</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Coupon points</p>
                    <p>A$0</p>
                  </div>
                </div>
              </div> */}
              {/* <div className="w-full h-[60px] bg-[#ffe6e6] flex items-center justify-between px-[50px] pr-[120px]">
                <p className="text-xl font-bold">Expected accumulated amount</p>
                <p className="font-bold text-[#f50e3f]">A$0</p>
              </div> */}
              <div className="w-full h-[60px] bg-[#f9f9f9]"></div>
              <div className="px-[50px] py-[30px]">
                <div className="flex gap-2 items-center">
                  <input
                    className="w-[22px] h-[22px] rounded appearance-none border checked:bg-[url('/checkbox_customer.png')] checked:border-0 cursor-pointer"
                    type="checkbox"
                    id="agree1"
                  />
                  <label
                    htmlFor="agree1"
                    className="text-[16px] font-medium text-[#252525] cursor-pointer select-none"
                  >
                    Agree to all terms and conditions
                  </label>
                </div>
                <div className="flex gap-2 items-center mt-5">
                  <input
                    className="w-[22px] h-[22px] rounded appearance-none border checked:bg-[url('/checkbox_customer.png')] checked:border-0 cursor-pointer"
                    type="checkbox"
                    id="agree2"
                  />
                  <label
                    htmlFor="agree2"
                    className="text-[16px] font-medium text-[#252525] cursor-pointer select-none"
                  >
                    [Required] Agree to the payment agency service terms and
                    conditions
                  </label>
                </div>
              </div>
              <div className="flex justify-center">
                <div style={{ minWidth: 500, maxWidth: "100%" }}>
                  {sdk && payMethod == "paypal" && (
                    <PayPalButton
                      amount={Math.round(Number(total) * 69.221) / 100}
                      onSuccess={(details: any, data: any) => {
                        alert(
                          "Transaction completed by " +
                            details.payer.name.given_name
                        );
                        return fetch("/paypal-transaction-complete", {
                          method: "post",
                          body: JSON.stringify({
                            orderID: data.orderID,
                          }),
                        });
                      }}
                    />
                  )}
                </div>
              </div>
              {payMethod === "cod" && (
                <button className="w-full h-[70px] bg-[#ffe6e6] text-3xl text-[#f50e3f] font-bold">
                  COMPLETE
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>
      <Modal isOpen={isOpenAddrList} onClose={() => setIsOpenAddrList(false)}>
        <table className="table-auto min-w-full">
          <colgroup>
            <col width="15%" />
            <col width="35%" />
            <col width="35%" />
            <col width="15%" />
          </colgroup>
          <thead>
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">PhoneNumber</th>
              <th className="py-3 px-4 text-left">Default</th>
            </tr>
          </thead>
          <tbody>
            {addressList?.data?.map((e: any, i: number) => {
              return (
                <tr
                  onClick={() => handleChangeAddressType(5, e)}
                  key={i}
                  className="border-b border-blue-gray-200 last:border-0 hover:bg-blue-100 cursor-pointer"
                >
                  <td className="py-3 px-4 text-left">{i + 1}</td>
                  <td className="py-3 px-4 text-left">
                    {e.FirstName} {e.LastName}
                  </td>
                  <td className="py-3 px-4 text-left">{e.PhoneNumber}</td>
                  <td className="py-3 px-4 text-left">
                    {e.IsDefault ? "Yes" : "No"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Modal>
    </>
  );
}
