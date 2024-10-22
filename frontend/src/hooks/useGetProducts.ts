import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  const [gender, setGender] = useState();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const url = gender
          ? `/api/product/getProducts?gender=${gender}`
          : `/api/product/getProducts`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setProducts(data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    // Fetch products when the gender changes
    getProducts();
  }, [gender]); // Re-run the effect when gender changes

  return {
    products,
    setGender, // Return setGender so it can be used externally
  };
};

export default useGetProducts;
