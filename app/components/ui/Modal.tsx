import { motion } from "motion/react";
import {
  ModalOverlay as RACModalOverlay,
  type ModalOverlayProps,
  Modal as RACModal,
} from "react-aria-components";

export const ModalOverlay = motion.create((props: ModalOverlayProps) => (
  <RACModalOverlay
    className="absolute top-0 left-0 isolate z-40 flex h-screen w-full items-center justify-center bg-black/15 p-4 text-center backdrop-blur-lg"
    {...props}
  />
));

export const Modal = motion.create((props: ModalOverlayProps) => (
  <RACModal
    className="max-h-full w-full max-w-md overflow-scroll rounded-2xl border border-black/10 bg-white text-left shadow-2xl"
    {...props}
  />
));
