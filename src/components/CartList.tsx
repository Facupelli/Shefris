import type { Item } from "~/api";
import CartItem from "./CartItem";

type Props = {
  items: Item[];
};

export default function CartList({ items }: Props) {
  const halfItems = items.filter((item) => item.half);

  return (
    <section className="border-t border-b border-dashed border-neutral-900 py-6">
      <div className="grid justify-items-center gap-y-10 ">
        {items.map((item, i) => (
          <CartItem
            key={i}
            item={item}
            number={
              item.half
                ? halfItems.map((item) => item.name).indexOf(item.name) + 1
                : null
            }
          />
        ))}
        {items.length === 0 && (
          <div className="justify-self-start font-dosis">
            No has agredado nada al carrito!
          </div>
        )}
      </div>
    </section>
  );
}
