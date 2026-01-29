import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface OptionSelectorProps {
  label: string;
  options: string[] ;
  value: string[];
  onChange: (v: string[]) => void;
  multiple?: boolean;
}

export default function OptionSelector({
  label,
  options,
  value,
  onChange,
  multiple = false,
}: OptionSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-gray-500">{label}</p>

      {multiple ? (
        <ToggleGroup
          type="multiple"
          value={value}
          onValueChange={(v) => onChange(v)}
          className="flex flex-wrap gap-2"
        >
          {options.map((option) => (
            <ToggleGroupItem key={option} value={option}>
              {option}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      ) : (
        <ToggleGroup
          type="single"
          value={value[0] || ""}
          onValueChange={(v) => onChange(v ? [v] : [])}
          className="flex flex-wrap gap-2"
        >
          {options.map((option) => (
            <ToggleGroupItem key={option} value={option}>
              {option}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}
    </div>
  );
}
