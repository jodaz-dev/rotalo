import { Photographer } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface PhotographerFilterProps {
  photographers: Photographer[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export const PhotographerFilter = ({
  photographers,
  selectedId,
  onSelect,
}: PhotographerFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "rounded-full px-4 py-2 text-sm font-medium transition-all",
          selectedId === null
            ? "bg-primary text-primary-foreground shadow-sm"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        )}
      >
        All Photos
      </button>
      {photographers.map((photographer) => (
        <button
          key={photographer.id}
          onClick={() => onSelect(photographer.id)}
          className={cn(
            "flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-medium transition-all",
            selectedId === photographer.id
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          <Avatar className="h-6 w-6">
            <AvatarImage src={photographer.logo} alt={photographer.name} />
            <AvatarFallback className="text-xs">
              {photographer.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline">{photographer.name}</span>
        </button>
      ))}
    </div>
  );
};
