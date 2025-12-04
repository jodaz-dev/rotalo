import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Photo, getPhotographerById } from "@/data/mockData";

interface PhotoModalProps {
  photo: Photo | null;
  photos: Photo[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (photo: Photo) => void;
}

export const PhotoModal = ({
  photo,
  photos,
  isOpen,
  onClose,
  onNavigate,
}: PhotoModalProps) => {
  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;
  const photographer = getPhotographerById(photo.photographerId);

  const handlePrev = () => {
    if (hasPrev) {
      onNavigate(photos[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      onNavigate(photos[currentIndex + 1]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="flex h-[95vh] max-w-[95vw] flex-col gap-0 overflow-hidden border-none bg-foreground/95 p-0 sm:rounded-2xl"
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-card/10 px-4 py-3">
          <div className="flex items-center gap-3">
            {photographer && (
              <>
                <img
                  src={photographer.logo}
                  alt={photographer.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-card">
                  {photographer.name}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-card/70 hover:bg-card/10 hover:text-card"
            >
              <Download className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-card/70 hover:bg-card/10 hover:text-card"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Image Container */}
        <div className="relative flex flex-1 items-center justify-center overflow-hidden">
          {/* Navigation Buttons */}
          {hasPrev && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrev}
              className="absolute left-2 z-10 h-12 w-12 rounded-full bg-card/10 text-card backdrop-blur-sm hover:bg-card/20 sm:left-4"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}
          {hasNext && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="absolute right-2 z-10 h-12 w-12 rounded-full bg-card/10 text-card backdrop-blur-sm hover:bg-card/20 sm:right-4"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}

          {/* Main Image */}
          <img
            src={photo.url}
            alt={`Photo by ${photographer?.name || "Unknown"}`}
            className="max-h-full max-w-full object-contain animate-fade-in"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center border-t border-card/10 px-4 py-3">
          <span className="text-xs text-card/50">
            {currentIndex + 1} / {photos.length}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
