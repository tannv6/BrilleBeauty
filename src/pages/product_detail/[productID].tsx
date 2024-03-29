import { useRef, useState } from "react";
import Layout from "@/components/Layout";
import SubNav from "@/components/SubNav";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';
import "@/app/globals.css";
import Dropdown from "@/components/Dropdown";
import ProductDetailNav from "@/components/ProductDetailNav";
import Image from "next/image";
import Pagi from "@/components/Pagi";
import Link from "next/link";
import axios from "axios";
import { parse } from "cookie";
import { getWebSetting } from "@/lib/functions";
import { getSession } from "next-auth/react";
import { log } from "console";
import he from "he";
import { Swiper as SwiperCore } from 'swiper/types';
import ReviewDetail from "../review_detail";

const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
export const getServerSideProps = async (context: { params: any, query : any, req: any}) => {

  
  const cookies = parse(context.req.headers.cookie || "");
  const { params, query} = context;
  const { productID, reviewID } = params;
  const productDetail = await axios.get(
    `http://localhost:3000/api/products/detail`,
    {
      params: { productID, query },
    }
  );

  const reviewDetail = await axios.get(
    `http://localhost:3000/api/review/details`,
    {
      params: { reviewID },
    }
  );




  const response = await axios.get("http://localhost:3000/api/products/category", {
    params: { cate_id: params.id2, depth: 3 },
});

  const result1 = await axios.get(
    "http://localhost:3000/api/option_types/list"
  );

  const result2 = await axios.get(
    "http://localhost:3000/api/option_types/detail"
  );

  return {
    props: {
    optionTypes: result1.data.data,
    optionTypes2: result2.data.data,
    review: reviewDetail.data,
    product: productDetail.data,
    productRelate: response.data,
      ...response.data,
      ...(await getWebSetting(cookies)),
    productID : productID,
    ...response.data,
    ...(await getWebSetting(cookies)),
    },
  };
};

