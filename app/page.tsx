"use client";
import HomeDescription from "./_components/HomeDescription";
import AuthForm from "./_components/AuthCard";
import Modal from "./_components/Modal";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="h-screen flex items-center justify-center">
      <HomeDescription openModel={openModal} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AuthForm />
      </Modal>
    </div>
  );
}
