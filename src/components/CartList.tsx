import { useCartStore } from "~/zustand/store";
import CartItem from "./CartItem";

export default function CartList() {
  const showCart = useCartStore((state) => state.showCart);
  const items = useCartStore((state) => state.items);

  return (
    <aside
      className={`absolute z-10 h-screen w-full bg-white px-2 pt-20 transition-all delay-75 duration-500 ease-in-out ${
        showCart ? "bottom-0" : "bottom-full"
      }`}
    >
      <h1 className="font-dosis text-xl font-bold ">Carrito</h1>
      <section className="pt-6">
        <ul className="grid grid-cols-auto-fit justify-items-center gap-8 ">
          {items.map((item, i) => (
            <li key={i} className="flex w-full gap-4 ">
              <CartItem item={item} />
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
