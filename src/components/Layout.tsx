import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/globals.css";
import MainPopup from "./MainPopup";
import { useContext } from "react";
import { MyContext } from "@/pages/_app";

export type WebSetting = {
  idx: any;
  site_name: any;
  domain_url: any;
  admin_name: any;
  admin_email: any;
  browser_title: any;
  meta_tag: any;
  meta_keyword: any;
  home_name: any;
  home_name_en: any;
  store_service01: any;
  store_service02: any;
  zip: any;
  addr1: any;
  addr2: any;
  comnum: any;
  mall_order: any;
  com_owner: any;
  info_owner: any;
  custom_phone: any;
  fax: any;
  sms_phone: any;
  email: any;
  munnote_code: any;
  logos: any;
  bank_user: any;
  banks: any;
  bank_account: any;
  ssl_chk: any;
  language: any;
  buytext: any;
  trantext: any;
  og_title: any;
  og_des: any;
  og_url: any;
  og_site: any;
  og_img: any;
  favico_img: any;
  naver_verfct: any;
  google_verfct: any;
  logo_footer: any;
  sms_id: any;
  sms_key: any;
  npay_but_key: any;
  npay_shop_id: any;
  npay_certikey: any;
  counsel1: any;
  counsel2: any;
  auto_grade: any;
  use_mem1: any;
  logo_adm: any;
  app_name: any;
  app_tooltip: any;
  app_img: any;
  app_img_70_70: any;
  app_img_150_150: any;
  app_img_310_150: any;
  app_img_310_310: any;
  m_date: any;
};

type Props = {
  children?: any;
};

function Layout({ children }: Props) {
  const value: any = useContext(MyContext);
  const webSetting: WebSetting = JSON.parse(value?.webSetting || "{}") || {};
  return (
    <>
      <Head>
        <title>{webSetting?.browser_title || "BrilleBeauty"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content={webSetting?.og_des || "BrilleBeauty"}
        />
        <meta charSet="UTF-8" />
        <meta
          name="keywords"
          content={webSetting?.meta_keyword || "BrilleBeauty"}
        />
        <meta
          name="author"
          content={webSetting?.meta_keyword || "BrilleBeauty"}
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta httpEquiv="content-language" content="us" />
        <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
        <meta
          property="og:title"
          content={webSetting?.browser_title || "BrilleBeauty"}
        />
        <meta
          property="og:description"
          content={webSetting?.og_des || "BrilleBeauty"}
        />
        <meta property="og:image" content={webSetting?.og_img} />
        <meta property="og:url" content={webSetting?.og_url} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content={webSetting?.og_img} />
        <meta
          name="twitter:title"
          content={webSetting?.browser_title || "BrilleBeauty"}
        />
        <meta
          name="twitter:description"
          content={webSetting?.og_des || "BrilleBeauty"}
        />
        <meta name="twitter:image" content={webSetting?.og_img} />
        <link rel="canonical" href={webSetting?.domain_url} />
      </Head>

      <Header />

      {children}
      <MainPopup />

      <Footer />
    </>
  );
}

export default Layout;
