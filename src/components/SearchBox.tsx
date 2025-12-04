import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBox = ({
  value,
  onChange,
  placeholder = "Search events...",
  className = "",
}: SearchBoxProps) => {
  return (
    <div className={`flex w-full gap-2 ${className}`}>
      <div className="relative flex-1">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-12 rounded-xl border-border bg-card pl-4 pr-4 text-base shadow-card transition-shadow focus:shadow-card-hover"
        />
      </div>
      <Button
        size="lg"
        className="h-12 w-12 shrink-0 rounded-xl px-0 shadow-card transition-all hover:shadow-card-hover"
      >
        <Search className="h-5 w-5" />
      </Button>
    </div>
  );
};
