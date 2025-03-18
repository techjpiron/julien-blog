import type { ComponentProps } from "react";
import {
  Heading as RACHeading,
  type HeadingProps,
} from "react-aria-components";
import { Link as RRLink, type LinkProps } from "react-router";
import { focusRing } from "./FocusRing";
import { tv } from "tailwind-variants";

const h1Styles = tv({
  base: "mb-4 font-header text-4xl font-bold md:text-5xl lg:text-6xl hyphens-auto",
});
export function H1({ className, ...props }: ComponentProps<"h1">) {
  return <h1 className={h1Styles({ className })} {...props} />;
}

const h2Styles = tv({
  base: "mb-2 font-header text-2xl font-bold hyphens-auto",
});
export function H2({ className, ...props }: ComponentProps<"h2">) {
  return <h2 className={h2Styles({ className })} {...props} />;
}

export function Heading({ className, ...props }: HeadingProps) {
  return <RACHeading className={h2Styles({ className })} {...props} />;
}

const pStyles = tv({
  base: "text-gray-600 font-body mb-1",
});
export function P({ className, ...props }: ComponentProps<"p">) {
  return <p className={pStyles({ className })} {...props} />;
}

const linkStyle = tv({
  extend: focusRing,
  base: "rounded p-1 underline text-gray-900 mb-1",
});
export function Link({ className, ...props }: LinkProps) {
  return <RRLink className={linkStyle({ className })} {...props} />;
}
