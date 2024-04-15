import * as React from "react";

function TagIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={10}
      height={10}
      viewBox="0 0 8 8"
      fill="none"
      {...props}
    >
      <path
        d="M3.717 0l4.036 4.036c.16.16.247.37.247.596a.836.836 0 01-.247.595L5.227 7.753A.836.836 0 014.632 8a.836.836 0 01-.596-.247L0 3.717V0h3.717zm-.349.842H.842v2.526l3.79 3.79 2.526-2.526-3.79-3.79zm-1.263.842a.421.421 0 110 .842.421.421 0 010-.842z"
        fill="#EC6234"
      />
    </svg>
  );
}

export default TagIcon;
