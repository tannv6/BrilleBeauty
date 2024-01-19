import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/globals.css";

function Layout({ children }: any) {
  return (
    <div>
      <Head>
        <title>BrilleBeauty</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="BrilleBeauty" />
      </Head>

      <Header />

      {children}

      <Footer />
    </div>
  );
}

export default Layout;