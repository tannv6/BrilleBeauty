import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  return <div className='header container-main border-b border-gray-200'>
    <div className="header_top flex justify-between items-center px-[120px] h-[120px] border-b border-gray-200">
      <div className="logo">
        <Link href={"/"}>
          <Image src="/logo_main.png" alt="" width={234} height={33} />
        </Link>
      </div>
      <div className="search-container flex items-center mx-5">
        <div className="relative">
          <input
            type="text"
            className="peer h-[35px] w-[615px] 2xl:w-[450px] rounded-full bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
          />
          <Image
            src="/search_ico.png"
            alt="Search"
            width={100} height={100}
            className="absolute right-0 top-1 mt-1 mb-1 mr-5 h-5 w-5"
          />
        </div>
        <div className="img_sale ml-5">
          <Image src="/img_sale.png" alt="" width={218} height={64} />
        </div>
      </div>
      <div className="header_right flex items-center">
          <Link href={"/member"}>
            <div className="txt flex items-center">
                <p className=" text-18 tracking-wide text-gray-700">Login</p>
                  <span className="m-0 mx-1">/</span>
                <p className=" text-18 tracking-wide text-gray-700">Register</p>
            </div>
          </Link>
        <span className="m-0 mx-5">|</span>
        <div className="ico flex items-center custom-gap">
          <div className="ico_des">
            <Image src="/heart_ic.png" alt="" width={41} height={40} className="w-10 h-10" />
          </div>
          <div className="ico_des relative">
            <Link href="/cart">
              <Image src="/cart_ic.png" alt="" width={41} height={40} className="w-10 h-10" />
              <p className="absolute bottom-[3px] right-[10px] text-[#f15981] text-[13px] font-bold">3</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <nav className="gnb inner-container">
      <ul className="flex justify-center items-center custom-gap-45 h-[50px] font-medium">
        <li className="relative group">
          <Link
            className={`${pathname === '/brands' ? 'gnb_active' : ''} text-18 tracking-wide leading-[50px] text-gray-700`}
            href={"/brands"}
          >
            Brands
          </Link>
          <div className="absolute hidden top-[49px] left-0 transform min-[1920px]:-translate-x-[35%] 2xl:-translate-x-[31%] bg-white w-full xl:w-[100vw] h-[322px] group-hover:block z-[100] border-b boder-gray-200 border-t">
            <div className="inner-container">
              {/* <div className="flex items-end justify-end w-full">
                <Image src="/close_ic.png" alt="" width={50} height={50}/>
              </div> */}
              <div className="flex items-center justify-center mt-10">
                  <div className="flex items-center w-[783px] border-b border-black">
                  <input
                    type="text"
                    className="h-[60px] w-full p-5 text-[20px] text-[#999] outline-none"
                    placeholder="Please search for brands."
                  />
                  <button type="button"
                    className="bg-[url('/search_ic.png')] w-[34px] h-[30px] cursor-pointer mr-4">
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center mt-[55px]">
                <div className="w-[783px]">
                  <p className="text-[22px] text-[#252525] font-bold">Recommended search words</p>
                  <ul className="flex gap-[10px] mt-5">
                    <li className="w-[120px] h-[46px] bg-[#f4f5f7] rounded-[23px] flex items-center justify-center">
                      <Link
                        className="text-[16px] text-[#545454]"
                        href={"/"}
                      >#3CE
                      </Link>
                    </li>
                    <li className="w-[120px] h-[46px] bg-[#f4f5f7] rounded-[23px] flex items-center justify-center">
                      <Link
                        className="text-[16px] text-[#545454]"
                        href={"/"}
                      >#3W Clinic
                      </Link>
                    </li>
                    <li className="w-[120px] h-[46px] bg-[#f4f5f7] rounded-[23px] flex items-center justify-center">
                      <Link
                        className="text-[16px] text-[#545454]"
                        href={"/"}
                      >#3wishes
                      </Link>
                    </li>
                    <li className="w-[120px] h-[46px] bg-[#f4f5f7] rounded-[23px] flex items-center justify-center">
                      <Link
                        className="text-[16px] text-[#545454]"
                        href={"/"}
                      >#TOCOBO
                      </Link>
                    </li>
                    <li className="w-[120px] h-[46px] bg-[#f4f5f7] rounded-[23px] flex items-center justify-center">
                      <Link
                        className="text-[16px] text-[#545454]"
                        href={"/"}
                      >#wishes
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="relative group">
          <Link
            className={`${pathname === '/face' ? 'gnb_active' : ''} text-18 tracking-wide leading-[50px] text-gray-700`} 
            href={"/face"}>
            Face
          </Link>
          <div className="absolute hidden top-[49px] left-0 transform min-[1920px]:-translate-x-[40%] transform 2xl:-translate-x-[38%] bg-white w-full xl:w-[100vw] h-[400px] group-hover:block z-[100] border-b boder-gray-200 border-t">
            <div className="inner-container flex gap-[150px] mt-[55px]">
                <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">Facecare</h3>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Ampoule</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Blending Powder</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Essence & Serum</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Lotion & Emulsion</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Moisturizer & Cream</p>
                </div>
                <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">Masks</h3>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Gel Masks</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Peel-off Masks</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Sheet Masks</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Sleeping Masks</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Other Masks</p>
                </div>
                <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">Facial Cleanser</h3>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Exfoliator, Peeling & Scrub</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Face Wash & Cleansers</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Face Wipe</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Makeup Remover</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Pore Clearing</p>
                </div>
                <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">Face Makeup</h3>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">BB & CC Cream</p>
                </div>
            </div>
          </div>
        </li>
        <li className="relative group">
          <Link 
            className={`${pathname === '/eyes_lips' ? 'gnb_active' : ''} text-18 tracking-wide leading-[50px] text-gray-700`}
            href={"/eyes_lips"}
          >
            Eyes & Lips
          </Link>
          <div className="absolute hidden top-[49px] left-0 transform min-[1920px]:-translate-x-[44%] 2xl:-translate-x-[43%] bg-white w-full xl:w-[100vw] h-[400px] group-hover:block z-[100] border-b boder-gray-200 border-t">
            <div className="inner-container flex gap-[150px] mt-[55px]">
                <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">Eye Care</h3>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Eye Cream</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Eye Essence & Serum</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Eye Masks</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Eye Patch</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Eye Drops</p>
                </div>
                <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">Eye Makeup</h3>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Contact Lenses</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Eye Primer</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Eyebrow</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Eyeliner</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Eyeshadow</p>
                </div>
                <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">Lip Care</h3>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Lip Balm</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Lip Treatment</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Lip Masks</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Lip Oil</p>
                </div>
                <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">Lip Makeup</h3>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Lip Gloss</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Lip Pencil</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Lipstick</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Lip Tint</p>
                </div>
            </div>
          </div>
        </li>
        <li className="relative group">
          <Link 
            className={`${pathname === '/hair_body' ? 'gnb_active' : ''} text-18 tracking-wide leading-[50px] text-gray-700`}
            href={"/hair_body"}
          >
            Hair & Body
          </Link>
          <div className="absolute hidden top-[49px] left-0 transform 2xl:-translate-x-[51%] bg-white w-full xl:w-[100vw] h-[400px] group-hover:block z-[100] border-b boder-gray-200 border-t">
            <div className="inner-container flex gap-[150px] mt-[55px]">
                <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">Body</h3>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Body Moisturizer & Lotion</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Personal Care</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Body Wash & Soap</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Body Scrub & Exfoliants</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Foot Care</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Hand Cream & Care</p>
                </div>
                <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">Hair</h3>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Hair Care</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Hair Dye</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Hair Liner</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Hair Wax</p>
                </div>
                <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">Oral</h3>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Oral Care</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Manual Toothbrushes</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Kids Oral Care</p>
                </div>
                <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">Nail</h3>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Nail Care</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Nail Art</p>
                </div>
            </div>
          </div>
        </li>
        <li className="relative group">
          <Link 
            className={`${pathname === '/tools' ? 'gnb_active' : ''} text-18 tracking-wide leading-[50px] text-gray-700`}
            href={"/tools"}>
            Tools
          </Link>
          <div className="absolute hidden top-[49px] left-0 transform min-[1920px]:-translate-x-[58%] 2xl:-translate-x-[60%] bg-white w-full xl:w-[100vw] h-[430px] group-hover:block z-[100] border-b boder-gray-200 border-t">
            <div className="inner-container flex gap-[150px] mt-[55px]">
                <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">Hair & Body Tools</h3>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Body Care Electronics</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Hair Electronics</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Other Hair Tools</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Nail Beauty Tools</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Hair Accessories</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Other Body Care Tools</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Oral Care Tools</p>
                </div>
                <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">Facial Tools & Accessories</h3>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Other Tools</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Cleansing Tool</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Skincare Electronics</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Razors & Trimmers</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Facial Massage Tools</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Facial Mask Tool</p>
                </div>
                <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">Makeup Tools & Accessories</h3>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Other Makeup Tools</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Contact Lens Tools</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Makeup Brushes</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Eyelash Tools</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">Eyelid Tools</p>
                  <p className="text-[18px] text-[#252525] leading-[35px] font-medium">MMakeup Applicator</p>
                </div>
            </div>
          </div>
        </li>
        <li className="relative group">
          <Link 
            className={`${pathname === '/sales' ? 'gnb_active' : ''} text-18 tracking-wide leading-[50px] text-gray-700`}
            href={""}>
            Sales
          </Link>
          <div className="absolute hidden top-[49px] left-0 transform min-[1920px]:-translate-x-[63%] 2xl:-translate-x-[66%] bg-white w-full xl:w-[100vw] h-[420px] group-hover:block z-[100] border-b boder-gray-200 border-t">
            <div className="inner-container flex gap-[70px] mt-[55px]">
                <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">Last Minute Sale </h3>
                    <Image src="/sale_img01.webp" alt="" width={250} height={250} />
                </div>
                <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">Clearance Sale</h3>
                  <Image src="/sale_img02.webp" alt="" width={250} height={250} />
                </div>
                <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">Value Set</h3>
                  <Image src="/sale_img03.webp" alt="" width={250} height={250} />
                </div>
                <div>
                  <h3 className="mb-[24px] text-[22px] font-bold text-[#252525]">Mini Size</h3>
                  <Image src="/sale_img04.webp" alt="" width={250} height={250} />
                </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </div>
}