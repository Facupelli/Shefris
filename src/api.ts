import Papa from "papaparse";
import { formatPrice } from "./utils/price";
import { generateWsMessage } from "./utils/wsMessaage";

export type OrderMessage = {
  name: string;
  phone: string;
  shipment: string;
  location?: string;
  items: Item[];
  total: number;
};

export type DeliveryPrice = {
  name: string;
  price: number;
};

export type Item = {
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  varieties: string[];
  varieties2: string[];
};

export type SheetItem = {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  varieties: string;
  varieties2: string;
};

const api = {
  delivery: {
    fetch: async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_DOC_DELIVERY_URL!);
      const data = await res.text();
      const parsed = await new Promise<DeliveryPrice[]>((resolve, reject) => {
        Papa.parse<DeliveryPrice>(data, {
          header: true,
          complete: (result) => resolve(result.data),
          error: reject,
        });
      });

      return parsed;
    },
  },
  items: {
    fetch: async (url: string) => {
      const res = await fetch(url);
      const data = await res.text();
      const parsed = await new Promise<SheetItem[]>((resolve, reject) => {
        Papa.parse<SheetItem>(data, {
          header: true,
          complete: (result) => resolve(result.data),
          error: reject,
        });
      });

      return parsed;
    },
  },
  whatsapp: {
    sendOrderMessage: (data: OrderMessage) => {
      const items = data.items
        .map(
          (item) =>
            "x " +
            String(item.quantity) +
            " " +
            item.name +
            "\n" +
            "subtotal = " +
            String(formatPrice(item.quantity * item.price))
        )
        .join("\n");

      return generateWsMessage({ ...data, items });
    },
  },
};

export default api;
