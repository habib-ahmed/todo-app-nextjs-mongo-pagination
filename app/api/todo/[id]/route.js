import { connectToDatabase } from "@/lib/db";
import Todo from "@/models/todo.model";
import { NextResponse } from "next/server";

// Get associated Todo: /api/todo/[id]
export async function GET({ params }) {
  await connectToDatabase();
  const { id } = params;

  const todo = await Todo.findOne({ _id: id });
  return NextResponse.json({ todo }, { status: 200 });
}

// Update associated Todo: /api/todo/[id]
export async function PUT(request, { params }) {
  await connectToDatabase();
  const { id } = params;

  const {
    newTitle: title,
    newDescription: description,
    newThumb: thumbnail,
  } = await request.json();

  await Todo.findByIdAndUpdate(id, { title, description, thumbnail });

  return NextResponse.json(
    { message: "Todo updated successfully" },
    { status: 200 }
  );
}