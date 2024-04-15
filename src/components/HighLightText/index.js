import React from "react";

const HighlightText = ({ text, searchTerm }) => {
  //   console.log(text, searchTerm);
  if (!searchTerm || searchTerm === "") {
    return <p className="px-2 ">{text}</p>;
  }

  const parts = text?.split(new RegExp(`(${searchTerm})`, "gi"));
  return (
    <p className="px-2 w-full text-product">
      {parts?.map((part, index) => (
        <span
          key={index}
          className={
            part.toLowerCase() === searchTerm.toLowerCase()
              ? " font-semibold"
              : ""
          }
        >
          {part}
        </span>
      ))}
    </p>
  );
};

export default HighlightText;
