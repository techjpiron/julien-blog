import {
  ModalOverlay,
  type ModalOverlayProps,
  Modal as RACModal,
} from "react-aria-components";

export function Modal({
  className,
  ...props
}: ModalOverlayProps & { className?: string }) {
  return (
    <ModalOverlay
      className="fixed top-0 left-0 w-full h-(--visual-viewport-height) isolate z-20 bg-black/[15%] flex items-center justify-center p-4 text-center backdrop-blur-lg"
      {...props}
    >
      <RACModal
        className="w-full max-w-md max-h-full rounded-2xl bg-white text-left align-middle text-slate-700 shadow-2xl bg-clip-padding border border-black/10"
        {...props}
      />
    </ModalOverlay>
  );
}
