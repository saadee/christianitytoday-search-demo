import HighlightText from "./HighLightText";

export function CtSearchBubble({
  hit,
  searchTerm,
  newSnippetQuery,
  highlightText,
  selected,
  onClick,
}) {
  return (
    <div className="inline-block"
      onClick={() => {
        onClick();
        console.log("first");
        newSnippetQuery(hit);
      }}
    >
      <HighlightText
        className={`inline-block px-5 py-2 m-1 text-xs rounded-full cursor-pointer ${
          selected ? "bg-slate-200" : "bg-[#F8F8F7]"
        } ${!searchTerm ? "font-bold" : ""}`}
        highlightText={highlightText}
        text={hit}
        searchTerm={searchTerm}
      />
    </div>
  );
}
