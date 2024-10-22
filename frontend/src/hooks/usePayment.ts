//@ts-nocheck
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const usePayment = () => {
  const router = useRouter();
  const payed = async () => {
    try {
      const data = await fetch(`/api/product/payed`);
      const res = await data.json();

      if (res.error) {
        throw new Error(res.error);
      }

      toast.success(res.result);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return { payed };
};

export default usePayment;
