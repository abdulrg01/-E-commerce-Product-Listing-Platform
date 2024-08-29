import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/page";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
          <Link href={`/products/${product.id}`} passHref>
            <div className="cursor-pointer">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="text-gray-900 font-bold">${product.price}</p>
            </div>
          </Link>
          <div className="mt-4">
            {state.items.some((item: any) => item.id === product.id) ? (
              <div className="flex items-center justify-between bg-green-500 text-white p-2 rounded-full px-5">
                <button
                  onClick={() => handleDecrement(product)}
                  className="text-white text-xl"
                >
                  -
                </button>
                <span className="mx-4 text-white">
                  {
                    state.items.find((item: any) => item.id === product.id)
                      ?.quantity
                  }
                </span>
                <button
                  onClick={() => handleIncrement(product)}
                  className="text-white text-xl"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded-full w-full"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
