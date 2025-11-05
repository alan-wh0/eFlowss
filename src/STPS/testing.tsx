import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

const HomePage = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <div className="flex justify-center items-center gap-8 mb-8">
          <a
            href="https://vite.dev"
            target="_blank"
            className="transition-transform hover:scale-110 hover:drop-shadow-2xl"
          >
            <img
              src={viteLogo}
              className="w-24 h-24 hover:animate-spin"
              alt="Vite logo"
            />
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            className="transition-transform hover:scale-110 hover:drop-shadow-2xl"
          >
            <img
              src={reactLogo}
              className="w-24 h-24 animate-spin-slow"
              alt="React logo"
            />
          </a>
        </div>

        <h1 className="text-6xl font-bold text-white mb-8 tracking-tight">
          Vite + React
        </h1>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200 mb-6"
          >
            count is {count}
          </button>
          <p className="text-gray-200 text-lg">
            Edit{" "}
            <code className="bg-gray-800/50 px-3 py-1 rounded text-purple-300 font-mono">
              src/App.tsx
            </code>{" "}
            and save to test HMR
          </p>
        </div>

        <p className="text-gray-400 text-sm mt-8">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
};

export default HomePage;
