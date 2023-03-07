import { useCartStore } from "~/zustand/store";

type Props = {
  addItem: () => void;
  name: string;
  quantity: number;
};

export default function ProductButton({ addItem, quantity, name }: Props) {
  const cartItems = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const isItemAdded = cartItems.find((item) => item.name === name);

  console.log("CART", cartItems);

  return (
    <div className="gap mt-2 flex h-16 items-stretch bg-neutral-900 font-semibold text-white">
      <button className="grow" onClick={addItem} disabled={!!isItemAdded}>
        {!!isItemAdded ? "Agregado" : "Agregar"}
      </button>
      <div className="flex w-24 ">
        <button className="basis-3/5 cursor-auto border-l border-r border-gray-400 text-center ">
          {!!isItemAdded ? isItemAdded.quantity : quantity}
        </button>
        <div className="grid basis-2/5">
          <button onClick={() => increaseQuantity(name)}> + </button>
          <button onClick={() => decreaseQuantity(name)}> - </button>
        </div>
      </div>
    </div>
  );
}
