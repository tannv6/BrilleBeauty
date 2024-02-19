import "@/app/globals.css";
import Image from "next/image";
import Link from "next/link";

function ProductItem({
    image,
}: any) {
    return (
        <>
            <Link href="/review_detail" className="popular_product_element relative">
                <div className="thumbnail relative">
                    <Image className="thumb_image w-[285px] h-[285px] object-cover" src={image} alt="" width={283} height={283} />
                </div>
                <div className="product_props flex flex-col gap-3 px-5 py-5 border-[#dbdbdb] border-[1px] border-t-0">
                    <div className="flex items-center gap-1">
                        <Image className="icon_star" src="/start_ic.png" alt="" width={18} height={18} />
                        <Image className="icon_star" src="/start_ic.png" alt="" width={18} height={18} />
                        <Image className="icon_star" src="/start_ic.png" alt="" width={18} height={18} />
                        <Image className="icon_star" src="/start_ic.png" alt="" width={18} height={18} />
                        <Image className="icon_star" src="/start_g_ic.png" alt="" width={18} height={18} />
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
            </Link>
        </>
    );
}

export default ProductItem;
