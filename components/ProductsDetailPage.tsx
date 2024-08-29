import ShoppingCardButton from "@/components/ShoppingCardButton";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { Product } from "@/types/page";
import {
  HeartIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBag,
  UserIcon,
} from "lucide-react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

interface ProductDetailProps {
  product: Product;
  onSelectCategory: (category: string) => void;
}

const ProductDetailPage: React.FC<ProductDetailProps> = ({
  product,
  onSelectCategory,
}) => {
  const { state, dispatch } = useCart();

  const handleAddToCart = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const handleIncrement = (product: Product) => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: product });
  };

  const handleDecrement = (product: Product) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: product });
  };

  const categories = ["watch", "speaker", "earphones", "headphones"];

  return (
    <>
      <Head>
        <title>{product.name} | My E-commerce Platform</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.imageUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="canonical"
          href={`https://e-commerce-rho-swart.vercel.app/products/${product.id}`}
        />
      </Head>

      <div>
        {/* Nav */}
        <nav className="fixed top-0 z-50 h-[14vh] w-full md:px-10 bg-[#F8F9FA]">
          <div className="py-4 px-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-10 shrink-0">
                <Link
                  href="/"
                  className="flex items-center gap-2 md:py-2 whitespace-nowrap"
                >
                  <img
                    src={product.imageUrl}
                    className="w-10 h-10 rounded-full"
                    alt="logo"
                  />
                  <h2 className="font-bold text-4xl hover:text-yellow-500 text-gray-700">
                    {product.name}
                  </h2>
                </Link>
                <ul className="md:flex space-x-4 hidden">
                  {categories.map((category) => (
                    <li
                      key={category}
                      className="cursor-pointer hover:text-yellow-500 font-medium text-base text-gray-500"
                      onClick={() => onSelectCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center space-x-6 text-gray-800">
                {/* shoppingCardButton */}
                <ShoppingCardButton />
                <HeartIcon size={20} className="cursor-pointer" />
                {/* user button */}
                <UserIcon size={20} cursor={"pointer"} />
              </div>
            </div>
          </div>
        </nav>
        {/* main */}
        <div className="container mx-auto px-6 py-2 mt-20 mb-3">
          <div className="flex items-center justify-center md:flex-row flex-col gap-10">
            <div className="bg-white p-4 rounded-lg shadow-md mt-10">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={300}
                className="w-full h-auto object-cover mb-4"
              />
            </div>
            <div>
              <h1 className="font-bold text-4xl text-black my-5">
                Fall Limited Edition
              </h1>
              <p className="tracking-widest font-medium text-sm max-w-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                labore temporibus ducimus iure eveniet aliquam rerum illo esse
                quaerat veniam!
              </p>
              <h1 className="text-3xl font-bold my-3">{product.name}</h1>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <p className="text-gray-900 font-bold text-2xl mb-2">
                ${product.price}
              </p>
              <p className="text-gray-600">Category: {product.category}</p>
              <div className="flex items-center mt-7 gap-20">
                <div className="flex items-center gap-10">
                  <div
                    className="bg-[#F8F9FA] px-3 py-5 rounded-lg"
                    onClick={() => handleDecrement(product)}
                  >
                    <MinusIcon />
                  </div>
                  {
                    state.items.find((item: any) => item.id === product.id)
                      ?.quantity
                  }
                  <div
                    className="bg-[#F8F9FA] px-3 py-5 rounded-lg"
                    onClick={() => handleIncrement(product)}
                  >
                    <PlusIcon />
                  </div>
                </div>
                <Button
                  className={`flex items-center gap-3 ${
                    state.items.find((item: any) => item.id === product.id) &&
                    "cursor-not-allowed"
                  }`}
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingBag size={20} />
                  <p className="text-lg">Add to Cart</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = products.find((p) => p.id.toString() === params?.id);
  return { props: { product } };
};

export default ProductDetailPage;
