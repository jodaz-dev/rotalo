import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import { Header } from "@/components/Header";
import { SearchBox } from "@/components/SearchBox";
import { PhotoGrid } from "@/components/PhotoGrid";
import { PhotoModal } from "@/components/PhotoModal";
import { PhotographerFilter } from "@/components/PhotographerFilter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  getEventById,
  getPhotosByEvent,
  getPhotographerById,
  Photo,
  Photographer,
} from "@/data/mockData";

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhotographer, setSelectedPhotographer] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const event = eventId ? getEventById(eventId) : undefined;
  const allPhotos = eventId ? getPhotosByEvent(eventId) : [];

  const eventPhotographers = useMemo(() => {
    if (!event) return [];
    return event.photographers
      .map((id) => getPhotographerById(id))
      .filter((p): p is Photographer => p !== undefined);
  }, [event]);

  const filteredPhotos = useMemo(() => {
    let photos = allPhotos;
    if (selectedPhotographer) {
      photos = photos.filter((p) => p.photographerId === selectedPhotographer);
    }
    return photos;
  }, [allPhotos, selectedPhotographer]);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  const handlePhotoNavigate = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">Event Not Found</h1>
          <p className="mb-6 text-muted-foreground">
            The event you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/")}>Back to Events</Button>
        </main>
      </div>
    );
  }

  const mainPhotographer = getPhotographerById(event.photographers[0]);
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Sub Header with Search */}
      <div className="sticky top-16 z-40 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container flex items-center gap-3 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <SearchBox
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search photos..."
            className="flex-1"
          />
          <Button variant="ghost" size="icon" className="shrink-0">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <main className="container py-6">
        {/* Event Header */}
        <section className="mb-6 animate-fade-up">
          <div className="flex items-start gap-4">
            {mainPhotographer && (
              <Avatar className="h-16 w-16 shrink-0 border-2 border-card shadow-card">
                <AvatarImage src={mainPhotographer.logo} alt={mainPhotographer.name} />
                <AvatarFallback className="bg-primary/10 text-lg font-medium text-primary">
                  {mainPhotographer.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-bold text-foreground md:text-2xl">
                {event.name}
              </h1>
              <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              {mainPhotographer?.website && (
                <p className="mt-1 text-sm font-medium text-primary">
                  {mainPhotographer.website}
                </p>
              )}
            </div>
          </div>

          {event.description && (
            <p className="mt-4 text-sm text-muted-foreground md:text-base">
              {event.description}
            </p>
          )}
        </section>

        {/* Photographer Filter */}
        {eventPhotographers.length > 1 && (
          <section className="mb-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
            <PhotographerFilter
              photographers={eventPhotographers}
              selectedId={selectedPhotographer}
              onSelect={setSelectedPhotographer}
            />
          </section>
        )}

        {/* Photo Grid */}
        <section className="animate-fade-up" style={{ animationDelay: "200ms" }}>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? "s" : ""}
            </span>
          </div>
          <PhotoGrid photos={filteredPhotos} onPhotoClick={handlePhotoClick} />
        </section>
      </main>

      {/* Photo Modal */}
      <PhotoModal
        photo={selectedPhoto}
        photos={filteredPhotos}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onNavigate={handlePhotoNavigate}
      />
    </div>
  );
};

export default EventDetail;
