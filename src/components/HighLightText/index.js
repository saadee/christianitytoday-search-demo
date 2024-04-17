import React from "react";

const HighlightText = ({
  text,
  searchTerm,
  highlightText = true,
  className,
  onClick,
}) => {
  //   console.log(text, searchTerm);
  if (!searchTerm || searchTerm === "") {
    return <p className={className ? className : "px-2"}>{text}</p>;
  }

  const parts = text?.split(new RegExp(`(${searchTerm})`, "gi"));
  return (
    <p
      className={className ? className : "px-2 w-full text-product"}
      onClick={onClick}
    >
      {parts?.map((part, index) => (
        <span
          key={index}
          className={
            part.toLowerCase() === searchTerm.toLowerCase()
              ? `font-bold ${highlightText ? "bg-yellow-200" : ""}`
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
