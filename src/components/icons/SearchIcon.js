import * as React from "react";

function SearchIcon({ className, ...props }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={21}
      viewBox="0 0 20 21"
      fill="none"
      {...props}
    >
      <path
        d="M7.843.5C3.52.5 0 4.019 0 8.343c0 4.325 3.519 7.843 7.843 7.843a7.789 7.789 0 004.231-1.249l5.074 5.074a1.67 1.67 0 102.363-2.363l-5.074-5.074a7.789 7.789 0 001.25-4.23C15.686 4.018 12.166.5 7.842.5zm0 3.137a4.712 4.712 0 014.706 4.706 4.712 4.712 0 01-4.706 4.706 4.712 4.712 0 01-4.706-4.706 4.712 4.712 0 014.706-4.706z"
        fill="#000"
      />
    </svg>
  );
}

export default SearchIcon;
