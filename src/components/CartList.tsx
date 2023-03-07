import { Item } from "~/api";
import CartItem from "./CartItem";

type Props = {
  items: Item[];
};

export default function CartList({ items }: Props) {
  return (
    <section className="border-t border-b border-dashed border-neutral-900 py-6">
      <ul className="grid justify-items-center gap-8 ">
        {items.map((item, i) => (
          <li key={i} className="w-full gap-4 ">
            <CartItem item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
