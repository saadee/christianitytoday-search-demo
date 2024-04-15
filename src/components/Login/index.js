import { useState } from "react";

const LoginPage = ({ setAuthenticate, setLoading, loading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Set loading to true while making the API call
      setLoading(true);
      setError(""); // Reset error message on each submit

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Simulate a delay for 2 seconds (you can replace this with your actual logic)
        setTimeout(() => {
          // Handle successful login
          setAuthenticate(true);

          // Set setLoading to false after successful login
          setLoading(false);
        }, 2000);
      } else {
        // Handle failed login
        // console.error(data.message);

        // Handle failed login
        setError("Invalid username & password");

        // Set setLoading to false after API call
        setLoading(false);
      }
    } catch (error) {
      // Handle failed login
      setError("Something Went Wrong !");
      console.error("An error occurred:", error);

      // Set setLoading to false in case of an error
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#647a1c]">
            Ligonier Demo
          </h2>
          <h2 className="mt-1 text-center text-lg font-extrabold text-gray-400">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="off"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="off"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm font-bold mt-2">
              ➡️ {error}
            </div>
          )}

          {/* <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div> */}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full min-h-10 flex justify-center py-2 px-4 border border-transparent text-sm focus:ring-[#859e3b] bg-[#859e3b] hover:bg-[#647a1c] font-medium rounded-md text-white ${
                loading && "cursor-not-allowed"
              } focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              {!loading && (
                <span
                  className={`absolute left-0 inset-y-0 flex items-center pl-3`}
                >
                  {/* Heroicon name: lock-closed */}
                  <svg
                    className="h-5 w-5 text-gray-300 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M4 8V6a4 4 0 118 0v2h.5a2.5 2.5 0 110 5H5.5A2.5 2.5 0 013 10.5V8h1zm2 0h8V6a2 2 0 10-4 0v2H6zm6 2h1.5a.5.5 0 010 1H12v2a2 2 0 11-4 0v-2H4.5a.5.5 0 010-1H5V8a4 4 0 118 0v2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-t-4 border-b-4 border-white rounded-full animate-spin"></div>
                </div>
              ) : (
                "Sign in"
              )}
            </button>
            {/* {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-t-4 border-b-4 border-red-500 rounded-full animate-spin"></div>
              </div>
            )} */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
