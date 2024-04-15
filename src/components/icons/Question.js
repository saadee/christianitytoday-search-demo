import * as React from "react";

function QuestionIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 8 9"
      fill="none"
      {...props}
    >
      <path
        d="M.804.5c-.44 0-.8.358-.8.8L0 8.5l1.6-1.6h5.6a.8.8 0 00.8-.8V1.3a.8.8 0 00-.8-.8H.805zm0 .8h6.397v4.8H1.269l-.467.469L.804 1.3zM4 1.7c-.818 0-1.2.716-1.2 1.2h.8c0-.066.07-.4.4-.4.396 0 .4.396.4.4 0 .422-.8 1.21-.8 1.6h.8c0-.394.8-1.03.8-1.6 0-.59-.448-1.2-1.2-1.2zm-.4 3.2v.8h.8v-.8h-.8z"
        fill="#EC6234"
      />
    </svg>
  );
}

export default QuestionIcon;
