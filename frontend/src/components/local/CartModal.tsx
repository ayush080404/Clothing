//@ts-nocheck
import useRemoveFromCart from "@/hooks/useRemoveFromCart";
import { Trash2 } from "lucide-react";
import React from "react";

const CartModal = ({ name, image, price, id }) => {
  const { removeFromCart } = useRemoveFromCart();

  return (
    <div className="flex justify-between">
      <div className="flex w-[200px] h-[200px] justify-center">
        <img
          src={`/api/${image}`}
          alt=""
          className="object-cover rounded-2xl"
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end justify-center">
          <p>{name}</p>
          <p className="flex items-center">Price: ₹{price}</p>
        </div>
        <Trash2
          className="cursor-pointer"
          onClick={() => {
            removeFromCart(id);
          }}
        />
      </div>
    </div>
  );
};

export default CartModal;
