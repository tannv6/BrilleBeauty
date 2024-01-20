import "@/app/globals.css";

function SubVisual({ children }: any) {
  return (
    <>
      {children}
      <div className="w-full h-[340px] bg-[url('/sub_face/main_visual.png')]">
        <div className="flex items-center h-full">
          <p className="text-black text-[32px] font-[700] font-NotoSansKR">Brands</p>
          <div className="flex flex-row items-center"></div>
        </div>
      </div>
    </>
  );
}

export default SubVisual;
