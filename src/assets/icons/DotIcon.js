import React from "react";

const DotIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      fill="#A49377"
      className="w-6 h-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.54 8.31a2.46 2.46 0 100-4.92 2.46 2.46 0 000 4.92zM6.46 8.31a2.46 2.46 0 100-4.92 2.46 2.46 0 000 4.92zM17.54 20.61a2.46 2.46 0 100-4.92 2.46 2.46 0 000 4.92zM6.46 20.61a2.46 2.46 0 100-4.92 2.46 2.46 0 000 4.92z"
      />
    </svg>
  );
};

export default DotIcon;
