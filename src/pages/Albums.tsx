import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Image, Calendar, Trash2, Pencil } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { mockAlbums, Album, AlbumPhoto } from "@/data/mockAlbums";
import { events } from "@/data/mockData";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Albums() {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<Album[]>(mockAlbums);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [albumToDelete, setAlbumToDelete] = useState<Album | null>(null);
  const [photoToDelete, setPhotoToDelete] = useState<{ albumId: string; photoId: string } | null>(null);
  const [viewingAlbum, setViewingAlbum] = useState<Album | null>(null);

  // Form state
  const [albumName, setAlbumName] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState<AlbumPhoto[]>([]);

  // Group albums by event
  const albumsByEvent = albums.reduce((acc, album) => {
    if (!acc[album.eventName]) {
      acc[album.eventName] = [];
    }
    acc[album.eventName].push(album);
    return acc;
  }, {} as Record<string, Album[]>);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos: AlbumPhoto[] = Array.from(files).map((file, index) => {
        const url = URL.createObjectURL(file);
        return {
          id: `new-${Date.now()}-${index}`,
          url,
          thumbnail: url,
        };
      });
      setUploadedPhotos((prev) => [...prev, ...newPhotos]);
    }
  };

  const handleCreateAlbum = () => {
    if (!albumName.trim()) {
      toast.error("El nombre del álbum es requerido");
      return;
    }
    if (!selectedEventId) {
      toast.error("Debes seleccionar un evento");
      return;
    }
    if (uploadedPhotos.length === 0) {
      toast.error("Debes subir al menos una fotografía");
      return;
    }

    const event = events.find((e) => e.id === selectedEventId);
    const newAlbum: Album = {
      id: `album-${Date.now()}`,
      name: albumName,
      eventId: selectedEventId,
      eventName: event?.name || "",
      photographerId: "current-user",
      photos: uploadedPhotos,
      createdAt: new Date().toISOString(),
    };

    setAlbums((prev) => [...prev, newAlbum]);
    resetForm();
    setIsCreateModalOpen(false);
    toast.success("Álbum creado exitosamente");
  };

  const handleEditAlbum = () => {
    if (!selectedAlbum) return;
    if (!albumName.trim()) {
      toast.error("El nombre del álbum es requerido");
      return;
    }
    if (!selectedEventId) {
      toast.error("Debes seleccionar un evento");
      return;
    }
    if (uploadedPhotos.length === 0) {
      toast.error("El álbum debe tener al menos una fotografía");
      return;
    }

    const event = events.find((e) => e.id === selectedEventId);
    setAlbums((prev) =>
      prev.map((album) =>
        album.id === selectedAlbum.id
          ? {
              ...album,
              name: albumName,
              eventId: selectedEventId,
              eventName: event?.name || "",
              photos: uploadedPhotos,
            }
          : album
      )
    );

    resetForm();
    setIsEditModalOpen(false);
    setSelectedAlbum(null);
    toast.success("Álbum actualizado exitosamente");
  };

  const handleDeleteAlbum = () => {
    if (!albumToDelete) return;
    setAlbums((prev) => prev.filter((album) => album.id !== albumToDelete.id));
    setAlbumToDelete(null);
    setViewingAlbum(null);
    toast.success("Álbum eliminado exitosamente");
  };

  const handleDeletePhoto = () => {
    if (!photoToDelete) return;
    
    if (viewingAlbum) {
      const updatedPhotos = viewingAlbum.photos.filter((p) => p.id !== photoToDelete.photoId);
      if (updatedPhotos.length === 0) {
        toast.error("El álbum debe tener al menos una fotografía");
        setPhotoToDelete(null);
        return;
      }
      setViewingAlbum({ ...viewingAlbum, photos: updatedPhotos });
      setAlbums((prev) =>
        prev.map((album) =>
          album.id === photoToDelete.albumId
            ? { ...album, photos: updatedPhotos }
            : album
        )
      );
    }
    
    setPhotoToDelete(null);
    toast.success("Fotografía eliminada exitosamente");
  };

  const openEditModal = (album: Album) => {
    setSelectedAlbum(album);
    setAlbumName(album.name);
    setSelectedEventId(album.eventId);
    setUploadedPhotos(album.photos);
    setIsEditModalOpen(true);
    setViewingAlbum(null);
  };

  const resetForm = () => {
    setAlbumName("");
    setSelectedEventId("");
    setUploadedPhotos([]);
  };

  const removeUploadedPhoto = (photoId: string) => {
    setUploadedPhotos((prev) => prev.filter((p) => p.id !== photoId));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/photographer-profile")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold">Mis Álbumes</h1>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Crear álbum
            </Button>
          </div>

          {/* Albums by Event */}
          {Object.keys(albumsByEvent).length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No tienes álbumes</h3>
                <p className="text-muted-foreground mb-4">
                  Crea tu primer álbum para comenzar a organizar tus fotografías
                </p>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Crear álbum
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {Object.entries(albumsByEvent).map(([eventName, eventAlbums]) => (
                <div key={eventName}>
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <h2 className="text-lg font-medium">{eventName}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {eventAlbums.map((album) => (
                      <Card
                        key={album.id}
                        className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
                        onClick={() => setViewingAlbum(album)}
                      >
                        <div className="aspect-video relative">
                          {album.photos[0] && (
                            <img
                              src={album.photos[0].thumbnail}
                              alt={album.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <h3 className="text-white font-medium truncate">
                              {album.name}
                            </h3>
                            <p className="text-white/80 text-sm">
                              {album.photos.length} fotografía
                              {album.photos.length !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                        <CardContent className="p-3">
                          <p className="text-xs text-muted-foreground">
                            Creado el{" "}
                            {format(new Date(album.createdAt), "d 'de' MMMM, yyyy", {
                              locale: es,
                            })}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Album Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Crear nuevo álbum</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="albumName">Nombre del álbum *</Label>
              <Input
                id="albumName"
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
                placeholder="Ej: Momentos Especiales"
              />
            </div>
            <div className="space-y-2">
              <Label>Evento *</Label>
              <Select value={selectedEventId} onValueChange={setSelectedEventId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un evento" />
                </SelectTrigger>
                <SelectContent>
                  {events.map((event) => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Fotografías *</Label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <Plus className="h-8 w-8 mb-2" />
                  <span className="text-sm">Subir fotografías</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </label>
              {uploadedPhotos.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {uploadedPhotos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <img
                        src={photo.thumbnail}
                        alt=""
                        className="w-full aspect-square object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeUploadedPhoto(photo.id)}
                        className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  resetForm();
                  setIsCreateModalOpen(false);
                }}
              >
                Cancelar
              </Button>
              <Button className="flex-1" onClick={handleCreateAlbum}>
                Crear álbum
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Album Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar álbum</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="editAlbumName">Nombre del álbum *</Label>
              <Input
                id="editAlbumName"
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
                placeholder="Ej: Momentos Especiales"
              />
            </div>
            <div className="space-y-2">
              <Label>Evento *</Label>
              <Select value={selectedEventId} onValueChange={setSelectedEventId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un evento" />
                </SelectTrigger>
                <SelectContent>
                  {events.map((event) => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Fotografías *</Label>
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <Plus className="h-6 w-6 mb-1" />
                  <span className="text-sm">Agregar más fotografías</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </label>
              {uploadedPhotos.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {uploadedPhotos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <img
                        src={photo.thumbnail}
                        alt=""
                        className="w-full aspect-square object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeUploadedPhoto(photo.id)}
                        className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  resetForm();
                  setIsEditModalOpen(false);
                  setSelectedAlbum(null);
                }}
              >
                Cancelar
              </Button>
              <Button className="flex-1" onClick={handleEditAlbum}>
                Guardar cambios
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Album Detail View Modal */}
      <Dialog open={!!viewingAlbum} onOpenChange={(open) => !open && setViewingAlbum(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {viewingAlbum && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>{viewingAlbum.name}</DialogTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditModal(viewingAlbum)}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setAlbumToDelete(viewingAlbum)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              </DialogHeader>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  {viewingAlbum.eventName} •{" "}
                  {viewingAlbum.photos.length} fotografía
                  {viewingAlbum.photos.length !== 1 ? "s" : ""}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {viewingAlbum.photos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <img
                        src={photo.thumbnail}
                        alt=""
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setPhotoToDelete({ albumId: viewingAlbum.id, photoId: photo.id })
                        }
                        className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Album Confirmation */}
      <AlertDialog open={!!albumToDelete} onOpenChange={(open) => !open && setAlbumToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este álbum?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminarán todas las fotografías
              del álbum "{albumToDelete?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAlbum}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sí, eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Photo Confirmation */}
      <AlertDialog open={!!photoToDelete} onOpenChange={(open) => !open && setPhotoToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar esta fotografía?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La fotografía será eliminada del álbum.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePhoto}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sí, eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
