/* eslint-disable react/jsx-no-undef */
import React, { FormEvent, useState } from 'react';
import Layout from '@/components/Layout'
import SubNav from '@/components/SubNav';
import Upload from '@/components/Upload';
import Start from '@/components/Start';
import dynamic from 'next/dynamic';
import axios from "axios";
import { useRouter } from "next/router";
import he from "he";

const CustomEditor = dynamic(
    () => {
      return import("@/components/CkEditor");
    },
    { ssr: false }
  );

  export const getServerSideProps = async (context: { params: any }) => {
    const { params } = context;
    const { reviewID } = params;
    const reviewDetail = await axios.get(
      `http://localhost:3000/api/review/details`,
      {
        params: { reviewID },
      }
    );

  
    return {
      props: {
        reviewDetail: reviewDetail.data,
      },
    };
  };

function ReviewWrites({reviewDetail} : any) {
    // const [addData, setVal] = useState("");
    // const [addedData, showData] = useState(0);
    // const handleChange = (e: any,editor: { getData: () => any; }) => {
    //   const data = editor.getData();
    //   setVal(data);
    // }

    const router = useRouter();
    const [review, setReview] = useState<{
        ReviewID: any;
        UserName: any;
        UserID: any;
        ProductID: any;
        Title: any;
        ReviewDes: any;
        Start: any;
        Img1: any;
        Img2: any;
        Img3: any;
        Img4: any;
        Img5: any;
    }>({
        ReviewID: reviewDetail?.ReviewID,
        UserName: reviewDetail?.UserName,
        UserID: reviewDetail?.UserID,
        ProductID: reviewDetail?.ProductID,
        Title: reviewDetail?.Title,
        ReviewDes: reviewDetail?.ReviewDes,
        Start: reviewDetail?.Start,
        Img1: reviewDetail?.Img1,
        Img2: reviewDetail?.Img2,
        Img3: reviewDetail?.Img3,
        Img4: reviewDetail?.Img4,
        Img5: reviewDetail?.Img5,
    });

        function handleChange(e: any) {
        if (e.target.files) {
          setReview({ ...review, [e.target.name]: e.target.files[0] });
        } else {
          setReview({ ...review, [e.target.name]: e.target.value });
        }
      }

      async function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
    
        let formData = new FormData();
    
        for (let [key, value] of Object.entries(review)) {
          formData.append(key, value);
        }
        let response;
          response = await axios.post("http://localhost:3000/api/review/write", formData);
        if (response.status === 201) {
            router.push("/product_detail");
          }
    }


  return (
    <>
    <Layout>
        <SubNav title1="Write Review"/>
        <div className='inner-container mt-[70px] mb-[170px]'>
            <h2 className='text-[36px] text-[#252525] font-bold mb-[35px]'>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="UserName" />
                <input type="hidden" name="UserID" />
                <input type="hidden" name="ProductID" />
                <input type="hidden" name="Img1" />
                <input type="hidden" name="Img2" />
                <input type="hidden" name="Img3" />
                <input type="hidden" name="Img4" />
                <input type="hidden" name="Img5" />
                <input type="hidden" name="Start" />
                <table className='mb-[55px] border-t border-[#252525]'>
                    <tbody>
                        <tr className='border-b border-[#dbdbdb]'>
                            <td className='flex justify-center items-center h-[64px] w-[190px] bg-[#fafafa] text-[18px] text-[#252525] border-r border-[#dbdbdb]'>Title</td>
                            <td className='w-full px-[15px] py-[10px]'>
                                <input type="text" 
                                        name="Title"
                                        id="Title"
                                        onChange={handleChange}
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
                                    <CustomEditor name="ReviewDes" value={he.decode(reviewDetail?.ReviewDes || "")} onChange={handleChange} />
                                </div>
                            </td>
                        </tr>
                        <tr className='border-b border-[#dbdbdb]'>
                            <td className='flex justify-center items-center h-[64px] w-[190px] bg-[#fafafa] text-[18px] text-[#252525] border-r border-[#dbdbdb]'>File Attachment 1</td>
                            <td className='w-full px-[15px] py-[10px]'>
                                <input type="text" 
                                        id=""
                                        className='w-full h-10 rounded-md bg-white border border-gray-300 p-[12px] hidden'
                                        placeholder='Please enter the subject'/>
                                <Upload />
                            </td>
                        </tr>
                        <tr className='border-b border-[#dbdbdb]'>
                            <td className='flex justify-center items-center h-[64px] w-[190px] bg-[#fafafa] text-[18px] text-[#252525] border-r border-[#dbdbdb]'>File Attachment 2</td>
                            <td className='w-full px-[15px] py-[10px]'>
                                <input type="text" 
                                        className='w-full h-10 rounded-md bg-white border border-gray-300 p-[12px] hidden'
                                        placeholder='Please enter the subject'/>
                                <Upload />
                            </td>
                        </tr>
                        <tr className='border-b border-[#dbdbdb]'>
                            <td className='flex justify-center items-center h-[64px] w-[190px] bg-[#fafafa] text-[18px] text-[#252525] border-r border-[#dbdbdb]'>File Attachment 3</td>
                            <td className='w-full px-[15px] py-[10px]'>
                                <input type="text" 
                                        className='w-full h-10 rounded-md bg-white border border-gray-300 p-[12px] hidden'
                                        placeholder='Please enter the subject'/>
                                <Upload />
                            </td>
                        </tr>
                        <tr className='border-b border-[#dbdbdb]'>
                            <td className='flex justify-center items-center h-[64px] w-[190px] bg-[#fafafa] text-[18px] text-[#252525] border-r border-[#dbdbdb]'>File Attachment 4</td>
                            <td className='w-full px-[15px] py-[10px]'>
                                <input type="text" 
                                        className='w-full h-10 rounded-md bg-white border border-gray-300 p-[12px] hidden'
                                        placeholder='Please enter the subject'/>
                                <Upload />
                            </td>
                        </tr>
                        <tr className='border-b border-[#dbdbdb]'>
                            <td className='flex justify-center items-center h-[64px] w-[190px] bg-[#fafafa] text-[18px] text-[#252525] border-r border-[#dbdbdb]'>File Attachment 5</td>
                            <td className='w-full px-[15px] py-[10px]'>
                                <input type="text" 
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
                                                <input className="w-[18px] h-[18px] rounded-full  appearance-none border checked:bg-[url('/checkbox_red.png')] checked:border-0 cursor-pointer" type="radio" id="dis" name="" />
                                                <label htmlFor="dis" className='text-[16px] font-medium text-[#252525]'>Disclosure</label>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                                <input className="w-[18px] h-[18px] rounded-full  appearance-none border checked:bg-[url('/checkbox_red.png')] checked:border-0 cursor-pointer" type="radio" id="pots" name="" />
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
                        <button 
                            type="submit"
                            className='w-[140px] h-[45px] rounded-[3px] bg-black'>
                            <p className='text-[15px] text-[#fff]'>Registration</p>
                        </button> 
                </div>
            </form>
        </div>
    </Layout>
    </>
  )
}
export default ReviewWrites;