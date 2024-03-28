import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from 'next/navigation'

function MypageNav({ }: any) {
    const pathname = usePathname()

    return (
        <>
            <div className="basis-[300px] flex flex-col">
                <p className="text-[28px] font-bold border-b border-black pb-6">
                  <Link href="/account" className={`${pathname === '/account' ? 'text-[#ef426f]' : ''}`}>MY ACCOUNT</Link>
                </p>
                <p className="text-xl py-6 pl-5 border-b">
                  <Link href="/account/aboutme" className={`${pathname === '/account/aboutme' ? 'text-[#ef426f]' : ''}`}>About Me</Link>
                </p>
                <p className="text-xl py-6 pl-5 border-b">
                  <Link href="/account/myorders" className={`${pathname === '/account/myorders' ? 'text-[#ef426f]' : ''}`}>My Orders</Link>
                </p>
                <p className="text-xl py-6 pl-5 border-b">
                  <Link href="/account/myaddresses" className={`${pathname === '/account/myaddresses' ? 'text-[#ef426f]' : ''}`}>My Addresses</Link>
                </p>
                <p className="text-xl py-6 pl-5 border-b">
                  <Link href="/account/mywishlist" className={`${pathname === '/account/mywishlist' ? 'text-[#ef426f]' : ''}`}>My Wish List</Link>
                </p>
                <p className="text-xl py-6 pl-5 border-b">
                  <button onClick={()=>signOut({ callbackUrl: '/', redirect:true })} className="flex items-center gap-2 cursor-pointer max-w-fit">Sign Out<i className="w-[20px] h-[20px] bg-[url('/account/signout_ico.png')]"></i></button>
                </p>
              </div>
        </>
    );
}

export default MypageNav;
