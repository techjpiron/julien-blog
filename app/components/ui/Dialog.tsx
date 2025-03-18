import { Dialog as RACDialog, type DialogProps } from "react-aria-components";

export function Dialog(props: Omit<DialogProps, "className">) {
  return <RACDialog className="h-full p-6 outline-0" {...props} />;
}
