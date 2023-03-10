import Image from "next/image";
import { type Dispatch, type SetStateAction } from "react";
import { type Item } from "~/api";
import { useCartStore } from "~/zustand/store";
import { formatPrice } from "~/utils/price";

import ProductButton from "./ProductButton";

type Props = {
  product: Item;
  setShowHalfModal?: Dispatch<SetStateAction<boolean>>;
  setHalfAdded?: Dispatch<SetStateAction<string>>;
};

export default function ProductCard({
  product,
  setShowHalfModal,
  setHalfAdded,
}: Props) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <>
      <article
        className={`grid w-card sm:gap-2 ${
          product.image ? "" : "rounded-lg bg-neutral-100 p-6 shadow"
        }`}
      >
        {product.image && (
          <div className="relative h-mobile-img w-mobile-img justify-self-center sm:h-desktop-img sm:w-desktop-img">
            <Image
              src={product.image}
              fill
              alt={product.name}
              priority
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </div>
        )}
        <p className="font-dosis text-3xl font-black">{product.name}</p>
        <p className="font-lobster text-lg text-gray-500">
          {product.description}
        </p>
        <p className="text-right font-lobster text-2xl font-semibold">
          {formatPrice(product.price)}
        </p>
        <ProductButton
          addItem={() => addItem(product)}
          product={product}
          setShowHalfModal={setShowHalfModal}
          setHalfAdded={setHalfAdded}
        />
      </article>
    </>
  );
}
