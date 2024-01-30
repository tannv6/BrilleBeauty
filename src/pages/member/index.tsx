import Layout from '@/components/Layout'
import Link from 'next/link'
import { useState } from 'react';

export default function Login() {
    const [activeTab, setActiveTab] = useState('login');

    const handleTabChange = (tab : any) => {
      setActiveTab(tab);
    };
  return (
    <>
    <Layout>
        <div className="inner-530 mt-[95px] mb-[375px]">
            <div className="flex mb-[35px]">
                 <button
                    type='button'
                    className={`w-full h-[54px] border border-[#dbdbdb] ${activeTab === 'login' ? 'btn_on' : ''} flex items-center justify-center text-[18px] text-[#999] border-b-[#252525] font-bold`}
                    onClick={() => handleTabChange('login')}
                >
                    Login
                </button>
                <button
                    type='button'
                    className={`w-full h-[54px] border border-[#dbdbdb] ${activeTab === 'register' ? 'btn_on' : ''} flex items-center justify-center text-[18px] text-[#999] border-b-[#252525] font-bold`}
                    onClick={() => handleTabChange('register')}
                >
                    Register
                </button>
            </div>
            {activeTab === 'login' && (
                <form>
                        <div className='mt-10'>
                            <label htmlFor="user_email1" className="block text-[18px] font-bold leading-6 text-[#252525]">Email*</label>
                            <div className="mt-2">
                                <input type="text" 
                                name="user_email1" 
                                id="user_email1" 
                                className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76" 
                                placeholder="Please enter your ID" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password1" className="block text-[18px] font-bold leading-6 text-[#252525]">Password*</label>
                            <div className="mt-2">
                                <input type="text" 
                                name="password1" 
                                id="password1" 
                                className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76" 
                                placeholder="Please enter a password." />
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-[30px]">
                            <div className='flex gap-2 items-center'>
                                <input className="w-[22px] h-[22px] rounded appearance-none border checked:bg-[url('/checkbox_customer.png')] checked:border-0 cursor-pointer" type="checkbox" id="save" />
                                <label htmlFor="save" className='text-[16px] font-medium text-[#252525]'> Save ID</label>
                            </div>
                            <Link href={""}>
                                <p className='text-[16px] font-medium text-[#454545]'>Forgot Your Password?</p>
                            </Link>
                        </div>
                        <Link href={""}>
                            <button type='button' className='mt-7 w-full h-[62px] flex items-center justify-center rounded bg-[#f04b76] text-[18px] text-white font-medium'>
                                Login
                            </button>
                        </Link>
                </form>
            )}
             {activeTab === 'register' && (
                <form>
                        <div className='mt-10'>
                            <label htmlFor="user_email2" className="block text-[18px] font-bold leading-6 text-[#252525]">Email*</label>
                            <div className="mt-2">
                                <input type="text" 
                                name="user_email2" 
                                id="user_email2" 
                                className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76" 
                                placeholder="Please enter your ID" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password2" className="block text-[18px] font-bold leading-6 text-[#252525]">Password*</label>
                            <div className="mt-2">
                                <input type="text" 
                                name="password2" 
                                id="password2" 
                                className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76" 
                                placeholder="Please enter a password." />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="confirm_pass" className="block text-[18px] font-bold leading-6 text-[#252525]">Confirm Password*</label>
                            <div className="mt-2">
                                <input type="text" 
                                name="confirm_pass" 
                                id="confirm_pass" 
                                className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76" 
                                placeholder="Confirm Password" />
                            </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <div>
                                <label htmlFor="first_name" className="block text-[18px] font-bold leading-6 text-[#252525]">First Name*</label>
                                <div className="mt-2">
                                    <input type="text" 
                                    name="first_name" 
                                    id="first_name" 
                                    className="block w-[258px] rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76" 
                                    placeholder="First Name" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="first_name" className="block text-[18px] font-bold leading-6 text-[#252525]">Last Name*</label>
                                <div className="mt-2">
                                    <input type="text" 
                                    name="first_name" 
                                    id="first_name" 
                                    className="block w-[258px] rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76" 
                                    placeholder="Last Name" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="birth" className="block text-[18px] font-bold leading-6 text-[#252525]">Date Of Birth</label>
                            <div className="mt-2">
                                <input type="text" 
                                name="birth" 
                                id="birth" 
                                className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76 date" />
                            </div>
                        </div>
                        <div className="mt-[30px]">
                            <div className='flex gap-2'>
                                <input className="w-[22px] h-[22px] rounded appearance-none border checked:bg-[url('/checkbox_customer.png')] checked:border-0 cursor-pointer" type="checkbox" id="save" />
                                <label htmlFor="save" className='text-[16px] font-medium text-[#252525]'> By creating an account, you confirm that you agree to beauty.coms <br />
                                    Terms and Conditions and Privacy Policy.</label>
                            </div>
                            <div className='flex gap-2 items-center mt-2'>
                                <input className="w-[22px] h-[22px] rounded appearance-none border checked:bg-[url('/checkbox_customer.png')] checked:border-0 cursor-pointer" type="checkbox" id="save" />
                                <label htmlFor="save" className='text-[16px] font-medium text-[#252525]'> Sign Up for Newsletter</label>
                            </div>
                        </div>
                        <Link href={""}>
                            <button type="button" className='mt-7 w-full h-[62px] flex items-center justify-center rounded bg-[#f04b76] text-[18px] text-white font-medium'>
                                Register
                            </button>
                        </Link>
                </form>
             )}
        </div>
    </Layout>
    </>
  )
}
