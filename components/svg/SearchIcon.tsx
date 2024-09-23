"use client";

import { SVGProps } from "react";

const SearchIcon = ({
  width = 24,
  height = 24,
  className = "",
  onClick,
}: SVGProps<SVGSVGElement> & { onClick?: () => void }) => {
  return (
    <svg
      onClick={onClick}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className}`}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 10m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M21 21l-4 -4" />
    </svg>
  );
};

export default SearchIcon;
