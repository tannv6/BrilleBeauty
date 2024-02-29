import React, { useState } from "react";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Thead from "../components/Thead";
import Th from "../components/Th";
import Tr from "../components/Tr";
import Tbody from "../components/Tbody";
import Td from "../components/Td";
import Button from "../components/Button";
import Modal from "../components/Modal";
import axios from "axios";

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
    CategoryID: number | undefined;
    CategoryName: string;
  }>({
    CategoryID: 0,
    CategoryName: "",
  });
  const handleOpenWrite = (CategoryName: string, CategoryID?: number) => {
    setDetail({
      ...detail,
      CategoryID,
      CategoryName,
    });
    setIsOpenWrite(true);
  };
  const handleSubmit = async () => {
    if (detail.CategoryID) {
      await axios.post("/api/combo_category/update", { ...detail });
    } else {
      await axios.post("/api/combo_category/write", { ...detail });
    }
    location.reload();
  };
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure delete this category?")) {
      await axios.put(`/api/combo_category/del`, { CategoryID: id });
      window.location.reload();
    }
  };
  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Combo Category List</h1>
        <Button onClick={() => handleOpenWrite("")} color="blue">
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
                    onClick={() =>
                      handleOpenWrite(e.CategoryName, e.CategoryID)
                    }
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
                onChange={(e) =>
                  setDetail({ ...detail, CategoryName: e.target.value })
                }
                value={detail.CategoryName}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type Category name"
                required
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
    </Layout>
  );
}

export default List;
