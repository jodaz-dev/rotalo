export interface Photographer {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

export interface Photo {
  id: string;
  url: string;
  thumbnail: string;
  photographerId: string;
  eventId: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  coverImage: string;
  description?: string;
  photographers: string[];
}

export const photographers: Photographer[] = [
  {
    id: "mag",
    name: "MAG Fotografía",
    logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    website: "magfotografia.ve",
  },
  {
    id: "richard",
    name: "Richard Bermúdez",
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "sportshot",
    name: "SportShot Pro",
    logo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
];

export const events: Event[] = [
  {
    id: "ironman-cartagena-2025",
    name: "IRONMAN 70.3 Cartagena 2025",
    date: "2025-12-01",
    coverImage: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=500&fit=crop",
    description: "Triathlon event in the beautiful city of Cartagena. Find yourself in the album and purchase your photos easily.",
    photographers: ["mag", "sportshot"],
  },
  {
    id: "sunday-music-run-2025",
    name: "Sunday Music Run 2025",
    date: "2025-11-30",
    coverImage: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=500&fit=crop",
    description: "A fun run with live music at every kilometer. Celebrate fitness and music together!",
    photographers: ["richard", "mag"],
  },
  {
    id: "marathon-bogota-2025",
    name: "Maratón de Bogotá 2025",
    date: "2025-11-15",
    coverImage: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800&h=500&fit=crop",
    description: "Annual marathon through the streets of Bogotá. Over 40,000 participants!",
    photographers: ["sportshot", "richard"],
  },
  {
    id: "triathlon-santa-marta",
    name: "Triatlón Santa Marta 2025",
    date: "2025-10-20",
    coverImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=500&fit=crop",
    description: "Ocean swim, coastal bike ride, and beach run in beautiful Santa Marta.",
    photographers: ["mag"],
  },
];

// Generate mock photos for each event
export const photos: Photo[] = [
  // IRONMAN photos
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `ironman-${i + 1}`,
    url: `https://images.unsplash.com/photo-${1530549387789 + i * 1000}?w=1200&h=800&fit=crop`,
    thumbnail: `https://images.unsplash.com/photo-${1530549387789 + i * 1000}?w=400&h=300&fit=crop`,
    photographerId: i % 2 === 0 ? "mag" : "sportshot",
    eventId: "ironman-cartagena-2025",
  })),
  // Sunday Music Run photos
  ...Array.from({ length: 9 }, (_, i) => ({
    id: `music-run-${i + 1}`,
    url: `https://images.unsplash.com/photo-${1552674605 + i * 1000}?w=1200&h=800&fit=crop`,
    thumbnail: `https://images.unsplash.com/photo-${1552674605 + i * 1000}?w=400&h=300&fit=crop`,
    photographerId: i % 2 === 0 ? "richard" : "mag",
    eventId: "sunday-music-run-2025",
  })),
];

// Better photo URLs for realistic display
export const realPhotos: Photo[] = [
  // IRONMAN Cartagena
  { id: "ir-1", url: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200", thumbnail: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400", photographerId: "mag", eventId: "ironman-cartagena-2025" },
  { id: "ir-2", url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200", thumbnail: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400", photographerId: "mag", eventId: "ironman-cartagena-2025" },
  { id: "ir-3", url: "https://images.unsplash.com/photo-1559311648-d8a1c4db88ec?w=1200", thumbnail: "https://images.unsplash.com/photo-1559311648-d8a1c4db88ec?w=400", photographerId: "sportshot", eventId: "ironman-cartagena-2025" },
  { id: "ir-4", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200", thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", photographerId: "mag", eventId: "ironman-cartagena-2025" },
  { id: "ir-5", url: "https://images.unsplash.com/photo-1565035010268-a3816f98589a?w=1200", thumbnail: "https://images.unsplash.com/photo-1565035010268-a3816f98589a?w=400", photographerId: "sportshot", eventId: "ironman-cartagena-2025" },
  { id: "ir-6", url: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=1200", thumbnail: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=400", photographerId: "mag", eventId: "ironman-cartagena-2025" },
  { id: "ir-7", url: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1200", thumbnail: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400", photographerId: "sportshot", eventId: "ironman-cartagena-2025" },
  { id: "ir-8", url: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1200", thumbnail: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400", photographerId: "mag", eventId: "ironman-cartagena-2025" },
  { id: "ir-9", url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200", thumbnail: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400", photographerId: "sportshot", eventId: "ironman-cartagena-2025" },
  
  // Sunday Music Run
  { id: "mr-1", url: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200", thumbnail: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400", photographerId: "richard", eventId: "sunday-music-run-2025" },
  { id: "mr-2", url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200", thumbnail: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400", photographerId: "mag", eventId: "sunday-music-run-2025" },
  { id: "mr-3", url: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=1200", thumbnail: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=400", photographerId: "richard", eventId: "sunday-music-run-2025" },
  { id: "mr-4", url: "https://images.unsplash.com/photo-1461896836934- voices?w=1200", thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe2336489f5?w=400", photographerId: "mag", eventId: "sunday-music-run-2025" },
  { id: "mr-5", url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200", thumbnail: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400", photographerId: "richard", eventId: "sunday-music-run-2025" },
  { id: "mr-6", url: "https://images.unsplash.com/photo-1486218119243-13883505764c?w=1200", thumbnail: "https://images.unsplash.com/photo-1486218119243-13883505764c?w=400", photographerId: "mag", eventId: "sunday-music-run-2025" },
  
  // Marathon Bogota
  { id: "mb-1", url: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=1200", thumbnail: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=400", photographerId: "sportshot", eventId: "marathon-bogota-2025" },
  { id: "mb-2", url: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=1200", thumbnail: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400", photographerId: "richard", eventId: "marathon-bogota-2025" },
  { id: "mb-3", url: "https://images.unsplash.com/photo-1461897104016-0b3b00b1ea81?w=1200", thumbnail: "https://images.unsplash.com/photo-1461897104016-0b3b00b1ea81?w=400", photographerId: "sportshot", eventId: "marathon-bogota-2025" },
  
  // Triathlon Santa Marta
  { id: "ts-1", url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200", thumbnail: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400", photographerId: "mag", eventId: "triathlon-santa-marta" },
  { id: "ts-2", url: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200", thumbnail: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400", photographerId: "mag", eventId: "triathlon-santa-marta" },
];

export const getPhotographerById = (id: string): Photographer | undefined => {
  return photographers.find((p) => p.id === id);
};

export const getEventById = (id: string): Event | undefined => {
  return events.find((e) => e.id === id);
};

export const getPhotosByEvent = (eventId: string): Photo[] => {
  return realPhotos.filter((p) => p.eventId === eventId);
};

export const getPhotosByEventAndPhotographer = (eventId: string, photographerId: string): Photo[] => {
  return realPhotos.filter((p) => p.eventId === eventId && p.photographerId === photographerId);
};
