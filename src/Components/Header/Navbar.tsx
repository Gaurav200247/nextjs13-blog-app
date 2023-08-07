import React from "react";
import BlogSearchBar from "./BlogSearchBar";
import Link from "next/link";
import { MdCreateNewFolder } from "react-icons/md";
import { Rajdhani } from "next/font/google";

const font = Rajdhani({ subsets: ["latin"], weight: "600" });

const Navbar = () => {
  return (
    <div className="flex justify-around items-center px-5 py-3 bg-zinc-700 shadow-md">
      <Link
        href="/"
        className={`text-3xl hover:text-yellow-600 font-bold ${font.className}`}
      >
        Blogs App
      </Link>

      <ul className="flex justify-between items-center w-[50%] font-medium">
        <BlogSearchBar />

        <Link
          href="/create-blog"
          className="text-xl hover:text-yellow-600 flex justify-between items-center truncate"
        >
          <MdCreateNewFolder className="mx-2 ml-5" /> Create Blog
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
