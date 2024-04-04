import Image from "next/image";
import { ReactNode, memo } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

import Modal from "../Wrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IProps {
  type?: "button" | "submit";
  isOpen: boolean;
  title: string;
  imgUrl?: string;
  buttonIcon?: string;
  buttonText?: string;
  className?: string;
  children?: ReactNode;
  onSubmit: () => void;
  onClose: () => void;
}

const MeetingModal = (props: IProps) => {
  const {
    type = "button",
    isOpen,
    title,
    imgUrl,
    buttonIcon,
    buttonText,
    className,
    children,
    onSubmit,
    onClose,
  } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="max-w-[calc(100%-32px)] w-modal fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-dark-1 rounded-lg z-[1000]"
      >
        <motion.button
          initial={{ opacity: 1 }}
          whileHover={{
            opacity: 0.7,
            transition: { duration: 0.2 },
          }}
          className="absolute top-2 right-2 p-2"
          onClick={onClose}
        >
          <X />
        </motion.button>
        <div className="h-full flex flex-col gap-6 px-6 py-9 rounded-lg">
          {imgUrl ? (
            <div className="flex justify-center items-center">
              <Image src={imgUrl} alt="modal image" width={72} height={72} />
            </div>
          ) : null}

          <h1
            className={cn(
              "text-xl md:text-2xl lg:text-[28px] font-bold leading-[42px] mt-2",
              className
            )}
          >
            {title}
          </h1>

          {children}

          <Button
            type={type}
            className="gap-1 bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0 capitalize"
            onClick={onSubmit}
          >
            {buttonIcon ? (
              <Image
                src={buttonIcon}
                alt="icon button"
                width={14}
                height={14}
              />
            ) : null}
            {buttonText || "schedule meeting"}
          </Button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default memo(MeetingModal);
