import { StateCreator, create } from "zustand";
import { immer } from "zustand/middleware/immer";

export function createStore<Store>(initializer: StateCreator<Store, [["zustand/immer", never]]>) {
  return create<Store, [["zustand/immer", never]]>(immer(initializer));
}
