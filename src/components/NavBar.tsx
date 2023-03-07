import { useCartStore } from "~/zustand/store";

type Props = {
  slug: string;
};

export default function NavBar({ slug }: Props) {
  const emptyCart = useCartStore((state) => state.emptyCart);

  return (
    <nav className="fixed h-16 w-full border-b border-neutral-900 bg-white p-4">
      <ul className="flex items-center justify-between">
        <li className="font-playfair font-bold">carrito</li>
        <li className="font-lobster text-2xl font-bold">
          {slug?.charAt(0).toUpperCase() + slug?.slice(1)}
        </li>
        <li className="font-playfair font-bold" onClick={emptyCart}>
          menu
        </li>
      </ul>
    </nav>
  );
}
