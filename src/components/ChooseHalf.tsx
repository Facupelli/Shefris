import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { Item } from "~/api";
import { useCartStore } from "~/zustand/store";

type FormData = {
  pizza: "string";
};

type Props = {
  items: Item[] | undefined;
  halfAdded: string;
  setShowHalfModal: Dispatch<SetStateAction<boolean>>;
};

export default function ChooseHalf({
  items,
  halfAdded,
  setShowHalfModal,
}: Props) {
  const { register, watch, reset } = useForm<FormData>();
  const half = watch("pizza");

  const addHalf = useCartStore((state) => state.addHalf);

  const handleAddHalf = () => {
    const newHalfPrice = items?.find((item) => item.name === half)?.price;
    addHalf(`mitad ${halfAdded}`, half, newHalfPrice ?? 0);
    reset();
    setShowHalfModal(false);
  };

  return (
    <>
      <h1 className="py-2 pl-2 text-xl font-bold sm:pb-6 sm:text-2xl">
        Elige la otra mitad:
      </h1>
      <div className="grid w-[290px] gap-y-1 sm:w-[500px] ">
        {items &&
          items
            .filter((item) => item.name !== halfAdded)
            .map((item) => (
              <label
                key={item.name}
                className={`flex w-full cursor-pointer items-center gap-2 rounded p-2 font-semibold sm:text-lg ${
                  half === item.name ? "bg-rose-600 text-white" : "bg-white"
                }`}
                htmlFor={item.name}
              >
                <div className="relative h-10 w-10 rounded-full border bg-white p-4">
                  <Image src={item.image} fill alt={item.name} />
                </div>
                {item.name}
                <input
                  id={item.name}
                  className="hidden"
                  type="radio"
                  value={item.name}
                  key={item.name}
                  {...register("pizza")}
                />
              </label>
            ))}
      </div>
      <div className="flex justify-center pt-6 ">
        <button
          onClick={handleAddHalf}
          type="button"
          className="w-full rounded bg-neutral-900 py-1 px-4 font-medium text-white sm:w-auto"
        >
          Agregar
        </button>
      </div>
    </>
  );
}
