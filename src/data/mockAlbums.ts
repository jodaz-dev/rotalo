export interface AlbumPhoto {
  id: string;
  url: string;
  thumbnail: string;
}

export interface Album {
  id: string;
  name: string;
  eventId: string;
  eventName: string;
  photographerId: string;
  photos: AlbumPhoto[];
  createdAt: string;
}

export const mockAlbums: Album[] = [
  {
    id: "album-1",
    name: "Momentos Especiales",
    eventId: "ironman-cartagena-2025",
    eventName: "IRONMAN 70.3 Cartagena 2025",
    photographerId: "current-user",
    photos: [
      { id: "ap-1", url: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200", thumbnail: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400" },
      { id: "ap-2", url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200", thumbnail: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400" },
      { id: "ap-3", url: "https://images.unsplash.com/photo-1559311648-d8a1c4db88ec?w=1200", thumbnail: "https://images.unsplash.com/photo-1559311648-d8a1c4db88ec?w=400" },
    ],
    createdAt: "2025-12-01T10:30:00Z",
  },
  {
    id: "album-2",
    name: "Llegadas a la Meta",
    eventId: "ironman-cartagena-2025",
    eventName: "IRONMAN 70.3 Cartagena 2025",
    photographerId: "current-user",
    photos: [
      { id: "ap-4", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200", thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
      { id: "ap-5", url: "https://images.unsplash.com/photo-1565035010268-a3816f98589a?w=1200", thumbnail: "https://images.unsplash.com/photo-1565035010268-a3816f98589a?w=400" },
    ],
    createdAt: "2025-12-01T14:00:00Z",
  },
  {
    id: "album-3",
    name: "Carrera Nocturna",
    eventId: "sunday-music-run-2025",
    eventName: "Sunday Music Run 2025",
    photographerId: "current-user",
    photos: [
      { id: "ap-6", url: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200", thumbnail: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400" },
      { id: "ap-7", url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200", thumbnail: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400" },
      { id: "ap-8", url: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=1200", thumbnail: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=400" },
      { id: "ap-9", url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200", thumbnail: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400" },
    ],
    createdAt: "2025-11-30T16:45:00Z",
  },
  {
    id: "album-4",
    name: "Mejores Momentos",
    eventId: "marathon-bogota-2025",
    eventName: "Maratón de Bogotá 2025",
    photographerId: "current-user",
    photos: [
      { id: "ap-10", url: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=1200", thumbnail: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=400" },
      { id: "ap-11", url: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=1200", thumbnail: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400" },
      { id: "ap-12", url: "https://images.unsplash.com/photo-1461897104016-0b3b00b1ea81?w=1200", thumbnail: "https://images.unsplash.com/photo-1461897104016-0b3b00b1ea81?w=400" },
    ],
    createdAt: "2025-11-15T12:00:00Z",
  },
];
