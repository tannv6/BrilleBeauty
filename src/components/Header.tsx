import Link from "next/link";

export default function Header() {
    return <div className='header container-main'>
      <div className="header_top flex justify-between items-center px-[120px] h-[120px] border-b border-gray-200">
        <div className="logo">
          <img src="/logo_main.png" alt="" />
        </div>
        <div className="search-container flex items-center mx-5">
          <div className="relative">
            <input
              type="text"
              className="peer h-[35px] w-[615px] rounded-full bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76"
            />
            <img
              src="search_ico.png"
              alt="Search"
              className="absolute right-0 top-1 mt-1 mb-1 mr-5 h-5 w-5"
            />
          </div>
          <div className="img_sale ml-5">
            <img src="img_sale.png" alt="" />
          </div>
        </div>
        <div className="header_right flex items-center">
              <div className="txt flex items-center">
                <Link href={"/"}>
                  <p className=" text-18 tracking-wide text-gray-700">Login</p>
                </Link>
                <span className="m-0 mx-1">/</span>
                <Link href={"/"}>
                  <p className=" text-18 tracking-wide text-gray-700">Register</p>
                </Link>
              </div>
              <span className="m-0 mx-5">|</span>
              <div className="ico flex items-center custom-gap">
                  <div className="ico_des">
                    <img src="heart_ic.png" alt="" className="w-10 h-10"/>
                  </div>
                  <div className="ico_des">
                    <img src="cart_ic.png" alt="" className="w-10 h-10"/>
                  </div>
              </div>
        </div>
      </div>
      <nav className="gnb inner-container">
        <ul className="flex justify-center items-center custom-gap-45 h-[50px]">
          <li>
            <Link href={"/"}>
              <p className="text-18 tracking-wide leading-5 text-gray-700 gnb_active">Brands</p>
            </Link>
          </li>
          <li>
            <Link href={"/face"}>
              <p className="text-18 tracking-wide leading-5 text-gray-700">Face</p>
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <p className="text-18 tracking-wide leading-5 text-gray-700">Eyes & Lips</p>
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <p className="text-18 tracking-wide leading-5 text-gray-700"> Hair & Body</p>
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <p className="text-18 tracking-wide leading-5 text-gray-700">Tools</p>
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <p className="text-18 tracking-wide leading-5 text-gray-700">Sales</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  }