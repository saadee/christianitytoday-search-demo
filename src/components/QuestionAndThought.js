import Image from "next/image";
import Question from "@/components/icons/Question";
import Journal from "@/components/icons/Journal";
import ArrowIcon from "./icons/Arrow";
import HighlightText from "./HighLightText";
import PicPlaceholder from "../../public/no-image-icon-23500.jpg";

export function QuestionAndThought({
  hit,
  searchTerm,
  newSnippetQuery,
  selected,
  onClick,
}) {
  console.log({hit})
  const para = hit["Questions Answered"];

  return (
    <div
      id="questions"
      className={`aa-ItemLink w-full hover:bg-slate-100 cursor-pointer border-b-2 border-[#f5f5f5] ${
        selected ? "bg-slate-200" : "bg-none"
      }`}
      onClick={() => {
        onClick();
        newSnippetQuery(para);
      }}
    >
      <div className="aa-ItemContent px-2 py-2 w-full">
        <div className="aa-ItemTitle grid grid-cols-12 justify-between gap-2 items-center">
          <div className="flex items-center col-span-12">
            <div className="px-2 pt-2 italic text-base leading-5">
              <div className="mb-2 flex items-start m-auto">
                <div className="mr-3 flex justify-center items-center">
                  <span className="m-auto pt-1">
                    {hit?.type ? (
                      hit.type === "question" ? (
                        <Question />
                      ) : hit.type === "journal" ? (
                        <Journal />
                      ) : null
                    ) : null}
                  </span>
                </div>
                <div className="mb-2 text-md font-bold not-italic">
                  <HighlightText text={para} searchTerm={searchTerm} />
                  <p className="px-2 py-1 text-sm font-normal items-center text-black not-italic line-clamp-1">
                    {hit?.aititle && `${hit?.aititle}`}
                  </p>
                </div>
              </div>
              {/* <div className=" w-full">
                <p className="text-sm font-bold items-center text-[#9B9B9B] not-italic text-questions line-clamp-1">
                  {hit?.title}
                  &nbsp;&nbsp;<span className="text-sm">|</span>
                  &nbsp;&nbsp;
                  {hit?.part && `Part ${hit?.part}`}
                  &nbsp;&nbsp;<span className="text-sm ">|</span>
                  &nbsp;&nbsp;
                  {hit?.closest && `${hit?.closest}`}
                  {/* &nbsp;&nbsp;<span className="text-xs h-[5px] ">|</span>
                  &nbsp;
                {publisher} 
                </p>
              </div> */}
            </div>
          </div>
          {/* <div className="col-span-2 flex justify-center">
            <Image
              className="border border-gray-300 rounded-md"
              src={hit?.image ? hit?.image : PicPlaceholder}
              alt={hit?.title}
              width={45}
              height={45}
              quality={100}
              priority
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
