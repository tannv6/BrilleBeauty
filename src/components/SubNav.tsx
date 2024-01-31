import Link from "next/link";

function SubNav({ title1, title2 }: any) {
    return (
        <>
            <div className="w-full h-20 bg-[#f5f5f5]">
                <div className="inner-container h-full pl-[25px] flex items-center gap-[13px]">
                    <Link href="/" className="w-5 h-[18px] bg-[url('/sub_nav_home_ico.png')]"></Link>
                    <i className="w-[10px] h-4 bg-[url('/sub_nav_arrow_ico.png')]"></i>
                    <p className="text-lg text-[#454545]">{title1}</p>
                    {title2 ? (
                        <>
                            <i className="w-[10px] h-4 bg-[url('/sub_nav_arrow_ico.png')]"></i>
                            <p className="text-lg text-[#454545]">{title2}</p>
                        </>
                    ) : (
                        <>
                        </>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default SubNav;