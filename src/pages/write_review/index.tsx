/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react';
import Layout from '@/components/Layout'
import SubNav from '@/components/SubNav';
import Editors from '@/components/Editor';
import Upload from '@/components/Upload';
import Start from '@/components/Start';


export default function Write() {
    const [addData, setVal] = useState("");
    const [addedData, showData] = useState(0);
    const handleChange = (e: any,editor: { getData: () => any; }) => {
      const data = editor.getData();
      setVal(data);
    }
  return (
    <>
    <Layout>
        <SubNav title1="Write Review"/>
        <div className='inner-container mt-[70px] mb-[170px]'>
            <h2 className='text-[36px] text-[#252525] font-bold mb-[35px]'>Contact Us</h2>
            <table className='mb-[55px] border-t border-[#252525]'>
                <tbody>
                    <tr className='border-b border-[#dbdbdb]'>
                        <td className='flex justify-center items-center h-[64px] w-[190px] bg-[#fafafa] text-[18px] text-[#252525] border-r border-[#dbdbdb]'>Title</td>
                        <td className='w-full px-[15px] py-[10px]'>
                            <input type="text" 
                                    name=''
                                    className='w-full h-10 rounded-md bg-white border border-gray-300 p-[12px]'
                                    placeholder='Please enter the subject'/>
                        </td>
                    </tr>
                    <tr className='border-b border-[#dbdbdb]'>
                        <td className='flex justify-center items-center h-[64px] w-[190px] bg-[#fafafa] text-[18px] text-[#252525] border-r border-[#dbdbdb]'>Score</td>
                        <td className='w-full px-[15px] py-[10px]'>
                            {/* <div className='flex'>
                                <input id="ratingValue" type="number" name="rating" value="" className='hidden'/>
                                <i className="h-[18px] w-[18px] bg-[url('/product_star_ico.png')] mr-2"></i>
                                <i className="h-[18px] w-[18px] bg-[url('/product_star_ico.png')] mr-2"></i>
                                <i className="h-[18px] w-[18px] bg-[url('/product_star_ico.png')] mr-2"></i>
                                <i className="h-[18px] w-[18px] bg-[url('/product_star_ico.png')] mr-2"></i>
                                <i className="h-[18px] w-[18px] bg-[url('/product_star_ico.png')] mr-2"></i>
                            </div> */}
                            <div>

                            <Start />
                            </div>
                        </td>
                    </tr>
                    <tr >
                        <td className='w-full py-[5px]' colSpan={2}>
                            <div>
                                <Editors />
                            </div>
                        </td>
                    </tr>
                    <tr className='border-b border-[#dbdbdb]'>
                        <td className='flex justify-center items-center h-[64px] w-[190px] bg-[#fafafa] text-[18px] text-[#252525] border-r border-[#dbdbdb]'>File Attachment 1</td>
                        <td className='w-full px-[15px] py-[10px]'>
                            <input type="text" 
                                    name=''
                                    className='w-full h-10 rounded-md bg-white border border-gray-300 p-[12px] hidden'
                                    placeholder='Please enter the subject'/>
                            <Upload />
                        </td>
                    </tr>
                    <tr className='border-b border-[#dbdbdb]'>
                        <td className='flex justify-center items-center h-[64px] w-[190px] bg-[#fafafa] text-[18px] text-[#252525] border-r border-[#dbdbdb]'>File Attachment 2</td>
                        <td className='w-full px-[15px] py-[10px]'>
                            <input type="text" 
                                    name=''
                                    className='w-full h-10 rounded-md bg-white border border-gray-300 p-[12px] hidden'
                                    placeholder='Please enter the subject'/>
                            <Upload />
                        </td>
                    </tr>
                    <tr className='border-b border-[#dbdbdb]'>
                        <td className='flex justify-center items-center h-[64px] w-[190px] bg-[#fafafa] text-[18px] text-[#252525] border-r border-[#dbdbdb]'>File Attachment 3</td>
                        <td className='w-full px-[15px] py-[10px]'>
                            <input type="text" 
                                    name=''
                                    className='w-full h-10 rounded-md bg-white border border-gray-300 p-[12px] hidden'
                                    placeholder='Please enter the subject'/>
                            <Upload />
                        </td>
                    </tr>
                    <tr className='border-b border-[#dbdbdb]'>
                        <td className='flex justify-center items-center h-[64px] w-[190px] bg-[#fafafa] text-[18px] text-[#252525] border-r border-[#dbdbdb]'>File Attachment 4</td>
                        <td className='w-full px-[15px] py-[10px]'>
                            <input type="text" 
                                    name=''
                                    className='w-full h-10 rounded-md bg-white border border-gray-300 p-[12px] hidden'
                                    placeholder='Please enter the subject'/>
                            <Upload />
                        </td>
                    </tr>
                    <tr className='border-b border-[#dbdbdb]'>
                        <td className='flex justify-center items-center h-[64px] w-[190px] bg-[#fafafa] text-[18px] text-[#252525] border-r border-[#dbdbdb]'>File Attachment 5</td>
                        <td className='w-full px-[15px] py-[10px]'>
                            <input type="text" 
                                    name=''
                                    className='w-full h-10 rounded-md bg-white border border-gray-300 p-[12px] hidden'
                                    placeholder='Please enter the subject'/>
                            <Upload />
                        </td>
                    </tr>
                    <tr className='border-b border-[#dbdbdb]'>
                        <td className='flex justify-center items-center h-[64px] w-[190px] bg-[#fafafa] text-[18px] text-[#252525] border-r border-[#dbdbdb]'>Secret Posts</td>
                        <td className='w-full px-[15px] py-[10px]'>
                                <div className="flex gap-[35px]">
                                    <div className='flex gap-2 items-center'>
                                            <input className="w-[18px] h-[18px] rounded-full  appearance-none border checked:bg-[url('/checkbox_red.png')] checked:border-0 cursor-pointer" type="radio" id="dis" name="options" />
                                            <label htmlFor="dis" className='text-[16px] font-medium text-[#252525]'>Disclosure</label>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                            <input className="w-[18px] h-[18px] rounded-full  appearance-none border checked:bg-[url('/checkbox_red.png')] checked:border-0 cursor-pointer" type="radio" id="pots" name="options" />
                                            <label htmlFor="pots" className='text-[16px] font-medium text-[#252525]'>Secret Posts</label>
                                    </div>
                                </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="flex mt-[60px] justify-center items-center gap-[10px]">
                   <button className='w-[140px] h-[45px] rounded-[3px] border border-[#dbdbdb]'>
                        <p className='text-[15px] text-[#252525]'>Cancellation</p>
                    </button> 
                    <button className='w-[140px] h-[45px] rounded-[3px] bg-black'>
                        <p className='text-[15px] text-[#fff]'>Registration</p>
                    </button> 
            </div>
        </div>
    </Layout>
    </>
  )
}
