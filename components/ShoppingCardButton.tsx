import { useCart } from "@/context/CartContext";
import { ShoppingBagIcon } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ShoppingCardButton() {
  const { state, dispatch } = useCart();
  const router = useRouter();

  const handleIncrement = (product: any) => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: product });
  };

  const handleDecrement = (product: any) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: product });
  };

  const handleRemove = (product: any) => {
    dispatch({ type: "REMOVE_ITEM", payload: product });
  };

  const totalAmount = state.items.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="relative">
      <span className="absolute -top-3 -right-2 w-6 h-6 bg-red-500 text-center flex items-center justify-center flex-col text-xs text-white rounded-full">
        {state.items.length}
      </span>
      <Sheet>
        <SheetTrigger>
          <ShoppingBagIcon cursor={"pointer"} />
        </SheetTrigger>
        <SheetContent className="overflow-auto h-full">
          <div className="h-full">
            <h2 className="text-3xl font-bold mb-6">Your Card</h2>
            <div>
              {state.items.length > 0 ? (
                <div>
                  <div className="grid grid-cols-1 gap-6">
                    {state.items.map((item: any) => (
                      <div
                        key={item.id}
                        className="bg-white p-4 rounded-lg shadow-md"
                      >
                        <div className="flex items-center">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="w-24 h-24 object-cover rounded mr-4"
                          />
                          <div className="flex-1">
                            <Link href={`/products/${item.id}`} passHref>
                              <h2 className="text-xl font-bold text-blue-500 cursor-pointer">
                                {item.name}
                              </h2>
                            </Link>
                            <p className="text-gray-700">{item.description}</p>
                            <p className="text-gray-900 font-bold">
                              ${item.price}
                            </p>
                            <div className="flex items-center mt-2">
                              <button
                                onClick={() => handleDecrement(item)}
                                className="bg-gray-300 text-gray-900 text-xl rounded px-2"
                              >
                                -
                              </button>
                              <span className="mx-4">{item.quantity}</span>
                              <button
                                onClick={() => handleIncrement(item)}
                                className="bg-gray-300 text-gray-900 text-xl rounded px-2"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() => handleRemove(item)}
                            className="bg-red-500 text-white px-4 py-2 rounded-full ml-4"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <h2 className="text-2xl font-bold text-black">
                      Total Amount: ${totalAmount.toFixed(2)}
                    </h2>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-full my-5"
                      onClick={() => router.push("/order")}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700">Your cart is empty.</p>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
