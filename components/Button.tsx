"use client";

import React from "react";
import { forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import Loader2 from "./svg/Loader2";
import { useFormStatus } from "react-dom";
export const buttonVariants = cva(
  [
    "flex",
    "justify-center",
    "items-center",
    "gap-1",
    "font-bold",
    "cursor-pointer",
    "transition",
    "transition-bg",
    "outline-none",
    "focus:scale-[0.98]",
    "w-full",
    "border-2",
    "border-solid",
    "text-center",
    "hover:bg-opacity-90",
  ],
  {
    variants: {
      variant: {
        icon: "border-none inline-block",
        ghost:
          "text-black-800 border-none box-border hover:transition-opacity hover:duration-300 hover:bg-grey-800 hover:bg-opacity-20",
        blackSolid: "text-white-900 border-black-900 bg-black-900",
        blackBordered:
          "border-black-900 text-black-900 bg-opacity-0 hover:bg-black-900 hover:text-white-900",
        darkSolid: "text-white-900 border-black-800 bg-black-800",
        darkBordered:
          "border-black-800 text-black-800 bg-opacity-0 hover:bg-black-800 hover:text-white-900",
        yellowSolid: "text-white-900 border-yellow-900 bg-yellow-900",
        yellowBordered:
          "border-yellow-900 text-yellow-900 bg-opacity-0 hover:bg-yellow-900 hover:text-white-900",
        blueSolid: "text-white-900 border-blue-900 bg-blue-900",
        blueBordered:
          "border-blue-900 text-blue-900 bg-opacity-0 hover:bg-blue-900 hover:text-white-900",
        greenSolid: "text-white-900 border-green-800 bg-green-800",
        greenBordered:
          "border-green-800 text-green-800 bg-opacity-0 hover:bg-green-800 hover:text-white-900",
        redSolid: "text-white-900 border-red-800 bg-red-800",
        redBordered:
          "border-red-800 text-red-800 bg-opacity-0 hover:bg-red-800 hover:text-white-900",
      },
      rounded: {
        default: "rounded-lg",
        full: "rounded-full",
      },
      size: {
        none: "px-0 py-0",
        small: "text-sm font-semibold py-1 px-4",
        default: "text-sm py-2 px-5",
        large: "text-lg py-3 px-12",
      },
    },
    defaultVariants: {
      variant: "darkSolid",
      rounded: "default",
      size: "default",
    },
  }
);

const Loading = () => <Loader2 width={18} height={18} />;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, rounded, size, loading, ...rest }, ref) => {
    const formstatus = useFormStatus();
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, rounded, size, className }))}
        disabled={loading || formstatus.pending}
        {...rest}
      >
        {formstatus.pending ? <Loading /> : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
export type { ButtonProps };
