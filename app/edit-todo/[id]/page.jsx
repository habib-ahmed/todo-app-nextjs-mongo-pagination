import EditTodoForm from "@/components/EditTodoForm";
import Todo from "@/models/todo.model";
import Link from "next/link";

export default async function EditTodo({ params }) {
  const { id } = params;
  const todo = await Todo.findById(id);
  const { title, description } = todo;

  return (
    <>
      <div>
        <Link href={"/"} className="block p-2 pl-0 mb-4">
          {"<"} Back
        </Link>
      </div>
      <EditTodoForm id={id} title={title} description={description} />
    </>
  );
}
