import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <main className="flex flex-col items-center justify-center w-full h-screen bg-white">
        <h1 className="font-extrabold tracking-widest text-slate-600 text-9xl">
          404
        </h1>
        <div className="absolute px-2 text-sm rounded bg-cyan-200 rotate-12">
          Page Not Found
        </div>
        <button className="mt-5">
          <a className="relative inline-block text-sm font-medium text-slate-600 group active:text-white focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-cyan-200 group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span className="relative block px-8 py-3 font-bold border border-current bg-cyan-300">
              <Link to="/">Go Home</Link>
            </span>
          </a>
        </button>
      </main>
    </div>
  );
};

export default NotFound;
