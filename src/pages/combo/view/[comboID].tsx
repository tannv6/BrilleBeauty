import { FormEvent, useContext, useRef, useState } from "react";
import Layout from "@/components/Layout";
import SubNav from "@/components/SubNav";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "@/app/globals.css";
import Dropdown from "@/components/Dropdown";
import ComboDetailNav from "@/components/ComboDetailNav";
import Image from "next/image";
import Pagi from "@/components/Pagi";
import Link from "next/link";
import axios from "axios";
import { parse } from "cookie";
import { getSession } from "next-auth/react";
import { log } from "console";
import he from "he";
import { Swiper as SwiperCore } from "swiper/types";
import ReviewDetail from "../../review_detail";
import { useRouter } from "next/router";
import { MyContext } from "@/pages/_app";
import Paginew from "@/components/Paginew";

const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
export const getServerSideProps = async (context: {
  params: any;
  query: any;
  req: any;
}) => {
  const { params, query } = context;
  const { comboID, page, replyID } = params;
  const comboDetail = await axios.get(
    `http://localhost:3000/api/combo/detail`,
    {
      params: { comboID },
    }
  );

  const result1 = await axios.get(
    "http://localhost:3000/api/combo_category/list"
  );

  const result2 = await axios.get("http://localhost:3000/api/season/list");

  const reviewDetail = await axios.get(
    `http://localhost:3000/api/review/list`,
    {
      params: { page, pageSize: 12 },
    }
  );

  const session = await getSession(context);
  const response2 = await axios.get("http://localhost:3000/api/account/info", {
    params: { session: JSON.stringify(session) },
  });

  const replys = await axios.get(
    `http://localhost:3000/api/review/reply_details`,
    {
      params: { replyID },
    }
  );

  const result3 = await axios.get(
    `http://localhost:3000/api/review/reply_list`
  );

  return {
    props: {
      comboDetail: comboDetail.data,
      categoryList: result1.data.data.map((e: any) => ({
        id: e.CategoryID,
        name: e.CategoryName,
        IsSeasonal: e.IsSeasonal || 0,
      })),
      seasonList: result2.data.data.map((e: any) => ({
        id: e.SeasonID,
        name: e.SeasonName,
      })),
      review: reviewDetail.data,
      comboID: comboID,
      userInfo: response2.data,
      reply: replys.data,
      replyList: result3.data,
    },
  };
};
type Props = {
  comboDetail: {
    ComboID: any;
    ComboName: any;
    Description: any;
    InitPrice: any;
    SellPrice: any;
    Quantity: any;
    ComboImage: any;
    CategoryID: any;
    CreatedAt: any;
    UpdatedAt: any;
    DeletedAt: any;
    SaleDate: any;
    SaleEndDate: any;
    IsBigSale: any;
    IsBest: any;
    IsNew: any;
    SeasonID: any;
    Images: any[];
    Highlight: any;
    liked: any;
  };
  categoryList: any;
  seasonList: any;
  review: any;
  comboID: any;
  userInfo: any;
  reply: any;
  replyList: any;
};
export default function Face({
  comboDetail,
  review,
  comboID,
  reply,
  replyList,
  categoryList,
  seasonList,
  userInfo,
}: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [isHeart, setIsHeart] = useState<boolean>(Boolean(comboDetail?.liked));
  const [numProduct, setNumProduct] = useState<number>(1);

  const { data, total, currentPage, pageSize, totalPage } = review;

  const handleChangePage = (page: number) => {
    router.query.page = page.toString();
    router.push(router, undefined, { scroll: false });
  };

  const calculateNewPrice = (price: number, numProduct: number) => {
    return price * numProduct;
  };

  const handleUpdateNumProduct = (type: "plus" | "minus") => {
    if (type === "plus") {
      setNumProduct(numProduct + 1);
    } else {
      setNumProduct(numProduct - 1);
    }
  };

  async function handleAddCart() {
    const response = await axios.get("/api/cart/write", {
      params: { ComboID: comboDetail?.ComboID },
    });

    if (response.status === 201) {
      alert("Add to cart successfully!");
    } else {
      alert("Add to cart failed");
      return;
    }
  }

  const comboImages = comboDetail?.Images;

  const value: any = useContext(MyContext);

  const router = useRouter();

  const handleWriteReview = () => {
    if (!value.isLogin) {
      alert("Please login!");
      router.push("/member/login");
      return;
    }

    router.push(`/write_review?ComboID=${comboDetail.ComboID}`);
  };

  const formatCreatedAt = (createdAt: any) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const totalReviews = review.data.filter(
    (e: any) => e.ComboID === comboID
  ).length;

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure delete this review?")) {
      await axios.put(`/api/review/delete`, { ReviewID: id });
      window.location.reload();
    }
  };

  const handleDeleteReply = async (id: number) => {
    if (confirm("Are you sure delete this reply?")) {
      await axios.put(`/api/review/reply_delete`, { ReplyID: id });
      window.location.reload();
    }
  };

  const [replyDetail, setReply] = useState<{
    ReplyID: any;
    ReviewID: any;
    ProductID: any;
    ComboID: any;
    ReplyDes: any;
  }>({
    ReplyID: reply?.ReplyID,
    ReviewID: reply?.ReviewID || "",
    ProductID: reply?.ProductID || "",
    ComboID: reply?.ComboID || "",
    ReplyDes: reply?.ReplyDes || "",
  });

  const [isEditing, setIsEditing] = useState(false);

  function handleChangeReply(e: any) {
    setReply({ ...replyDetail, [e.target.name]: e.target.value });
  }

  async function handleSubmitReply(
    event: FormEvent<HTMLFormElement>,
    reviewID: any
  ) {
    event.preventDefault();

    const updatedReply = {
      ...replyDetail,
      ComboID: comboDetail.ComboID,
      ProductID: "",
      ReviewID: reviewID,
    };

    let formData = new FormData();

    for (let [key, value] of Object.entries(updatedReply)) {
      formData.append(key, value);
    }
    const response = isEditing
      ? await axios.post("/api/review/reply_update", formData)
      : await axios.post("/api/review/reply_write", formData);
    if (response.status === 201) {
      alert("Reply Sucess!");
      window.location.reload();
    }
  }

  function handleEditReply(replyID: any, replyDes: any) {
    setIsEditing(true);
    setReply((prev) => ({ ...prev, ReplyID: replyID, ReplyDes: replyDes }));
  }

  const handleHeart = async () => {
    await axios.post("/api/interactions/write", {
      ObjectType: "combo",
      ObjectID: comboDetail?.ComboID,
      InteractionType: "like",
    });
    setIsHeart(!isHeart);
  };

  return (
    <Layout>
      <div id="main">
        <SubNav title1={comboDetail?.ComboName} />
        <div className="inner-container mt-[70px] mb-[60px]">
          <div className="flex flex-row justify-between">
            <div className="basis-[556px]">
              <Swiper
                className="w-[556px] select-none"
                loop={true}
                slidesPerView={1}
                modules={[Thumbs, Autoplay]}
                thumbs={{ swiper: thumbsSwiper }}
              >
                {comboImages?.map((image: any, index: number) => (
                  <SwiperSlide key={index}>
                    <div>
                      <Image
                        src={`${CDN_URL}${image.ImageURL}`}
                        alt=""
                        width={556}
                        height={555}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="mt-[10px] mx-auto">
                <Swiper
                  className="w-[556px] select-none swiper_two"
                  modules={[Thumbs]}
                  watchSlidesProgress
                  onSwiper={setThumbsSwiper}
                  slidesPerView={5}
                  spaceBetween={10}
                >
                  {comboImages?.map((image: any, index: number) => {
                    return (
                      <SwiperSlide key={index}>
                        <div>
                          <Image
                            src={`${CDN_URL}${image.ImageURL}`}
                            alt=""
                            width={556}
                            height={555}
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
            <div className="basis-[580px] flex flex-col">
              <div className="pb-5">
                <p className="text-[32px] font-bold">
                  {comboDetail?.ComboName}
                </p>
                <p className="pt-2">
                  <span className="text-[28px] font-bold text-[#ef426f]">
                    A${comboDetail?.InitPrice}
                  </span>
                  <span className="line-through text-lg text-[#999999] pl-3">
                    A${comboDetail?.SellPrice}
                  </span>
                </p>
              </div>
              <hr />
              <div className="py-5">
                <div className="flex">
                  <span className="text-lg min-w-[190px]">Highlight</span>
                  <div className="flex-1">{comboDetail?.Highlight}</div>
                </div>
              </div>
              <hr />
              <div className="py-5">
                <div className="flex items-center justify-between">
                  <div className="max-w-[200px]">
                    <p className="text-[#454545] min-w-[60px]">Quantity</p>
                  </div>
                  <div className="flex flex-row">
                    <button
                      onClick={() => handleUpdateNumProduct("minus")}
                      className="rounded-l w-[33px] h-[33px] bg-[url('/product_detail/product_number_desc_btn.png')]"
                    ></button>
                    <input
                      type="number"
                      value={numProduct}
                      className="pt-1 border border-x-0 text-center min-w-[46px] max-w-[46px] h-[33px] outline-0"
                    />
                    <button
                      onClick={() => handleUpdateNumProduct("plus")}
                      className="rounded-r w-[33px] h-[33px] bg-[url('/product_detail/product_number_asc_btn.png')]"
                    ></button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="pt-5">
                <div className="flex justify-between items-center">
                  <p>
                    <span className="text-lg">Total</span>
                    <span className="text-[#757575] pl-1"></span>
                  </p>
                  <p className="text-[28px] font-bold text-[#ef426f]">
                    A${calculateNewPrice(comboDetail?.SellPrice, numProduct)}
                  </p>
                </div>
                <div className="flex gap-3 pt-5">
                  <button
                    className={`w-14 h-14 shrink-0 rounded ${
                      isHeart
                        ? "bg-[url('/product_detail/product_heart_on_btn.png')]"
                        : "bg-[url('/product_detail/product_heart_btn.png')]"
                    }`}
                    onClick={handleHeart}
                  ></button>
                  <button
                    type="button"
                    onClick={() => handleAddCart()}
                    className="basis-full rounded border border-[#252525]"
                  >
                    Add To Cart
                  </button>
                  <button className="basis-full rounded bg-[#ef426f] text-[#ffffff]">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div id="product_in4" className="mt-[175px] mb-[60px]">
            <ComboDetailNav tab="1" />
          </div>
          <div
            className="justify-center"
            dangerouslySetInnerHTML={{
              __html: he.decode(comboDetail?.Description || ""),
            }}
          />
          <div id="product_rvw" className="mt-[120px] mb-[60px]">
            <ComboDetailNav tab="2" />
          </div>
          <div className="">
            <div className="flex justify-between pb-5">
              <p className="text-xl">
                <span className="font-bold">PRODUCT REVIEWS</span>
                <span className="text-[#757575]">({totalReviews})</span>
              </p>
              <button
                className="w-[130px] h-[35px] border border-[#ef426f] rounded text-[#ef426f] font-medium"
                onClick={handleWriteReview}
              >
                Write review
              </button>
            </div>
            <hr />

            <div className="">
              {review.data
                .filter((e: any) => e.ComboID === comboID)
                .map((e: any) => (
                  <div key={e.ReviewID}>
                    <div className="py-5 flex flex-row border-b border-gray-300">
                      <div className="flex flex-col basis-[80%] ml-5 gap-y-3">
                        <div className="flex gap-0.5">
                          {Array.from({
                            length: Math.min(Math.max(0, e.Start), 5),
                          }).map((_, index) => (
                            <i
                              key={index}
                              className="w-[17px] h-[17px] bg-[url('/product_detail/comment_star_ico_on.png')]"
                            ></i>
                          ))}
                          {Array.from({
                            length: Math.max(
                              0,
                              5 - Math.min(Math.max(0, e.Start), 5)
                            ),
                          }).map((_, index) => (
                            <i
                              key={index + e.Start}
                              className="w-[17px] h-[17px] bg-[url('/product_detail/comment_star_ico_off.png')]"
                            ></i>
                          ))}
                        </div>
                        <p className="text-xl font-medium"></p>
                        <p className="text-[#999999]">{e.Title}</p>
                        <div className="flex items-center gap-[20px]">
                          <span className="font-medium text-[17px]">
                            {e.UserName && e.UserName}
                          </span>
                          <span className="font-medium text-[17px]">
                            {formatCreatedAt(e.CreatedAt)}
                          </span>
                        </div>
                        <div
                          className="text-[15px] text-[#999999] pl-3"
                          dangerouslySetInnerHTML={{
                            __html: he.decode(e.ReviewDes),
                          }}
                        />
                        <div className="flex gap-[10px]">
                          {e.Img1 && (
                            <Image
                              src={`${CDN_URL}${e.Img1}`}
                              alt=""
                              width={110}
                              height={110}
                            />
                          )}
                          {e.Img2 && (
                            <Image
                              src={`${CDN_URL}${e.Img2}`}
                              alt=""
                              width={110}
                              height={110}
                            />
                          )}
                          {e.Img3 && (
                            <Image
                              src={`${CDN_URL}${e.Img3}`}
                              alt=""
                              width={110}
                              height={110}
                            />
                          )}
                          {e.Img4 && (
                            <Image
                              src={`${CDN_URL}${e.Img4}`}
                              alt=""
                              width={110}
                              height={110}
                            />
                          )}
                          {e.Img5 && (
                            <Image
                              src={`${CDN_URL}${e.Img5}`}
                              alt=""
                              width={110}
                              height={110}
                            />
                          )}
                        </div>
                        <div className="flex gap-[10px] hidden">
                          <button className="w-[140px] h-[36px] bg-[url('/product_detail/comment_show_btn.png')] rounded-[5px] text-[15px] text-[#757575] pl-3 pt-0.5">
                            COMMENT
                          </button>
                          <button className="w-[140px] h-[36px] rounded-[5px] text-[15px] text-[#757575] border">
                            WRITE COMMENT
                          </button>
                        </div>
                      </div>
                      <div className="flex basis-[20%] items-start justify-end gap-[10px]">
                        {userInfo &&
                          userInfo.CustomerID !== null &&
                          e.UserID === userInfo.CustomerID && (
                            <>
                              <Link
                                href={`/write_review/${e.ReviewID}?ComboID=${comboDetail.ComboID}`}
                                className="flex items-center justify-center w-[100px] h-7 text-[15px] text-[#999999] border rounded"
                              >
                                {" "}
                                EDIT
                              </Link>
                              <button
                                type="button"
                                className="w-[100px] h-7 text-[15px] text-[#999999] border rounded"
                                onClick={() => handleDelete(e.ReviewID)}
                              >
                                DELETE
                              </button>
                            </>
                          )}
                      </div>
                    </div>
                    {replyList.data
                      .filter((e1: any) => e1.ReviewID === e.ReviewID)
                      .map((e1: any, key1: any) => (
                        <div
                          className="min-h-[104px] bg-[#fafafa] px-5 mb-8"
                          key={key1}
                        >
                          <div className="py-[25px] flex justify-between">
                            <p className="font-bold">
                              Administrator Reply
                              <span className="pl-6 text-[15px] text-[#999999] font-normal">
                                {formatCreatedAt(e1.CreatedAt)}
                              </span>
                            </p>
                            <div className="flex basis-[20%] items-start justify-end gap-[10px]">
                              {userInfo &&
                                userInfo.CustomerID !== null &&
                                userInfo.UserName === "thoai" && (
                                  <>
                                    <button
                                      type="button"
                                      className="flex items-center justify-center w-[100px] h-7 text-[15px] text-[#999999] border rounded"
                                      onClick={() =>
                                        handleEditReply(e1.ReplyID, e1.ReplyDes)
                                      }
                                    >
                                      EDIT
                                    </button>
                                    <button
                                      type="button"
                                      className="w-[100px] h-7 text-[15px] text-[#999999] border rounded"
                                      onClick={() =>
                                        handleDeleteReply(e1.ReplyID)
                                      }
                                    >
                                      DELETE
                                    </button>
                                  </>
                                )}
                            </div>
                          </div>
                          <p className="mt-2 text-[15px] pb-[15px] pr-[100px]">
                            {e1.ReplyDes}
                          </p>
                        </div>
                      ))}
                    <form
                      onSubmit={(event) => handleSubmitReply(event, e.ReviewID)}
                    >
                      {userInfo &&
                        userInfo.CustomerID !== null &&
                        userInfo.UserName === "thoai" && (
                          <div className="flex items-center justify-center h-[123px] bg-[#f9f9f9] border-b">
                            <div className="flex w-[1131px] h-[82px]">
                              <input
                                type="text"
                                name="ReplyDes"
                                value={replyDetail.ReplyDes}
                                onChange={handleChangeReply}
                                placeholder="Please enter your reply."
                                className="focus:outline-none placeholder:text-lg p-5 pt-3 border rounded-l-[5px] grow resize-none"
                              />
                              <button
                                type="submit"
                                className="w-[120px] rounded-r bg-[#ef426f] text-lg text-[#ffffff]"
                              >
                                OK
                              </button>
                            </div>
                          </div>
                        )}
                    </form>
                  </div>
                ))}
              <hr />

              {data.length ? (
                <>
                  <Paginew
                    tP={totalPage}
                    cP={currentPage}
                    tE={total}
                    per={10}
                    onChange={handleChangePage}
                  ></Paginew>
                </>
              ) : (
                ``
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
