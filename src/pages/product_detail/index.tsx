import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Layout from "@/components/Layout";

export const getServerSideProps: GetServerSideProps<{
  list: string;
}> = async () => {
  return { props: { list: "List products!" } };
};

export default function Product_detail({
  list,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <ul >{list}</ul>
    </Layout>
  );
}
