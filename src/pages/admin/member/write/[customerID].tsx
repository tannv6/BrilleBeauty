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
export const getServerSideProps = async (context: { params: any }) => {
  const { params } = context;
  const { customerID } = params;
  const customerDetail = await axios.get(
    `http://localhost:3000/api/customers/detail`,
    {
      params: { customerID },
    }
  );
  const result1 = await axios.get(`http://localhost:3000/api/adress/countries`);
  const result2 = await axios.get(`http://localhost:3000/api/adress/district`, {
    params: { ProvinceID: customerDetail.data?.Province },
  });
  const result3 = await axios.get(`http://localhost:3000/api/adress/commune`, {
    params: { DistrictID: customerDetail.data?.District },
  });

  return {
    props: {
      customerDetail: customerDetail.data,
      provinceList: result1.data.data,
      countryList: result1.data.data,
      districtListInit: result2.data.data,
      communeListInit: result3.data.data,
    },
  };
};
function CustomerWrite({
  customerDetail,
  isNew,
  countryList,
  districtListInit,
  communeListInit,
}: any) {
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState(districtListInit || []);
  const [communeList, setCommuneList] = useState(communeListInit || []);

  const router = useRouter();
  const [customer, setCustomer] = useState<{
    CustomerID: any;
    FirstName: any;
    LastName: any;
    Email: any;
    CustomerPhone: any;
    Province: any;
    District: any;
    Village: any;
    Address: any;
    CountryID: any;
  }>({
    CustomerID: customerDetail?.CustomerID,
    FirstName: customerDetail?.FirstName,
    LastName: customerDetail?.LastName,
    CountryID: customerDetail?.CountryID,
    Email: customerDetail?.Email,
    CustomerPhone: customerDetail?.CustomerPhone,
    Province: customerDetail?.Province,
    District: customerDetail?.District,
    Village: customerDetail?.Village,
    Address: customerDetail?.Address,
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
      setCustomer({ ...customer, [e.target.name]: e.target.files[0] });
    } else {
      setCustomer({ ...customer, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData();

    for (let [key, value] of Object.entries(customer)) {
      formData.append(key, value);
    }
    detailImage.forEach((e) => {
      formData.append("detailImage[]", e);
    });
    let response;
    if (isNew) {
      response = await axios.post("/api/customers/write", formData);
    } else {
      response = await axios.post("/api/customers/update", formData);
    }

    if (response.status === 201) {
      router.push("/admin/member/list");
    }
  }
  const handleGetProvince = async (CountryID: number) => {
    const result1 = await axios.get(`/api/adress/province`, {
      params: { CountryID },
    });
    setProvinceList(result1.data.data);
  };
  const handleGetDistrict = async (ProvinceID: number) => {
    const result1 = await axios.get(`/api/adress/district`, {
      params: { ProvinceID },
    });
    setDistrictList(result1.data.data);
  };

  const handleGetCommune = async (DistrictID: number) => {
    const result1 = await axios.get(`/api/adress/commune`, {
      params: { DistrictID },
    });
    setCommuneList(result1.data.data);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">
          {isNew ? "Add New Customer" : "Edit Customer"}
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
                  FirstName
                </th>
                <td className="px-6 py-2">
                  <input
                    type="text"
                    name="FirstName"
                    value={customer.FirstName}
                    id="FirstName"
                    onChange={handleChange}
                    className="h-[35px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </td>
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  LastName
                </th>
                <td className="px-6 py-2">
                  <input
                    type="text"
                    name="LastName"
                    value={customer.LastName}
                    id="LastName"
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
                  CustomerPhone
                </th>
                <td className="px-6 py-2">
                  <input
                    type="text"
                    name="CustomerPhone"
                    value={customer.CustomerPhone}
                    id="CustomerPhone"
                    onChange={handleChange}
                    className="h-[35px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </td>
                <th
                  scope="row"
                  className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Email
                </th>
                <td className="px-6 py-2">
                  <input
                    type="text"
                    name="Email"
                    value={customer.Email}
                    id="Email"
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
                      containerClassName="w-[140px]"
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
                      activeItem={Number(customer?.CountryID)}
                      placeHolder="--Country--"
                    />
                    <Dropdown
                      containerClassName="w-[140px]"
                      className="w-full h-[35px] rounded-md"
                      options={provinceList?.map((e: any, i: any) => ({
                        id: e.ProvinceID,
                        name: e.ProvinceName,
                      }))}
                      onChange={(id: number) => {
                        handleGetDistrict(id);
                        handleChange({
                          target: { name: "Province", value: id },
                        });
                      }}
                      activeItem={Number(customer.Province)}
                      placeHolder="--Province--"
                    />
                    <Dropdown
                      containerClassName="w-[140px]"
                      className="w-full h-[35px] rounded-md"
                      options={districtList.map((e: any, i: any) => ({
                        id: e.DistrictID,
                        name: e.DistrictName,
                      }))}
                      onChange={(id: number) => {
                        handleGetCommune(id);
                        handleChange({
                          target: { name: "District", value: id },
                        });
                      }}
                      activeItem={Number(customer.District)}
                      placeHolder="--District--"
                    />
                    <Dropdown
                      containerClassName="w-[140px]"
                      className="w-full h-[35px] rounded-md"
                      options={communeList.map((e: any, i: any) => ({
                        id: e.CommuneID,
                        name: e.CommuneName,
                      }))}
                      onChange={(id: number) => {
                        handleChange({
                          target: { name: "Village", value: id },
                        });
                      }}
                      activeItem={Number(customer.Village)}
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
                    name="Address"
                    value={customer.Address}
                    id="Address"
                    onChange={handleChange}
                    className="h-[35px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="gap-2 flex justify-center mt-3">
          <Link
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            href="/admin/customers/list"
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

export default CustomerWrite;
