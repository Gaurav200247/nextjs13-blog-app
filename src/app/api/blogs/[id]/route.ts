import Blog from "@/Models/Blog";
import connectDB from "@/libs/connectDB";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

// get single blog
export async function GET(req: NextRequest, route: { params: { id: string } }) {
  const { id } = route.params;

  await connectDB();

  const blog = await Blog.find({ _id: id });

  if (!blog || blog === null || blog.length <= 0) {
    return NextResponse.json(
      { success: false, msg: `Blog with id : ${id} does not exist.` },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  return NextResponse.json({ success: true, blog }, { status: StatusCodes.OK });
}

// delete a blog
export async function DELETE(
  req: NextRequest,
  route: { params: { id: string } }
) {
  const { id } = route.params;

  await connectDB();

  const blog = await Blog.find({ _id: id });

  if (!blog || blog === null || blog.length <= 0) {
    return NextResponse.json(
      { success: false, msg: `Blog with id : ${id} does not exist.` },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  await Blog.findByIdAndRemove({ _id: id });

  return NextResponse.json({ success: true }, { status: StatusCodes.OK });
}

// update a blog

export async function PUT(req: NextRequest, route: { params: { id: string } }) {
  const { id } = route.params;
  const { title, description } = await req.json();

  await connectDB();

  const blog = await Blog.find({ _id: id });

  if (!blog || blog === null || blog.length <= 0) {
    return NextResponse.json(
      { success: false, msg: `Blog with id : ${id} does not exist.` },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    { _id: id },
    { title, description },
    { runValidators: true, new: true }
  );

  return NextResponse.json(
    { success: true, blog: updatedBlog },
    { status: StatusCodes.OK }
  );
}
