import "@/app/globals.css";

function SubVisual({ title1, title2 }: any) {
  
  return (
    <>
      <div className="w-full h-[340px] bg-[url('/sub_face/main_visual.png')]">
        <div className="flex justify-center flex-col gap-5 h-full pl-[415px]">
          <p className="text-black text-[32px] font-[700]">{title1}</p>
          <div className="flex flex-row items-center gap-x-3">
            <p className="text-[#757575]">Home</p>
            <i className="block w-[9px] h-4 bg-[url('/sub_face/main_visual_arrow.png')]"></i>
            <p className="text-[#757575]">{title1}</p>
            <i className="block w-[9px] h-4 bg-[url('/sub_face/main_visual_arrow.png')]"></i>
            <p className="text-[#757575]">{title2}</p>
          </div>
          <p className="text-[#757575]">Sunscreen, which helps to protect your skin from harmful<br/>
                          UV rays, is a must-have item in your face care routine.</p>
        </div>
      </div>
    </>
  );
}

export default SubVisual;
