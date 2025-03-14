import { ModalContextType } from "../../types";
import { createGenericContext } from "../../utils/createGenericContex";

const [ModalContext, ModalProvider] = createGenericContext<ModalContextType>({
  isOpen: false,
  changeModalState: () => { }
})

const [ConfigContext, ConfigProvider] = createGenericContext<ModalContextType>({
  isOpen: false,
  changeModalState: () => { }
})

export { ModalContext, ModalProvider, ConfigContext, ConfigProvider }