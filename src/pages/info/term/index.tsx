import Layout from '@/components/Layout'
import SubNav from '@/components/SubNav';
import Link from 'next/link'
import { useState } from 'react';


export default function Term() {

  return (
    <>
    <Layout>
        <SubNav title1="Term Of Use"/>
        <div className='inner-container mt-[70px] mb-[325px]'>
            <p className='text-[22px] text-[#252525] font-bold'>TERMS OF USE</p>
            <div className='mt-[25px] border boder-[#dbdbdb] rounded-[10px] p-[30px]'>
                <div>
                    <span className='text-4 text-[#454545] leading-[14px]'>All information and services of this website are controlled and managed by Beauty  and the terms we, us, and our on the site refer to Beauty .
                        By using this website, you accept and agree to the following terms and conditions as well as the Privacy Policy, regardless of the means of access. We suggest you carefully
                        read these terms and conditions before using our website or making any purchase on our site. Beauty Amora reserves the right to update or amend any of the terms and
                        conditions with prior notice via our website.
                    </span>
                    <p className='text-[18px] font-bold text-[#454545] mb-[15px] mt-[30px]'>General Conditions</p>
                    <span className='text-4 text-[#454545] leading-[14px]'>1.  You may not use our products illegally or use them for any unauthorized purposes. <br />
                                2.  Without written permission from us, you may not reproduce, copy or sell any part of the services. <br />
                                3.  You agree that your details may be transmitted unencrypted over different networks. However, credit card information will always be encrypted in transactions. <br />
                                4.  Any violation of the terms may lead to termination of your services.
                    </span>
                    <p className='text-[18px] font-bold text-[#454545] mb-[15px] mt-[30px]'>Provision of Information</p>
                    <span className='text-4 text-[#454545] leading-[14px]'>1. All provided content on this site is for informational purposes only. Without further referring to more complete or primary information sources, the information shall not be
                        used solely for decision making. <br />
                    2.  While Beauty  tries to provide accurate information of the products, the actual colors may vary with the display monitors. <br />
                    3.   We do not guarantee the description, colors, promotions and pricing are free from error. Beauty  may correct or modify any content on the site any time without 
                        prior notice. It is the user&apos;s responsibility to regularly monitor the updates on our site. <br />
                    4.   Beauty  is not a professional medical center and is only dedicated to providing beauty products. We do not offer any answers or advice to medical related
                        questions. We suggest you consult with your physician regarding the use of any products from us if you have any concerns.
                    </span>
                    <p className='text-[18px] font-bold text-[#454545] mb-[15px] mt-[30px]'>Payment Information</p>
                    <span className='text-4 text-[#454545] leading-[14px]'>1.    Prices indicated on the site, which do not include shipping fees, are in AUD. Shipping fees will be charged whenever applicable upon checkout. <br />
                            2.   Prices or delivery charges may change from time to time without advance notice. <br />
                            3.   Although we do our best to keep the prices of the products accurate on the site, errors may occur. In case there is an error in product pricing that you have purchased,
                                we will alert you as soon as possible and provide you with options of confirming the order at the correct price or cancelling it. If we are unable to reach you, your order
                                may be cancelled and refunded via the original payment method you adopted. <br />
                            4.   We currently accept Credit Card payments and the payment options are subject to change to improve the payment experience. For more information, please visit our
                                Payment Information page.
                    </span>
                </div>
            </div>
        </div>
    </Layout>
    </>
  )
}
