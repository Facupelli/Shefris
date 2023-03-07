import Image from "next/image";
import { Item } from "~/api";
import { formatPrice } from "~/utils/price";
import ProductButton from "./ProductButton";

type Props = {
  product: Item;
};

export default function ProductCard({ product }: Props) {
  return (
    <article className="grid w-80 gap-2 ">
      <div className="flex justify-center">
        <Image
          src={product.image}
          width={256}
          height={256}
          alt={product.name}
        />
      </div>
      <p className="font-playfair text-2xl font-black">{product.name}</p>
      <p className="font-lobster text-gray-500">{product.description}</p>
      <p className="text-right font-lobster text-2xl font-semibold">
        {formatPrice(product.price)}
      </p>
      <ProductButton />
    </article>
  );
}
