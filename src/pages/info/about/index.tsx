import Layout from '@/components/Layout'
import SubNav from '@/components/SubNav';
import Link from 'next/link'
import { useState } from 'react';


export default function About() {

  return (
    <>
    <Layout>
        <SubNav title1="About Beauty"/>
        <div className='inner-container mt-[70px] mb-[325px]'>
            <p className='text-[22px] text-[#252525] font-bold'>About Beauty</p>
            <div className='mt-[25px] border boder-[#dbdbdb] rounded-[10px] p-[30px]'>
                <p className='text-[18px] font-bold text-[#454545] mb-[15px]'>Our Story</p>
                <div>
                  <span className='text-4 text-[#454545] leading-[14px]'>Beauty  - Where your inner beauty blossoms

                    Dedicated to spotlighting the trendiest products from Asia, Beauty  offers a wide range of quality skincare and beauty to our customers at the most affordable price.

                    Not only can you purchase quality products from us, but you also collaborate with us in promoting beauty brands to customers around the globe with a strong interest
                    in Asian beauty.

                    We are a local company and dispatch shipments directly from our Australian warehouse for the convenience and ease of our customers.

                    It is our delight to share with you the latest trends and offer you as many choices as possible to enhance your style and beauty.

                    Join us to start your new beauty journey!</span>
                                    </div>
            </div>
        </div>
    </Layout>
    </>
  )
}
