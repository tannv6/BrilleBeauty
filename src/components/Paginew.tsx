import React, { Fragment } from "react";
import "@/app/globals.css";

function Paginew({ tP, cP = 1, tE = 0, per = 5, onChange }: any) {
  const handleChangePage = (page: number) => {
    onChange && onChange(page);
  };
  const start =
    cP < Math.floor((per + 1) / 2)
      ? 1
      : cP >= tP - per + Math.floor((per + 1) / 2)
        ? tP - per + 1
        : cP - Math.floor((per + 1) / 2) + 1;
  const end =
    cP < Math.floor((per + 1) / 2)
      ? per
      : cP >= tP - per + Math.floor((per + 1) / 2)
        ? tP
        : cP + Math.ceil((per + 1) / 2) - 1;
  return (
    <div>
      <ol className="flex flex-row justify-center mt-20 mb-[70px]">
        <li>
          <button
            type="button"
            onClick={() => cP !== 1 && handleChangePage(1)}
            className="block w-[36px] h-[36px] bg-[url('/pagination_LL.png')] mr-[10px]"
          >
          </button>
        </li>
        {cP !== 1 ? (
          <li>
            <button
              type="button"
              onClick={() => handleChangePage(cP - 1)}
              className="block w-[36px] h-[36px] bg-[url('/pagination_L.png')] mr-[20px] cursor-pointer"
            >
            </button>
          </li>
        ) : (
          <li>
            <button
              type="button"
              className="block w-[36px] h-[36px] bg-[url('/pagination_L.png')] mr-[20px] cursor-pointer"
            >
            </button>
          </li>
        )}
        <div className="flex flex-row gap-[10px]">
          {Array(tP || 0)
            .fill(1)
            .map((e, i) => {
              if (i >= start - 1 && i <= end - 1) {
                return (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => handleChangePage(i + 1)}
                      className={
                        i + 1 === cP
                          ? "flex items-center justify-center w-[36px] h-[36px] rounded-lg bg-[#ef4370] text-[#ffffff]"
                          : `flex items-center justify-center w-[36px] h-[36px] rounded-lg bg-white`
                      }
                    >
                      {i + 1}
                    </button>
                  </li>

                );
              } else {
                return <Fragment key={i}></Fragment>;
              }
            })}


        </div>
        {cP < tP ? (
          <li>
            <button
              type="button"
              onClick={() => handleChangePage(cP + 1)}
              className="block w-[36px] h-[36px] bg-[url('/pagination_R.png')] ml-[20px] cursor-pointer"
            >
            </button>
          </li>
        ) : (
          <li>
            <button
              type="button"
              className="block w-[36px] h-[36px] bg-[url('/pagination_R.png')] ml-[20px] cursor-pointer"
            >
            </button>
          </li>
        )}
        <li>
          <button
            type="button"
            onClick={() => cP !== tP && handleChangePage(tP)}
            className="block w-[36px] h-[36px] bg-[url('/pagination_RR.png')] ml-[10px] cursor-pointer"
          >
          </button>
        </li>
      </ol>
    </div>
  );
}

export default Paginew;
