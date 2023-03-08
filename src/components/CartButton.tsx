import type { Item } from "~/api";
import { useCartStore } from "~/zustand/store";

type Props = {
  item: Item;
};

export default function CartButton({ item }: Props) {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  return (
    <div className="flex h-12 grid-cols-3">
      <button
        onClick={() => decreaseQuantity(item.name)}
        className=" w-12 border-r border-l border-neutral-300 bg-neutral-200 p-2 text-center"
      >
        -
      </button>
      <button
        onClick={() => increaseQuantity(item)}
        className=" w-12 bg-neutral-200 p-2 text-center"
      >
        +
      </button>
      <button className="w-12 cursor-auto bg-neutral-300 p-2 text-center font-dosis font-semibold">
        {item.quantity}
      </button>
    </div>
  );
}
