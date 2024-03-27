import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import MypageNav from "@/components/MypageNav";
import SubNav from "@/components/SubNav";
import { getWebSetting } from "@/lib/functions";
import axios from "axios";
import { parse } from "cookie";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
export const getServerSideProps = (async (context: any) => {
  const cookies = parse(context.req.headers.cookie || "");
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const result1 = await axios.get(`http://localhost:3000/api/adress/countries`);
  return {
    props: {
      countryList: result1.data.data,
      ...(await getWebSetting(cookies)),
    },
  };
}) satisfies GetServerSideProps<{ countryList: any }>;
export default function MyAddresses({ countryList, isNew, ...props }: any) {
  const router = useRouter();
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [communeList, setCommuneList] = useState([]);
  const [address, setAddress] = useState({
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    CountryID: "",
    ProvinceID: "",
    DistrictID: "",
    CommuneID: "",
    DetailAddress: "",
    ComName: "",
    ZipCode: "",
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
  } = address;
  function handleChange(e: any) {
    if (e.target.files) {
      setAddress({ ...address, [e.target.name]: e.target.files[0] });
    } else {
      setAddress({ ...address, [e.target.name]: e.target.value });
    }
  }
  const handleGetProvince = async (CountryID: number) => {
    const result1 = await axios.get(
      `/api/adress/province`,
      { params: { CountryID } }
    );
    setProvinceList(result1.data.data);
  };

  const handleGetDistrict = async (ProvinceID: number) => {
    const result1 = await axios.get(
      `/api/adress/district`,
      { params: { ProvinceID } }
    );
    setDistrictList(result1.data.data);
  };

  const handleGetCommune = async (DistrictID: number) => {
    const result1 = await axios.get(
      `/api/adress/commune`,
      { params: { DistrictID } }
    );
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
  return (
    <>
      <Layout {...props}>
        <div id="main">
          <SubNav title1="My Account" title2="My Addresses" />
          <div className="inner-container mt-[75px] mb-[135px]">
            <div className="flex flex-row gap-[60px]">
              <MypageNav></MypageNav>
              <form onSubmit={handleSubmit} className="grow mt-[17px]">
                <p className="text-2xl pb-4 border-b border-black">
                  My Addresses
                </p>
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
                          <div className="py-5 pl-5 flex items-center justify-between border-b">
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
                    className="w-[220px] h-[60px] rounded bg-[#cccccc] text-lg"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="w-[220px] h-[60px] rounded bg-[#f04b76] text-lg text-[#fff]"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
