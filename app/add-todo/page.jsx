"use client";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { QuillFormats, QuillModules } from "@/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description, thumbnail }),
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
    <div>
      <h1 className="text-3xl font-bold mb-5 underline underline-offset-8">
        Create Todo
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex gap-10 items-center">
          <label htmlFor="thumbnail" className="text-xl">
            Select Thumbnail:
          </label>
          <input
            type="file"
            name="thumbnail"
            id="thumbnail"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="image/*"
            className="input-control"
          />
          {thumbnail && (
            <Image
              src={URL.createObjectURL(thumbnail)}
              alt="Thumbnail"
              width={100}
              height={100}
            />
          )}
        </div>

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
    </div>
  );
}
