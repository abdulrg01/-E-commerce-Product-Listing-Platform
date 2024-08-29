import ProductsPage from "@/components/ProductsPage";
import { products } from "@/data/products";
import { Product } from "@/types/page";

interface ProductsPageProps {
  products: Product[];
}

const ProductHomePage: React.FC<ProductsPageProps> = () => {
  return (
    <>
      <ProductsPage products={products} />
    </>
  );
};

export default ProductHomePage;
