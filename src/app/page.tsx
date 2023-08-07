"use client";

import SingleBlog from "@/Components/Blog/SingleBlog";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const Home = () => {
  const searchParams = useSearchParams();

  let query = searchParams.get("title");

  const [Blogs, setBlogs] = useState<BlogProps | null>(null);

  const URL = "http://localhost:3000/api/blogs";

  useEffect(() => {
    const getData = async (url: string) => {
      const { data } = await axios.get(url);

      console.log(url);

      if (data) {
        setBlogs(data);
      } else {
        setBlogs(null);
      }
    };
    if (query) {
      let queryUrl = URL + `?title=${query}`;
      getData(queryUrl);
    } else {
      getData(URL);
    }
  }, [URL, query]);

  console.log({ Blogs });

  return (
    <div className="flex flex-col justify-between items-center w-full">
      <h1 className="w-full text-center text-lg p-2">NEXT JS 13 Blog App </h1>

      <div className="w-[60%] flex flex-col justify-between items-center my-2">
        {Blogs?.blogs && Blogs.blogs.length > 0 ? (
          Blogs.blogs.map((item, index) => {
            return <SingleBlog key={index} data={item} />;
          })
        ) : (
          <h1>No Blogs Found !!</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
