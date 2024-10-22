//@ts-nocheck
"use client";
import { useEffect, useState } from "react";
import useGetCart from "@/hooks/useGetCart";
import useLogout from "@/hooks/useLogout";
import { LogOut, ShoppingBag, ShoppingCart } from "lucide-react";
import CartModal from "./CartModal";
import toast from "react-hot-toast";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import usePayment from "@/hooks/usePayment";

const Header = () => {
  const { loading, logout } = useLogout();
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart, setRefetch, refetch } = useGetCart();
  const { error, isLoading, Razorpay } = useRazorpay();
  const { payed } = usePayment();

  useEffect(() => {
    const calculateTotalPrice = () => {
      if (!cart || !cart.items) return 0;
      return cart.items.reduce((total, item) => total + item.price, 0);
    };

    setTotalPrice(calculateTotalPrice());
  }, [cart, refetch]);

  const handlePayment = async () => {
    const response = await fetch(
      "http://localhost:5000/api/order/createOrder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalPrice,
        }),
      }
    );

    const order = await response.json();

    const options: RazorpayOrderOptions = {
      key: "rzp_test_QvpwjtnQlOudJM",
      amount: order.amount,
      currency: "INR",
      name: "ClothShop",
      description: "Test Transaction",
      order_id: order.id,
      handler: (response) => {
        console.log(response);
        payed();
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#5FD2FD",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div className="flex bg-[#353434]/40 backdrop:blur-md h-[100px] items-center pl-[50px] pr-[50px] justify-between">
      <div className="flex items-center text-[40px] font-bold gap-2">
        <img src="Logo.png" className="size-[80px]" />
        <p>ClothHub</p>
      </div>

      <div className="flex gap-4">
        <ShoppingBag
          size={35}
          onClick={() => {
            document.getElementById("my_modal_2").showModal();
            setRefetch(refetch + 1);
          }}
          className="cursor-pointer"
        />
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box z-0">
            <h3 className="font-bold text-lg">
              <p className="flex gap-2" onClick={() => setRefetch(refetch + 1)}>
                <ShoppingCart /> Cart
              </p>
            </h3>
            <div className="max-h-[600px]">
              <div className="flex flex-col gap-4 overflow-auto max-h-[400px]">
                {cart?.items?.map((item) => (
                  <CartModal
                    key={item._id}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    id={item._id}
                  />
                ))}
              </div>
              <p className="flex gap-2 items-center text-[25px]">
                Total Amount: ₹{totalPrice}
              </p>
              <button
                className="btn flex w-full mt-[10px]"
                onClick={() => {
                  handlePayment();
                  document.getElementById("my_modal_2").close();
                }}
              >
                Check Out
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <LogOut size={35} onClick={logout} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
