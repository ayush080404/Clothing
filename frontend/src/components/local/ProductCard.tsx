import useAddToCart from "@/hooks/useAddToCart";
import useGetCart from "@/hooks/useGetCart";
import { ShoppingCart } from "lucide-react";
import React from "react";

interface ProductCardProps {
  name: String;
  price: String;
  image: String;
  id: string;
}

const ProductCard = ({ name, price, image, id }: ProductCardProps) => {
  const { addToCart } = useAddToCart();

  return (
    <div className="flex flex-col w-[300px] bg-black/40 backdrop:blur-md rounded-2xl items-center justify-between cursor-pointer transition-transform duration-300 hover:scale-105">
      <div className="p-[30px]">
        <img
          src={`/api/${image}`}
          alt=""
          className="rounded-2xl object-cover"
        />
      </div>
      <div className="text-[20px] font-bold">
        <p>{name}</p>
        <p className="flex items-center">Price: ₹{price}</p>
        <button
          className="btn mb-[20px]"
          onClick={() => {
            addToCart(id);
          }}
        >
          <ShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
