import Image from "next/image";
import { Item } from "~/api";
import { formatPrice } from "~/utils/price";
import CartButton from "./CartButton";

type Props = {
  item: Item;
};

export default function CartItem({ item }: Props) {
  return (
    <>
      <div>
        <Image src={item.image} width={75} height={75} alt={item.name} />
      </div>
      <div className="grow">
        <p className="font-dosis font-bold">{item.name}</p>
        <p className="text-left font-lobster font-semibold">
          {formatPrice(item.price)}
        </p>
        <CartButton item={item} />
      </div>
    </>
  );
}
