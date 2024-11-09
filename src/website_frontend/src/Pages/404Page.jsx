import React from "react";

import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="bg-altprimaryColor fixed flex h-full w-full flex-col items-center justify-center">
      <div className="flex select-none items-center justify-center">
        <h1 className="-translate-x-8 -translate-y-10 text-[14rem] font-bold tracking-[-.135em] text-slate-900 md:text-[20rem]">
          404
        </h1>
        <span className="text-fontPrimaryColor absolute text-2xl font-semibold tracking-[.15em] md:text-5xl md:tracking-[.3em]">
          PAGE NOT FOUND
        </span>
      </div>
      <div></div>
      <Link
        to="/"
        className="text-fontPrimaryColor hover:bg-accentColor hover:border-accentColor flex -translate-y-10 rounded-full border border-white bg-transparent px-4 py-4 text-center font-bold tracking-widest md:min-w-fit md:px-10"
      >
        HOMEPAGE
      </Link>
    </main>
  );
}

export default NotFoundPage;
