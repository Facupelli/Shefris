import { Item } from "~/api";
import { useCartStore } from "~/zustand/store";

type Props = {
  item: Item;
};

export default function CartButton({ item }: Props) {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  return (
    <div className="mt-4 grid w-1/2 grid-cols-3">
      <button
        onClick={() => decreaseQuantity(item.name)}
        className="col-span-1 border-r border-l border-neutral-300 bg-neutral-200 p-2 text-center"
      >
        -
      </button>
      <button
        onClick={() => increaseQuantity(item)}
        className="col-span-1 bg-neutral-200 p-2 text-center"
      >
        +
      </button>
      <p className="col-span-1 bg-neutral-300 p-2 text-center font-dosis font-semibold">
        {item.quantity}
      </p>
    </div>
  );
}
