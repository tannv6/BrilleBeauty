import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import Table from "../components/Table";
import Thead from "../components/Thead";
import Th from "../components/Th";
import Tr from "../components/Tr";
import Tbody from "../components/Tbody";
import Td from "../components/Td";
import Button from "../components/Button";
import Modal from "../components/Modal";
import axios from "axios";
import { CDN_URL } from "@/utils/constants";
import Image from "next/image";
import he from "he";

export const getServerSideProps = async () => {
  const result = await axios.get(
    "http://localhost:3000/api/combo_category/list"
  );
  return {
    props: {
      list: result.data.data,
    },
  };
};

function List({ list }: any) {
  const [isOpenWrite, setIsOpenWrite] = useState(false);
  const [detail, setDetail] = useState<{
    CategoryID: string | undefined;
    CategoryName: string;
    ImageUpload: File | null;
    ThumbImage: string;
    Description: string;
    IsHomepage: string;
  }>({
    CategoryID: "0",
    CategoryName: "",
    ImageUpload: null,
    ThumbImage: "",
    Description: "",
    IsHomepage: "",
  });
  const handleOpenWrite = (category: any) => {
    setDetail({
      ...detail,
      CategoryID: category?.CategoryID || "",
      CategoryName: category?.CategoryName || "",
      ThumbImage: category?.ThumbImage || "",
      Description: he.decode(category?.Description || ""),
      IsHomepage: category?.IsHomepage || "0",
    });
    setIsOpenWrite(true);
  };
  function handleChange(e: any) {
    if (e.target.files) {
      setDetail({ ...detail, [e.target.name]: e.target.files[0] });
    } else {
      setDetail({ ...detail, [e.target.name]: e.target.value });
    }
  }
  const handleSubmit = async () => {
    let formData = new FormData();

    for (let [key, value] of Object.entries(detail)) {
      formData.append(key, value || "");
    }
    if (detail.CategoryID) {
      await axios.post("/api/combo_category/update", formData);
    } else {
      await axios.post("/api/combo_category/write", formData);
    }
    location.reload();
  };
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure delete this category?")) {
      await axios.put(`/api/combo_category/del`, { CategoryID: id });
      window.location.reload();
    }
  };
  const src = detail.ImageUpload
    ? URL.createObjectURL(detail.ImageUpload)
    : `${CDN_URL}/${detail.ThumbImage}`;
  return (
    <AdminLayout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Combo Category List</h1>
        <Button onClick={() => handleOpenWrite(null)} color="blue">
          + Add Category
        </Button>
      </div>
      <Table colWidths={["20%", "60%", "20%"]}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th center>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list.map((e: any, i: any) => {
            return (
              <Tr key={i}>
                <Td>{list.length - i}</Td>
                <Td>{e.CategoryName}</Td>
                <Td center>
                  <button
                    className="font-medium text-blue-600 hover:text-blue-800 me-3"
                    onClick={() => handleOpenWrite(e)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(e.CategoryID)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Modal isOpen={isOpenWrite} onClose={() => setIsOpenWrite(false)}>
        <form className="p-4 md:p-5">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="CategoryName"
                id="CategoryName"
                onChange={handleChange}
                value={detail.CategoryName}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type Category name"
                required
              />
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-1"
              >
                Description
              </label>
              <textarea
                className="min-h-[100px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                name="Description"
                id="Description"
                onChange={handleChange}
                value={detail.Description}
              ></textarea>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-1"
              >
                Show In Homepage
              </label>
              <select
                name="IsHomepage"
                id="IsHomepage"
                value={detail.IsHomepage}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-1"
              >
                Thumb Image
              </label>
              <input
                name="ImageUpload"
                onChange={handleChange}
                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                type="file"
                id="ImageUpload"
                accept="image/*"
              />
              <Image
                className="mt-2"
                src={src}
                alt={""}
                width={100}
                height={100}
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            type="button"
            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {detail.CategoryID ? "Update Combo Category" : "Add Combo Category"}
          </button>
        </form>
      </Modal>
    </AdminLayout>
  );
}

export default List;
