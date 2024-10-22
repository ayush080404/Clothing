//@ts-nocheck
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetCart = () => {
  const [cart, setCart] = useState([]);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const getCart = async (id: string) => {
      try {
        const data = await fetch(`/api/product/getCart`);
        const res = await data.json();

        if (res.error) {
          throw new Error(res.error);
        }
        setCart(res);
      } catch (err: any) {
        toast.error(err.message);
      }
    };

    getCart();
  }, [refetch]);

  return { cart, setRefetch, refetch };
};

export default useGetCart;
