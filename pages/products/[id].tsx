import ProductDetailPage from "@/components/ProductsDetailPage";
import { products } from "@/data/products";
import { Product } from "@/types/page";
import { GetStaticPaths, GetStaticProps } from "next";

interface ProductDetailProps {
  product: Product;
  onSelectCategory: (category: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onSelectCategory,
}) => {
  return (
    <>
      <ProductDetailPage
        product={product}
        onSelectCategory={onSelectCategory}
      />
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

export default ProductDetail;
