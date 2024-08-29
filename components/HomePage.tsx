import Layout from "@/components/Layout";
import ProductList from "@/components/ProductList";
import { products } from "@/data/products";
import { Product } from "@/types/page";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";

interface ProductsPageProps {
  products: Product[];
}

const HomePage: React.FC<ProductsPageProps> = ({ products }) => {
  const [category, setCategory] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number | string>("");

  const handleCategoryChangeEvent = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(e.target.value);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory === "Collection" ? "" : newCategory);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : "");
  };

  const filteredProducts = products.filter((product) => {
    const priceCondition = maxPrice ? product.price <= maxPrice : true;
    const categoryCondition = category ? product.category === category : true;

    return priceCondition && categoryCondition;
  });

  return (
    <>
      <Head>
        <title>E-commerce Platform</title>
        <meta name="description" content="Browse our collection of products." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout onSelectCategory={handleCategoryChange}>
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Collection</h1>
          <div className="flex items-start md:flex-row flex-col md:gap-10 mt-5">
            <div className="mb-6">
              <label className="mr-4">Filter by Category:</label>
              <select
                onChange={handleCategoryChangeEvent}
                className="border p-2 rounded"
                value={category}
              >
                <option value="">Collection</option>
                <option value="earphones">earphones</option>
                <option value="headphones">headphones</option>
                <option value="speaker">speaker</option>
                <option value="watch">watch</option>
                <option value="laptop">laptop</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="mr-4">Filter by Maximum Price:</label>
              <input
                type="number"
                placeholder="Max Price"
                onChange={handleMaxPriceChange}
                value={maxPrice}
                className="border p-2 rounded"
              />
            </div>
          </div>

          <ProductList products={filteredProducts} />
        </div>
      </Layout>
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

export default HomePage;
