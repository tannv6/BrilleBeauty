import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import axios from "axios";
import "./write.css";
export async function getServerSideProps(context: { params: any }) {
  const { params } = context;
  const { idx } = params;
  const data = await axios.get(`http://localhost:3000/api/category/detail`, {
    params: { idx },
  });
  return { props: { data: data.data } };
}

function Write({ data }: any) {
  const router = useRouter();

  const [categories, setCategories] = useState(data);

  console.log(categories);

  useEffect(() => {
    axios.get(`/api/category/detail`, { params: { idx: router.query.idx } });
  }, [router.query.idx]);

  const handleChange = (
    e: any,
    level: number,
    id?: number,
    parentId?: number
  ) => {
    const cate1: any = {};
    Object.assign(cate1, categories);
    if (level === 1) {
      cate1.CategoryName = e.target.value;
      setCategories(cate1);
    } else if (level === 2) {
      const it = cate1.child.find((e: any) => e.CategoryID === id);
      it.CategoryName = e.target.value;
      setCategories(cate1);
    } else if (level === 3) {
      const pr = cate1.child.find((e: any) => e.CategoryID === parentId);
      const it = pr.child.find((e: any) => e.CategoryID === id);
      it.CategoryName = e.target.value;
      setCategories(cate1);
    }
  };

  return (
    <Layout>
      <div className="level1">
        <input
          type="text"
          className="border rounded p-1"
          value={categories.CategoryName}
          onChange={(e) => handleChange(e, 1)}
        />
      </div>
      <div>
        {categories.child?.map((el: any, i: any) => {
          return (
            <div
              className="level2 relative"
              style={{ marginLeft: 100, marginTop: 20 }}
              key={i}
            >
              <input
                className="border rounded p-1 ms-[20px]"
                type="text"
                value={el.CategoryName}
                onChange={(e) => handleChange(e, 2, el.CategoryID)}
              />
              <div>
                {el.child?.map((e1: any, i1: any) => {
                  return (
                    <div
                      className="level3 relative"
                      style={{ marginLeft: 100, marginTop: 20 }}
                      key={i1}
                    >
                      <input
                        type="text"
                        className="border rounded p-1 ms-[20px]"
                        value={e1.CategoryName}
                        onChange={(e) =>
                          handleChange(e, 3, e1.CategoryID, el.CategoryID)
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-5">
        <button className="border px-3 py-1 rounded bg-[#1877f2] text-white">Save</button>
      </div>
    </Layout>
  );
}

export default Write;
