import axios from "axios";
import Link from "next/link";
import React from "react";
import { LuEdit } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";

interface dataProps {
  data: SingleBlogProps;
}

const SingleBlog = ({ data }: dataProps) => {
  const HandleDelete = async (e: React.FormEvent<HTMLButtonElement>) => {
    let Blog_Id = data._id;

    if (Blog_Id) {
      try {
        const { data } = await axios.delete(
          `http://localhost:3000/api/blogs/${Blog_Id}`
        );

        console.log(data);

        if (data && data?.success) {
          alert(`Blog with Id : ${Blog_Id} is deleted successfully !!`);
          window.location.reload();
        } else {
          alert(`Something went wrong...`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full  flex flex-col justify-between items-center p-3 border-2 border-white">
      {/* title container */}
      <div className="w-full flex justify-between items-center ">
        {/* title */}
        <h1 className="w-[70%] text-[1.5rem] font-semibold underline">
          {data.title}
        </h1>

        {/* buttons */}
        <span className="flex justify-end items-center w-[20%]">
          <Link href={`/edit-blog/${data._id}`}>
            <LuEdit className="cursor-pointer text-orange-400 text-xl mx-2" />
          </Link>

          <RiDeleteBin5Line
            className="cursor-pointer text-red-600 text-xl mx-2"
            onClick={HandleDelete}
          />
        </span>
      </div>

      {/* desc */}
      <p className="w-full text-[0.9rem] my-2">{data.description}</p>

      {/* info */}
      <p className="w-full flex justify-between items-center text-[0.6rem] text-gray-500 font-extralight">
        <span>Created : {data.createdAt}</span>
        <span>Updated : {data.updatedAt}</span>
      </p>
    </div>
  );
};

export default SingleBlog;
