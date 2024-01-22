import "@/app/globals.css";

function ProductItem({ }: any) {
    return (
        <>
            <div className="font-Arial flex flex-col">
                <div className="h-[294px] border border-[#dbdbdb] rounded-t-2xl relative">
                    <img src="/product_img01.png" alt="" />
                    <span className="flex items-center justify-center w-[50px] h-[30px] absolute bottom-[10px] left-3 bg-[#ffffff] text-[#fe3a40] rounded-[15px] text-[14px]">NEW</span>
                    <span className="flex items-center justify-center w-[50px] h-[30px] absolute bottom-[50px] left-3 bg-[#fe3a40] text-[#ffffff] rounded-[15px] text-[14px]">SALE</span>
                    <div className="absolute top-0 w-full h-full hover:bg-black-rgba z-10 rounded-t-2xl flex items-center justify-center">
                        <button className="h-[60px]"></button>
                        <button className=""></button>
                    </div>
                </div>
                <div className="p-5 pb-10 border border-t-0 border-[#dbdbdb]">
                    <p className="font-bold text-[18px]">Damage Care Perfect Serum Original (New) - 80ml</p>
                    <p className="pt-2">
                        <span className="line-through text-[#bbbbbb]">A$19.65</span>
                        <span className="pl-[10px] text-[20px] font-bold">A$16.25</span>
                        <span className="pl-[15px] text-[22px] text-[#fe3a40] font-bold">10%</span>
                    </p>
                    <div className="flex items-center pt-3">
                        <div className="flex">
                            <i className="block h-[18px] w-[18px] bg-[url('/product_star_ico.png')] mr-2"></i>
                            <span className="mr-1 font-bold">4.7</span>
                            <span className="text-[#999999]">(150)</span>
                        </div>
                        <div className="flex ml-[31px]">
                            <i className="block mt-1 h-[14px] w-[17px] bg-[url('/product_heart_ico.png')] mr-2"></i>
                            <span className="text-[#555555]">764</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductItem;
