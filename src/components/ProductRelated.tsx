import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Thumbs } from 'swiper/modules';
import { Swiper as SwiperCore } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/thumbs';
import Image from "next/image";

export default function ProductRelated({ 
    image,
    name, 
    oriPrice,
    salePrice,
    discount,
    star,
    starCount,
    heartCount,
}: any) {
    const swiperRef = useRef<SwiperCore>();
    return (
        <>
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
                    <SwiperSlide>
                        <div className="flex flex-col">
                            <Image src={image} width={224} height={225} alt="1"></Image>
                            <p className="font-bold pt-4">{name}</p>
                            <p className="pt-1">
                                <span className="line-through text-[15px] text-[#bbbbbb]">{oriPrice}</span>
                                <span className="pl-2 text-lg">{salePrice}</span>
                                <span className="pl-4 text-xl text-[#fe3a40]">  {discount}</span>
                            </p>
                            <div className="flex items-center gap-[26px] pt-1.5">
                                <div className="flex items-center gap-1">
                                    <Image className="pb-1" src="/product_rlt_star_ico.png" width={16} height={16} alt=""></Image>
                                    <span className="text-[14px] font-bold">{star}</span>
                                    <span className="text-[14px] text-[#999999]">({starCount})</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Image src="/product_rlt_heart_ico.png" width={15} height={12} alt=""></Image>
                                    <span className="text-[14px] text-[#555555]">{heartCount}</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    {/* <SwiperSlide>
                        <div className="flex flex-col">
                            <Image src="/product_rlt_img_01.png" width={224} height={225} alt="1"></Image>
                            <p className="font-bold pt-4">Damage Care Perfect Serum Original (New) - 80ml</p>
                            <p className="pt-1">
                                <span className="line-through text-[15px] text-[#bbbbbb]">A$19.65</span>
                                <span className="pl-2 text-lg">A$16.25</span>
                                <span className="pl-4 text-xl text-[#fe3a40]">10%</span>
                            </p>
                            <div className="flex items-center gap-[26px] pt-1.5">
                                <div className="flex items-center gap-1">
                                    <Image className="pb-1" src="/product_rlt_star_ico.png" width={16} height={16} alt=""></Image>
                                    <span className="text-[14px] font-bold">4.7</span>
                                    <span className="text-[14px] text-[#999999]">(150)</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Image src="/product_rlt_heart_ico.png" width={15} height={12} alt=""></Image>
                                    <span className="text-[14px] text-[#555555]">764</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex flex-col">
                            <Image src="/product_rlt_img_01.png" width={224} height={225} alt="1"></Image>
                            <p className="font-bold pt-4">Damage Care Perfect Serum Original (New) - 80ml</p>
                            <p className="pt-1">
                                <span className="line-through text-[15px] text-[#bbbbbb]">A$19.65</span>
                                <span className="pl-2 text-lg">A$16.25</span>
                                <span className="pl-4 text-xl text-[#fe3a40]">10%</span>
                            </p>
                            <div className="flex items-center gap-[26px] pt-1.5">
                                <div className="flex items-center gap-1">
                                    <Image className="pb-1" src="/product_rlt_star_ico.png" width={16} height={16} alt=""></Image>
                                    <span className="text-[14px] font-bold">4.7</span>
                                    <span className="text-[14px] text-[#999999]">(150)</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Image src="/product_rlt_heart_ico.png" width={15} height={12} alt=""></Image>
                                    <span className="text-[14px] text-[#555555]">764</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex flex-col">
                            <Image src="/product_rlt_img_01.png" width={224} height={225} alt="1"></Image>
                            <p className="font-bold pt-4">Damage Care Perfect Serum Original (New) - 80ml</p>
                            <p className="pt-1">
                                <span className="line-through text-[15px] text-[#bbbbbb]">A$19.65</span>
                                <span className="pl-2 text-lg">A$16.25</span>
                                <span className="pl-4 text-xl text-[#fe3a40]">10%</span>
                            </p>
                            <div className="flex items-center gap-[26px] pt-1.5">
                                <div className="flex items-center gap-1">
                                    <Image className="pb-1" src="/product_rlt_star_ico.png" width={16} height={16} alt=""></Image>
                                    <span className="text-[14px] font-bold">4.7</span>
                                    <span className="text-[14px] text-[#999999]">(150)</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Image src="/product_rlt_heart_ico.png" width={15} height={12} alt=""></Image>
                                    <span className="text-[14px] text-[#555555]">764</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex flex-col">
                            <Image src="/product_rlt_img_01.png" width={224} height={225} alt="1"></Image>
                            <p className="font-bold pt-4">Damage Care Perfect Serum Original (New) - 80ml</p>
                            <p className="pt-1">
                                <span className="line-through text-[15px] text-[#bbbbbb]">A$19.65</span>
                                <span className="pl-2 text-lg">A$16.25</span>
                                <span className="pl-4 text-xl text-[#fe3a40]">10%</span>
                            </p>
                            <div className="flex items-center gap-[26px] pt-1.5">
                                <div className="flex items-center gap-1">
                                    <Image className="pb-1" src="/product_rlt_star_ico.png" width={16} height={16} alt=""></Image>
                                    <span className="text-[14px] font-bold">4.7</span>
                                    <span className="text-[14px] text-[#999999]">(150)</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Image src="/product_rlt_heart_ico.png" width={15} height={12} alt=""></Image>
                                    <span className="text-[14px] text-[#555555]">764</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex flex-col">
                            <Image src="/product_rlt_img_01.png" width={224} height={225} alt="1"></Image>
                            <p className="font-bold pt-4">Damage Care Perfect Serum Original (New) - 80ml</p>
                            <p className="pt-1">
                                <span className="line-through text-[15px] text-[#bbbbbb]">A$19.65</span>
                                <span className="pl-2 text-lg">A$16.25</span>
                                <span className="pl-4 text-xl text-[#fe3a40]">10%</span>
                            </p>
                            <div className="flex items-center gap-[26px] pt-1.5">
                                <div className="flex items-center gap-1">
                                    <Image className="pb-1" src="/product_rlt_star_ico.png" width={16} height={16} alt=""></Image>
                                    <span className="text-[14px] font-bold">4.7</span>
                                    <span className="text-[14px] text-[#999999]">(150)</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Image src="/product_rlt_heart_ico.png" width={15} height={12} alt=""></Image>
                                    <span className="text-[14px] text-[#555555]">764</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide> */}
                </Swiper>
                <button className="absolute top-1/4 left-[-56px] w-[36px] h-[37px] bg-[url('/product_rlt_arrow_prev.png')]" onClick={() => swiperRef.current?.slidePrev()}></button>
                <button className="absolute top-1/4 right-[-56px] w-[36px] h-[37px] bg-[url('/product_rlt_arrow_next.png')]" onClick={() => swiperRef.current?.slideNext()}></button>
            </div>
        </>
    );
}