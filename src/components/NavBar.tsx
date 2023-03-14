import { useCartStore } from "~/zustand/store";

type Props = {
  slug: string;
};

export default function NavBar({ slug }: Props) {
  const cart = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const shake = useCartStore((state) => state.shake);

  return (
    <nav className="fixed z-20 h-nav w-full bg-neutral-900 p-4 text-white">
      <ul className="mx-auto flex max-w-screen-lg items-center justify-between">
        <li
          className={`relative cursor-pointer font-dosis font-bold ${
            shake ? "animate-[shake_.6s_ease-in-out_1]" : "animate-none"
          }`}
          onClick={toggleCart}
        >
          carrito
          {cart.length > 0 && (
            <div className="absolute bottom-2 right-[-6px] ">
              <p className="text-md text-rose-600">{cart.length}</p>
            </div>
          )}
        </li>
        <li className="font-lobster text-2xl font-bold">
          {slug?.charAt(0).toUpperCase() + slug?.slice(1)}
        </li>
        <li className="font-dosis font-bold">menu</li>
      </ul>
    </nav>
  );
}
