import { useState } from "react";
import { useForm } from "react-hook-form";
import { type Item } from "~/api";
import api from "~/api";
// import { formatPrice } from "~/utils/price";

export type FormData = {
  name: string;
  phone: string;
  shipment: string;
  location?: string;
  address: string;
};

type Props = {
  items: Item[];
  total: number;
};

export default function CartForm({ items, total }: Props) {
  const { register, handleSubmit, watch } = useForm<FormData>();
  const shipment = watch("shipment");

  const [error, setError] = useState("");

  const onSubmit = (data: FormData) => {
    setError("");
    const messageOrder = {
      ...data,
      items,
      total,
    };

    const halfsCount = items.reduce((acc, curr) => {
      if (curr.half) {
        return acc + 1;
      }
      return acc;
    }, 0);

    if (halfsCount % 2 !== 0) {
      return setError("Debes pedir una mitad de pizza más!");
    }

    const link = api.whatsapp.sendOrderMessage(messageOrder);
    return (window.location.href = link);
  };

  return (
    <form className="grid gap-4 font-dosis" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Tu Nombre"
        className="bg-neutral-300 p-2  text-neutral-700"
        required
        {...register("name")}
      />
      <input
        type="text"
        placeholder="Número de Teléfono"
        className="bg-neutral-300 p-2  text-neutral-700"
        required
        {...register("phone")}
      />
      <div className="grid gap-1 font-medium">
        <div className="flex items-center gap-2">
          <label htmlFor="pickup" className="basis-1/2 sm:basis-1/5">
            Retiro en sucursal
          </label>
          <input
            type="radio"
            value="pickup"
            {...register("shipment")}
            required
            id="pickup"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="delivery" className="basis-1/2 sm:basis-1/5">
            Envío a domicilio
          </label>
          <input
            type="radio"
            value="delivery"
            {...register("shipment")}
            required
            id="delivery"
          />
        </div>
      </div>

      {shipment === "delivery" && (
        <p className="text-left text-sm text-neutral-900 sm:text-left">
          El costo de envío se calculará una vez enviada la ubicación.
        </p>
      )}

      {shipment !== "pickup" && (
        <input
          type="text"
          placeholder="Dirección"
          className="bg-neutral-300 p-2  text-neutral-700"
          required
          {...register("address")}
        />
      )}

      <button
        type="submit"
        className="bg-neutral-900 p-2 font-dosis font-semibold text-white"
      >
        Pedir por Whatsapp
      </button>

      {error && (
        <p className="text-center text-sm font-semibold text-red-500">
          {error}
        </p>
      )}
    </form>
  );
}
