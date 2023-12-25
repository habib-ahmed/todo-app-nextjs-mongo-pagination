import Link from "next/link";
import { Eye, PenSquare } from "lucide-react";
import RemoveBtn from "@/components/RemoveBtn";
import TodoStatus from "@/components/TodoStatus";
import { connectToDatabase } from "@/lib/db";
import Todo from "@/models/todo.model";

async function getData(perPage, page) {
  try {
    await connectToDatabase();

    const items = await Todo.find()
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage);

    const itemCount = await Todo.countDocuments();

    const response = { items, itemCount };
    return response;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home({ searchParams }) {
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 2;
  const data = await getData(perPage, page);
  // console.log(data);

  const totalPages = Math.ceil(data.itemCount / perPage);
  // console.log(totalPages);

  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;
  const isPageOutOfRange = page > totalPages;

  const pageNumbers = [];
  const offsetNumber = 2;
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }

  return (
    <>
      <div className="text-3xl font-bold p-4 text-center">
        <p>Search Todo...</p>
      </div>

      {data.items.map((todo) => (
        <div
          key={todo._id.toString()}
          className={`p-4 border border-slate-300 dark:border-slate-700 my-3 flex justify-between gap-5 items-center ${
            todo.isCompleted && "text-green-400"
          }`}
        >
          <div>
            <h2 className={`font-semibold text-2xl`}>
              {todo.title.length > 40
                ? todo.title.substr(0, 40) + "..."
                : todo.title}
            </h2>
            <p
              dangerouslySetInnerHTML={{
                __html:
                  todo.description.length > 110
                    ? todo.description.substr(0, 110) + "..."
                    : todo.description,
              }}
            />
          </div>

          <div className="flex gap-1">
            {/* Edit Todo */}
            <Link href={`/edit-todo/${todo._id.toString()}`} className="p-2">
              <PenSquare className="w-6 h-6" />
            </Link>

            {/* Todo Details */}
            <Link href={`/todo-lists/${todo._id.toString()}`} className="p-2">
              <Eye className="w-6 h-6" />
            </Link>

            {/* Todo Status */}
            <TodoStatus
              id={todo._id.toString()}
              color={todo.isCompleted ? "text-green-400" : "text-gray-500"}
            />

            {/* Remove Todo */}
            <RemoveBtn id={todo._id.toString()} />
          </div>
        </div>
      ))}

      {/* Pagination 
      ==================================*/}
      {isPageOutOfRange ? (
        <div className="text-3xl font-bold text-center my-10">
          No more todos...
        </div>
      ) : (
        <div className="flex justify-center items-center mt-16">
          <div className="flex border-[1px] gap-4 rounded-[10px] border-light-green p-4">
            {page === 1 ? (
              <div className="opacity-60" aria-disabled="true">
                Previous
              </div>
            ) : (
              <Link href={`?page=${prevPage}`} aria-label="Previous Page">
                Previous
              </Link>
            )}

            {pageNumbers.map((pageNumber, index) => (
              <Link
                key={index}
                className={`px-2 fw-bold rounded-md ${
                  page === pageNumber ? "bg-green-500" : "hover:bg-green-500"
                }`}
                href={`?page=${pageNumber}`}
              >
                {pageNumber}
              </Link>
            ))}

            {page === totalPages ? (
              <div className="opacity-60" aria-disabled="true">
                Next
              </div>
            ) : (
              <Link href={`?page=${nextPage}`} aria-label="Next Page">
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
