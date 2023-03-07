import { useForm } from "react-hook-form";
import type { Item } from "~/api";
import api from "~/api";

export type FormData = {
  name: string;
  phone: string;
  shipment: string;
  location?: string;
};

type Props = {
  items: Item[];
  total: number;
};

export default function CartForm({ items, total }: Props) {
  const { register, handleSubmit, watch } = useForm<FormData>();

  const shipment: string = watch("shipment");

  const onSubmit = (data: FormData) => {
    const messageOrder = {
      ...data,
      items,
      total,
    };

    const link = api.whatsapp.sendOrderMessage(messageOrder);
    window.location.href = link;
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
          <label htmlFor="pickup" className="basis-1/2">
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
          <label htmlFor="delivery" className="basis-1/2">
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
        <select
          className="bg-neutral-300 p-2 font-medium"
          {...register("location")}
        >
          <option>Rivadavia $100</option>
          <option>Capital $200</option>
        </select>
      )}

      <button
        type="submit"
        className="bg-neutral-900 p-2 font-dosis font-semibold text-white"
      >
        Pedir por WS
      </button>
    </form>
  );
}
