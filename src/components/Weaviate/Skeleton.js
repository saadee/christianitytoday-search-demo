export function WeaviateSearchSkeleton() {
  return (
    <div className="aa-ItemLink" id="weaviateSearchSection">
      <div className="aa-ItemContent mx-2 mb-6">
        <div className="aa-ItemTitle flex items-start w-full">
          <div className="px-2 w-full">
            <div className="mb-2 w-full">
              {/* Placeholder for Book Title, Part, and Production */}
              <div className="h-3 bg-gray-200 animate-pulse mb-1"></div>
            </div>
            {/* Placeholder for AITitle */}
            <div className="h-3 bg-gray-200 animate-pulse mb-1"></div>
            {/* Placeholder for Paragraph */}
            <div className="h-10 bg-gray-200 animate-pulse mb-1"></div>
            {/* Placeholder for Questions Answered */}
            {/* <div className="h-3 bg-gray-200 animate-pulse"></div> */}
          </div>
          <div className="px-2">
            {/* Placeholder for the image with pulsating animation */}
            <div className="w-16 h-20 bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
