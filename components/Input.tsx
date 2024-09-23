"use client";
import React, { forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import SearchIcon from "./svg/SearchIcon";

const inputVariants = cva(
  "font-normal flex w-full items-center gap-1 rounded",
  {
    variants: {
      typeInput: {
        text: "border border-grey-800 bg-grey-200 bg-opacity-60 hover:border-blue-500",
        number:
          "border border-grey-800 bg-grey-200 bg-opacity-60 hover:border-blue-500",
        search:
          "shadow-sm hover:bg-grey-100 hover:bg-opacity-20 border border-grey-100",
        date: "border border-grey-800 bg-grey-100 bg-opacity-60",
        file: "border border-grey-800 bg-grey-100 bg-opacity-60 text-yellow-900 shadow-sm",
      },
      rounded: {
        default: "rounded-lg",
        full: "rounded-full",
      },
      sizeInput: {
        none: "px-0 py-0",
        small: "text-sm font-normal p-1",
        default: "text-sm font-normal p-2",
        large: "text-lg font-normal py-3 px-6",
      },
    },
    defaultVariants: {
      typeInput: "text",
      rounded: "default",
      sizeInput: "default",
    },
  }
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    loading?: boolean;
    label?: string;
    addStartContent?: React.ReactNode;
    addEndContent?: React.ReactNode;
  };

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      typeInput,
      label,
      rounded,
      sizeInput,
      addStartContent,
      addEndContent,
      ...rest
    },
    ref
  ) => {
    const validTypeInput = typeInput || "text";
    return (
      <div className="flex w-full flex-col gap-1">
        {label && (
          <label htmlFor={label} className="text-body-2">
            {label}
          </label>
        )}
        <div
          className={`flex ${cn(
            inputVariants({
              typeInput: validTypeInput,
              rounded,
              sizeInput,
              className,
            })
          )}`}
        >
          {addStartContent ||
            (validTypeInput === "search" && (
              <div className="pointer-events-none inset-y-0 left-0 flex items-center">
                {validTypeInput === "search" ? (
                  <SearchIcon
                    width={18}
                    height={18}
                    className="text-grey-900"
                  />
                ) : (
                  addStartContent
                )}
              </div>
            ))}
          <input
            type={validTypeInput}
            className={`w-full border-none text-black-800 file:rounded-lg file:border-0 file:bg-grey-100 file:text-sm file:font-medium file:text-yellow-900 focus:outline-none`}
            ref={ref}
            {...rest}
            style={{
              backgroundColor: "transparent",
            }}
          />
          {addEndContent && (
            <div className="pointer-events-none inset-y-0 right-0 flex items-center">
              {addEndContent}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
