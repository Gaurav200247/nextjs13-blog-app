"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateBlogPage = () => {
  const router = useRouter();

  const [TitleInput, setTitleInput] = useState("");
  const [DescInput, setDescInput] = useState("");

  const CreateBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const BlogData = {
        title: TitleInput,
        description: DescInput,
      };

      const { data } = await axios.post(
        "http://localhost:3000/api/blogs",
        BlogData,
        config
      );

      console.log(data);

      if (data && data?.success) {
        router.push("/");
        alert("blog created successfully !!");
      } else {
        alert("Something went wrong...");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-between items-center p-5">
      {/* blog creation form */}
      <form
        className="w-[80%] flex flex-col justify-between items-start "
        onSubmit={CreateBlog}
      >
        {/* title */}
        <input
          type="text"
          placeholder="Enter Title"
          value={TitleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          className="CustomInput w-full my-2"
        />
        {/* description */}
        <textarea
          placeholder="Enter Description"
          value={DescInput}
          onChange={(e) => setDescInput(e.target.value)}
          className="CustomTextArea w-full my-2"
          rows={8}
        ></textarea>

        {/* submit button */}
        <button
          type="submit"
          className="submitBtn bg-green-600 hover:bg-green-500 my-5 text-black"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
