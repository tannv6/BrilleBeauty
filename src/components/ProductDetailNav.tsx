import Link from "next/link";

export default function ProductDetailNav({ tab }: any) {
    return (
        <>
            <div className="flex justify-center">
                <Link href="#product_in4" className={`flex items-center border justify-center w-[300px] h-14 ${(tab==1) ? "bg-[#ef426f] text-[#ffffff] border-0" : ""}`}>Product information</Link>
                <a href="" className={`flex items-center border border-l-0 justify-center w-[300px] h-14 ${(tab==2) ? "bg-[#ef426f] text-[#ffffff] border-0" : ""}`}>Product review(36)</a>
                <a href="" className={`flex items-center border border-l-0 justify-center w-[300px] h-14 ${(tab==3) ? "bg-[#ef426f] text-[#ffffff] border-0" : ""}`}>Related product</a>
            </div>
        </>
    );
}


