import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import MypageNav from "@/components/MypageNav";
import SubNav from "@/components/SubNav";
import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
export const getServerSideProps = (async (context: any) => {
  const { params } = context;
  const { ODID } = params;
  const addressDetail = await axios.get(
    `http://localhost:3000/api/order_address/detail`,
    {
      params: { ODID },
    }
  );
  const result1 = await axios.get(`http://localhost:3000/api/adress/countries`);
  const result2 = await axios.get(`http://localhost:3000/api/adress/province`, {
    params: { CountryID: addressDetail.data?.CountryID },
  });
  const result3 = await axios.get(`http://localhost:3000/api/adress/district`, {
    params: { ProvinceID: addressDetail.data?.ProvinceID },
  });
  const result4 = await axios.get(`http://localhost:3000/api/adress/commune`, {
    params: { DistrictID: addressDetail.data?.DistrictID },
  });
  return {
    props: {
      addressDetail: addressDetail.data,
      countryList: result1.data.data,
      provinceListInit: result2.data.data,
      districtListInit: result3.data.data,
      communeListInit: result4.data.data,
    },
  };
}) satisfies GetServerSideProps<{ countryList: any }>;
export default function MyAddresses({
  addressDetail,
  countryList,
  isNew,
  provinceListInit,
  districtListInit,
  communeListInit,
}: any) {
  const router = useRouter();
  const [provinceList, setProvinceList] = useState(provinceListInit || []);
  const [districtList, setDistrictList] = useState(districtListInit || []);
  const [communeList, setCommuneList] = useState(communeListInit || []);
  const [address, setAddress] = useState({
    ODID: addressDetail?.ODID || "",
    FirstName: addressDetail?.FirstName || "",
    LastName: addressDetail?.LastName || "",
    PhoneNumber: addressDetail?.PhoneNumber || "",
    CountryID: addressDetail?.CountryID || "",
    ProvinceID: addressDetail?.ProvinceID || "",
    DistrictID: addressDetail?.DistrictID || "",
    CommuneID: addressDetail?.CommuneID || "",
    BasicAddress: addressDetail?.BasicAddress || "",
    DetailAddress: addressDetail?.DetailAddress || "",
    Email: addressDetail?.Email || "",
    ComName: addressDetail?.ComName || "",
    ZipCode: addressDetail?.ZipCode || "",
  });
  const {
    FirstName,
    LastName,
    PhoneNumber,
    CountryID,
    ProvinceID,
    DistrictID,
    CommuneID,
    DetailAddress,
    ComName,
    ZipCode,
    Email,
    BasicAddress,
  } = address;
  function handleChange(e: any) {
    if (e.target.files) {
      setAddress({ ...address, [e.target.name]: e.target.files[0] });
    } else {
      setAddress({ ...address, [e.target.name]: e.target.value });
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
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData();

    for (let [key, value] of Object.entries(address)) {
      formData.append(key, value);
    }
    let response;
    if (isNew) {
      response = await axios.post("/api/order_address/write", formData);
    } else {
      response = await axios.post("/api/order_address/update", formData);
    }

    if (response.status === 201) {
      router.push("/account/myaddresses");
    }
  }
  const handleSetDefault = async () => {
    const res = await axios.post("/api/order_address/set_default", {
      ODID: addressDetail?.ODID || "",
    });
    if (res.data.result === "OK") {
      alert("This address will become defaut!");
    }
  };
  return (
    <Layout>
      <div id="main">
        <SubNav title1="My Account" title2="My Addresses" />
        <div className="inner-container mt-[75px] mb-[135px]">
          <div className="flex flex-row gap-[60px]">
            <MypageNav></MypageNav>
            <form onSubmit={handleSubmit} className="grow mt-[17px]">
              <div className="flex justify-between items-center pb-4 border-b border-black">
                <p className="text-2xl">
                  My Addresses
                </p>
                {addressDetail?.ODID && <button
                  onClick={handleSetDefault}
                  className="w-[180px] h-[40px] rounded bg-[#f04b76] text-lg text-[#fff]"
                >
                  Set as default
                </button>}
              </div>
              <table className="table-auto min-w-full">
                <colgroup>
                  <col width="25%" />
                  <col width="*" />
                </colgroup>
                <tbody>
                  <tr className="border-b border-[#757575]">
                    <th scope="row" className="text-lg bg-[#fefafa]">
                      Add New Address
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
                              placeholder="Last Name"
                              className="px-[10px] w-[220px] h-[50px] border rounded-[2px]"
                              name="LastName"
                              value={LastName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="py-5 pl-5 flex items-center justify-between border-b">
                          <p>
                            Phone Number
                            <span className="text-[#ef426f]">*</span>
                          </p>
                          <input
                            type="tel"
                            className="px-[10px] w-[450px] h-[50px] border rounded-[2px]"
                            name="PhoneNumber"
                            value={PhoneNumber}
                            onChange={handleChange}
                          ></input>
                        </div>
                        <div className="py-5 pl-5 flex items-center justify-between border-b">
                          <p>
                            Email
                            <span className="text-[#ef426f]">*</span>
                          </p>
                          <input
                            type="text"
                            className="px-[10px] w-[450px] h-[50px] border rounded-[2px]"
                            name="Email"
                            value={Email}
                            onChange={handleChange}
                          ></input>
                        </div>
                        <div className="py-5 pl-5 flex items-center justify-between border-b">
                          <p>Company Name</p>
                          <input
                            type="text"
                            className="px-[10px] w-[450px] h-[50px] border rounded-[2px]"
                            name="ComName"
                            value={ComName}
                            onChange={handleChange}
                          ></input>
                        </div>
                        <div className="py-5 pl-5 flex items-center justify-between border-b">
                          <p>Zip/Postal Code</p>
                          <input
                            type="text"
                            className="px-[10px] w-[450px] h-[50px] border rounded-[2px]"
                            name="ZipCode"
                            value={ZipCode}
                            onChange={handleChange}
                          ></input>
                        </div>
                        {/* <div className="py-5 pl-5 flex items-center justify-between border-b">
                          <p>Country</p>
                          <Dropdown
                            containerClassName="w-[450px] h-[50px]"
                            className="w-full px-[10px] border rounded-[2px]"
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
                            activeItem={Number(CountryID)}
                            placeHolder="--Country--"
                          />
                        </div>
                        <div className="py-5 pl-5 flex items-center justify-between border-b">
                          <p>State/Province</p>
                          <Dropdown
                            containerClassName="w-[450px] h-[50px]"
                            className="w-full px-[10px] border rounded-[2px]"
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
                            activeItem={Number(ProvinceID)}
                            placeHolder="--Province--"
                          />
                        </div>
                        <div className="py-5 pl-5 flex items-center justify-between border-b">
                          <p>Suburb/City</p>
                          <Dropdown
                            containerClassName="w-[450px] h-[50px]"
                            className="w-full px-[10px] border rounded-[2px]"
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
                            activeItem={Number(DistrictID)}
                            placeHolder="--District--"
                          />
                        </div>
                        <div className="py-5 pl-5 flex items-center justify-between border-b">
                          <p>
                            Commune
                            <span className="text-[#ef426f]">*</span>
                          </p>
                          <Dropdown
                            containerClassName="w-[450px] h-[50px]"
                            className="w-full px-[10px] border rounded-[2px]"
                            options={communeList.map((e: any, i: any) => ({
                              id: e.CommuneID,
                              name: e.CommuneName,
                            }))}
                            onChange={(id: number) => {
                              handleChange({
                                target: { name: "CommuneID", value: id },
                              });
                            }}
                            activeItem={Number(CommuneID)}
                            placeHolder="--Village--"
                          />
                        </div> */}
                        <div className="py-5 pl-5 flex items-center justify-between border-b">
                          <p>Basic Address</p>
                          <input
                            type="text"
                            className="px-[10px] w-[450px] h-[50px] border rounded-[2px]"
                            name="BasicAddress"
                            value={BasicAddress}
                            onChange={handleChange}
                          ></input>
                        </div>
                        <div className="py-5 pl-5 flex items-center justify-between border-b">
                          <p>Detail Address</p>
                          <input
                            type="text"
                            className="px-[10px] w-[450px] h-[50px] border rounded-[2px]"
                            name="DetailAddress"
                            value={DetailAddress}
                            onChange={handleChange}
                          ></input>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-end mt-[50px] gap-[10px]">
                <Link
                  href={"/account/myaddresses"}
                  className="w-[220px] h-[60px] rounded bg-[#cccccc] text-lg flex justify-center items-center"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="w-[220px] h-[60px] rounded bg-[#f04b76] text-lg text-[#fff]"
                >
                  {isNew ? "Add" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
