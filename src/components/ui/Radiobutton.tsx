
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string;
  selected: string;
  onChange: (value: string) => void;
};

export default function RadioButton({ label, value, selected, onChange }: Props) {
  const isChecked = selected === value;

  return (
    <label
      className="flex items-center gap-2 text-sm cursor-pointer text-[var(--text)]"
      onClick={() => onChange(value)}
    >
      <div
        className={cn(
          "w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors",
          isChecked
            ? "bg-[var(--brand-color)] border-[var(--brand-color)]"
            : "border-[var(--text)] bg-white"
        )}
      >
        {isChecked && (
          <svg
            className="w-[10px] h-[10px] text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      {label}
    </label>
  );
}
