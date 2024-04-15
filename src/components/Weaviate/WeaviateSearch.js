import Image from "next/image";
import PicPlaceholder from "../../../public/no-image-icon-23500.jpg";

export function WeaviateSearch({ hit, components }) {
  const {
    booktitle,
    productionimage,
    production,
    part,
    holder,
    paragraph,
    aititle,
    image,
    year,
  } = hit;

  console.log({ booktitle, holder });
  const q = hit["Questions Answered"];

  return (
    <div
      className="aa-ItemLink hover:bg-slate-200 cursor-pointer"
      id="weaviateSearchSection"
    >
      <div className="aa-ItemContent mx-2 my-4">
        <div className="aa-ItemTitle flex items-start">
          <p className="px-2">
            <div className="mb-[2px] w-full">
              <p className="text-sm font-bold text-[#9B9B9B] text-questions line-clamp-1">
                {holder !== "nan" ? holder : booktitle}
                &nbsp;&nbsp;<span className="text-base">|</span>
                &nbsp;&nbsp;
                {part && `Part ${part}`}
                &nbsp;&nbsp;<span className="text-base ">|</span>
                &nbsp;&nbsp;
                {production && `${production}`}
                {/* &nbsp;&nbsp;<span className="text-xs h-[5px] ">|</span>
                  &nbsp;
                {publisher} */}
              </p>
            </div>

            <div className="line-clamp-1 text-sm text-[#636363] my-2 text-weaviate leading-5">
              {aititle}
            </div>
            <div className="line-clamp-3 font-normal text-sm text-[#636363] leading-5">
              {paragraph}
            </div>
            <p>{q}</p>
            {/* <components.Highlight hit={hit} attribute="Questions Answered" /> */}
          </p>
          {productionimage &&
          productionimage !== "nan" &&
          productionimage !== "#N/A" ? (
            <div className="bg-[#F8F8F7] min-w-max h-max p-3 rounded-lg my-3 mx-auto">
              <Image
                // className="w-[60px] h-[60px] md:h-[74px] md:w-[74px] mr-1 md:mr-4 rounded-md border object-contain bg-black border-grey-light-300 "
                className="border border-gray-300 rounded-md shadow-snippet-image"
                src={productionimage}
                alt={booktitle}
                width={70}
                height={70}
                loading="lazy"
              />
            </div>
          ) : (
            <div className="bg-[#F8F8F7] min-w-max h-max p-3 rounded-lg my-3 mx-auto">
              <Image
                className="border border-gray-300 rounded-md shadow-snippet-image"
                src={PicPlaceholder}
                alt={booktitle}
                width={70}
                height={70}
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
