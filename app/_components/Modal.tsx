import { useEffect, useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [showModal, setShowModal] = useState(isOpen);

  const modalRef = useOutsideClick(isOpen, onClose);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else {
      const timeout = setTimeout(() => setShowModal(false), 500); // Match the animation duration
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!showModal) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`p-4 rounded-lg shadow-lg transition-transform duration-300 ${
          isOpen ? "modal-enter-active" : "modal-exit-active"
        }`}
        ref={modalRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
