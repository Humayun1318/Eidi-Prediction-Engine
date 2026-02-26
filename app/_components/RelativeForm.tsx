// app/components/RelativeForm.tsx
"use client";

import { Relative } from "@/lib/types";

interface RelativeFormProps {
  relative: Relative;
  index: number;
  updateRelative: (
    id: number,
    field: keyof Relative,
    value: string | boolean,
  ) => void;
  removeRelative: (id: number) => void;
  showRemove: boolean;
}

export default function RelativeForm({
  relative,
  index,
  updateRelative,
  removeRelative,
  showRemove,
}: RelativeFormProps) {
  return (
    <div className="bg-white/5 p-4 rounded-xl border border-gray-700 relative">
      {/* Remove button */}
      {showRemove && (
        <button
          type="button"
          onClick={() => removeRelative(relative.id)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-sm shadow-lg hover:bg-red-600 transition-colors z-10"
        >
          ✕
        </button>
      )}

      <div className="text-xs text-gray-400 mb-2">#{index + 1}</div>

      {/* Name & Relation Row */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <label className="text-[10px] text-gray-400 block mb-1">নাম</label>
          <input
            type="text"
            value={relative.name}
            onChange={(e) =>
              updateRelative(relative.id, "name", e.target.value)
            }
            placeholder="e.g., Uncle Rahim"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-pink-400 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="text-[10px] text-gray-400 block mb-1">
            সম্পর্ক
          </label>
          <select
            value={relative.relation}
            onChange={(e) =>
              updateRelative(relative.id, "relation", e.target.value)
            }
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:border-pink-400 focus:outline-none"
            required
          >
            <option value="">বাছাই কর</option>
            <option value="Uncle">চাচা/মামা</option>
            <option value="Aunt">চাচী/খালা</option>
            <option value="Cousin">কাজিন</option>
            <option value="Friend">বন্ধু</option>
            <option value="Brother">ভাই</option>
            <option value="Sister">বোন</option>
            <option value="Other">অন্যান্য</option>
          </select>
        </div>
      </div>

      {/* Eidi Amounts Row */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <label className="text-[10px] text-gray-400 block mb-1">
            ঈদি ২০২৪ (টাকা)
          </label>
          <input
            type="number"
            value={relative.eidi2024}
            onChange={(e) =>
              updateRelative(relative.id, "eidi2024", e.target.value)
            }
            placeholder="০"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white"
            required
            min="0"
          />
        </div>
        <div>
          <label className="text-[10px] text-gray-400 block mb-1">
            ঈদি ২০২৫ (টাকা)
          </label>
          <input
            type="number"
            value={relative.eidi2025}
            onChange={(e) =>
              updateRelative(relative.id, "eidi2025", e.target.value)
            }
            placeholder="০"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white"
            required
            min="0"
          />
        </div>
      </div>

      {/* Promise Toggle */}
      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={relative.promised}
          onChange={(e) =>
            updateRelative(relative.id, "promised", e.target.checked)
          }
          className="w-4 h-4 accent-pink-500 cursor-pointer"
        />
        <span className="text-gray-300">এই বছর promise করেছে</span>
        <span className="text-xs text-gray-500">(কাল দিচ্ছি বলে?)</span>
      </label>
    </div>
  );
}
