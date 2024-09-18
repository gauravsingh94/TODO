import { Button } from "@/components/ui/button";
import { DialogDescription, DialogHeader } from "@/components/ui/dialog";
import SendSvg from "@/public/assets/Sent.svg";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"; // Import from ShadCN UI dialog
import Image from "next/image";
import { useState } from "react";
import AuthForm from "./AuthCard";

const PopupAuth = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const openModal = () => setIsDialogOpen(true);

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className=" mb:max-w-[425px] text-black border-none">
          <AuthForm isLogin={isLogin} setIsLogin={setIsLogin} />
        </DialogContent>
      </Dialog>
      <Button
        variant="secondary"
        className="gap-2 font-bold"
        onClick={openModal}
      >
        Start Using
        <Image src={SendSvg} alt="Start using SVG" width={20} height={20} />
      </Button>
    </div>
  );
};

export default PopupAuth;
