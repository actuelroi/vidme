// components/OptionSelector.tsx
"use client";

import { cn } from "@/lib/utils";

import {
  getOptionValues,
  isOptionAvailable,
  Variant,
} from "@/utils/variantOptions";

interface Props {
  label: string;
  optionKey: string;
  variants: Variant[] | null;
  selectedOptions: Record<string, string>;
  onSelect: (key: string, value: string) => void;
}

const OptionSelector = ({
  label,
  optionKey,
  variants,
  selectedOptions,
  onSelect,
}: Props) => {

    if(variants === null){
        return
    }

  const values = getOptionValues(variants, optionKey);

  if (!values.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium">{label}</p>

      <div className="flex flex-wrap gap-2">
        {values.map(value => {
          const isSelected = selectedOptions[optionKey] === value;
          const available = isOptionAvailable(
            variants,
            optionKey,
            value,
            selectedOptions
          );

          return (
            <button
              key={value}
              disabled={!available}
              onClick={() => onSelect(optionKey, value)}
              className={cn(
                "px-3 py-1 border rounded text-sm transition",
                isSelected && "bg-black text-white",
                !available && "opacity-40 cursor-not-allowed"
              )}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OptionSelector;
