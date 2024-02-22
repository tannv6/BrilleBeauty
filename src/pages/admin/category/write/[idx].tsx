import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import "./write.css";
import { useRouter } from "next/router";
import NotFound from "../../components/NotFound";
import Link from "next/link";
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
  const [categories, setCategories] = useState(data || {});
  const router = useRouter();

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
  console.log(categories);

  return (
    <Layout>
      {categories.CategoryID ? (
        <div className={`${categories?.isDel ? "opacity-25" : ""}`}>
          <div className="level1">
            <input
              type="text"
              className="border rounded p-1 w-[220px] bg-pink-100"
              value={categories?.CategoryName}
              onChange={(e) => handleChange(e, 1)}
            />
            <button
              onClick={() => handleAddCategory(2, categories?.CategoryID)}
              className="border rounded bg-cyan-400 text-white px-3 py-1 ms-1"
            >
              +
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
                      className="border rounded p-1 ms-[110px] w-[220px] bg-blue-100"
                      type="text"
                      value={el.CategoryName}
                      onChange={(e) => handleChange(e, 2, el.CategoryID)}
                    />
                    <button
                      onClick={() => handleAddCategory(3, el.CategoryID)}
                      className="border rounded bg-cyan-400 text-white px-3 py-1 ms-1"
                    >
                      +
                    </button>
                    <button
                      onClick={() => hanldeDeleteCate(2, el.CategoryID)}
                      className="border rounded bg-rose-600 text-white px-3 py-1 ms-1"
                    >
                      x
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
                                x
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
      <div className="flex justify-center mt-5 gap-2">
        <Link
          href="/admin/category/list"
          className="border px-3 py-1 rounded bg-green-600 text-white"
        >
          Back to list
        </Link>
        <button
          onClick={() => hanldeDeleteCate(1)}
          className="border px-3 py-1 rounded bg-rose-600 text-white"
        >
          Delete
        </button>
        <button
          className="border px-3 py-1 rounded bg-[#1877f2] text-white"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </Layout>
  );
}

export default Write;
