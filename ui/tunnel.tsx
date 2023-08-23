// https://github.com/pmndrs/tunnel-rat/blob/main/src/index.tsx

import { useIsomorphicLayoutEffect } from "framer-motion";
import type { ReactNode } from "react";
import React from "react";
import type { StoreApi } from "zustand";
import { create } from "zustand";

interface TunnelProps {
  children: React.ReactNode;
}

interface TunnelState {
  current: ReactNode[];
  version: number;
  set: StoreApi<TunnelState>["setState"];
}

export default () => {
  const useStore = create<TunnelState>((set) => ({
    current: new Array<ReactNode>(),
    version: 0,
    set,
  }));

  return {
    In: ({ children }: TunnelProps) => {
      const set = useStore((state) => state.set);
      const version = useStore((state) => state.version);

      useIsomorphicLayoutEffect(() => {
        set((state) => ({
          version: state.version + 1,
        }));
      }, []);

      useIsomorphicLayoutEffect(() => {
        set(({ current }) => ({
          current: [...current, children],
        }));

        return () =>
          set(({ current }) => ({
            current: current.filter((c) => c !== children),
          }));
      }, [children, version]);

      return null;
    },

    Out: () => {
      const current = useStore((state) => state.current);
      return <>{current}</>;
    },
  };
};
