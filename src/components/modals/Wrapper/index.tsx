import { ReactNode, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Portal from "@/components/commons/Portal";

interface IProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

const Modal = (props: IProps) => {
  const { isOpen, children, onClose } = props;

  return (
    <Portal>
      <AnimatePresence>
        {isOpen ? (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/30 z-[999]"
              onClick={onClose}
            ></motion.div>

            {/* Children */}
            {children}
          </>
        ) : null}
      </AnimatePresence>
    </Portal>
  );
};

export default memo(Modal);
