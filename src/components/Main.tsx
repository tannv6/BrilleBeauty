/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { useEffect } from 'react';
import Swiper from 'swiper';

import 'swiper/swiper-bundle.css';
import Product from "./Product";
import Image from "next/image";

export default function Main() {
    useEffect(() => {
        const mySwiper = new Swiper('.swiper-container', {
          slidesPerView: 4,
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 3000, 
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
    
        return () => {
          mySwiper.destroy();
        };
      }, []);
    return <div className='container-main'>
        <div className="main_visual w-full h-[663px] bg-cover bg-[url('/main_visual_img.png')] ">
        </div>    
        <div className="inner-container">
            <div className="main_banner flex custom-gap-30 my-6">
                <div className="banner_img">
                    <Image src="/banner_img01.png" alt="" width={100} height={100} />
                </div>
                <div className="banner_img">
                    <Image src="/banner_img02.png" alt="" width={100} height={100} />
                </div>
            </div>
            <div className="main_ttl text-center">
                <p className="text-22 tracking-wide leading-8 uppercase text-gray-700 font-bold mb-2.5">BEAUTY COLLECTION </p>
                <span className="text-18 tracking-wide leading-5 text-gray-500">Shop By Category</span>
            </div>
            <Product />
            <div className="btn flex items-center justify-center mt-[45px]">
                <button type="button" className="btn_more py-[15px] px-[65px] text-[#f15981] text-18 border-[#f15981] border-[1px] rounded-md transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76">
                    See More
                </button>
            </div>
            <div className="my-[80px]">
                <Image src="/banner_img03.png" alt="" width={100} height={100} />
            </div>
            <div className="main_ttl text-center">
                <p className="text-22 tracking-wide leading-8 uppercase text-gray-700 font-bold mb-2.5">SALE </p>
                <span className="text-18 tracking-wide leading-5 text-gray-500">Shop By Category</span>
            </div>
            <Product />
            <div className="btn flex items-center justify-center mt-[45px]">
                <button type="button" className="btn_more py-[15px] px-[65px] text-[#f15981] text-18 border-[#f15981] border-[1px] rounded-md transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76">
                    See More
                </button>
            </div>
            <div className="main_ttl text-center mt-[100px]">
                <p className="text-22 tracking-wide leading-8 uppercase text-gray-700 font-bold mb-2.5">Review Board </p>
                <span className="text-18 tracking-wide leading-5 text-gray-500">Write a review and get 10 points</span>
            </div>
            <div className="swiper-container relative overflow-hidden mt-[45px] mb-[115px]">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <div className="popular_product_element relative">
                            <div className="thumbnail relative">
                                <Image className="thumb_image w-[283px] h-[283px] object-cover" src="/review_img01.png" alt="" width={100} height={100} />
                            </div>
                            <div className="product_props flex flex-col gap-4 px-5 py-5 border-[#dbdbdb] border-[1px] border-t-0">
                                <div className="flex items-center gap-2">
                                    <Image className="icon_star" src="/start_ic.png" alt="" width={100} height={100} />
                                    <Image className="icon_star" src="/start_ic.png" alt="" width={100} height={100} />
                                    <Image className="icon_star" src="/start_ic.png" alt="" width={100} height={100} />
                                    <Image className="icon_star" src="/start_ic.png" alt="" width={100} height={100} />
                                    <Image className="icon_star" src="/start_g_ic.png" alt="" width={100} height={100} />
                                </div>
                                    <div className="text-[17px] color-25 font-bold white-space-nowrap overflow-hidden text-ellipsis line-height-21 line-clamp-1">
                                        Contour Powder 
                                    </div>
                                    <div className="text-[16px] text-[#999] white-space-nowrap overflow-hidden text-ellipsis line-clamp-2 line-height-36">
                                    Ive been absolutely obsessed with this lip stain lately. 16 Baked 
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-[#999]">wls****</span>
                                        <span className="text-[13] text-[#999]">2020.08.11</span>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="popular_product_element relative">
                            <div className="thumbnail relative">
                                <Image className="thumb_image w-[283px] h-[283px] object-cover" src="/review_img02.png" alt="" width={100} height={100} />
                            </div>
                            <div className="product_props flex flex-col gap-4 px-5 py-5 border-[#dbdbdb] border-[1px] border-t-0">
                                <div className="flex items-center gap-2">
                                    <Image className="icon_star" src="/start_ic.png" alt="" width={100} height={100} />
                                    <Image className="icon_star" src="/start_ic.png" alt="" width={100} height={100} />
                                    <Image className="icon_star" src="/start_ic.png" alt="" width={100} height={100} />
                                    <Image className="icon_star" src="/start_ic.png" alt="" width={100} height={100} />
                                    <Image className="icon_star" src="/start_g_ic.png" alt="" width={100} height={100} />
                                </div>
                                    <div className="text-[17px] color-25 font-bold white-space-nowrap overflow-hidden text-ellipsis line-height-21 line-clamp-1">
                                        Contour Powder 
                                    </div>
                                    <div className="text-[16px] text-[#999] white-space-nowrap overflow-hidden text-ellipsis line-clamp-2 line-height-36">
                                    Ive been absolutely obsessed with this lip stain lately. 16 Baked 
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-[#999]">wls****</span>
                                        <span className="text-[13] text-[#999]">2020.08.11</span>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="popular_product_element relative">
                            <div className="thumbnail relative">
                                <Image className="thumb_image w-[283px] h-[283px] object-cover" src="/review_img03.png" alt="" width={100} height={100} />
                            </div>
                            <div className="product_props flex flex-col gap-4 px-5 py-5 border-[#dbdbdb] border-[1px] border-t-0">
                                <div className="flex items-center gap-2">
                                    <Image className="icon_star" src="/start_ic.png" alt="" width={100} height={100} />
                                    <Image className="icon_star" src="/start_ic.png" alt="" width={100} height={100} />
                                    <Image className="icon_star" src="/start_ic.png" alt="" width={100} height={100} />
                                    <Image className="icon_star" src="/start_ic.png" alt="" width={100} height={100} />
                                    <Image className="icon_star" src="/start_g_ic.png" alt="" width={100} height={100} />
                                </div>
                                    <div className="text-[17px] color-25 font-bold white-space-nowrap overflow-hidden text-ellipsis line-height-21 line-clamp-1">
                                        Contour Powder 
                                    </div>
                                    <div className="text-[16px] text-[#999] white-space-nowrap overflow-hidden text-ellipsis line-clamp-2 line-height-36">
                                    Ive been absolutely obsessed with this lip stain lately. 16 Baked 
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-[#999]">wls****</span>
                                        <span className="text-[13] text-[#999]">2020.08.11</span>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="popular_product_element relative">
                            <div className="thumbnail relative">
                                <Image className="thumb_image w-[283px] h-[283px] object-cover" src="/review_img04.png" alt="" width={100} height={100} />
                            </div>
                            <div className="product_props flex flex-col gap-4 px-5 py-5 border-[#dbdbdb] border-[1px] border-t-0">
                                <div className="flex items-center gap-2">
                                    <Image className="icon_star" src="/start_ic.png" alt="" width={100} height={100} />
                                    <Image className="icon_star" src="/start_ic.png" alt="" width={100} height={100} />
                                    <Image className="icon_star" src="/start_ic.png" alt="" width={100} height={100} />
                                    <Image className="icon_star" src="/start_ic.png" alt="" width={100} height={100} />
                                    <Image className="icon_star" src="/start_g_ic.png" alt="" width={100} height={100} />
                                </div>
                                    <div className="text-[17px] color-25 font-bold white-space-nowrap overflow-hidden text-ellipsis line-height-21 line-clamp-1">
                                        Contour Powder 
                                    </div>
                                    <div className="text-[16px] text-[#999] white-space-nowrap overflow-hidden text-ellipsis line-clamp-2 line-height-36">
                                    Ive been absolutely obsessed with this lip stain lately. 16 Baked 
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-[#999]">wls****</span>
                                        <span className="text-[13] text-[#999]">2020.08.11</span>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="popular_product_element relative">
                            <div className="thumbnail relative">
                                <Image className="thumb_image w-[289px] h-[294px] object-cover rounded-16" src="/product_img01.png" alt="" width={100} height={100} />
                                <div className="product_types absolute bottom-5 left-5 flex flex-col gap-2">
                                <span className="ico">
                                    <Image src="/sale_ic.png" alt="" width={100} height={100} />
                                </span>
                                <span className="ico">
                                    <Image src="/new_ic.png" alt="" width={100} height={100} />
                                </span>
                                </div>
                            </div>
                            <div className="product_props flex flex-col gap-4 mt-4">
                                <div className="product_name text-lg color-25 font-bold white-space-nowrap overflow-hidden text-ellipsis line-height-36 min-h-14">
                                Damage Care Perfect Serum Original (New) - 80ml
                                </div>
                                    <div className="product_prices flex items-center">
                                    <span className="cost text-base line-through color-b ml-2 mr-1.5">A$19.65</span>
                                    <span className="promotional text-xl color-25 font-medium">A$16.25</span>
                                    <span className="discount text-red-600 font-semibold text-2xl ml-2">10% </span>
                                </div>
                                <div className="product_props_bot flex items-center">
                                    <Image className="icon_star" src="/start_ic.png" alt="" width={100} height={100} />
                                    <span className="star_num text-base color-25 mx-2">5.00</span>
                                    <span className="num_of_people text-base text-zinc-500 ml-1 mr-7">(31)</span>
                                    <span className="num_of_heart text-22 flex items-center gap-2.5">
                                        <Image src="/heart_ic_main.png" alt="" width={100} height={100} />
                                        <span className="like_cnt text-gray-700">11</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div> */}
            </div>
        </div>
    </div>
  }