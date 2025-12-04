import { Photo } from "@/data/mockData";

interface PhotoGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

export const PhotoGrid = ({ photos, onPhotoClick }: PhotoGridProps) => {
  if (photos.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No photos found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-4">
      {photos.map((photo, index) => (
        <button
          key={photo.id}
          onClick={() => onPhotoClick(photo)}
          className="group relative aspect-square overflow-hidden rounded-lg bg-muted transition-all hover:ring-2 hover:ring-primary hover:ring-offset-2"
          style={{
            animationDelay: `${index * 50}ms`,
          }}
        >
          <img
            src={photo.thumbnail}
            alt={`Photo ${photo.id}`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/10" />
        </button>
      ))}
    </div>
  );
};
