import { Dialog as RACDialog, type DialogProps } from "react-aria-components";

export function Dialog(props: Omit<DialogProps, "className">) {
  return (
    <RACDialog
      className="outline-0 p-6 [[data-placement]>&]:p-4 max-h-[inherit] overflow-auto relative"
      {...props}
    />
  );
}
