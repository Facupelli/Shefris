import type { Item } from "~/api";
import { useCartStore } from "~/zustand/store";

type Props = {
  addItem: () => void;
  product: Item;
};

export default function ProductButton({ addItem, product }: Props) {
  const cartItems = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const isItemAdded = cartItems.find((item) => item.name === product.name);

  return (
    <div className="gap mt-2 flex h-16 items-stretch bg-neutral-900 font-semibold text-white sm:h-14">
      <button
        className={`grow font-dosis tracking-wider ${
          !!isItemAdded ? "bg-rose-600" : ""
        }`}
        onClick={addItem}
        disabled={!!isItemAdded}
      >
        {!!isItemAdded ? "Agregado" : "Agregar"}
      </button>
      <div className="flex w-24 ">
        <button className="basis-3/5 cursor-auto border-l border-r border-gray-400 text-center font-dosis ">
          {!!isItemAdded ? isItemAdded.quantity : product.quantity}
        </button>
        <div className="grid basis-2/5">
          <button onClick={() => increaseQuantity(product)}> + </button>
          <button onClick={() => decreaseQuantity(product.name)}> - </button>
        </div>
      </div>
    </div>
  );
}
