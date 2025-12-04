import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Event, getPhotographerById } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const mainPhotographer = getPhotographerById(event.photographers[0]);
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      to={`/event/${event.id}`}
      className="group block overflow-hidden rounded-xl bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      {/* Cover Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.coverImage}
          alt={event.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
      </div>

      {/* Card Content */}
      <div className="flex items-start gap-3 p-4">
        {mainPhotographer && (
          <Avatar className="h-12 w-12 shrink-0 border-2 border-card shadow-sm">
            <AvatarImage src={mainPhotographer.logo} alt={mainPhotographer.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {mainPhotographer.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-foreground group-hover:text-primary transition-colors">
            {event.name}
          </h3>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
