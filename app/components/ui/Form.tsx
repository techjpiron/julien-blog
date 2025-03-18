import { getInputProps, type FieldMetadata } from "@conform-to/react";
import type { ReactNode } from "react";
import {
  Input as RACInput,
  TextField as RACTextField,
  TextArea as RACTextArea,
  Label as RACLabel,
  FieldError as RACFieldError,
  type LabelProps,
  type TextFieldProps,
  type InputProps,
  type TextAreaProps,
  type FieldErrorProps,
} from "react-aria-components";
import { focusRing } from "./FocusRing";
import { tv } from "tailwind-variants";

export function Label(props: Omit<LabelProps, "className">) {
  return (
    <RACLabel className="block text-sm font-bold text-gray-900" {...props} />
  );
}

export function FieldError({ ...props }: FieldErrorProps) {
  return <RACFieldError className="text-red-600" {...props} />;
}

const inputStyles = tv({
  extend: focusRing,
  base: "text-sm rounded-md text-gray-800 border-2 px-3 py-2 w-full invalid:border-red-800",
});
export function Input({
  className,
  ...props
}: InputProps & { className?: string }) {
  return <RACInput className={inputStyles({ className })} {...props} />;
}

export function TextArea(props: Omit<TextAreaProps, "className">) {
  return <RACTextArea className={inputStyles()} rows={10} {...props} />;
}

export function TextField({
  label,
  field,
  type,
  children,
  ...props
}: TextFieldProps & {
  children: ReactNode;
  label?: string;
  field: FieldMetadata;
  type?: "text" | "password";
}) {
  return (
    <RACTextField
      className="mt-2 flex flex-col gap-1"
      {...props}
      {...getInputProps(field, { type: type ?? "text" })}
      isInvalid={!field.valid}
    >
      {label ? <Label>{label}</Label> : null}
      {children}
      <FieldError>{field.errors?.[0]}</FieldError>
    </RACTextField>
  );
}
