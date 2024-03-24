import React, { FormEvent, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export const getServerSideProps = async (context: { params: any }) => {
  const { params } = context;
  const { brandID } = params;
  const brandDetail = await axios.get(
    `http://localhost:3000/api/brand/detail`,
    {
      params: { brandID },
    }
  );

  return {
    props: {
        brandDetail: brandDetail.data,
    },
  };
};
function BrandWrite({ brandDetail }: any) {

  const router = useRouter();
  const [brand, setBrand] = useState<{ [key: string]: any }>({
    BrandID: brandDetail.BrandID || "",
    BrandName: brandDetail.BrandName || "",
  });

  function handleChange(e: any) {
    setBrand({ ...brand, [e.target.name]: e.target.value });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData();

    for (let [key, value] of Object.entries(brand)) {
      formData.append(key, value);
    }
   
    const response = await axios.post("/api/brand/update", formData);

    if (response.status === 201) {
      router.push("/admin/brand/list");
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Update Brand</h1>
      <form onSubmit={handleSubmit}>
        <div className="relative overflow-x-auto">
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
                  Brand Name
                </th>
                <td className="px-6 py-2" colSpan={3}>
                  <input
                    type="text"
                    name="BrandName"
                    value={brand.BrandName}
                    id="BrandName"
                    onChange={handleChange}
                    className="h-[35px] outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </td>
              </tr>
              
              
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-3">
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

export default BrandWrite;
