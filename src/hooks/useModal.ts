import { useContext } from "react";
import { ModalContext } from "../context/modal/sliceState";

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal debe usarse dentro de un ModalProvider");
  }
  return context;
}