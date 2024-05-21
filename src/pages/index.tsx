import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Layout from "@/components/Layout";
import Main from "@/components/Main";
import axios from "axios";
export const getServerSideProps: GetServerSideProps<{
  main_visual: any[];
  after_main_visual: any[];
  main_middle: any;
}> = async (context: any) => {
  const { req } = context;

  const response = await axios.get(
    "http://localhost:3000/api/banners/get_by_position",
    {
      params: { position: "main_visual", count: 3 },
    }
  );
  const response1 = await axios.get(
    "http://localhost:3000/api/banners/get_by_position",
    {
      params: { position: "after_main_visual", count: 2 },
    }
  );
  const response2 = await axios.get(
    "http://localhost:3000/api/banners/get_by_position",
    {
      params: { position: "main_middle", count: 1 },
    }
  );
  const response3 = await axios.get(
    "http://localhost:3000/api/products/main_product",
    {
      params: { page: 1, pageSize: 8, type: "IsBest" },
    }
  );
  const response4 = await axios.get(
    "http://localhost:3000/api/products/main_product",
    {
      params: { page: 1, pageSize: 8, type: "IsNew" },
    }
  );
  const response5 = await axios.get(
    "http://localhost:3000/api/products/main_product",
    {
      params: { page: 1, pageSize: 8, type: "IsBigSale" },
    }
  );

  const response6 = await axios.get(
    "http://localhost:3000/api/banners/get_by_position",
    {
      params: { position: "middle", count: 1 },
    }
  );

  const response7 = await axios.get("http://localhost:3000/api/combo/list");

  const reviewDetail = await axios.get(
    `http://localhost:3000/api/review/list`,
    {
      params: { page: 1, pageSize: 12 },
    }
  );

  const response8 = await axios.get(
    "http://localhost:3000/api/combo/main_page_display"
  );

  const response9 = await axios.get(
    "http://localhost:3000/api/category/main_page_display"
  );

  return {
    props: {
      main_visual: response.data,
      after_main_visual: response1.data,
      main_middle: response2.data[0] || null,
      middle: response6.data[0] || null,
      best_main: response3.data,
      new_main: response4.data,
      sale_main: response5.data,
      combo: response7.data,
      review: reviewDetail.data,
      comboMain: response8.data,
      categoryMain: response9.data,
    },
  };
};

export default function Page({
  main_visual,
  combo,
  after_main_visual,
  main_middle,
  best_main,
  new_main,
  sale_main,
  review,
  middle,
  comboMain,
  categoryMain,
}: any) {
  return (
    <Layout>
      <Main
        main_visual={main_visual}
        combo={combo}
        after_main_visual={after_main_visual}
        main_middle={main_middle}
        best_main={best_main}
        new_main={new_main}
        sale_main={sale_main}
        review={review}
        middle={middle}
        comboMain={comboMain}
        categoryMain={categoryMain}
      />
    </Layout>
  );
}
