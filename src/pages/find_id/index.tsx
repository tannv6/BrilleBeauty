import Layout from '@/components/Layout'
import Link from 'next/link'
import { useState } from 'react';

export default function Find() {
    const [activeTab, setActiveTab] = useState('id');
    const [selectedTab, setSelectedTab] = useState('phone');

    const handleTabChange = (tab : any) => {
      setActiveTab(tab);
    };

    const handleTabChanges = (tab : any) => {
        setSelectedTab(tab);
      };

      const handleChange = (event : any) => {
        const { name } = event.target;
        handleTabChange(name);
      };
  return (
    <>
    <Layout>
        <div className="inner-530 mt-[95px] mb-[375px]">
            <h2 className='text-[30px] text-[#252525] mb-[50px] font-medium text-center'>
                Find ID/Password
            </h2>
            <div className="flex mb-[35px]">
                 <button
                    type='button'
                    className={`w-full h-[54px] border border-[#dbdbdb] ${activeTab === 'id' ? 'btn_on' : ''} flex items-center justify-center text-[18px] text-[#999] border-b-[#252525] font-bold`}
                    onClick={() => handleTabChange('id')}
                >
                    Find ID
                </button>
                <button
                    type='button'
                    className={`w-full h-[54px] border border-[#dbdbdb] ${activeTab === 'password' ? 'btn_on' : ''} flex items-center justify-center text-[18px] text-[#999] border-b-[#252525] font-bold`}
                    onClick={() => handleTabChange('password')}
                >
                    Find password
                </button>
            </div>
            {activeTab === 'id' && (
                <form>
                        <input
                                    id="phone"
                                    className="peer/phone hidden"
                                    type="radio"
                                    name="status"
                                    checked={selectedTab === 'phone'}
                                    onChange={() => handleTabChanges('phone')}
                                />
                            <label htmlFor="phone" className="text-[18px] text-[#252525] font-normal  peer-checked/phone">
                                <span className="w-8 h-8 inline-block mr-2 rounded-full border border-grey"></span>
                                Find with your phone
                            </label>
                            <input 
                                    id="email" 
                                    className="peer/email hidden" 
                                    type="radio" name="status"                             
                                    checked={selectedTab === 'email'}
                                    onChange={() => handleTabChanges('email')}
                                    />
                            <label htmlFor="email" className=" ml-[80px] text-[18px] w-1/2 text-[#252525] font-normal  peer-checked/email">
                                    <span className="w-8 h-8 inline-block mr-2 rounded-full border border-grey"></span>
                                    Find by email
                            </label>
                    <div className={`hidden peer-checked/${selectedTab === 'phone' ? 'phone' : ''}:block`}>
                        <div className='mt-10'>
                            <div className="mt-2">
                                <input type="text" 
                                name="user_name1" 
                                id="user_name1" 
                                className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76" 
                                placeholder="Please enter your name" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex gap-[10px]">
                                <div className="relative w-[160px] flex items-center after:w-[8px] after:h-[8px] after:border-black/70 after:border-b after:border-r after:transform after:rotate-45 after:absolute after:right-3">
                                    <select required
                                        className="text-black/70 bg-white py-3 pl-2  outline-none transition-all cursor-pointer border border-gray-200 rounded-md focus:bg-white focus:ring-2 focus:ring-f04b76 appearance-none invalid:text-black/30 w-[160px]">
                                        <option value="option-1">021</option>
                                        <option value="option-2">022</option>
                                        <option value="option-3">027</option>
                                    </select>
                                </div>
                                <input type="text" 
                                    name="phone_2" 
                                    id="phone_2" 
                                    className="block w-[175px] rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76" 
                                    />
                                <input type="text" 
                                    name="phone_3" 
                                    id="phone_3" 
                                    className="block w-[175px] rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76" 
                                    />
                            </div>
                        </div>
                        <div className="mt-4">
                            <button className='w-full h-[50px] border border-[#757575] flex items-center justify-center text-[16px] text-[#252525]'>
                                Certification Number
                            </button>
                        </div>
                        <div className="mt-4">
                            <input type="text" 
                                    name="confirm" 
                                    id="confirm" 
                                    placeholder='Please enter your authentication number.'
                                    className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76" 
                                    />
                        </div>
                        <Link href={""}>
                            <button type='button' className='mt-7 w-full h-[62px] flex items-center justify-center rounded bg-[#f04b76] text-[18px] text-white font-medium'>
                                Check
                            </button>
                        </Link>
                    </div>
                    <div className={`hidden peer-checked/${selectedTab === 'email' ? 'email' : ''}:block`}>
                    <div className='mt-10'>
                            <div className="mt-2">
                                <input type="text" 
                                name="user_name2" 
                                id="user_name2" 
                                className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76" 
                                placeholder="Please enter your name" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex gap-[10px]">
                                <input type="text" 
                                    name="email_1" 
                                    id="email_1" 
                                    className="block w-[162px] rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76" 
                                    />
                                <span className='leading-[50px]'>
                                    @
                                </span>
                                <input type="text" 
                                    name="email_2" 
                                    id="email_2" 
                                    className="block w-[162px] rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76" 
                                    />
                                    <div className="relative w-[160px] flex items-center after:w-[8px] after:h-[8px] after:border-black/70 after:border-b after:border-r after:transform after:rotate-45 after:absolute after:right-3">
                                    <select required
                                        className="text-black/70 bg-white py-3 pl-2  outline-none transition-all cursor-pointer border border-gray-200 rounded-md focus:bg-white focus:ring-2 focus:ring-f04b76 appearance-none invalid:text-black/30 w-[160px]">
                                        <option value="option-1">gmail.com</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button className='w-full h-[50px] border border-[#757575] flex items-center justify-center text-[16px] text-[#252525]'>
                                Certification Number
                            </button>
                        </div>
                        <div className="mt-4">
                            <input type="text" 
                                    name="confirm" 
                                    id="confirm" 
                                    placeholder='Please enter your authentication number.'
                                    className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76" 
                                    />
                        </div>
                        <Link href={""}>
                            <button type='button' className='mt-7 w-full h-[62px] flex items-center justify-center rounded bg-[#f04b76] text-[18px] text-white font-medium'>
                                Check
                            </button>
                        </Link>
                    </div>
                </form>
            )}
             {activeTab === 'password' && (
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
