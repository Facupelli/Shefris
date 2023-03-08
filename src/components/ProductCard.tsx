import Image from "next/image";
import type { Item } from "~/api";
import { formatPrice } from "~/utils/price";
import { useCartStore } from "~/zustand/store";
import ProductButton from "./ProductButton";

type Props = {
  product: Item;
};

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article className="grid w-card sm:gap-2">
      <div className="flex justify-center">
        <Image
          src={product.image}
          width={256}
          height={256}
          alt={product.name}
        />
      </div>
      <p className="font-dosis text-3xl font-black">{product.name}</p>
      <p className="font-lobster text-lg text-gray-500">
        {product.description}
      </p>
      <p className="text-right font-lobster text-2xl font-semibold">
        {formatPrice(product.price)}
      </p>
      <ProductButton addItem={() => addItem(product)} product={product} />
    </article>
  );
}
