"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CustomSingleBlogProp {
  blog: SingleBlogProps[];
  success: boolean;
}

const EditBlogPage = () => {
  const { slug } = useParams();
  const router = useRouter();

  const [SingleBlog, setSingleBlog] = useState<CustomSingleBlogProp | null>(
    null
  );
  const [TitleInput, setTitleInput] = useState("");
  const [DescInput, setDescInput] = useState("");

  useEffect(() => {
    const getData = async () => {
      if (slug) {
        const { data } = await axios.get(
          `http://localhost:3000/api/blogs/${slug}`
        );
        if (data && data?.success) {
          setSingleBlog(data);
          setTitleInput(data.blog[0].title);
          setDescInput(data.blog[0].description);
        } else {
          setSingleBlog(null);
        }
      }
    };

    getData();
  }, []);

  const HandleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (slug) {
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
        };

        let UpdatedData = {
          title: TitleInput,
          description: DescInput,
        };

        console.log(UpdatedData);

        const { data } = await axios.put(
          `http://localhost:3000/api/blogs/${slug}`,
          UpdatedData,
          config
        );

        console.log(data);

        if (data && data?.success) {
          router.push("/");
          alert("blog updated successfully !!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // console.log({ SingleBlog });

  return (
    <div className="w-full flex flex-col justify-between items-center p-5">
      <h1 className="text-[1.1rem] font-bold p-5">Blog Id : {slug}</h1>
      {/* edit form */}
      <form
        className="w-[80%] flex flex-col justify-between items-start "
        onSubmit={HandleEdit}
      >
        {/* title */}
        <input
          type="text"
          placeholder="Enter Title"
          value={TitleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          className="CustomInput w-full my-2"
          required
        />
        {/* description */}
        <textarea
          placeholder="Enter Description"
          value={DescInput}
          onChange={(e) => setDescInput(e.target.value)}
          className="CustomTextArea w-full my-2"
          rows={8}
          required
        ></textarea>

        {/* submit button */}
        <button
          type="submit"
          className="submitBtn bg-orange-600 hover:bg-orange-500 my-5"
        >
          Edit Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlogPage;
