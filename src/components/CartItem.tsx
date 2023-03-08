import Image from "next/image";
import type { Item } from "~/api";
import { formatPrice } from "~/utils/price";
import { useCartStore } from "~/zustand/store";
import CartButton from "./CartButton";

type Props = {
  item: Item;
};

export default function CartItem({ item }: Props) {
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="w-full sm:flex sm:items-center sm:justify-between">
      <div className="flex gap-4 sm:items-center sm:gap-10">
        <div className="relative h-20 w-20 sm:h-40 sm:w-40">
          <Image src={item.image} fill alt={item.name} />
        </div>
        <div className="grow">
          <p className="pb-2 font-dosis text-lg font-extrabold sm:text-xl">
            {item.name}
          </p>
          <p className="font-regular sm:text-md font-lobster text-sm text-neutral-500">
            Masa madre tradicional.
          </p>
        </div>
      </div>
      <div className="relative flex items-baseline gap-4 ">
        <div className="ml-20 flex flex-col-reverse pl-4 sm:ml-0 sm:flex-row sm:items-center ">
          <CartButton item={item} />
          <p className="text-left font-lobster text-lg font-semibold sm:ml-4 sm:text-xl">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
        <div className="absolute bottom-36 left-[calc(100%_-_20px)] flex font-semibold sm:relative sm:bottom-0 sm:left-0 sm:h-12 sm:w-12 sm:justify-center">
          <button onClick={() => removeItem(item.name)} type="button">
            xx
          </button>
        </div>
      </div>
    </div>
  );
}
