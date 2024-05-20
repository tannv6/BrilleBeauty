import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import axios from "axios";
import "./write.css";
import { useRouter } from "next/router";
import NotFound from "../../components/NotFound";
import Link from "next/link";
import { SRLWrapper } from "simple-react-lightbox";
import Image from "next/image";
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
export async function getServerSideProps(context: { params: any }) {
  const { params } = context;
  const { idx } = params;
  const data = await axios.get(`http://localhost:3000/api/category/detail`, {
    params: { idx },
  });
  return { props: { data: data.data, idx } };
}

function Write({ data, idx }: any) {
  if (idx && !data) {
    return <NotFound />;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [categories, setCategories] = useState(data || {});
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  


  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [category, setCategory] = useState<{
    CategoryID: any,
    CategoryImage: any;
  }>({
    CategoryID: data?.CategoryID || "",
    CategoryImage: data?.CategoryImage || "",
  });

  function handleChangeImg(e: any) {
    setCategory({ ...category, [e.target.name]: e.target.files[0] });
  }

  const handleChange = (
    e: any,
    level: number,
    id?: number,
    parentId?: number
  ) => {
    const cateNew: any = {};
    Object.assign(cateNew, categories);
    if (level === 1) {
      cateNew.CategoryName = e.target.value;
      cateNew.isMod = true;
    } else if (level === 2) {
      const it = cateNew.child.find((e: any) => e.CategoryID === id);
      it.CategoryName = e.target.value;
      it.isMod = true;
    } else if (level === 3) {
      const pr = cateNew.child.find((e: any) => e.CategoryID === parentId);
      const it = pr.child.find((e: any) => e.CategoryID === id);
      it.CategoryName = e.target.value;
      it.isMod = true;
    }
    setCategories(cateNew);
  };

  const handleSubmit = async () => {
    const data: { [key: string]: any[] } = {
      del: [],
      mod: [],
      new: [],
    };
    if (categories.isDel) {
      if (!confirm("Are you sure delete this category?")) {
        return;
      }
      data.del.push({
        CategoryID: categories.CategoryID,
      });
    } else if (categories.isMod) {
      data.mod.push({
        CategoryID: categories.CategoryID,
        CategoryName: categories.CategoryName,
      });
    }
    categories.child?.map((e: any) => {
      if (e.isDel) {
        data.del.push({
          CategoryID: e.CategoryID,
        });
      } else if (e.isMod) {
        data.mod.push({
          CategoryID: e.CategoryID,
          CategoryName: e.CategoryName,
        });
      }
      e.child?.map((e1: any) => {
        if (e1.isDel) {
          data.del.push({
            CategoryID: e1.CategoryID,
          });
        } else if (e1.isMod) {
          data.mod.push({
            CategoryID: e1.CategoryID,
            CategoryName: e1.CategoryName,
          });
        }
      });
    });
    await axios.post(`/api/category/update`, {
      data,
    });
    window.location.reload();
    if (category.CategoryImage) {
      let formData = new FormData();
      formData.append('ImageUpload', category.CategoryImage);

      for (let [key, value] of Object.entries(category)) {
        formData.append(key, value);
      }
  
          let response;
            response = await axios.post("/api/category/update_img", formData);
  
        if (response.status === 201) {
          window.location.reload();
        } 
    }
  };

  const handleAddCategory = async (level: number, parentId?: number) => {
    const cateNew: any = {};
    Object.assign(cateNew, categories);
    if (level === 1) {
      const result = await axios.post("/api/category/create", {
        data: { ParentID: "", Level: level },
      });
      cateNew.CategoryID = result.data.lastInsertedId;
      cateNew.CategoryName = "";
      cateNew.child = [];
      return router.push(`/admin/category/write/${result.data.lastInsertedId}`);
    } else if (level === 2) {
      const result = await axios.post("/api/category/create", {
        data: { ParentID: parentId, Level: level },
      });
      cateNew.child.push({
        CategoryID: result.data.lastInsertedId,
        CategoryName: "",
        ParentID: parentId,
        Level: level,
        isNew: true,
        child: [],
      });
    } else if (level === 3) {
      const result = await axios.post("/api/category/create", {
        data: { ParentID: parentId, Level: level },
      });
      const pr = cateNew.child.find((e: any) => e.CategoryID === parentId);
      pr.child.push({
        CategoryID: result.data.lastInsertedId,
        CategoryName: "",
        ParentID: parentId,
        Level: level,
        isNew: true,
      });
    }
    setCategories(cateNew);
  };
  const hanldeDeleteCate = (level: number, id?: number, parentId?: number) => {
    const cateNew: any = {};
    Object.assign(cateNew, categories);
    if (level === 1) {
      cateNew.isDel = true;
    } else if (level === 2) {
      const it = cateNew.child.find((e: any) => e.CategoryID === id);
      it.isDel = true;
    } else if (level === 3) {
      const pr = cateNew.child.find((e: any) => e.CategoryID === parentId);
      const it = pr.child.find((e: any) => e.CategoryID === id);
      it.isDel = true;
    }
    setCategories(cateNew);
  };

  const src = category.CategoryImage instanceof Blob
  ? URL.createObjectURL(category.CategoryImage)
  : `${CDN_URL}/${category.CategoryImage}`;

  return (
    <AdminLayout>
      {categories.CategoryID ? (
        <div className={`${categories?.isDel ? "opacity-25 pointer-events-none" : ""}`}>
          <div className="level1">
            <input
              type="text"
              className="border rounded p-1 w-[220px] bg-teal-200"
              value={categories?.CategoryName}
              onChange={(e) => handleChange(e, 1)}
            />
            <button
              onClick={() => handleAddCategory(2, categories?.CategoryID)}
              className="border rounded bg-cyan-400 text-white px-3 py-1 ms-1"
            >
              <i className="text-xs fas fa-plus"></i>
            </button>
          </div>
          <div>
            {categories?.child
              ?.filter((e: any) => !e.isDel)
              ?.map((el: any, i: any) => {
                return (
                  <div
                    className="level2 relative"
                    style={{ marginLeft: 110, marginTop: 20 }}
                    key={i}
                  >
                    <input
                      className="border rounded p-1 ms-[110px] w-[220px] bg-blue-200"
                      type="text"
                      value={el.CategoryName}
                      onChange={(e) => handleChange(e, 2, el.CategoryID)}
                    />
                    <button
                      onClick={() => handleAddCategory(3, el.CategoryID)}
                      className="border rounded bg-cyan-400 text-white px-3 py-1 ms-1"
                    >
                      <i className="text-xs fas fa-plus"></i>
                    </button>
                    <button
                      onClick={() => hanldeDeleteCate(2, el.CategoryID)}
                      className="border rounded bg-rose-600 text-white px-3 py-1 ms-1"
                    >
                      <i className="text-xs fas fa-times"></i>
                    </button>
                    <div>
                      {el.child
                        ?.filter((e: any) => !e.isDel)
                        ?.map((e1: any, i1: any) => {
                          return (
                            <div
                              className="level3 relative"
                              style={{ marginLeft: 110, marginTop: 20 }}
                              key={i1}
                            >
                              <input
                                type="text"
                                className="border rounded p-1 ms-[220px] w-[220px] bg-cyan-100"
                                value={e1.CategoryName}
                                onChange={(e) =>
                                  handleChange(
                                    e,
                                    3,
                                    e1.CategoryID,
                                    el.CategoryID
                                  )
                                }
                              />
                              <button
                                onClick={() =>
                                  hanldeDeleteCate(
                                    3,
                                    e1.CategoryID,
                                    el.CategoryID
                                  )
                                }
                                className="border rounded bg-rose-600 text-white px-3 py-1 ms-1"
                              >
                                <i className="text-xs fas fa-times"></i>
                              </button>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => handleAddCategory(1)}
            className="border px-3 py-1 rounded bg-cyan-300 text-white"
          >
            +Make new category
          </button>
        </div>
      )}

      
      <div className="relative">
        <table
          style={{ tableLayout: "fixed" }}
          className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-2 font-bold text-gray-900 whitespace-nowrap dark:text-white"
              >
                Category Image
              </th>
              <td className="px-6 py-2" colSpan={3}>
                <input
                  name="CategoryImage"
                  onChange={handleChangeImg}
                  className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  type="file"
                />
                  <SRLWrapper
                    options={{
                      thumbnails: {
                        showThumbnails: false,
                      },
                    }}
                  >
                    <Image
                      className="mt-2"
                      src={src}
                      alt={""}
                      width={100}
                      height={100}
                    />
                  </SRLWrapper>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-5 gap-2">
        <Link
          href="/admin/category/list"
          className="border px-3 py-1 rounded bg-green-600 text-white"
        >
          Back to list
        </Link>
        <button
          onClick={
            categories.isDel
              ? () => setCategories({ ...categories, isDel: false })
              : () => hanldeDeleteCate(1)
          }
          className="border px-3 py-1 rounded bg-rose-600 text-white"
        >
          {categories.isDel ? "Revert" : "Delete"}
        </button>
        <button
          className="border px-3 py-1 rounded bg-[#1877f2] text-white"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </AdminLayout>
  );
}

export default Write;
