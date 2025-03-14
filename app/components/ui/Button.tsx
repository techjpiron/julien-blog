import { composeRenderProps, Button as RACButton } from "react-aria-components";
import type { ButtonProps } from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "./FocusRing";
import { Link, type LinkProps } from "react-router";

const buttonStyles = tv({
  extend: focusRing,
  base: "px-5 py-2 text-sm text-center transition rounded-lg border border-black/10 dark:border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] dark:shadow-none cursor-default",
  variants: {
    variant: {
      primary: "bg-blue-600 hover:bg-blue-700 pressed:bg-blue-800 text-white",
      secondary:
        "bg-gray-100 hover:bg-gray-200 pressed:bg-gray-300 text-gray-800 outline-gray-600",
      destructive:
        "bg-red-700 hover:bg-red-800 pressed:bg-red-900 text-white outline-red-600",
    },
    isDisabled: {
      true: "bg-gray-100 dark:bg-zinc-800 text-gray-300 dark:text-zinc-600 forced-colors:text-[GrayText] border-black/5 dark:border-white/5",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export function Button(
  props: ButtonProps & {
    variant?: "primary" | "secondary" | "destructive";
  },
) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        buttonStyles({ ...renderProps, variant: props.variant, className }),
      )}
    />
  );
}

export function ButtonLink({
  className,
  variant,
  ...props
}: LinkProps & {
  variant?: "primary" | "secondary" | "destructive";
}) {
  return <Link {...props} className={buttonStyles({ variant, className })} />;
}
