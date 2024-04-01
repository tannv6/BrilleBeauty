import Link from "next/link";

export default function ProductDetailNav({ tab }: any) {
    return (
        <>
            <div className="flex justify-center">
                <Link href="#product_in4" className={`flex items-center font-bold border justify-center w-[300px] h-14 ${(tab==1) ? "bg-[#ef426f] text-[#ffffff] border-0" : ""}`}>Product information</Link>
                <Link href="#product_rvw" className={`flex items-center font-bold border border-l-0 justify-center w-[300px] h-14 ${(tab==2) ? "bg-[#ef426f] text-[#ffffff] border-0" : ""}`}>Product review</Link>
                <Link href="#product_rlt" className={`flex items-center font-bold border border-l-0 justify-center w-[300px] h-14 ${(tab==3) ? "bg-[#ef426f] text-[#ffffff] border-0" : ""}`}>Related product</Link>
            </div>
        </>
    );
}


