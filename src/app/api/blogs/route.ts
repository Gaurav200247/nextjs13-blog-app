import Blog from "@/Models/Blog";
import { StatusCodes } from "http-status-codes";
import connectDB from "@/libs/connectDB";
import { NextRequest, NextResponse } from "next/server";

// get all blogs

export async function GET(req: NextRequest) {
  await connectDB();

  const url = new URL(req.url);

  const title = url.searchParams.get("title");

  if (title) {
    const blogs = await Blog.find({ title: { $regex: title, $options: "i" } });
    //   return is important
    return NextResponse.json(
      {
        success: true,
        nbHits: blogs.length,
        blogs,
      },
      { status: StatusCodes.OK }
    );
  } else {
    const blogs = await Blog.find();
    //   return is important
    return NextResponse.json(
      {
        success: true,
        nbHits: blogs.length,
        blogs,
      },
      { status: StatusCodes.OK }
    );
  }
}

// post all blogs
export async function POST(req: NextRequest) {
  const { title, description } = await req.json(); // same as req.body

  await connectDB();

  const blog = await Blog.create({ title, description });

  //   return is important
  return NextResponse.json(
    {
      success: true,
      blog,
    },
    { status: StatusCodes.CREATED }
  );
}
