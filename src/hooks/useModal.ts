import { useContext } from "react";
import { ModalContextType } from "../types";

export function useModal(context:React.Context<ModalContextType | undefined>) {
  const modalContext = useContext(context)
  if (!modalContext) {
    throw new Error("useModal debe usarse dentro de un ModalProvider");
  }
  return modalContext;
}