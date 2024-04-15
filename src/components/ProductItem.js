import Image from "next/image";
import HighlightText from "./HighLightText";
import PicPlaceholder from "../../public/no-image-icon-23500.jpg";
import TagIcon from "./icons/Tag";

export function ProductItem({ hit, searchTerm }) {
  return (
    <div className="aa-ItemContent hover:bg-slate-200 cursor-pointer py-4 pr-2 border-b-2 border-b-[#F5F5F5]">
      <div className="aa-ItemTitle flex items-start justify-between">
        <div className="items-center flex-row m-auto mx-0">
          <p className="font-bold text-sm items-center text-questions line-clamp-1 gap-3 px-2 text-[#9B9B9B]">
            {/* <TagIcon />
            <span>|</span> */}
            {hit?.subtitle}
          </p>
          <div className="py-2 text-product">
            <HighlightText text={hit?.booktitle} searchTerm={searchTerm} />
          </div>
        </div>
        <Image
          className="border border-gray-300 rounded-md"
          src={hit?.image ? hit?.image : PicPlaceholder}
          alt={hit?.filename}
          width={45}
          height={45}
        />

        {/* <p className="text-sm text-center m-auto font-medium px-2">$12.00</p> */}
      </div>
    </div>
  );
}
