import { createContext, ReactNode, useState } from "react";

export function createGenericContext<T>(defaultValue: T) {
  const Context = createContext<T | undefined>(defaultValue || undefined);

  const Provider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const changeModalState = () => {
      setIsOpen((prev) => !prev);
    };

    return (
      <Context.Provider value={{ isOpen, changeModalState } as T}>
        {children}
      </Context.Provider>
    );
  };

  return [Context, Provider] as const;
}