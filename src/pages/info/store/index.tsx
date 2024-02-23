import Layout from '@/components/Layout'
import SubNav from '@/components/SubNav';
import Link from 'next/link'
import { useState } from 'react';


export default function Store() {

  return (
    <>
    <Layout>
        <SubNav title1="Store Infomation"/>
        <div className='inner-container mt-[70px] mb-[325px]'>
            <p className='text-[22px] text-[#252525] font-bold'>Returns & Refunds</p>
            <div className='mt-[25px] border boder-[#dbdbdb] rounded-[10px] p-[30px]'>
                <div>
                    <p className='text-[18px] font-bold text-[#454545] mb-[15px] mt-[30px]'>Return Policy</p>
                    <span className='text-4 text-[#454545] leading-[14px] mb-[30px]'>Not satisfied with your item? Just return it to us! You are welcomed to return items within 14 days of receipt.</span>
                    <span className='text-4 text-[#454545] leading-[14px]'>A 14-day* return periods are given to all Beauty  customers. <br />
                    * From the receipt date to request a return of your ordered item. <br />
                    ** Original shipping fees are non-refundable. <br />
                    Returns must be packed and shipped within 7 days of the return authorization date. Please note that our policy only applies to items in brand new condition with its original <br />
                    packaging. Due to hygiene concerns, we do not accept returns used/ opened items for a coupon code or a refund.
                    </span>
                    <span className='text-4 text-[#454545] leading-[14px] mt-[22px]'>Please refer to the below table for the detailed item return timeframe.</span>
                    <p className='text-[18px] font-bold text-[#454545] mb-[15px] mt-[30px]'>How to Initiate a Return</p>
                    <span className='text-4 text-[#454545] leading-[14px] mb-[22px]'>Only returns that are requested 14 days from the receipt date will be accepted. Beauty  reserves the right to refuse any unreasonable requests of return.</span>
                    <span className='text-4 text-[#454545] leading-[14px]'>To request a return, please submit a ticket by stating the order number and return reason. Kindly allow 3-5 business days for your request to be processed and authorized.
                        Please also check your spam folder.
                        Our team will authorize your return and provide you with the return instructions via email. Please return the items in their original condition, unused and free of stains with
                        well-packed packaging.
                        Return shipping fees will be borne by you for the change of mind returns. Please let us know the tracking number once the parcel has been shipped to speed up the return
                        process. In case of wrong or defective items, Beauty will be responsible for the shipping charges. You must return the items via Regular or Registered Air Mail and
                        send a photo of the invoice for the shipping fees for verification.
                        Returns have to be shipped within 7 business days after our authorization of the return. If you do not ship the package within this time frame, your return will be regarded
                        as cancelled.
                        We will issue the refund in coupon code upon receipt of your package. You will receive a confirmation email once the coupon code has been issued. In cases of returning
                        defective or wrong items, Beauty  will offer you a replacement. If replacement items are out of stock, we will refund the item value in the form of a coupon code. <br />
                    </span>
                    <span className='text-4 text-[#fb5151] leading-[14px]'>*For any return cases of orders placed before 10 February 2023 12noon (GMT+11) will need to be shipped to our Hong Kong warehouse. For return cases of orders placed
                            after 10 February 2023 12noon (GMT +11), you may arrange to return your parcel to Australian warehouse</span>
                    <p className='text-[18px] font-bold text-[#454545] mb-[15px] mt-[30px]'>Disclaimer</p>
                    <span className='text-4 text-[#454545] leading-[14px] mb-[22px]'>Please note that the color of an item can vary depending on the lighting during photo-taking or the setting of your screen. Returns will only be accepted for obvious
                        color differences.</span>
                    <p className='text-[18px] font-bold text-[#454545] mb-[15px] mt-[30px]'>Returns & Refunds Terms</p>

                    <span className='text-4 text-[#454545] leading-[14px]'>1. All returns must be sent back to our provided return address. Unauthorized returns will not be accepted. <br />
                    2.  Return items must be in original condition, unused and free of stains in their original packaging. <br />
                    3.   Beauty will re-ship the replacement via Standard Shipping. We reserve the right to choose the re-shipping method. <br />
                    4.   Returns in cases of allergic reactions or adverse skin conditions due to the use of products will not be accepted. <br />
                    5. Beauty is not responsible for the loss of items during transit.. <br />
                    6.  Please indicate your name, order number and return authorization number clearly on the parcel. <br />
                    7.   Coupon discounts and shipping charges of the original shipment are non-refundable. <br />
                    8.   Beauty Amora reserves the right to change our return policies without prior notice. Our decision will be final in case of any disputes.
                    </span>
                </div>
            </div>
        </div>
    </Layout>
    </>
  )
}
