"use client";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TodoStatus({ id, color }) {
  const [completed, setCompleted] = useState(false);
  const router = useRouter();

  const handleCompleted = async () => {
    const res = await fetch(`/api/todo?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isCompleted: !completed,
      }),
    });

    if (res.ok) {
      setCompleted(!completed);
      router.refresh();
    }
  };

  return (
    <button className={`p-2 ${color}`} onClick={handleCompleted}>
      <CheckCircle className="w-6 h-6" />
    </button>
  );
}