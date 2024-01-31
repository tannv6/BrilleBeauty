import Layout from "@/components/Layout";
import MypageNav from "@/components/MypageNav";
import SubNav from "@/components/SubNav";
import Link from "next/link";

export default function Account() {
  return (
    <>
      <Layout>
        <div id="main">
          <SubNav title1="My Account" />
          <div className="inner-container mt-[75px] mb-[200px]">
            <div className="flex flex-row gap-[60px]">
              <MypageNav></MypageNav>
              <div className="grow grid grid-cols-2 gap-x-[40px] gap-y-[55px] mt-[62px]">
                <Link href="/account/aboutme" className="border rounded-[30px] flex flex-col items-center justify-center gap-2">
                  <p className="flex items-center justify-center gap-3">
                    <i className="w-[26px] h-[26px] bg-[url('/account/aboutme_ico.png')]"></i>
                    <span className="text-xl">About Me</span>
                  </p>
                  <p className="text-[#757575]">Manage account profile and personal information.</p>
                </Link>
                <Link href="/account/myorders" className="border rounded-[30px] flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-center gap-3">
                    <i className="w-[27px] h-[24px] bg-[url('/account/myorders_ico.png')]"></i>
                    <span className="text-xl">My Orders</span>
                  </div>
                  <p className="text-[#757575]">Track and trace order status and history.</p>
                </Link>
                <Link href="/account/myaddresses" className="border rounded-[30px] flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-center gap-3">
                    <i className="w-[22px] h-[28px] bg-[url('/account/myaddresses_ico.png')]"></i>
                    <span className="text-xl">My Addresses</span>
                  </div>
                  <p className="text-[#757575]">Manage shipping address and billing address.</p>
                </Link>
                <Link href="/account/mywishlist" className="border rounded-[30px] flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center justify-center gap-3">
                    <i className="w-[26px] h-[23px] bg-[url('/account/mywishlist_ico.png')]"></i>
                    <span className="text-xl">My Wish List</span>
                  </div>
                  <p className="text-[#757575]">Manage and track your favorite products.</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
