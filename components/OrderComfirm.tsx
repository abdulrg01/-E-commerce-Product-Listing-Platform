import { useCart } from "@/context/CartContext";
import { useRouter } from "next/router";

export default function OrderConfirmed() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  let totalPrice = 0;

  const totalAmount = state.items.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
  );

  const handleOrder = () => {
    dispatch({ type: "CLEAR_CART" });
    router.push("/");
  };

  return (
    <div
      className="h-screen w-screen bg-black/50 fixed z-10 top-0 left-0 flex justify-center items-end text-gray-800"
      onClick={handleOrder}
    >
      <div
        className="rounded-t-3xl bg-[#fff] flex flex-col max-h-[85%] w-[600px] h-max py-6 px-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pb-5">
          <img src="/icon-order-confirmed.svg" alt="icon-order-confirmed.svg" />
          <h1 className="py-3 tracking-wider font-bold text-4xl">
            Order Confirmed
          </h1>
          <p className="text-gray-600">We hope you enjoy your order!</p>
        </div>
        <div className="p-6 rounded-md bg-[#e8f4ed] overflow-y-scroll scrollNone">
          <ul className="flex flex-col gap-3">
            {state.items.length > 0 &&
              state.items.map((item: any) => {
                totalPrice += item.itemPrice * item.itemQty;
                return (
                  <li
                    key={item.id}
                    className="flex items-center justify-between border-b-[1px] border-gray-400 pb-2 gap-2"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="w-24 h-24 object-cover rounded mr-4"
                      />
                      <div className="flex flex-col gap-2">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-gray-900 font-bold">${item.price}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
          <h2 className="text-2xl font-bold text-black">
            Total Amount: ${totalAmount.toFixed(2)}
          </h2>
        </div>
        <button
          className="bg-green-500 rounded-full w-full py-3.5 text-[#fff] mt-7"
          onClick={handleOrder}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}
