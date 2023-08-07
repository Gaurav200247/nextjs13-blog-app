"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

const BlogSearchBar = () => {
  const [SearchInput, setSearchInput] = useState("");

  const router = useRouter();

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/?title=${SearchInput}`);
  };

  return (
    <form
      onSubmit={HandleSubmit}
      className="w-[70%] rounded-sm flex justify-between items-center px-4 py-2 bg-white text-black font-light"
    >
      <button className="mr-2" type="submit">
        <BsSearch />
      </button>
      <input
        type="text"
        placeholder="Search by Title"
        value={SearchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="outline-none w-[90%] "
      />
    </form>
  );
};

export default BlogSearchBar;
