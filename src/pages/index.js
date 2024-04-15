import { useState } from "react";
import Autocomplete from "@/components/AutoComplete";
import LoginPage from "@/components/Login";
import SEO from "@/components/Seo";
import Image from "next/image";
import Logo from "../../public/logo.png"

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
                alt={'logo'}
                width={200}
                height={200}
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
          <div className="min-h-32 w-full gap-5 px-28 flex justify-center">
            <div className="h-48 bg-[#A0A0A0] w-full"></div>
            <div className="h-48 bg-[#A0A0A0] w-full"></div>
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
