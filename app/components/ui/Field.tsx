import {
  Input as RACInput,
  TextField as RACTextField,
  TextArea as RACTextArea,
  Label as RACLabel,
  type LabelProps,
  type TextFieldProps,
  type InputProps,
  type TextAreaProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "./FocusRing";

export function Label(props: Omit<LabelProps, "className">) {
  return (
    <RACLabel className="font-bold text-sm block text-gray-900" {...props} />
  );
}

const inputStyles = tv({
  extend: focusRing,
  base: "text-sm rounded-md text-gray-800 border px-3 py-2 w-full",
});
export function Input(props: Omit<InputProps, "className">) {
  return <RACInput className={inputStyles()} {...props} />;
}

export function TextArea(props: Omit<TextAreaProps, "className">) {
  return <RACTextArea className={inputStyles()} rows={10} {...props} />;
}

export function TextField(props: Omit<TextFieldProps, "className">) {
  return <RACTextField className="flex flex-col gap-1 mt-2" {...props} />;
}
