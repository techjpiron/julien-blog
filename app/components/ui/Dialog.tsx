import { Dialog as RACDialog, type DialogProps } from "react-aria-components";

export function Dialog(props: Omit<DialogProps, "className">) {
  return (
    <RACDialog
      className="relative max-h-[inherit] overflow-auto p-6 outline-0 [[data-placement]>&]:p-4"
      {...props}
    />
  );
}
