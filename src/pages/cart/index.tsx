import Layout from "@/components/Layout";
import ProductRelated from "@/components/ProductRelated";
import SubNav from "@/components/SubNav";
import axios from "axios";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { CDN_URL } from "@/utils/constants";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { DataDispatchContext } from "../_app";

export const getServerSideProps = async (context: any) => {
  const session: any = await getSession(context);

  const customerID = session?.user?.id;
  const carts = await axios.get(`http://localhost:3000/api/cart/list`, {
    params: { customerID: customerID },
  });
  const customerDetail = await axios.get(
    `http://localhost:3000/api/customers/detail`,
    {
      params: { customerID },
    }
  );
  return {
    props: {
      cartList: carts.data,
      customerDetail: customerDetail.data,
    },
  };
};

export default function EyesLips({ cartList }: any) {
  const dispatch: any = useContext(DataDispatchContext);
  const [carts, setCarts] = useState<[]>(cartList);

  const router = useRouter();

  let obj: any = {};
  carts?.forEach((cart: any) => {
    obj[cart.CartID] = cart.Quantity;
  });

  const [NumProduct, setNumProduct] = useState<{ [key: number]: number }>(obj);
  const [checkboxes, setCheckboxes] = useState<{ [key: number]: boolean }>({});
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [checkAll, setCheckAll] = useState<boolean>(false);

  const updateNumProduct = async (
    id: number,
    value: number,
    isCheck: boolean,
    action: string,
    price: number
  ) => {
    const response = await axios.post("/api/cart/set_quantity", {
      count: value,
      CartID: id,
    });
    setNumProduct((prevNumProducts) => ({
      ...prevNumProducts,
      [id]: value,
    }));

    if (isCheck) {
      if (action == "+") {
        setTotalNumber((totalNumber) => totalNumber + 1);
        setTotalPrice((totalPrice) => totalPrice + price);
      } else if (action == "-" && NumProduct[id] > 1) {
        setTotalNumber((totalNumber) => totalNumber - 1);
        setTotalPrice((totalPrice) => totalPrice - price);
      } else if (action == "") {
        setTotalNumber((totalNumber) => totalNumber - NumProduct[id] + value);
        setTotalPrice(
          (totalPrice) => totalPrice - NumProduct[id] * price + value * price
        );
      }
    }
  };

  const changeCheckboxes = (id: number, value: boolean, price: number) => {
    setCheckboxes((prevNumProducts) => ({
      ...prevNumProducts,
      [id]: value,
    }));

    if (value) {
      setTotalNumber((totalNumber) => totalNumber + NumProduct[id]);
      setTotalPrice((totalPrice) => totalPrice + price);
    } else {
      setTotalNumber((totalNumber) =>
        Math.max(totalNumber - NumProduct[id], 0)
      );
      setTotalPrice((totalPrice) => Math.max(totalPrice - price, 0));
    }
  };

  const selectAllCart = () => {
    setCheckAll(!checkAll);
    if (checkAll) {
      setTotalNumber(0);
      setTotalPrice(0);
      carts?.forEach((cart: any) => {
        changeCheckboxes(
          cart?.CartID,
          false,
          Number(cart?.PoSellPrice || cart?.SellPrice) *
            NumProduct[cart?.CartID]
        );
      });
    } else {
      carts?.forEach((cart: any) => {
        changeCheckboxes(
          cart?.CartID,
          true,
          Number(cart?.PoSellPrice || cart?.SellPrice) *
            NumProduct[cart?.CartID]
        );
      });
    }
  };

  const paymentProduct = async () => {
    const selectCartLength = Object.entries(checkboxes).length;

    if (selectCartLength <= 0) {
      alert("Please select at least 1 product!");
      return;
    }
    const res = await axios.post("/api/orders/write", {
      TotalAmount: totalPrice,
      CartList: Object.entries(checkboxes)
        .filter(([key, value]) => !!value)
        .map(([key, value]) => key)
        .join(","),
    });
    router.push(`/payment/${res.data?.OrdersCode}`);
  };

  const handleDeleteCart = async (
    id: number,
    isCheck: boolean,
    price: number
  ) => {
    if (
      confirm("Are you sure you want to remove the product from your cart?") ==
      false
    ) {
      return;
    }
    const response = await axios.get("/api/cart/delete", {
      params: { CartID: id },
    });

    if (response.status === 201) {
      dispatch({
        type: "UPDATE_CART_COUNT",
        payload: -1,
      });

      setCarts(response.data);

      if (isCheck) {
        setTotalNumber((totalNumber) => totalNumber - NumProduct[id]);
        setTotalPrice((totalPrice) => totalPrice - NumProduct[id] * price);
      }
    } else {
      alert("Product deletion failed!");
      return;
    }
  };

  const cartElement = carts?.map((cart: any) => (
    <tr className="border-b" key={cart.CartID}>
      <td className="py-5 px-5">
        <input
          onChange={() => {
            changeCheckboxes(
              cart?.CartID,
              !checkboxes[cart?.CartID],
              (cart?.PoSellPrice || cart?.SellPrice) * NumProduct[cart?.CartID]
            );
          }}
          checked={checkboxes[cart?.CartID]}
          className="w-5 h-5 rounded appearance-none border checked:bg-[url('/checkbox_custome.png')]"
          type="checkbox"
        />
      </td>
      <td className="py-5">
        <div className="flex items-center gap-[25px]">
          <Image
            className="rounded"
            src={`${CDN_URL}${cart?.ProductImage || ""}`}
            width={100}
            height={100}
            alt=""
          ></Image>
          <div className="flex flex-col pr-8">
            <p>{cart?.ProductName}</p>
            <p className="text-[15px] text-[#999999]">- [{cart?.PotName}]</p>
          </div>
        </div>
      </td>
      <td className="text-center py-5 text-[#757575]">{cart?.PoName}</td>
      <td className="py-5">
        <div className="flex flex-row justify-center">
          <button
            onClick={() => {
              updateNumProduct(
                cart?.CartID,
                Math.max((NumProduct[cart?.CartID] || 1) - 1, 1),
                checkboxes[cart?.CartID],
                "-",
                Number(cart?.PoSellPrice || cart?.SellPrice)
              );
            }}
            className="rounded-l w-[33px] h-[33px] bg-[url('/product_detail/product_number_desc_btn.png')]"
          ></button>
          <input
            type="number"
            value={NumProduct[cart?.CartID] || 1}
            onChange={(e) => {
              updateNumProduct(
                cart?.CartID,
                Number(e.target.value) || 1,
                checkboxes[cart?.CartID],
                "",
                Number(cart?.PoSellPrice || cart?.SellPrice)
              );
            }}
            className="pt-1 border border-x-0 text-center min-w-[46px] max-w-[46px] h-[33px] outline-0"
          />
          <button
            onClick={() => {
              updateNumProduct(
                cart?.CartID,
                (NumProduct[cart?.CartID] || 1) + 1,
                checkboxes[cart?.CartID],
                "+",
                Number(cart?.PoSellPrice || cart?.SellPrice)
              );
            }}
            className="rounded-r w-[33px] h-[33px] bg-[url('/product_detail/product_number_asc_btn.png')]"
          ></button>
        </div>
      </td>
      <td className="py-5 text-xl font-bold text-center">
        A${(cart?.PoSellPrice || cart?.SellPrice) * NumProduct[cart?.CartID]}
      </td>
      <td className="py-5 text-right">
        <button
          onClick={() => {
            handleDeleteCart(
              cart?.CartID,
              checkboxes[cart?.CartID],
              Number(cart?.PoSellPrice || cart?.SellPrice)
            );
          }}
          className="w-[33px] h-[33px] rounded bg-[url('/cart/product_delete_btn.png')]"
        ></button>
      </td>
    </tr>
  ));
  return (
    <Layout>
      <div id="main">
        <SubNav title1="MyCart" />
        <div className="inner-container mt-[75px] mb-[155px]">
          <p className="text-[22px] font-bold pb-[25px]">MY CART</p>
          <table className="table-auto min-w-full">
            <colgroup>
              <col className="w-[5%]" />
              <col className="w-[35%]" />
              <col className="w-[20%]" />
              <col className="w-[20%]" />
              <col className="w-[17%]" />
              <col className="w-[3%]" />
            </colgroup>
            <thead className="h-[80px] border-b border-t border-t-black text-lg">
              <tr>
                <th colSpan={2} className="text-start">
                  Product
                </th>
                <th>Volume / Weight</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>{cartElement}</tbody>
          </table>
          <div className="mt-[50px] flex flex-col items-end">
            <div className="flex items-center gap-[115px] w-full">
              <button
                onClick={() => {
                  selectAllCart();
                }}
                className="mr-auto ml-4 text-lg w-[144px] h-[36px] rounded border border-[#dbdbdb]"
              >
                {checkAll ? "Unselect all" : "Select all"}
              </button>
              <p className="text-[18px]">
                Total Payment{" "}
                <span className="text-base text-[#757575]">
                  ({totalNumber} Products):
                </span>
              </p>
              <p className="text-[30px] text-[#ef426f]">A${totalPrice}</p>
            </div>
            <div className="flex mt-[40px] gap-[10px]">
              <button
                onClick={() => {
                  router.push("/products/category/1");
                }}
                className="w-[252px] h-[56px] border border-black rounded text-lg"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  paymentProduct();
                }}
                className="w-[252px] h-[56px] rounded bg-[#ef426f] text-[#ffffff] text-lg"
              >
                Purchase
              </button>
            </div>
          </div>
          <p className="text-center mt-[140px] mb-[50px] text-xl font-bold">
            SHOP MORE TO ENJOY FREE SHIPPING
          </p>
          <ProductRelated></ProductRelated>
        </div>
      </div>
    </Layout>
  );
}
