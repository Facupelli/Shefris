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
          <p className="font-dosis text-xl font-bold">{item.name}</p>
          <p className="pt-4 text-left font-lobster text-lg font-normal">
            {formatPrice(item.price)}
          </p>
        </div>
      </div>
      <div className="relative flex items-baseline gap-4 ">
        <div className="ml-20 pl-4 sm:ml-0">
          <CartButton item={item} />
        </div>
        <div className="absolute bottom-32 left-32 flex w-full justify-center font-semibold sm:relative sm:bottom-0 sm:left-0 sm:h-12 sm:w-12">
          <button onClick={() => removeItem(item.name)} type="button">
            xx
          </button>
        </div>
      </div>
    </div>
  );
}
