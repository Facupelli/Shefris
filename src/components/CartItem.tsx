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
    <div className="w-full sm:flex sm:w-full sm:items-center sm:justify-between">
      <div className="flex w-full gap-4 sm:items-center sm:gap-10">
        {item.image && (
          <div className="relative h-20 w-20 sm:h-40 sm:w-40">
            <Image src={item.image} fill alt={item.name} />
          </div>
        )}
        <div
          className={` sm:flex sm:grow sm:items-center ${
            item.image ? "sm:ml-0" : "py-4 sm:ml-[200px]"
          }`}
        >
          <div
            className={`${item.image ? "h-20 sm:h-auto" : "pl-[96px] sm:pl-0"}`}
          >
            <p
              className={`${
                item.image ? "pb-2" : "pb-0"
              }  font-dosis text-lg font-extrabold  sm:text-xl`}
            >
              {item.half ? `mitad ${item.name}` : item.name}
            </p>
            {item.image && (
              <p className="font-regular sm:text-md font-lobster text-sm text-neutral-500">
                Masa madre tradicional.
              </p>
            )}
          </div>

          <div
            className={`flex flex-col-reverse gap-2 sm:ml-auto sm:flex-row sm:items-center ${
              item.image ? "" : " ml-[96px]"
            }`}
          >
            <CartButton item={item} />
            <p className="text-left font-lobster text-lg font-semibold sm:ml-4 sm:text-xl">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        </div>
        <div className={`ml-auto flex items-start font-semibold`}>
          <button onClick={() => removeItem(item.name)} type="button">
            xx
          </button>
        </div>
      </div>
    </div>
  );
}
