"use client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
  const router = useRouter();

  const handleRemove = async () => {
    const res = await fetch(`/api/todo?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <button className="text-red-400 p-2" onClick={handleRemove}>
      <Trash2 className="w-6 h-6" />
    </button>
  );
}
