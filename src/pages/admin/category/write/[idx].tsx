import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import axios from "axios";

export async function getServerSideProps(context: { params: any }) {
  const { params } = context;
  const { idx } = params;
  const data = await axios.get(`http://localhost:3000/api/category/detail`, { params: { idx } });
  return { props: { data: data.data } };
}

function Write({ data }: any) {
  const router = useRouter();

  console.log(data);

  useEffect(() => {
    axios.get(`/api/category/detail`, { params: { idx: router.query.idx } });
  }, [router.query.idx]);

  return <Layout>
    <input type="text" className="border" value={data.CategoryName} />
      {data.child?.map((e: any,i: any)=>{
        return <div style={{marginLeft: 200}} key={i}>
          <input className="border" type="text" value={e.CategoryName} />
          {e.child?.map((e1: any, i1: any)=>{
            return <div style={{marginLeft: 200}} key={i1}>
              <input type="text" className="border" value={e1.CategoryName} />
            </div>
          })}
        </div>
      })}
    </Layout>;
}

export default Write;
