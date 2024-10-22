"use client";
import Header from "@/components/local/Header";
import ProductCard from "@/components/local/ProductCard";
import useGetProducts from "@/hooks/useGetProducts";

interface ProductCardProps {
  //@ts-expect-error
  _id: Key;
  name: String;
  price: String;
  image: String;
  id: String;
}

const Page = () => {
  const { setGender, products } = useGetProducts();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex justify-center items-center mt-[10px]">
        <img
          src="/banner.jpg"
          alt=""
          className="w-[1700px] h-[300px] rounded-3xl object-cover object-center"
        />
      </div>

      <div className="flex flex-col justify-center items-center mt-[10px]">
        <div className="flex gap-4">
          <button
            className="btn w-[200px] h-[200px] rounded-2xl"
            //@ts-expect-error
            onClick={() => setGender("Unisex")}
          >
            <img src="/unisex.png" alt="" />
            Both
          </button>
          <button
            className="btn w-[200px] h-[200px] rounded-2xl"
            //@ts-expect-error
            onClick={() => setGender("Men")}
          >
            <img src="/man.png" alt="" />
            Men
          </button>
          <button
            className="btn w-[200px] h-[200px] rounded-2xl"
            //@ts-expect-error
            onClick={() => setGender("Women")}
          >
            <img src="/woman.png" alt="" />
            Women
          </button>
        </div>
        <div className="flex flex-wrap gap-8 mt-[50px] items-center justify-center">
          {products.map((product: ProductCardProps) => {
            return (
              <ProductCard
                key={product._id}
                name={product.name}
                image={product.image}
                price={product.price}
                id={product._id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
