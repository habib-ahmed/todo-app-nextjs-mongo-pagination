"use client";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { QuillFormats, QuillModules } from "@/constants";
import { useRouter } from "next/navigation";

export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Todo Title"
          className="input-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <ReactQuill
          modules={QuillModules}
          formats={QuillFormats}
          value={description}
          onChange={setDescription}
        />

        <div>
          <button
            type="submit"
            className="py-2 px-4 bg-primary text-white rounded"
          >
            Create Todo
          </button>
        </div>
      </form>
    </>
  );
}
