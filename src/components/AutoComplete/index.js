import { useState, useEffect, Fragment, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import algoliasearch from "algoliasearch";
import SimpleBar from "simplebar-react";
import { QuestionAndThought } from "../QuestionAndThought";
import { WeaviateSearch } from "../Weaviate/WeaviateSearch";
import { WeaviateSearchSkeleton } from "../Weaviate/Skeleton";
import CancelIcon from "../icons/Cancel";
import SearchIcon from "../icons/SearchIcon";
import { CtSearchBubble } from "../CtSearchBubble";

// ===>> Client API_KEYS <<====
const appId = process.env.NEXT_PUBLIC_APP_ID;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const TGBCbooksIndex = process.env.NEXT_PUBLIC_TGBC_BOOKS_INDEX;
const GoodBookQuestionsIndex =
  process.env.NEXT_PUBLIC_GOOD_BOOK_QUESTIONS_INDEX;
const CtIndex = process.env.NEXT_PUBLIC_CT_SEARCH_INDEX;

const searchClient = algoliasearch(appId, apiKey);
const BookSearchIndex = searchClient.initIndex(TGBCbooksIndex);
const QuestionIndex = searchClient.initIndex(GoodBookQuestionsIndex);
const CtSearchIndex = searchClient.initIndex(CtIndex);

const extractQuestionsAnswered = (arr) => {
  return arr.map((obj) => obj["Questions Answered"]);
};

export default function Autocomplete() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [ctSearches, setCtSearches] = useState([]);
  const [weaviateData, setWeaviateData] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedBubble, setSelectedBubble] = useState(null);

  const [snippetQuery, setSnippetQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  const [isAskQuestion, setIsAskQuestion] = useState(false); // Track Ask Question state
  const [questionAsked, setQuestionAsked] = useState([]); // Ask Question

  useEffect(() => {
    if (!isAskQuestion) {
      searchBooks();
      searchQuestions();
      Ctsearches();
    }
  }, [isAskQuestion]);

  // will call the api after user stops typing
  useEffect(() => {
    if (!isAskQuestion) {
      const timer = setTimeout(() => {
        // Perform search logic here
        searchBooks(searchTerm);
        searchQuestions(searchTerm);
        Ctsearches(searchTerm);
      }, 500); // Adjust the debounce delay here (in milliseconds)

      return () => clearTimeout(timer);
    }
  }, [isAskQuestion, searchTerm]);

  // combime questions to get Weaviate string
  useEffect(() => {
    if (!isAskQuestion) {
      let timeoutId;

      if (questions) {
        timeoutId = setTimeout(() => {
          const combinedQuestions = combineQuestions(questions);
          setSnippetQuery(combinedQuestions);
        }, 500);
      }

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [questions, isAskQuestion]);

  // calls weaviate api
  useEffect(() => {
    if (!isAskQuestion) {
      setIsLoading(true);
      // Replace "?" with space in the snippetQuery
      const sanitizedQuery = snippetQuery?.replace(/\?/g, " ");

      const fetchData = async () => {
        try {
          const result = await fetchExternalData(sanitizedQuery);
          setWeaviateData(result); // Set fetched data
        } catch (error) {
          // If there are no questions, set loading to false immediately
          setIsLoading(false);
          console.error("Failed to fetch data:", error);
        } finally {
          // Set loading to false after half a second
          setTimeout(() => {
            setIsLoading(false);
          }, 100);
        }
      };

      fetchData();
    }
  }, [isAskQuestion, setWeaviateData, snippetQuery]);

  // calls weaviate api when click on ask Button
  useEffect(() => {
    if (isAskQuestion) {
      setIsLoading(true);
      // Replace "?" with space in the snippetQuery
      const sanitizedQuery = searchTerm?.replace(/\?/g, " ");

      const fetchData = async () => {
        try {
          const result = await fetchExternalData(sanitizedQuery);
          setWeaviateData(result); // Set fetched data
        } catch (error) {
          // If there are no questions, set loading to false immediately
          setIsLoading(false);
          console.error("Failed to fetch data:", error);
        } finally {
          // Set loading to false after half a second
          setTimeout(() => {
            setIsLoading(false);
          }, 100);
        }
      };

      fetchData();
    }
  }, [isAskQuestion, searchTerm]);

  const fetchExternalData = async (query) => {
    const apiUrl = `/api/weaviate?query=${query}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      // console.log({ data });
      return data; // Optionally return the data for further processing
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Optionally rethrow the error for handling elsewhere
    }
  };

  const handleAskQuestion = () => {
    setIsAskQuestion(true);
  };

  const searchBooks = async (query) => {
    const { hits } = await BookSearchIndex.search(query || "");
    // console.log("books", hits);
    setBooks(hits);
  };
  const searchQuestions = async (query) => {
    const { hits } = await QuestionIndex.search(query || "");
    setQuestions(hits);
  };

  const Ctsearches = async (query) => {
    const { hits } = await CtSearchIndex.search(query || "");
    const questionsAnsweredArray = extractQuestionsAnswered(hits);

    // const slicedArray = questionsAnsweredArray.slice(0, 8);

    const arrays = [];
    const numberOfArrays = 3; // Total number of arrays

    // Calculate the length of each pattern
    const patternLength = Math.ceil(
      questionsAnsweredArray.length / numberOfArrays
    );

    // Initialize the patterns array
    const patterns = Array.from({ length: numberOfArrays }, (_, index) => {
      return Array.from(
        { length: patternLength },
        (_, i) => index + i * numberOfArrays
      );
    });

    // Trim the patterns to match the actual length of questionsAnsweredArray
    patterns.forEach((pattern) => {
      pattern.length = Math.min(pattern.length, questionsAnsweredArray.length);
    });

    // Create the arrays based on the patterns
    patterns.forEach((pattern) => {
      const arr = pattern
        .map((index) => questionsAnsweredArray[index])
        .filter((value) => value !== null && value !== undefined); // Filter out null values
      arrays.push(arr);
    });

    // console.log({ arrays });
    // console.log({ questionsAnsweredArray });

    // Now 'arrays' either contains three separate arrays or one array
    setCtSearches(arrays); // Update state with the array of arrays
  };

  const combineQuestions = (dataArray) => {
    const questionsArray = dataArray?.map((item) => item["Questions Answered"]);
    // Replace "?" with space in the questionsArray
    const string = questionsArray?.join(" ").replace(/\?/g, " ");
    return string;
  };

  const handleClearInput = () => {
    setSearchTerm("");
    setQuestionAsked("");
    setSelectedQuestion(null);
    setSelectedBubble(null);
    setIsAskQuestion(false);
  };

  const handleBubbleClick = (hit) => {
    setSelectedQuestion(null);
    setSelectedBubble(hit);
    setQuestionAsked(hit);
  };

  const handleQuestionClick = (hit) => {
    setSelectedBubble(null);
    setSelectedQuestion(hit);
    setQuestionAsked(hit);
  };

  return (
    <div className="w-full">
      <div className="flex-row md:flex justify-center md:justify-end gap-8 items-center m-auto max-w-7xl">
        <div className="relative w-full flex items-center max-w-md">
          <input
            ref={inputRef}
            className="z-10 relative placeholder:text-slate-700 md:max-w-xl block bg-[#eaebeb] border-slate-300 text- w-full  focus:outline-none  py-2 pl-3 pr-3 shadow-sm  sm:text-sm"
            placeholder="Search"
            type="text"
            name="search"
            autoComplete="off"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsAskQuestion(false);
              setSelectedBubble(null);
              setSelectedQuestion(null);
            }}
            onFocus={() => setIsOpen(true)} // Open popover on focus
          />
          {/* {!searchTerm && (
            <button
              type="button"
              className="absolute z-10 inset-y-0 right-0 md:right-24 flex items-center pr-3 text-slate-700 hover:text-slate-500"
            >
              <SearchIcon className="h-5 w-5 fill-current" />
            </button>
          )} */}
          {searchTerm && (
            <button
              type="button"
              className="absolute z-10 inset-y-0 right-0 md:right-[5.3rem] flex items-center pr-3 text-gray-700 hover:text-slate-500"
              onClick={handleClearInput}
            >
              <CancelIcon className="h-3 w-4 fill-slate-700" />
            </button>
          )}
          {searchTerm ? (
            <button
              onClick={handleAskQuestion}
              className="w-20 z-10 text-sm bg-[#d51b1e] absolute inset-y-0 right-1 m-1  text-center text-white"
            >
              Ask
            </button>
          ) : (
            <span className="z-10 absolute inset-y-0 right-1 m-1 text-center pt-1">
              <SearchIcon />
            </span>
          )}
        </div>
      </div>

      {/* Overlay div */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Popover */}
      <Popover className={`${isOpen ? "block relative" : "hidden"}`}>
        <Transition
          className="absolute -top-3"
          as={Fragment}
          show={isOpen}
          enter="transition ease-out duration-100"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-50"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            className="absolute mt-4 left-1/2 z-10 h-screen w-screen max-w-full -translate-x-1/2 transform sm:px-0 md:max-w-7xl"
          >
            <div className="overflow-hidden shadow-lg ring-1 ring-black/5">
              <div
                className={`relative grid bg-white py-5 grid-cols-12 border border-red-900s ${
                  isAskQuestion && "max-w-xl m-auto"
                }`}
              >
                {!isAskQuestion && (
                  <div className="col-span-12 md:col-span-6 min-h-[500px] h-full">
                    <div className="grid grid-cols-12 gap-3">
                      {/* <div className="col-span-12 md:col-span-5">
                        <h1 className="mb-3 ml-2 aa-SourceHeaderTitle flex items-center gap-4">
                          <div className="h-[1.5px] w-6 bg-[#859E3B]" />
                          Products
                        </h1>

                        <div className="">
                          <SimpleBar className="max-h-[300px] md:max-h-[600px]">
                            {books?.map((book, i) => (
                              <div key={i}>
                                <ProductItem
                                  hit={book}
                                  searchTerm={searchTerm}
                                />
                              </div>
                            ))}
                          </SimpleBar>
                        </div>
                      </div> */}
                      <div className="col-span-12 md:col-span-12 border-[#f5f5f5] border-t md:border-t-0 pt-4 md:pt-0 md:pl-2">
                        {/* <h1 className="mb-3 ml-2 aa-SourceHeaderTitle flex items-center gap-4">
                          <div className="h-[1.5px] w-6 bg-[#859E3B]" />
                          Question & Thoughts
                        </h1> */}
                        <div className="relative">
                          <SimpleBar className="pb-4 pt-2 flex-row w-full overflow-x-auto max-h-60">
                            <div className="flex flex-nowrap gap-3">
                              {ctSearches &&
                                ctSearches.length > 0 &&
                                ctSearches[0]?.map((ques, i) => (
                                  <div key={i} className="flex-shrink-0">
                                    <CtSearchBubble
                                      hit={ques}
                                      searchTerm={searchTerm}
                                      highlightText={false}
                                      newSnippetQuery={setSnippetQuery}
                                      selected={selectedBubble === ques}
                                      onClick={() => handleBubbleClick(ques)}
                                    />
                                  </div>
                                ))}
                            </div>
                            <div className="flex flex-nowrap gap-3">
                              {ctSearches &&
                                ctSearches.length > 0 &&
                                ctSearches[1]?.map((ques, i) => (
                                  <div key={i} className="flex-shrink-0">
                                    <CtSearchBubble
                                      hit={ques}
                                      searchTerm={searchTerm}
                                      highlightText={false}
                                      newSnippetQuery={setSnippetQuery}
                                      selected={selectedBubble === ques}
                                      onClick={() => handleBubbleClick(ques)}
                                    />
                                  </div>
                                ))}
                            </div>
                            <div className="flex flex-nowrap gap-3">
                              {ctSearches &&
                                ctSearches.length > 0 &&
                                ctSearches[2]?.map((ques, i) => (
                                  <div key={i} className="flex-shrink-0">
                                    <CtSearchBubble
                                      hit={ques}
                                      searchTerm={searchTerm}
                                      highlightText={false}
                                      newSnippetQuery={setSnippetQuery}
                                      selected={selectedBubble === ques}
                                      onClick={() => handleBubbleClick(ques)}
                                    />
                                  </div>
                                ))}
                            </div>
                          </SimpleBar>

                          <SimpleBar className="max-h-[300px] md:max-h-[600px]">
                            {questions?.map((question, i) => (
                              <div key={i} className="max-w-full">
                                <QuestionAndThought
                                  hit={question}
                                  searchTerm={searchTerm}
                                  newSnippetQuery={setSnippetQuery}
                                  selected={selectedQuestion === question}
                                  onClick={() => handleQuestionClick(question)}
                                />
                              </div>
                            ))}
                          </SimpleBar>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className={`col-span-12 ${
                    isAskQuestion ? "md:col-span-12" : "md:col-span-6"
                  } ${
                    !isAskQuestion ? "border-[#f5f5f5]" : "border-transparent"
                  } border-t md:border-t-0 pt-4 md:pt-0 md:pl-2`}
                >
                  {/* <h1 className="mb-3 ml-2 aa-SourceHeaderTitle flex items-center gap-4">
                    <div className="h-[1.5px] w-6 bg-[#859E3B]" />
                    Snippets
                  </h1> */}
                  <div className="">
                    <SimpleBar className="max-h-[300px] md:max-h-[800px]">
                      {isLoading ? (
                        // If isLoading is true, render the skeleton component
                        <div className="flex-row gap-3">
                          <WeaviateSearchSkeleton />
                          <WeaviateSearchSkeleton />
                          <WeaviateSearchSkeleton />
                          <WeaviateSearchSkeleton />
                          <WeaviateSearchSkeleton />
                          <WeaviateSearchSkeleton />
                        </div>
                      ) : weaviateData && weaviateData.length > 0 ? (
                        // If isLoading is false and data exists, render the actual data
                        weaviateData.map((data, i) => (
                          <div key={i} className="pr-2">
                            <WeaviateSearch hit={data} />
                          </div>
                        ))
                      ) : (
                        // If isLoading is false but there is no data, render "No data found"
                        <div>No data found</div>
                      )}
                    </SimpleBar>
                  </div>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
