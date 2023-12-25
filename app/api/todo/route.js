import { connectToDatabase } from "@/lib/db";
import Todo from "@/models/todo.model";
import { NextResponse } from "next/server";

//Create a new todo: /api/todo
export async function POST(request) {
  await connectToDatabase();

  const { title, description, isCompleted } = await request.json();
  await Todo.create({ title, description, isCompleted });

  return NextResponse.json(
    { message: "Todo Created Successfully" },
    { status: 201 }
  );
}

//Get all todo: /api/todo
export async function GET() {
  await connectToDatabase();
  const todo = await Todo.find();
  return NextResponse.json(todo);
}

//Delete a todo: /api/todo
export async function DELETE(request) {
  await connectToDatabase();
  const id = request.nextUrl.searchParams.get("id");
  await Todo.findByIdAndDelete(id);
  return NextResponse.json({message: "Todo Deleted Successfully" },{ status: 200 });
}

// isCompleted: /api/todo
export async function PATCH(request) {
  await connectToDatabase();
  const id = request.nextUrl.searchParams.get("id");
  const { isCompleted } = await request.json();
  await Todo.findByIdAndUpdate(id, { isCompleted });
  return NextResponse.json({message: "Todo Completed Successfully" },{ status: 200 });
}
