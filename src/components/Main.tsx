import Link from "next/link";

export default function Main() {
    return <div className='container-main'>
        <div className="main_visual bg-no-repeat bg-cover" style={{ backgroundImage: 'url("main_visual_img.png")', height: '664px', }}>
        </div>    
        <div className="inner-container">
            <div className="main_banner flex custom-gap-30 my-6">
                <div className="banner_img">
                    <img src="banner_img01.png" alt="" />
                </div>
                <div className="banner_img">
                    <img src="banner_img02.png" alt="" />
                </div>
            </div>
            <div className="main_ttl text-center">
                <p className="text-22 tracking-wide leading-8 uppercase text-gray-700 font-bold mb-2.5">BEAUTY COLLECTION </p>
                <span className="ext-18 tracking-wide leading-5 text-gray-500">Shop By Category</span>
            </div>
            <div className="flex mt-10">
                <div className="popular_product_element w-1/4 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 relative">
                    <div className="thumbnail relative">
                        <img className="thumb_image w-286 h-294 object-cover rounded-16" src="product_img01.png" alt="" />
                        <div className="product_types absolute bottom-5 left-5 font-size-20 flex flex-col gap-2">
                        <span className="ico">
                            <img src="sale_ic.png" alt="" />
                        </span>
                        <span className="ico">
                            <img src="new_ic.png" alt="" />
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
                            <img className="icon_star" src="start_ic.png" alt="" />
                            <span className="star_num text-base color-25 mx-2">5.00</span>
                            <span className="num_of_people text-base text-zinc-500 ml-1 mr-7">(31)</span>
                            <span className="num_of_heart text-22 flex items-center gap-2.5">
                                <img src="heart_ic_main.png" alt="" />
                                <span className="like_cnt text-gray-700">11</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="popular_product_element w-1/4 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 relative">
                    <div className="thumbnail relative">
                        <img className="thumb_image w-286 h-294 object-cover rounded-16" src="product_img02.png" alt="" />
                        <div className="product_types absolute bottom-5 left-5 font-size-20 flex flex-col gap-2">
                        <span className="ico">
                            <img src="sale_ic.png" alt="" />
                        </span>
                        <span className="ico">
                            <img src="new_ic.png" alt="" />
                        </span>
                        </div>
                    </div>
                    <div className="product_props flex flex-col gap-4 mt-4">
                        <div className="product_name text-lg color-25 font-bold white-space-nowrap overflow-hidden text-ellipsis line-height-36 min-h-14">
                            Liese Creamy Bubble Color (Natural Series) - 1 Box
                        </div>
                            <div className="product_prices flex items-center">
                            <span className="cost text-base line-through color-b ml-2 mr-1.5">A$19.65</span>
                            <span className="promotional text-xl color-25 font-medium">A$16.25</span>
                            <span className="discount text-red-600 font-semibold text-2xl ml-2">10% </span>
                        </div>
                        <div className="product_props_bot flex items-center">
                            <img className="icon_star" src="start_ic.png" alt="" />
                            <span className="star_num text-base color-25 mx-2">5.00</span>
                            <span className="num_of_people text-base text-zinc-500 ml-1 mr-7">(31)</span>
                            <span className="num_of_heart text-22 flex items-center gap-2.5">
                                <img src="heart_ic_main.png" alt="" />
                                <span className="like_cnt text-gray-700">11</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="popular_product_element w-1/4 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 relative">
                    <div className="thumbnail relative">
                        <img className="thumb_image w-286 h-294 object-cover rounded-16" src="product_img03.png" alt="" />
                        <div className="product_types absolute bottom-5 left-5 font-size-20 flex flex-col gap-2">
                        <span className="ico">
                            <img src="sale_ic.png" alt="" />
                        </span>
                        <span className="ico">
                            <img src="new_ic.png" alt="" />
                        </span>
                        </div>
                    </div>
                    <div className="product_props flex flex-col gap-4 mt-4">
                        <div className="product_name text-lg color-25 font-bold white-space-nowrap overflow-hidden text-ellipsis line-height-36 min-h-14">
                            Shabam Shabam Romantic Glitter - 3g
                        </div>
                            <div className="product_prices flex items-center">
                            <span className="cost text-base line-through color-b ml-2 mr-1.5">A$19.65</span>
                            <span className="promotional text-xl color-25 font-medium">A$16.25</span>
                            <span className="discount text-red-600 font-semibold text-2xl ml-2">10% </span>
                        </div>
                        <div className="product_props_bot flex items-center">
                            <img className="icon_star" src="start_ic.png" alt="" />
                            <span className="star_num text-base color-25 mx-2">5.00</span>
                            <span className="num_of_people text-base text-zinc-500 ml-1 mr-7">(31)</span>
                            <span className="num_of_heart text-22 flex items-center gap-2.5">
                                <img src="heart_ic_main.png" alt="" />
                                <span className="like_cnt text-gray-700">11</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="popular_product_element w-1/4 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 relative">
                    <div className="thumbnail relative">
                        <img className="thumb_image w-286 h-294 object-cover rounded-16" src="product_img04.png" alt="" />
                        <div className="product_types absolute bottom-5 left-5 font-size-20 flex flex-col gap-2">
                        <span className="ico">
                            <img src="sale_ic.png" alt="" />
                        </span>
                        <span className="ico">
                            <img src="new_ic.png" alt="" />
                        </span>
                        </div>
                    </div>
                    <div className="product_props flex flex-col gap-4 mt-4">
                        <div className="product_name text-lg color-25 font-bold white-space-nowrap overflow-hidden text-ellipsis line-height-36 min-h-14">
                            Ink Airy Velvet Tint
                        </div>
                            <div className="product_prices flex items-center">
                            <span className="cost text-base line-through color-b ml-2 mr-1.5">A$19.65</span>
                            <span className="promotional text-xl color-25 font-medium">A$16.25</span>
                            <span className="discount text-red-600 font-semibold text-2xl ml-2">10% </span>
                        </div>
                        <div className="product_props_bot flex items-center">
                            <img className="icon_star" src="start_ic.png" alt="" />
                            <span className="star_num text-base color-25 mx-2">5.00</span>
                            <span className="num_of_people text-base text-zinc-500 ml-1 mr-7">(31)</span>
                            <span className="num_of_heart text-22 flex items-center gap-2.5">
                                <img src="heart_ic_main.png" alt="" />
                                <span className="like_cnt text-gray-700">11</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  }