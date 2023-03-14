import { type Dispatch, type SetStateAction } from "react";
import { type Item } from "~/api";
import { useCartStore } from "~/zustand/store";

type Props = {
  addItem: () => void;
  product: Item;
  setShowHalfModal?: Dispatch<SetStateAction<boolean>>;
  setHalfAdded?: Dispatch<SetStateAction<string>>;
};

export default function ProductButton({
  addItem,
  product,
  setShowHalfModal,
  setHalfAdded,
}: Props) {
  const cartItems = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const toggleShake = useCartStore((state) => state.toggleShake);

  const isItemAdded = cartItems.find((item) => item.name === product.name);
  const isHalfAdded = cartItems.find(
    (item) => item.name === `mitad ${product.name}`
  );

  const handleAddHalf = () => {
    if (!isHalfAdded) {
      const halfPizza = {
        ...product,
        name: `mitad ${product.name}`,
      };
      increaseQuantity(halfPizza);
    }
  };

  return (
    <>
      <div className="gap mt-2 flex h-16 items-stretch bg-neutral-900 font-semibold text-white sm:h-14">
        <button
          className={`grow font-dosis tracking-wider hover:bg-neutral-800 ${
            !!isItemAdded ? "bg-rose-600 hover:bg-rose-600" : ""
          }`}
          onClick={() => {
            addItem();
            toggleShake();
            setTimeout(() => {
              toggleShake();
            }, 1000);
          }}
          disabled={!!isItemAdded}
        >
          {!!isItemAdded ? "Agregado" : "Agregar"}
        </button>
        <div className="flex w-24 ">
          <button className="basis-3/5 cursor-auto border-l border-r border-gray-400 text-center font-dosis ">
            {!!isItemAdded ? isItemAdded.quantity : product.quantity}
          </button>
          <div className="grid basis-2/5">
            <button
              className="hover:bg-neutral-800"
              onClick={() => {
                if (!product.half) {
                  if (!cartItems.find((item) => item.name === product.name)) {
                    toggleShake();
                    setTimeout(() => {
                      toggleShake();
                    }, 1000);
                  }
                  increaseQuantity(product);
                }
              }}
            >
              +
            </button>
            <button
              className="hover:bg-neutral-800"
              onClick={() => decreaseQuantity(product.name)}
            >
              -
            </button>
          </div>
        </div>
      </div>
      {product.image && (
        <div className="flex w-[calc(100%_-_96px)] items-center justify-center py-2 font-dosis sm:py-0">
          <button
            id="mitad"
            onClick={() => {
              setHalfAdded && setHalfAdded(product.name);
              handleAddHalf();
              setShowHalfModal && setShowHalfModal(true);
            }}
            className="font-medium"
          >
            agregar mitad
          </button>
        </div>
      )}
    </>
  );
}
