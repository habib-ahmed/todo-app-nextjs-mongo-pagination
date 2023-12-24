import Todo from "@/models/todo.model";
import Link from "next/link";

export default async function TodoDetails({ params }) {
  const { id } = params;
  const todo = await Todo.findById(id);

  return (
    <div className="container mx-auto md:w-1/2 rounded-lg shadow-md p-7 dark:bg-gray-800 my-10">
      <Link href={"/"} className="block p-2 pl-0 mb-4">
        {"<"} Back
      </Link>
      <h1 className="text-3xl font-bold">{todo.title}</h1>

      <span className="text-gray-400 text-sm flex flex-col">
        <span>Created: {todo.createdAt.toLocaleString()}</span>
        <span>Updated: {todo.updatedAt.toLocaleString()}</span>
      </span>

      <p className="mt-5">{todo.description.replace(/<[^>]+>/g, "")}</p>
    </div>
  );
}
