//@ts-nocheck
import toast from "react-hot-toast";

const useAddToCart = () => {
  const addToCart = async (id: string) => {
    try {
      const data = await fetch(`/api/product/addProduct/${id}`);
      const res = await data.json();

      if (res.error) {
        throw new Error(res.error);
      }

      toast.success(res.result);
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return { addToCart };
};

export default useAddToCart;
