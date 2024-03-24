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
import Table from "../../components/Table";
import Thead from "../../components/Thead";
import Tr from "../../components/Tr";
import Th from "../../components/Th";
import Td from "../../components/Td";
import Image from "next/image";
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
export const getServerSideProps = async (context: { params: any }) => {
  const { params } = context;
  const { OrderID } = params;
  const orderDetail = await axios.get(
    `http://localhost:3000/api/orders/detail`,
    {
      params: { OrderID },
    }
  );
  const result7 = await axios.get(`http://localhost:3000/api/adress/countries`);
  const result1 = await axios.get(`http://localhost:3000/api/adress/province`, {
    params: { CountryID: orderDetail.data?.CountryID },
  });
  const result2 = await axios.get(`http://localhost:3000/api/adress/district`, {
    params: { ProvinceID: orderDetail.data?.ProvinceID },
  });
  const result3 = await axios.get(`http://localhost:3000/api/adress/commune`, {
    params: { DistrictID: orderDetail.data?.DistrictID },
  });
  const result4 = await axios.get(
    `http://localhost:3000/api/orders/status_list`
  );
  const result5 = await axios.get(
    `http://localhost:3000/api/orders/shiping_form`
  );
  const result6 = await axios.get(
    `http://localhost:3000/api/orders/pay_method`
  );

  return {
    props: {
      orderDetail: orderDetail.data.order,
      countryList: result7.data.data,
      provinceListInit: result1.data.data,
      districtListInit: result2.data.data,
      communeListInit: result3.data.data,
      statusList: result4.data,
      prdList: orderDetail.data.detail,
      shippingFormList: result5.data,
      payMethodList: result6.data,
    },
  };
};
function OrderWrite({
  orderDetail,
  isNew,countryList,
  provinceListInit,
  districtListInit,
  communeListInit,
  statusList,
  prdList,
  shippingFormList,
  payMethodList,
}: any) {

  const [provinceList, setProvinceList] = useState(provinceListInit || []);
  const [districtList, setDistrictList] = useState(districtListInit || []);
  const [communeList, setCommuneList] = useState(communeListInit || []);

  const router = useRouter();
  const [order, setOrder] = useState<{
    OrderID: any;
    OrdersCode: any;
    CustomerID: any;
    TotalAmount: any;
    StatusID: any;
    OrderPhone: any;
    OrderEmail: any;
    OrderAddress: any;
    PayMethodID: any;
    ShippingFormID: any;
    Note: any;
    CustomerNote: any;
    RecieverName: any;
    CountryID:any;
    ProvinceID: any;
    DistrictID: any;
    CommuneID: any;
  }>({
    OrderID: orderDetail?.OrderID,
    OrdersCode: orderDetail?.OrdersCode || "",
    CustomerID: orderDetail?.CustomerID || "",
    TotalAmount: orderDetail?.TotalAmount || "",
    StatusID: orderDetail?.StatusID || "",
    OrderPhone: orderDetail?.OrderPhone || "",
    OrderEmail: orderDetail?.OrderEmail || "",
    OrderAddress: orderDetail?.OrderAddress || "",
    PayMethodID: orderDetail?.PayMethodID || "",
    ShippingFormID: orderDetail?.ShippingFormID || "",
    Note: orderDetail?.Note || "",
    CustomerNote: orderDetail?.CustomerNote || "",
    RecieverName: orderDetail?.RecieverName || "",
    CountryID: orderDetail?.CountryID || "",
    ProvinceID: orderDetail?.ProvinceID || "",
    DistrictID: orderDetail?.DistrictID || "",
    CommuneID: orderDetail?.CommuneID || "",
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
      setOrder({ ...order, [e.target.name]: e.target.files[0] });
    } else {
      setOrder({ ...order, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData();

    for (let [key, value] of Object.entries(order)) {
      formData.append(key, value);
    }
    detailImage.forEach((e) => {
      formData.append("detailImage[]", e);
    });
    let response;
    if (isNew) {
      response = await axios.post("/api/orders/write", formData);
    } else {
      response = await axios.post("/api/orders/update", formData);
    }

    if (response.status === 201) {
      router.push("/admin/orders/list/1");
    }
  }

  const handleGetProvince = async (CountryID: number) => {
    const result1 = await axios.get(
      `http://localhost:3000/api/adress/province`,
      { params: { CountryID } }
    );
    setProvinceList(result1.data.data);
  };

  const handleGetDistrict = async (ProvinceID: number) => {
    const result1 = await axios.get(
      `http://localhost:3000/api/adress/district`,
      { params: { ProvinceID } }
    );
    setDistrictList(result1.data.data);
  };

  const handleGetCommune = async (DistrictID: number) => {
    const result1 = await axios.get(
      `http://localhost:3000/api/adress/commune`,
      { params: { DistrictID } }
    );
    setCommuneList(result1.data.data);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">
          {isNew ? "Add New Order" : "Edit Order"}
          {orderDetail?.OrderID && (
            <span className="ms-3 text-xl font-bold text-gray-400">
              ( {orderDetail?.OrdersCode} )
            </span>
          )}
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
                  RecieverName
                </th>
                <td className="px-6 py-2">
                  <input
                    type="text"
                    name="RecieverName"
                    value={order.RecieverName}
                    id="RecieverName"
                    onChange={handleChange}
                    className="h-[35px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </td>
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  OrderPhone
                </th>
                <td className="px-6 py-2">
                  <input
                    type="text"
                    name="OrderPhone"
                    value={order.OrderPhone}
                    id="OrderPhone"
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
                  Order Status
                </th>
                <td className="px-6 py-2">
                  <Dropdown
                    containerClassName="w-[200px]"
                    className="w-full h-[35px] rounded-md"
                    options={statusList?.map((e: any, i: any) => ({
                      id: e.StatusID,
                      name: e.StatusName,
                    }))}
                    onChange={(id: number) => {
                      handleChange({
                        target: { name: "StatusID", value: id },
                      });
                    }}
                    activeItem={Number(order.StatusID)}
                    placeHolder="--Status--"
                  />
                </td>
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  OrderEmail
                </th>
                <td className="px-6 py-2">
                  <input
                    type="text"
                    name="OrderEmail"
                    value={order.OrderEmail}
                    id="OrderEmail"
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
                  Address
                </th>
                <td className="px-6 py-2">
                  <div className="flex gap-1">
                    <Dropdown
                      containerClassName="w-[120px]"
                      className="w-full h-[35px] rounded-md"
                      options={countryList?.map((e: any, i: any) => ({
                        id: e.CountryID,
                        name: e.CountryName,
                      }))}
                      onChange={(id: number) => {
                        handleGetProvince(id);
                        handleChange({
                          target: { name: "CountryID", value: id },
                        });
                      }}
                      activeItem={Number(order.CountryID)}
                      placeHolder="--Country--"
                    />
                    <Dropdown
                      containerClassName="w-[120px]"
                      className="w-full h-[35px] rounded-md"
                      options={provinceList?.map((e: any, i: any) => ({
                        id: e.ProvinceID,
                        name: e.ProvinceName,
                      }))}
                      onChange={(id: number) => {
                        handleGetDistrict(id);
                        handleChange({
                          target: { name: "ProvinceID", value: id },
                        });
                      }}
                      activeItem={Number(order.ProvinceID)}
                      placeHolder="--Province--"
                    />
                    <Dropdown
                      containerClassName="w-[120px]"
                      className="w-full h-[35px] rounded-md"
                      options={districtList.map((e: any, i: any) => ({
                        id: e.DistrictID,
                        name: e.DistrictName,
                      }))}
                      onChange={(id: number) => {
                        handleGetCommune(id);
                        handleChange({
                          target: { name: "DistrictID", value: id },
                        });
                      }}
                      activeItem={Number(order.DistrictID)}
                      placeHolder="--District--"
                    />
                    <Dropdown
                      containerClassName="w-[120px]"
                      className="w-full h-[35px] rounded-md"
                      options={communeList.map((e: any, i: any) => ({
                        id: e.CommuneID,
                        name: e.CommuneName,
                      }))}
                      onChange={(id: number) => {
                        handleChange({
                          target: { name: "CommuneID", value: id },
                        });
                      }}
                      activeItem={Number(order.CommuneID)}
                      placeHolder="--Village--"
                    />
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Detail Address
                </th>
                <td className="px-6 py-2">
                  <input
                    type="text"
                    name="OrderAddress"
                    value={order.OrderAddress}
                    id="OrderAddress"
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
                  Customer Order
                </th>
                <td className="px-6 py-2">
                  <input
                    type="text"
                    value={`${orderDetail?.FirstName || ""} ${
                      orderDetail?.LastName || ""
                    }`}
                    disabled
                    className="h-[35px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </td>
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Shipping Form
                </th>
                <td className="px-6 py-2">
                  <Dropdown
                    containerClassName="w-[180px]"
                    className="w-full h-[35px] rounded-md"
                    options={shippingFormList.map((e: any, i: any) => ({
                      id: e.ShippingFormID,
                      name: e.ShippingFormName,
                    }))}
                    onChange={(id: number) => {
                      handleChange({
                        target: { name: "ShippingFormID", value: id },
                      });
                    }}
                    activeItem={Number(order.ShippingFormID)}
                    placeHolder="--ShippingForm--"
                  />
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  TotalAmount
                </th>
                <td className="px-6 py-2">
                  <input
                    type="text"
                    value={order.TotalAmount}
                    disabled
                    className="h-[35px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </td>
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Pay Method
                </th>
                <td className="px-6 py-2">
                  <Dropdown
                    containerClassName="w-[180px]"
                    className="w-full h-[35px] rounded-md"
                    options={payMethodList.map((e: any, i: any) => ({
                      id: e.PayMethodID,
                      name: e.PayMethodName,
                    }))}
                    onChange={(id: number) => {
                      handleChange({
                        target: { name: "PayMethodID", value: id },
                      });
                    }}
                    activeItem={Number(order.PayMethodID)}
                    placeHolder="--PayMethod--"
                  />
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Note
                </th>
                <td className="px-6 py-2">
                  <input
                    type="text"
                    name="Note"
                    value={order.Note}
                    id="Note"
                    onChange={handleChange}
                    className="h-[35px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </td>
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Customer Note
                </th>
                <td className="px-6 py-2">{order.CustomerNote || ""}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h1 className="text-xl font-bold mb-2 mt-6">Product List</h1>
        <Table>
          <Thead>
            <Tr className="bg-blue-gray-100 text-gray-700">
              <Th>ID</Th>
              <Th>Thumb Image</Th>
              <Th>Product Name</Th>
              <Th>Amount</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <tbody className="text-blue-gray-900">
            {prdList.map((e: any, i: any) => {
              return (
                <Tr key={i}>
                  <Td>{i + 1}</Td>
                  <Td>
                    <Image
                      src={`${CDN_URL}/${e.ProductImage}`}
                      alt=""
                      width={100}
                      height={100}
                    />
                  </Td>
                  <Td>{e.ProductName}</Td>
                  <Td>{e.detailQuantity}</Td>
                  <Td>{e.Subtotal}</Td>
                </Tr>
              );
            })}
          </tbody>
        </Table>
        <div className="gap-2 flex justify-center mt-3">
          <Link
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            href="/admin/orders/list"
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

export default OrderWrite;
