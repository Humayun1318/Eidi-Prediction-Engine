// app/components/AddRelativesModal.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RelativeForm from "./RelativeForm";
import { Relative } from "@/lib/types";

interface AddRelativesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddRelativesModal({ isOpen, onClose }: AddRelativesModalProps) {
  const router = useRouter();
  const [relatives, setRelatives] = useState<Relative[]>([
    {
      id: Date.now(),
      name: "",
      relation: "",
      eidi2024: "",
      eidi2025: "",
      promised: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  if (!isOpen) return null;

  const addNewRelative = (): void => {
    setRelatives([
      ...relatives,
      {
        id: Date.now() + Math.random(),
        name: "",
        relation: "",
        eidi2024: "",
        eidi2025: "",
        promised: false,
      },
    ]);
  };

  const updateRelative = (id: number, field: keyof Relative, value: string | boolean): void => {
    setRelatives(
      relatives.map((rel) => (rel.id === id ? { ...rel, [field]: value } : rel))
    );
  };

  const removeRelative = (id: number): void => {
    if (relatives.length > 1) {
      setRelatives(relatives.filter((rel) => rel.id !== id));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");

    // Filter out empty rows
    const validRelatives = relatives.filter(
      (rel) =>
        rel.name.trim() &&
        rel.relation.trim() &&
        rel.eidi2024 !== "" &&
        rel.eidi2025 !== ""
    );

    if (validRelatives.length === 0) {
      setError("কমপক্ষে ১ জন relative যোগ করো ভাই! 😭");
      return;
    }

    setIsLoading(true);
    

    try {
      // Call API to get prediction
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ relatives: validRelatives }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Close modal and redirect to prediction page
      onClose();
      router.push(`/prediction?id=${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "কিছু একটা সমস্যা হইছে 😭");
    } finally {
      setIsLoading(false);
    }
  };

   return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content - Bottom Sheet on Mobile, Centered on Desktop */}
      <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 max-h-[90vh] overflow-y-auto border-t-4 border-pink-500 animate-[slideUp_0.3s_ease-out]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-slate-900/80 backdrop-blur py-2 z-10">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span>➕</span>
            Add Relatives
            <span className="text-sm text-pink-400">(২ বছর ডাটা লাগবে)</span>
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xl hover:bg-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Relative Forms */}
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
            {relatives.map((relative, index) => (
              <RelativeForm
                key={relative.id}
                relative={relative}
                index={index}
                updateRelative={updateRelative}
                removeRelative={removeRelative}
                showRemove={relatives.length > 1}
              />
            ))}
          </div>

          {/* Add More Button */}
          <button
            type="button"
            onClick={addNewRelative}
            className="w-full mt-4 py-3 bg-gray-700/50 border-2 border-dashed border-gray-600 rounded-xl text-gray-300 hover:border-pink-400 transition-all flex items-center justify-center gap-2"
          >
            <span className="text-xl">➕</span>
            আরও relative যোগ কর
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-bold text-lg shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span>
                حساب کر رہے ہیں...
              </>
            ) : (
              <>
                <span>🔮</span>
                আমার ঈদির ভবিষ্যৎ দেখাও
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-500 mt-3">
            ⚡ ডাটা সেভ হবে MongoDB তে • শেয়ার করতে পারবে 😉
          </p>
        </form>
      </div>
    </div>
  );
}