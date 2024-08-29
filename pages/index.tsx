import HomePage from "@/components/HomePage";
import { products } from "@/data/products";
import { Product } from "@/types/page";
import { GetStaticProps } from "next";
import React from "react";

interface ProductsPageProps {
  products: Product[];
}

const Home: React.FC<ProductsPageProps> = ({ products }) => {
  return (
    <>
      <HomePage products={products} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      products,
    },
  };
};

export default Home;
