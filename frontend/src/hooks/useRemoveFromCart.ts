//@ts-nocheck
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useRemoveFromCart = () => {
  const removeFromCart = async (id: string) => {
    try {
      const data = await fetch(`/api/product/removeFromCart/${id}`);
      const res = await data.json();

      if (res.error) {
        throw new Error(res.error);
      }

      toast.success(res.result);
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return { removeFromCart };
};

export default useRemoveFromCart;
