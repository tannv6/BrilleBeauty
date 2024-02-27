import React, { useState } from "react";
import Layout from "../components/Layout";
import connectDB from "@/app/db";
export const getServerSideProps = async () => {
  const connect = await connectDB();
  const sql = "select * from homeset where idx = 1";
  const [result] = await connect.execute(sql);
  return {
    props: {
      data: Array.isArray(result) ? result[0] : {},
    },
  };
};
function WebInfo({ data }: any) {
  const [info, setInfo] = useState<{
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
  }>({
    idx: data?.idx,
    site_name: data?.site_name,
    domain_url: data?.domain_url,
    admin_name: data?.admin_name,
    admin_email: data?.admin_email,
    browser_title: data?.browser_title,
    meta_tag: data?.meta_tag,
    meta_keyword: data?.meta_keyword,
    home_name: data?.home_name,
    home_name_en: data?.home_name_en,
    store_service01: data?.store_service01,
    store_service02: data?.store_service02,
    zip: data?.zip,
    addr1: data?.addr1,
    addr2: data?.addr2,
    comnum: data?.comnum,
    mall_order: data?.mall_order,
    com_owner: data?.com_owner,
    info_owner: data?.info_owner,
    custom_phone: data?.custom_phone,
    fax: data?.fax,
    sms_phone: data?.sms_phone,
    email: data?.email,
    munnote_code: data?.munnote_code,
    logos: data?.logos,
    bank_user: data?.bank_user,
    banks: data?.banks,
    bank_account: data?.bank_account,
    ssl_chk: data?.ssl_chk,
    language: data?.language,
    buytext: data?.buytext,
    trantext: data?.trantext,
    og_title: data?.og_title,
    og_des: data?.og_des,
    og_url: data?.og_url,
    og_site: data?.og_site,
    og_img: data?.og_img,
    favico_img: data?.favico_img,
    naver_verfct: data?.naver_verfct,
    google_verfct: data?.google_verfct,
    logo_footer: data?.logo_footer,
    sms_id: data?.sms_id,
    sms_key: data?.sms_key,
    npay_but_key: data?.npay_but_key,
    npay_shop_id: data?.npay_shop_id,
    npay_certikey: data?.npay_certikey,
    counsel1: data?.counsel1,
    counsel2: data?.counsel2,
    auto_grade: data?.auto_grade,
    use_mem1: data?.use_mem1,
    logo_adm: data?.logo_adm,
    app_name: data?.app_name,
    app_tooltip: data?.app_tooltip,
    app_img: data?.app_img,
    app_img_70_70: data?.app_img_70_70,
    app_img_150_150: data?.app_img_150_150,
    app_img_310_150: data?.app_img_310_150,
    app_img_310_310: data?.app_img_310_310,
  });
  return <Layout></Layout>;
}

export default WebInfo;
