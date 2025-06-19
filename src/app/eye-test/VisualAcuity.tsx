"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { testStore } from "@/lib/testStore";

const letters = [
  "E",
  "F",
  "P",
  "T",
  "O",
  "Z",
  "L",
  "P",
  "E",
  "D",
];

export default function VisualAcuity() {
  const router = useRouter();
  const [level, setLevel] = useState(0);
  const [input, setInput] = useState("");
  const [responses, setResponses] = useState<{ letter: string; answer: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    const currentLetter = letters[level];
    const nextResponses = [...responses, { letter: currentLetter, answer: input.toUpperCase() }];
    setResponses(nextResponses);
    setInput("");

    if (level + 1 < letters.length) {
      setLevel(level + 1);
    } else {
      testStore.setVisualAcuity(nextResponses);
      router.push("/eye-test/color-blind");
    }
  };

  const fontSize = 100 - level * 4;

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl mb-4">Type the letter you see</h2>
      <div
        className="font-bold mb-6"
        style={{ fontSize: `${fontSize}px` }}
      >
        {letters[level]}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={input}
        style={{ textTransform: "uppercase" }}
        onChange={(e) => setInput(e.target.value)}
        maxLength={1}
        className="mb-4 px-4 py-2 border rounded text-center text-lg"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
      <button
        onClick={() => router.push("/eye-test/color-blind")}
        className="mt-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
      >
        Skip to next section
      </button>
    </div>
  );
}