import { formatPrice } from "~/utils/price";
import { useCartStore } from "~/zustand/store";
import CartForm from "./CartForm";
import CartList from "./CartList";

export default function Cart() {
  const showCart = useCartStore((state) => state.showCart);
  const items = useCartStore((state) => state.items);

  const total = items.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  return (
    <aside
      className={`fixed z-10 h-screen w-full overflow-y-auto bg-white px-8 pt-20 transition-all delay-75 duration-500 ease-in-out ${
        showCart ? "bottom-0" : "bottom-full"
      }`}
    >
      <div className="mx-auto max-w-screen-lg">
        <h1 className="pb-2 font-dosis text-xl font-bold">Carrito</h1>

        <CartList items={items} />

        <section className="grid justify-items-center py-6">
          <p className="font-dosis text-2xl font-semibold">Total:</p>
          <p className="font-dosis text-2xl font-semibold">
            {formatPrice(total)}
          </p>
        </section>

        <section className="pb-20">
          <CartForm total={total} items={items} />
        </section>
      </div>
    </aside>
  );
}
