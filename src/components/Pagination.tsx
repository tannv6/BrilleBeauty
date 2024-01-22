import "@/app/globals.css";

function Pagination({ }: any) {
    return (
        <>
            <div className="flex flex-row justify-center mt-20 mb-[70px] font-Arial">
                <div className="block w-[36px] h-[36px] bg-[url('/pagination_LL.png')] mr-[10px] cursor-pointer"></div>
                <div className="block w-[36px] h-[36px] bg-[url('/pagination_L.png')] mr-[20px] cursor-pointer"></div>
                <div className="flex items-center justify-center w-[36px] h-[36px] rounded-lg bg-[#ef4370] text-[#ffffff] mr-[10px]">
                    <a href="">1</a>
                </div>
                <div className="flex items-center justify-center w-[36px] h-[36px] rounded-lg mr-[10px]">
                    <a href="">2</a>
                </div>
                <div className="flex items-center justify-center w-[36px] h-[36px] rounded-lg mr-[10px]">
                    <a href="">3</a>
                </div>
                <div className="flex items-center justify-center w-[36px] h-[36px] rounded-lg mr-[10px]">
                    <a href="">4</a>
                </div>
                <div className="flex items-center justify-center w-[36px] h-[36px] rounded-lg">
                    <a href="">5</a>
                </div>
                <div className="block w-[36px] h-[36px] bg-[url('/pagination_R.png')] ml-[20px] cursor-pointer"></div>
                <div className="block w-[36px] h-[36px] bg-[url('/pagination_RR.png')] ml-[10px] cursor-pointer"></div>
            </div>
        </>
    );
}

export default Pagination;
