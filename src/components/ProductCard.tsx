import Image from "next/image";
import { Item } from "~/api";
import { formatPrice } from "~/utils/price";
import ProductButton from "./ProductButton";

type Props = {
  product: Item;
};

export default function ProductCard({ product }: Props) {
  return (
    <article className="grid w-64 ">
      <div className="h-64 w-64 bg-gray-500">
        <Image src={product.image} fill alt={product.name} />
      </div>
      <p className="font-playfair text-2xl font-bold">{product.name}</p>
      <p className="font-lobster text-gray-500">{product.description}</p>
      <p className="text-right font-lobster font-semibold">
        {formatPrice(product.price)}
      </p>
      <ProductButton />
    </article>
  );
}
