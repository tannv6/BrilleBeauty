import { debounce } from "@/lib/functions";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { ChangeEvent, Fragment, useContext, useEffect, useState } from "react";
import { CDN_URL } from "@/utils/constants";
import { signOut } from "next-auth/react";
import { DataDispatchContext, MyContext } from "@/pages/_app";
type Props = {
  brandListRecommended?: any[];
};
export default function Header({ brandListRecommended }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const value: any = useContext(MyContext);
  const dispatch: any = useContext(DataDispatchContext);
  const categoryList = JSON.parse(value?.category)?.data || [];
  const comboCategoryList = JSON.parse(value?.combo_category)?.data || [];
  const isLogin = value.isLogin;
  const webSetting = JSON.parse(value?.webSetting || "{}") || {};
  const banner_top = JSON.parse(value?.banner_top || "{}") || {};
  const cartCount = value?.cartCount || 0;

  const [brandList, setBrandList] = useState(brandListRecommended || []);

  const [searchTxt, setSearchTxt] = useState("");

  useEffect(() => {
    axios
      .get("/api/cart/count")
      .then((response) =>
        dispatch({
          type: "INIT_CART_COUNT",
          payload: response.data,
        })
      )
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  function handleKeyPress(e: any) {
    if (e.keyCode === 13) {
      router.push(`/search?search_txt=${searchTxt}`);
    }
  }

  const getRecommendedBrand = debounce(async (text) => {
    if (text) {
      const response = await axios.get("/api/brand/list", {
        params: { search: text },
      });
      setBrandList(response.data.data);
    } else {
      axios.get("/api/brand/recommended").then((response) => {
        setBrandList(response.data.data);
      });
    }
  }, 500);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    getRecommendedBrand(e.target.value);
  }

  useEffect(() => {
    if (!brandListRecommended) {
      axios.get("/api/brand/recommended").then((response) => {
        setBrandList(response.data.data);
      });
    }
  }, []);

  const handleLinkClick = async (e: any, BrandID: number) => {
    e.preventDefault();
    await axios.post("/api/brand/increase_hit", {
      CustomerID: 0,
      BrandID,
    });

    const href = e.target.getAttribute("href");
    router.push(href);
  };

  return (
    <div className="header container-main border-b border-gray-200">
      <div className="header_top flex justify-between items-center px-[120px] h-[120px] border-b border-gray-200">
        <div className="logo">
          <Link href={"/"}>
            <Image
              src={`${CDN_URL}${webSetting?.logos || ""}`}
              alt=""
              width={124}
              height={47}
            />
          </Link>
        </div>
        <div className="search-container flex items-center mx-5">
          <div className="relative">
            <input
              onChange={(e) => setSearchTxt(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e)}
              type="text"
              className="peer h-[35px] w-[615px] 2xl:w-[430px] rounded-full bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
            />
            <Image
              src="/search_ico.png"
              alt="Search"
              width={20}
              height={20}
              className="absolute right-0 top-1 mt-1 mb-1 mr-5 h-[20px] w-[20px]"
            />
          </div>
          {banner_top && banner_top.BannerImg && (
              <div className="img_sale ml-5">
                <Link
                  href={banner_top.BannerLink}
                  target={banner_top.OpenNewTab === 1 ? "_blank" : ""}
                  className="w-[218px] h-[64px] relative inline-block"
                >
                  <Image
                    src={`${CDN_URL}${banner_top.BannerImg}`}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </Link>
              </div>
            )}
        </div>
        <div className="header_right flex items-center">
          {isLogin ? (
            <button
              className="p-0 m-0 bg-[none]"
              onClick={() => signOut({ callbackUrl: "/", redirect: true })}
            >
              <div className="txt flex items-center">
                <p className=" text-18 tracking-wide text-gray-700">
                  {"Logout"}
                </p>
              </div>
            </button>
          ) : (
            <Link href={"/member/login"}>
              <div className="txt flex items-center">
                <p className=" text-18 tracking-wide text-gray-700">
                  {"Login"}
                </p>
              </div>
            </Link>
          )}
          <span className="m-0 mx-5">|</span>
          <Link href={isLogin ? "/account/aboutme" : "/member/register"}>
            <div className="txt flex items-center">
              <p className=" text-18 tracking-wide text-gray-700">
                {isLogin ? "My Account" : "Register"}
              </p>
            </div>
          </Link>
          <span className="m-0 mx-5">|</span>
          <div className="ico flex items-center custom-gap">
            <div className="ico_des">
              <Link
                href={`/account/mywishlist`}
                className="w-[41px] h-[40px] block relative"
              >
                <Image
                  src="/heart_ic.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </Link>
            </div>
            <div className="ico_des relative">
              <Link href="/cart" className="w-[41px] h-[40px] block relative">
                <Image
                  src="/cart_ic.png"
                  alt=""
                  fill
                  className="object-cover"
                />
                <p className="absolute bottom-[3px] right-[10px] text-[#f15981] text-[13px] font-bold">
                  {cartCount}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <nav className="relative gnb inner-container">
        <ul className="flex justify-center items-center h-[50px] font-medium">
          <li className="group px-[20px]">
            <p
              className={`text-18 tracking-wide leading-[50px] text-gray-700 select-none`}
            >
              Brands
            </p>
            <div className="absolute hidden top-[49px] left-1/2 transform -translate-x-1/2 bg-white w-full xl:w-[100vw] pb-[30px] group-hover:block z-[100] border-b boder-gray-200 border-t">
              <div className="inner-container">
                <div className="flex items-center justify-center mt-10">
                  <div className="flex items-center w-[783px] border-b border-black">
                    <input
                      type="text"
                      onChange={handleChange}
                      className="h-[60px] w-full p-5 text-[20px] text-[#999] outline-none"
                      placeholder="Please search for brands."
                    />
                    <button
                      type="button"
                      className="bg-[url('/search_ic.png')] w-[33px] h-[30px] cursor-pointer mr-4"
                    ></button>
                  </div>
                </div>
                <div className="flex items-center justify-center mt-[55px]">
                  <div className="w-full">
                    {/* <p className="text-[22px] text-[#252525] font-bold">Recommended search words</p> */}
                    <ul className="flex flex-wrap gap-[10px] mt-5">
                      {brandList?.map((e: any, i: any) => {
                        return (
                          <Link
                            onClick={(evt) => handleLinkClick(evt, e.BrandID)}
                            key={i}
                            className="p-[10px] h-[46px] bg-[#f4f5f7] rounded-[23px] flex items-center justify-center text-[16px] text-[#545454]"
                            href={`/search/brand/${e.BrandID}`}
                          >
                            #{e.BrandName}
                          </Link>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>

          {categoryList?.map((e: any, i: any) => {
            return (
              <Fragment key={i}>
                <li key={i} className="group px-[20px]">
                  <Link
                    className={`${
                      pathname?.slice(0) == `/products/category/${e.CategoryID}`
                        ? "gnb_active"
                        : ""
                    } text-18 tracking-wide leading-[50px] text-gray-700`}
                    href={`/products/category/${e.CategoryID}`}
                  >
                    {e.CategoryName}
                  </Link>
                  <div className="absolute hidden top-[49px] left-1/2 transform -translate-x-1/2 bg-white w-full xl:w-[100vw] pb-[30px] group-hover:block z-[100] border-b boder-gray-200 border-t">
                    <div className="inner-container flex justify-center gap-[80px] mt-[55px] whitespace-nowrap">
                      {e.child?.map((e1: any, i1: any) => {
                        return (
                          <div key={i1}>
                            <Link
                              href={`/products/category/${e.CategoryID}/${e1.CategoryID}`}
                            >
                              <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">
                                {e1.CategoryName}
                              </h3>
                            </Link>
                            {e1.child?.map((e2: any, i2: any) => {
                              return (
                                <Link
                                  key={i2}
                                  href={`/products/category/${e.CategoryID}/${e1.CategoryID}/${e2.CategoryID}`}
                                >
                                  <p
                                    key={i2}
                                    className="text-[18px] text-[#252525] leading-[35px] font-medium"
                                  >
                                    {e2.CategoryName}
                                  </p>
                                </Link>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </li>
              </Fragment>
            );
          })}

          <li className="group px-[20px]">
            <Link
              className={`${
                pathname === "/sales" ? "gnb_active" : ""
              } text-18 tracking-wide leading-[50px] text-gray-700`}
              href="/search/combo"
            >
              Combo
            </Link>
            <div className="absolute hidden top-[49px] left-1/2 transform -translate-x-1/2 bg-white w-full xl:w-[100vw] pb-[30px] group-hover:block z-[100] border-b boder-gray-200 border-t">
              <div className="inner-container flex gap-[70px] mt-[55px] justify-center">
                {comboCategoryList?.map((e: any, i: any) => {
                  return (
                    <Fragment key={i}>
                      <div>
                        <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">
                          {e.CategoryName}
                        </h3>
                        <div className="h-[247px]">
                        <Link href={`/combo/category/${e.CategoryID}`}>
                          <Image
                            src={`${CDN_URL}/${e.ThumbImage}`}
                            alt=""
                            width={250}
                            height={250}
                            style={{ height: '247px !important' }}
                          />
                        </Link>
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
                {/* <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">
                    Last Minute Sale{" "}
                  </h3>
                  <Link href="/search/combo">
                    <Image
                      src="/sale_img01.webp"
                      alt=""
                      width={250}
                      height={250}
                    />
                  </Link>
                </div>
                <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">
                    Clearance Sale
                  </h3>
                  <Link href="/search/combo">
                    <Image
                      src="/sale_img02.webp"
                      alt=""
                      width={250}
                      height={250}
                    />
                  </Link>
                </div>
                <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">
                    Value Set
                  </h3>
                  <Link href="/search/combo">
                    <Image
                      src="/sale_img03.webp"
                      alt=""
                      width={250}
                      height={250}
                    />
                  </Link>
                </div>
                <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">
                    Mini Size
                  </h3>
                  <Link href="/search/combo">
                    <Image
                      src="/sale_img04.webp"
                      alt=""
                      width={250}
                      height={250}
                    />
                  </Link>
                </div> */}
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
