import { composeRenderProps, Button as RACButton } from "react-aria-components";
import type { ButtonProps } from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "./FocusRing";

const buttonStyles = tv({
  extend: focusRing,
  base: "px-5 py-2 text-sm text-center duration-300 ease-in-out rounded-lg border border-black/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] cursor-default bg-gray-600 hover:bg-gray-700 pressed:bg-gray-800 text-white transition-colors",
});

export function Button(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        buttonStyles({ ...renderProps, className }),
      )}
    />
  );
}
