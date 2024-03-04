import { create } from "zustand";

interface One {
  firstname: string;
  setFirstname: (name: string) => void;
}

export const useOneStore = create<One>((set) => ({
  firstname: "",
  setFirstname: (name) => set(() => ({ firstname: name })),
}));
