import {
  ModalOverlay,
  type ModalOverlayProps,
  Modal as RACModal,
} from "react-aria-components";

export function Modal(props: ModalOverlayProps) {
  return (
    <ModalOverlay
      className="fixed top-0 left-0 isolate z-20 flex h-(--visual-viewport-height) w-full items-center justify-center bg-black/[15%] p-4 text-center backdrop-blur-lg"
      {...props}
    >
      <RACModal
        className="max-h-full w-full max-w-md rounded-2xl border border-black/10 bg-white bg-clip-padding text-left align-middle text-slate-700 shadow-2xl"
        {...props}
      />
    </ModalOverlay>
  );
}
