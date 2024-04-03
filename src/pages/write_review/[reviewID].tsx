/* eslint-disable react/jsx-no-undef */
import React, { FormEvent, useState } from 'react';
import Layout from '@/components/Layout'
import SubNav from '@/components/SubNav';
import dynamic from 'next/dynamic';
import axios from "axios";
import { useRouter } from "next/router";
import he from "he";
import { getSession } from "next-auth/react";
import { CDN_URL } from '@/utils/constants';

const CustomEditor = dynamic(
    () => {
      return import("@/components/CkEditor");
    },
    { ssr: false }
  );


  export const getServerSideProps = async (context: { params: any, req : any }) => {
    const { params, req } = context;
    const { reviewID } = params;

    const session : any = await getSession({ req });

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

function ReviewWrite({reviewDetail, isNew} : any) {
    const router = useRouter();
    const { ProductID } = router.query;

    const [hoveredStar, setHoveredStar] = useState(0);
    const [selectedStar, setSelectedStar] = useState(reviewDetail?.Start || 0);

    const handleMouseEnter = (num : number) => {
        setHoveredStar(num);
    };

    const handleMouseLeave = () => {
        setHoveredStar(0);
    };

    const handleStarClick = (num : number) => {
        setSelectedStar(num);
    };

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
        FileName1: any;
        FileName2: any;
        FileName3: any;
        FileName4: any;
        FileName5: any;
        Post: any;
    }>({
        ReviewID: reviewDetail?.ReviewID || "",
        UserName: reviewDetail?.UserName,
        UserID: reviewDetail?.UserID,
        ProductID: reviewDetail?.ProductID || "",
        Title: reviewDetail?.Title || "",
        ReviewDes: reviewDetail?.ReviewDes || "",
        Start: selectedStar,
        Img1: reviewDetail?.Img1 || "",
        Img2: reviewDetail?.Img2 || "",
        Img3: reviewDetail?.Img3 || "",
        Img4: reviewDetail?.Img4 || "",
        Img5: reviewDetail?.Img5 || "",
        FileName1: reviewDetail?.FileName1 || "",
        FileName2: reviewDetail?.FileName2 || "",
        FileName3: reviewDetail?.FileName3 || "",
        FileName4: reviewDetail?.FileName4 || "",
        FileName5: reviewDetail?.FileName5 || "",
        Post: reviewDetail?.Post || "Y",
    });

    const handleDisSelect = () => {
        setReview({ ...review, Post: 'Y' });
      };
    
    const handlePotsSelect = () => {
    setReview({ ...review, Post: 'N' });
    };
    function handleChange(e: any) {
    if (e.target.files) {
        const file = e.target.files[0];
        const fieldName = e.target.name;
        const reader = new FileReader();
        reader.onloadend = () => {
        const fileName = file.name; 
        setReview({ ...review, [fieldName]: file, [`FileName${fieldName.slice(-1)}`]: fileName });
        };
        reader.readAsDataURL(file);
    } else {
        setReview({ ...review, [e.target.name]: e.target.value });
    }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    const updatedReview = { ...review, Start: selectedStar, ProductID: ProductID };

    let formData = new FormData();

    for (let [key, value] of Object.entries(updatedReview)) {
        formData.append(key, value);
    }
    let response;
    if(isNew) {
        response = await axios.post("/api/review/write", formData);
    } else {
        response = await axios.post("/api/review/update", formData);
    }
    if (response.status === 201) {
        alert("Review Sucess!");
        window.history.back();
        }
    }


  return (
    <>
    <Layout>
        <SubNav title1="Write Review"/>
        <div className='inner-container mt-[70px] mb-[170px]'>
            <h2 className='text-[36px] text-[#252525] font-bold mb-[35px]'>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <table className='mb-[55px] border-t border-[#252525]'>
                    <tbody>
                        <tr className='border-b border-[#dbdbdb]'>
                            <td className='flex justify-center items-center h-[64px] w-[190px] bg-[#fafafa] text-[18px] text-[#252525] border-r border-[#dbdbdb]'>Title</td>
                            <td className='w-full px-[15px] py-[10px]'>
                                <input type="text" 
                                        name="Title"
                                        value={review.Title}
                                        onChange={handleChange}
                                        className='w-full h-10 bg-white border border-gray-300 p-[12px]'
                                        placeholder='Please enter the subject'/>
                            </td>
                        </tr>
                        <tr className='border-b border-[#dbdbdb]'>
                            <td className='flex justify-center items-center h-[64px] w-[190px] bg-[#fafafa] text-[18px] text-[#252525] border-r border-[#dbdbdb]'>Score</td>
                            <td className='w-full px-[15px] py-[10px]'>
                                <div>
                                <div className="star-container flex gap-[3px]">
                                        {[1, 2, 3, 4, 5].map((index) => (
                                            <div
                                                key={index}
                                                className={index <= (selectedStar || hoveredStar) ? 'img_star' : 'img_star_none'}
                                                onMouseEnter={() => handleMouseEnter(index)}
                                                onMouseLeave={handleMouseLeave}
                                                onClick={() => handleStarClick(index)}
                                                data-start={index}
                                            />
                                        ))}
                                    </div>
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
                            <td className='flex justify-center items-center h-[74px] w-[190px] bg-[#fafafa] text-[18px] text-[#252525] border-r border-[#dbdbdb]'>File Attachment 1</td>
                            <td className='w-full px-[15px] pt-[10px]'>
                                <input type="file" 
                                        name="Img1"
                                        className='w-full h-10 bg-white'
                                        placeholder='Please enter the subject'
                                        onChange={handleChange}
                                        />
                                {review.ReviewID && review.Img1 && <span>{review.FileName1}</span>}
                            </td>
                        </tr>
                        <tr className='border-b border-[#dbdbdb]'>
                            <td className='flex justify-center items-center h-[74px] w-[190px] bg-[#fafafa] text-[18px] text-[#252525] border-r border-[#dbdbdb]'>File Attachment 2</td>
                            <td className='w-full px-[15px] pt-[10px]'>
                                <input type="file" 
                                        name="Img2"
                                        className='w-full h-10 bg-white'
                                        placeholder='Please enter the subject'
                                        onChange={handleChange}
                                        />
                                {review.ReviewID && review.Img2 && <span>{review.FileName2}</span>}
                            </td>
                        </tr>
                        <tr className='border-b border-[#dbdbdb]'>
                            <td className='flex justify-center items-center h-[74px] w-[190px] bg-[#fafafa] text-[18px] text-[#252525] border-r border-[#dbdbdb]'>File Attachment 3</td>
                            <td className='w-full px-[15px] pt-[10px]'>
                                <input type="file" 
                                        name="Img3"
                                        className='w-full h-10 bg-white'
                                        placeholder='Please enter the subject'
                                        onChange={handleChange}
                                        />
                                {review.ReviewID && review.Img3 && <span>{review.FileName3}</span>}
                            </td>
                        </tr>
                        <tr className='border-b border-[#dbdbdb]'>
                            <td className='flex justify-center items-center h-[74px] w-[190px] bg-[#fafafa] text-[18px] text-[#252525] border-r border-[#dbdbdb]'>File Attachment 4</td>
                            <td className='w-full px-[15px] pt-[10px]'>
                                <input  name="Img4"
                                        className='w-full h-10 bg-white'
                                        placeholder='Please enter the subject'
                                        onChange={handleChange}
                                        type="file"
                                        />
                                {review.ReviewID && review.Img4 && <span>{review.FileName4}</span>}
                            </td>
                        </tr>
                        <tr className='border-b border-[#dbdbdb]'>
                            <td className='flex justify-center items-center h-[74px] w-[190px] bg-[#fafafa] text-[18px] text-[#252525] border-r border-[#dbdbdb]'>File Attachment 5</td>
                            <td className='w-full px-[15px] pt-[10px]'>
                                <input type="file" 
                                        name="Img5"
                                        className='w-full h-10 bg-white'
                                        placeholder='Please enter the subject'
                                        onChange={handleChange}
                                        />
                                {review.ReviewID && review.Img5 && <span>{review.FileName5}</span>}
                            </td>
                        </tr>
                        <tr className='border-b border-[#dbdbdb]'>
                            <td className='flex justify-center items-center h-[64px] w-[190px] bg-[#fafafa] text-[18px] text-[#252525] border-r border-[#dbdbdb]'>Secret Posts</td>
                            <td className='w-full px-[15px] py-[10px]'>
                                    <div className="flex gap-[35px]">
                                        <div className='flex gap-2 items-center'>
                                                <input 
                                                    className="w-[18px] h-[18px] rounded-full  appearance-none border checked:bg-[url('/checkbox_red.png')] checked:border-0 cursor-pointer" 
                                                    type="radio" 
                                                    id="dis" 
                                                    name="postType"
                                                    checked={!review.Post || review.Post === 'Y'} 
                                                        onChange={handleDisSelect}  />
                                                <label htmlFor="dis" className='text-[16px] font-medium text-[#252525]'>Disclosure</label>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                                <input className="w-[18px] h-[18px] rounded-full  appearance-none border checked:bg-[url('/checkbox_red.png')] checked:border-0 cursor-pointer" 
                                                type="radio" 
                                                id="pots" 
                                                name="postType" 
                                                checked={review.Post === 'N'}
                                                onChange={handlePotsSelect}
                                                />
                                                <label htmlFor="pots" className='text-[16px] font-medium text-[#252525]'>Secret Posts</label>
                                        </div>
                                    </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex mt-[60px] justify-center items-center gap-[10px]">
                        <button type="button"
                                className='w-[140px] h-[45px] rounded-[3px] border border-[#dbdbdb]' 
                                onClick={() => window.history.back()}
                        >
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
export default ReviewWrite;