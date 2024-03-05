import "@/app/globals.css";
import { Fragment } from "react";

function Pagi({
  totalPage,
  currentPage = 1,
  totalElement = 0,
  elementsPerPage = 5,
  onChange,
}: any) {
  const handleChangePage = (page: number) => {
    onChange && onChange(page);
  };
  const start =
    currentPage < Math.floor((elementsPerPage + 1) / 2)
      ? 1
      : currentPage >=
        totalPage - elementsPerPage + Math.floor((elementsPerPage + 1) / 2)
      ? totalPage - elementsPerPage + 1
      : currentPage - Math.floor((elementsPerPage + 1) / 2) + 1;
  const end =
    currentPage < Math.floor((elementsPerPage + 1) / 2)
      ? elementsPerPage
      : currentPage >=
        totalPage - elementsPerPage + Math.floor((elementsPerPage + 1) / 2)
      ? totalPage
      : currentPage + Math.ceil((elementsPerPage + 1) / 2) - 1;
  return (
    <>
      <div className="flex flex-row justify-center mt-20 mb-[70px] font-Arial">
        <div className="block w-[36px] h-[36px] bg-[url('/pagination_LL.png')] mr-[10px] cursor-pointer"></div>
        <div className="block w-[36px] h-[36px] bg-[url('/pagination_L.png')] mr-[20px] cursor-pointer"></div>
        {Array(totalPage || 0)
          .fill(1)
          .map((e, i) => {
            if (i >= start - 1 && i <= end - 1) {
              return (
                <div
                  key={i}
                  className="flex items-center justify-center w-[36px] h-[36px] rounded-lg bg-[#ef4370] text-[#ffffff] mr-[10px]"
                >
                  <a href="">{i + 1}</a>
                </div>
              );
            } else {
              return <Fragment key={i}></Fragment>;
            }
          })}
        <div className="block w-[36px] h-[36px] bg-[url('/pagination_R.png')] ml-[20px] cursor-pointer"></div>
        <div className="block w-[36px] h-[36px] bg-[url('/pagination_RR.png')] ml-[10px] cursor-pointer"></div>
      </div>
    </>
  );
}

export default Pagi;
