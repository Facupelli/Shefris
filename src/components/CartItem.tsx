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
    <div>
      <div className="flex gap-4">
        <div>
          <Image src={item.image} width={80} height={80} alt={item.name} />
        </div>
        <div className="grow">
          <p className="font-dosis text-xl font-bold">{item.name}</p>
          <p className="pt-4 text-left font-lobster text-lg font-normal">
            {formatPrice(item.price)}
          </p>
        </div>
        <div className="font-semibold">
          <button onClick={() => removeItem(item.name)} type="button">
            xx
          </button>
        </div>
      </div>
      <div className="ml-20 pl-4">
        <CartButton item={item} />
      </div>
    </div>
  );
}
