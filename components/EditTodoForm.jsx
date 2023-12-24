"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { QuillFormats, QuillModules } from "@/constants";

export default function EditTodoForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (!res.ok) {
        throw new Error("Failed to update todo");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        className="input-control"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />

      <ReactQuill
        modules={QuillModules}
        formats={QuillFormats}
        value={newDescription}
        onChange={setNewDescription}
      />

      <div>
        <button
          type="submit"
          className="py-2 px-4 bg-primary text-white rounded"
        >
          Update Todo
        </button>
      </div>
    </form>
  );
}