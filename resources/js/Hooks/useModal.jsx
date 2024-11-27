import { ModalContext } from "@/Contexts/ModalContext";
import { useContext } from "react";

const useModal = () => {
    return useContext(ModalContext);
};

export default useModal;