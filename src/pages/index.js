import { useState } from "react";
import Autocomplete from "@/components/AutoComplete";
import LoginPage from "@/components/Login";
import SEO from "@/components/Seo";
import Image from "next/image";
import Logo from "../../public/logo.png";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <SEO
        title="Christianity Today Demo"
        description="Welcome to our website. Learn about our products and services."
        keywords="nextjs, seo, react, web development"
        author="Jake Klinvex"
      />

      {authenticated ? (
        <div className="h-screen">
          <div className="mb-10 px-4 maindiv">
            <div className="min-h-32 flex justify-center items-center">
              <Image
                className=""
                src={Logo}
                alt={"logo"}
                width={200}
                height={200}
                priority
                quality={100}
              />
            </div>
            <div className="relative block md:flex w-full items-baseline">
              <div className="absolute inset-0 flex my-12 items-start justify-center">
                <Autocomplete />
              </div>
            </div>
          </div>

          {/* Demo Site */}
          {/* <div className="h-10 w-full bg-black"></div> */}
          <div className="min-h-14 w-full border-t-2 bg-white shadow-search-box my-5"></div>

          {/* Skeleton */}
          <div className="min-h-32 w-full gap-5 px-28 ">
            <div className="flex justify-center w-full gap-5">
              <div className="h-96 bg-[#EFEFEF] w-full"></div>
              <div className="w-full">
                <div className="h-7 bg-[#EFEFEF] w-1/4 mb-3"></div>
                <div className="h-48 bg-[#EFEFEF] w-full mb-3"></div>
                <div className="h-24 bg-[#EFEFEF] w-full mb-3"></div>
                <div className="h-7 bg-[#EFEFEF] w-1/3 mb-3"></div>
              </div>
            </div>
            <div className="h-2 bg-black w-full mb-3 my-10"></div>
            <div className=" w-full my-20">
              <div className="h-10 bg-[#EFEFEF] w-1/4 mb-2"></div>
              <div className="h-4 bg-[#EFEFEF] w-1/2 mb-3"></div>
            </div>
            <div className="w-full mb-20 gap-5 flex justify-between">
              <div className="w-full">
                <div className="h-7 bg-[#EFEFEF] w-full mb-2"></div>
                <div className="h-24 bg-[#EFEFEF] w-full"></div>
              </div>
              <div className="w-full">
                <div className="h-7 bg-[#EFEFEF] w-full mb-2"></div>
                <div className="h-24 bg-[#EFEFEF] w-full"></div>
              </div>
              <div className="w-full">
                <div className="h-7 bg-[#EFEFEF] w-full mb-2"></div>
                <div className="h-24 bg-[#EFEFEF] w-full"></div>
              </div>
              <div className="w-full">
                <div className="h-7 bg-[#EFEFEF] w-full mb-2"></div>
                <div className="h-24 bg-[#EFEFEF] w-full"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoginPage
          setAuthenticate={setAuthenticated}
          loading={isLoading}
          setLoading={setIsLoading}
        />
      )}
    </>
  );
}

export default App;
