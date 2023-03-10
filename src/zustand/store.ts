import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Item } from "~/api";

interface CartState {
  items: Item[];
  addItem: (item: Item) => void;
  increaseQuantity: (item: Item) => void;
  decreaseQuantity: (name: string) => void;
  addHalf: (name: string, newHalf: string, price: number) => void;
  removeItem: (name: string) => void;
  emptyCart: () => void;
  showCart: boolean;
  toggleCart: () => void;
  shake: boolean;
  toggleShake: () => void;
}

export const useCartStore = create<CartState>()(
  devtools(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),
      increaseQuantity: (item) =>
        set((state) => {
          const index = state.items.findIndex((i) => i.name === item.name);
          if (index === -1) {
            return { items: [...state.items, item] };
          }
          if (index !== -1 && state.items[index]?.quantity !== undefined) {
            state.items[index]!.quantity += 1;
            return { items: [...state.items] };
          }
          return { items: [...state.items] };
        }),
      decreaseQuantity: (name) =>
        set((state) => {
          const index = state.items.findIndex((i) => i.name === name);
          if (index !== -1 && state.items[index]?.quantity !== undefined) {
            if (state.items[index]!.quantity === 1) {
              state.items[index]!.half = false;
              return {
                items: state.items.filter((item) => item.name !== name),
              };
            } else {
              state.items[index]!.quantity -= 1;
              return { items: [...state.items] };
            }
          }
          return { items: [...state.items] };
        }),
      addHalf: (name, newHalf, price) =>
        set((state) => {
          const index = state.items.findIndex((i) => i.name === name);
          if (index !== -1) {
            state.items[index]!.name = `${
              state.items[index]!.name
            } y mitad ${newHalf}`;

            if (state.items[index]!.price < price) {
              state.items[index]!.price = price;
            }
          }
          return { items: [...state.items] };
        }),
      removeItem: (name) =>
        set((state) => ({
          items: state.items.filter((item) => item.name !== name),
        })),
      emptyCart: () => set({ items: [] }),
      showCart: false,
      toggleCart: () => {
        set({ showCart: !get().showCart });
      },
      shake: false,
      toggleShake: () => {
        set({ shake: !get().shake });
      },
    }),
    {
      name: "cartState-storage",
    }
  )
);