export default function Face({ product, optionTypes, optionTypes2, productRelate, productID, review, ...props }: any) {
  const swiperRef = useRef<SwiperCore>();

  async function getUser() {
    const session = await getSession();
  
    return session;   
  }  

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [isHeart, setIsHeart] = useState<boolean>(true);
  const [NumProduct, setNumProduct] = useState<{ [key: number]: number }>({});

  const selectedOptionType = optionTypes.find((optionType: any) => optionType.PotID === product.PotID);

  const [dropdownState, setDropdownState] = useState({
    activeItem: product.ProductID || (optionTypes2.length > 0 ? optionTypes2[0]?.ProductID : null),
  });

  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: boolean }>({});

  const handleChange = (id: number) => {
    if (selectedOptions[id]) {
      alert("You have selected this option before!");
    } else {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        [id]: true,
      }));

      setDropdownState((prevOptions: any) => ({
        ...prevOptions,
        activeItem: id,
      }));

      setNumProduct((prevNumProducts) => ({
        ...prevNumProducts,
        [id]: 1, 
      }));

      
    }
  };

  const handleDeleteOption = (id: number) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [id]: false,
    }));

    setNumProduct((prevNumProducts) => {
      const updatedNumProducts = { ...prevNumProducts };
      delete updatedNumProducts[id];
      return updatedNumProducts;
    });
  };

  const updateNumProduct = (id: number, value: number) => {
    setNumProduct((prevNumProducts) => ({
      ...prevNumProducts,
      [id]: value,
    }));
  };

  const calculateNewPrice = (price: number, numProduct: number) => {
    return price * numProduct;
  };

  const totalOptionPrice = Object.keys(selectedOptions).reduce((total, optionId) => {
    if (selectedOptions[parseInt(optionId)]) {
      const option = optionTypes2.find((option: any) => option.PoID === parseInt(optionId));
      const optionPrice = option ? calculateNewPrice(option.PoInitPrice, NumProduct[option.PoID] || 1) : 0;
      return total + optionPrice;
    }
    return total;
  }, 0);

  const addCartOption = Object.keys(selectedOptions).map((optionId) => {
    if (selectedOptions[parseInt(optionId)]) {
      const option = optionTypes2.find((option: any) => option.PoID === parseInt(optionId));
      const optionElement = { 
        "PoID" : option.PoID,
        "PoNum" :  NumProduct[option.PoID] || 1
      };
      return optionElement;
    }
  });

  
  async function handleAddCart() {

    let options = JSON.stringify(addCartOption);
   
    if(!getUser()){
      alert("Please login!");
    }

    if(addCartOption.length <= 0 ){
      alert("Please choose option!");
      return;
    }

    const response = await axios.get("http://localhost:3000/api/cart/write", {
      params: { options: options, productID: productID },
    });

    if (response.status === 201) {
      alert("Add to cart successfully!");
      setSelectedOptions([]);
    }else{
      alert("Add to cart failed");
      return;
    }

  }

  const optionElements = optionTypes2
  .filter((option: any) => option.ProductID === product.ProductID)
  .map((option: any) => (
    selectedOptions[option.PoID] && (
      <div className="py-5" key={option.PoID}>
        <div className="flex items-center justify-between">
          <div className="max-w-[200px]">
            <p className="text-[#454545] min-w-[60px]">{option.PoName}</p>
          </div>
          <div className="flex flex-row">
            <button className="rounded-l w-[33px] h-[33px] bg-[url('/product_detail/product_number_desc_btn.png')]" onClick={() => { updateNumProduct(option.PoID, Math.max((NumProduct[option.PoID] || 1) - 1, 0)) }}></button>
            <input type="number" value={NumProduct[option.PoID] || 1} onChange={(e) => { updateNumProduct(option.PoID, Number(e.target.value)) }} className="pt-1 border border-x-0 text-center min-w-[46px] max-w-[46px] h-[33px] outline-0" />
            <button className="rounded-r w-[33px] h-[33px] bg-[url('/product_detail/product_number_asc_btn.png')]" onClick={() => { updateNumProduct(option.PoID, (NumProduct[option.PoID] || 1) + 1) }}></button>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-xl font-bold">{calculateNewPrice(option.PoInitPrice, NumProduct[option.PoID] || 1)}</p>
            <button className="rounded w-[33px] h-[33px] bg-[url('/product_detail/product_del_btn.png')]" onClick={() => handleDeleteOption(option.PoID)}></button>
          </div>
        </div>
      </div>
    )
  ));

  const productImages = product.Images;
  

  return (
      <Layout {...props}>
        <div id="main">
          <SubNav title1={product.ProductName}/>
          <div className="inner-container mt-[70px] mb-[60px]">
            <div className="flex flex-row justify-between">
              <div className="basis-[556px]">
              
                <Swiper
                  className="w-[556px] select-none"
                  loop={true}
                  slidesPerView={1}
                  modules={[Thumbs, Autoplay]}
                  thumbs={{ swiper: thumbsSwiper }}
                >
                    {productImages.map((image: any, index: number) => (
                      <SwiperSlide key={index}>
                        <div>
                          <Image src={`${CDN_URL}${image.ImageURL}`} alt="" width={556} height={555} />
                        </div>
                      </SwiperSlide>
                    ))}

                </Swiper>
                <div className="mt-[10px] mx-auto">
                  <Swiper
                    className="w-[556px] select-none swiper_two"
                    modules={[Thumbs]}
                    watchSlidesProgress
                    onSwiper={setThumbsSwiper}
                    slidesPerView={5}
                    spaceBetween={10} >
                    {productImages.map((image: any, index: number) => {     
                      return (  
                        <SwiperSlide key={index}>
                          <div>
                            <Image src={`${CDN_URL}${image.ImageURL}`} alt="" width={556} height={555} />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
              <div className="basis-[580px] flex flex-col">
                <div className="pb-5">
                  <p className="text-[32px] font-bold">{product.ProductName}
                  </p>
                  <p className="pt-2">
                    <span className="text-[28px] font-bold text-[#ef426f]">A${product.InitPrice}</span>
                    <span className="line-through text-lg text-[#999999] pl-3">A${product.SellPrice}</span>
                  </p>
                </div>
                <hr />
                {/* <div className="py-5">
                  <p className="flex">
                    <span className="text-lg min-w-[190px]">Color</span>
                    <span className="text-lg text-[#757575]">Orange</span>
                  </p>
                  <p className="flex pt-4">
                    <span className="text-lg min-w-[190px]">Version</span>
                    <span className="text-lg text-[#757575]">2022 Version</span>
                  </p>
                </div>
                <hr /> */}
                <div className="py-5">
                  <p className="flex">
                    <span className="text-lg min-w-[190px]">Product Highlight</span>
                    {/* <span className="text-lg text-[#757575]">{product.Description}</span> */}
                  </p>
                </div>
                <hr />
                <div className="py-5">
                    <div className="flex items-center">
                      <span className="text-lg min-w-[190px]">
                        {selectedOptionType && (
                          <span>{selectedOptionType.PotName}</span>
                        )}
                      </span>
                      <Dropdown
                        className="w-[397px] text-[#757575]"
                        options={optionTypes2
                          .filter((option: any) => option.ProductID === product.ProductID)
                          .map((option: any) => ({
                            id: option.PoID,
                            name: option.PoName,
                          }))
                        }
                        onChange={(id: number) => handleChange(id)}
                        activeItem={dropdownState.activeItem}
                      />
                    </div>
                  </div>
                <hr />
                <>
                {optionElements}
                </>
                <hr />
                <div className="pt-5">
                  <div className="flex justify-between items-center">
                    <p>
                      <span className="text-lg">Total</span>
                      <span className="text-[#757575] pl-1">(Quantity)</span>
                    </p>
                    <p className="text-[28px] font-bold text-[#ef426f]">
                      {Object.keys(selectedOptions).length === 0 ? `A$${product.InitPrice}` : ` A$${totalOptionPrice}`}
                    </p>
                  </div>
                  <div className="flex gap-3 pt-5">
                    <button
                      className={`w-14 h-14 shrink-0 rounded ${isHeart ? "bg-[url('/product_detail/product_heart_on_btn.png')]" : "bg-[url('/product_detail/product_heart_btn.png')]"}`}
                      onClick={() => { setIsHeart(!isHeart) }}
                    >
                    </button>                 
                    <button type="button" onClick={() => handleAddCart()} className="basis-full rounded border border-[#252525]">Add To Cart</button>
                    <button className="basis-full rounded bg-[#ef426f] text-[#ffffff]">Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
            <div id="product_in4" className="mt-[175px] mb-[60px]">
              <ProductDetailNav tab="1"></ProductDetailNav>
            </div>
            <div className="justify-center" dangerouslySetInnerHTML={{ __html: he.decode(product.Description) }} />
            <div id="product_rvw" className="mt-[120px] mb-[60px]">
              <ProductDetailNav tab="2"></ProductDetailNav>
            </div>
            <div className="">
              <div className="flex justify-between pb-5">
                <p className="text-xl">
                  <span className="font-bold">PRODUCT REVIEWS</span>
                  <span className="text-[#757575]">(12)</span>
                </p>
                <Link href={`/write_review?ProductID=${product.ProductID}`}>
                  <button className="w-[130px] h-[35px] border border-[#ef426f] rounded text-[#ef426f] font-medium">Write review</button>
                </Link>
              </div>
              <hr />

              <div className="">
                      <div className="py-5 flex flex-row">
                        <div className="flex flex-col basis-[80%] ml-5 gap-y-3">
                          <div className="flex gap-0.5">
                            <i className="w-[17px] h-[17px] bg-[url('/product_detail/comment_star_ico_on.png')]"></i>
                            <i className="w-[17px] h-[17px] bg-[url('/product_detail/comment_star_ico_on.png')]"></i>
                            <i className="w-[17px] h-[17px] bg-[url('/product_detail/comment_star_ico_on.png')]"></i>
                            <i className="w-[17px] h-[17px] bg-[url('/product_detail/comment_star_ico_on.png')]"></i>
                            <i className="w-[17px] h-[17px] bg-[url('/product_detail/comment_star_ico_off.png')]"></i>
                          </div>
                          <p className="text-xl font-medium"></p>
                          <p className="text-[#999999]">
                            CONTOUR POWDER
                          </p>
                          <p>
                            <span className="font-medium text-[17px]">uwa***</span>
                            <span className="text-[15px] text-[#999999] pl-3">
                            Ive been absolutely obsessed with this lip stain lately. 16 Baked...
                              </span>
                          </p>
                          <div className="flex gap-[10px]">
                            <div className="w-[110px] h-[110px] bg-[#eeeeee] rounded-[5px]">
                            
                              </div>
                            <div className="w-[110px] h-[110px] bg-[#eeeeee] rounded-[5px]"></div>
                          </div>
                          <div className="flex gap-[10px]">
                            <button className="w-[140px] h-[36px] bg-[url('/product_detail/comment_show_btn.png')] rounded-[5px] text-[15px] text-[#757575] pl-3 pt-0.5">COMMENT</button>
                            <button className="w-[140px] h-[36px] rounded-[5px] text-[15px] text-[#757575] border">WRITE COMMENT</button>
                          </div>
                        </div>
                        <div className="flex basis-[20%] items-start justify-end gap-[10px]">
                          <button className="w-[100px] h-7 text-[15px] text-[#999999] border rounded">EDIT</button>
                          <button className="w-[100px] h-7 text-[15px] text-[#999999] border rounded">DELETE</button>
                        </div>
                      </div>
                <hr />
                <div className="flex items-center justify-center h-[123px] bg-[#f9f9f9] border-b">
                  <div className="flex w-[1131px] h-[82px]">
                    <textarea placeholder="Please enter your comment." className="focus:outline-none placeholder:text-lg p-5 pt-3 border rounded-l-[5px] grow resize-none" />
                    <button className="w-[120px] rounded-r bg-[#ef426f] text-lg text-[#ffffff]">OK</button>
                  </div>
                </div>
              </div>

              <Pagi></Pagi>

            </div>
            <div id="product_rlt" className="mt-[120px] mb-[60px]">
              <ProductDetailNav tab="3"></ProductDetailNav>
            </div>
            <p className="text-xl mb-[30px] font-bold">RELATED PRODUCTS</p>
            <div className="relative">
                <Swiper className="select-none"
                    modules={[Autoplay]}
                    slidesPerView={5}
                    spaceBetween={20}
                    loop={true}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: true,
                    }}
                >
                  {productRelate.data.map((e: any, i: any) => {
                                      return (
                                          <>
                                          <SwiperSlide key={i}>
                                              <div className="flex flex-col">
                                                  <Image src={`${CDN_URL}${e.ProductImage || ""}`} width={224} height={225} alt="1"></Image>
                                                  <p className="font-bold pt-4">{e.ProductName}</p>
                                                  <p className="pt-1">
                                                      <span className="line-through text-[15px] text-[#bbbbbb]">{e.InitPrice}</span>
                                                      <span className="pl-2 text-lg">{e.SellPrice}</span>
                                                      <span className="pl-4 text-xl text-[#fe3a40]"></span>
                                                  </p>
                                                  <div className="flex items-center gap-[26px] pt-1.5">
                                                      <div className="flex items-center gap-1">
                                                          <Image className="pb-1" src="/product_rlt_star_ico.png" width={16} height={16} alt=""></Image>
                                                          <span className="text-[14px] font-bold"></span>
                                                          <span className="text-[14px] text-[#999999]"></span>
                                                      </div>
                                                      <div className="flex items-center gap-1.5">
                                                          <Image src="/product_rlt_heart_ico.png" width={15} height={12} alt=""></Image>
                                                          <span className="text-[14px] text-[#555555]"></span>
                                                      </div>
                                                  </div>
                                              </div>
                                          </SwiperSlide>
                                          </>
                                      );
                                  })}
                    </Swiper>
                <button className="absolute top-1/4 left-[-56px] w-[36px] h-[37px] bg-[url('/product_rlt_arrow_prev.png')]" onClick={() => swiperRef.current?.slidePrev()}></button>
                <button className="absolute top-1/4 right-[-56px] w-[36px] h-[37px] bg-[url('/product_rlt_arrow_next.png')]" onClick={() => swiperRef.current?.slideNext()}></button>
            </div>
          </div>
        </div>
      </Layout>
  );
}
