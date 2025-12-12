import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Upload, Trash2, ClipboardList, Image } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useAuth, PhotographerData } from "@/contexts/AuthContext";
import { PhotographerDetails } from "@/components/profile/PhotographerDetails";
import { PaymentDetails } from "@/components/profile/PaymentDetails";

const photographerSchema = z.object({
  brandName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  bank: z.string().min(2, "El banco es requerido"),
  documentId: z.string().min(5, "El documento es requerido"),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  accountHolder: z.string().min(2, "El titular de la cuenta es requerido"),
});

type PhotographerFormData = z.infer<typeof photographerSchema>;

export default function PhotographerProfile() {
  const navigate = useNavigate();
  const { user, photographer, setPhotographer } = useAuth();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [watermarkPreview, setWatermarkPreview] = useState<string | null>(null);

  const isCreating = !photographer;

  const form = useForm<PhotographerFormData>({
    resolver: zodResolver(photographerSchema),
    defaultValues: photographer || {
      brandName: "",
      email: "",
      description: "",
      bank: "",
      documentId: "",
      phone: "",
      accountHolder: "",
    },
  });

  useEffect(() => {
    if (photographer && !isCreating) {
      form.reset(photographer);
      setLogoPreview(photographer.logo || null);
      setWatermarkPreview(photographer.watermark || null);
    }
  }, [photographer, isCreating, form]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWatermarkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setWatermarkPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotographerDetailsUpdate = (data: {
    brandName: string;
    email: string;
    description: string;
    logo?: string;
    watermark?: string;
  }) => {
    if (!user || !photographer) return;

    const updatedPhotographer = {
      ...photographer,
      ...data,
    };

    localStorage.setItem(`photographer_${user.id}`, JSON.stringify(updatedPhotographer));
    setPhotographer(updatedPhotographer);
    toast.success("Información del perfil actualizada correctamente");
  };

  const handlePaymentDetailsUpdate = (data: {
    bank: string;
    documentId: string;
    phone: string;
    accountHolder: string;
  }) => {
    if (!user || !photographer) return;

    const updatedPhotographer = {
      ...photographer,
      ...data,
    };

    localStorage.setItem(`photographer_${user.id}`, JSON.stringify(updatedPhotographer));
    setPhotographer(updatedPhotographer);
    toast.success("Datos de pago actualizados correctamente");
  };

  const handleDeletePhotographerProfile = () => {
    if (!user) return;

    // Remove from localStorage
    localStorage.removeItem(`photographer_${user.id}`);

    // Update context
    setPhotographer(null);

    toast.success("Perfil de fotógrafo eliminado correctamente");
    navigate("/profile");
  };

  const onSubmit = (data: PhotographerFormData) => {
    if (!user) return;
    const photographerData = {
      brandName: data.brandName,
      email: data.email,
      description: data.description,
      bank: data.bank,
      documentId: data.documentId,
      phone: data.phone,
      accountHolder: data.accountHolder,
      logo: logoPreview || undefined,
      watermark: watermarkPreview || undefined,
    } as PhotographerData;
    localStorage.setItem(`photographer_${user.id}`, JSON.stringify(photographerData));
    setPhotographer(photographerData);
    toast.success("Cuenta de fotógrafo creada correctamente");
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Back button and title */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/profile")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold">
                {photographer ? "Perfil de Fotógrafo" : "Crear cuenta de fotógrafo"}
              </h1>
            </div>
            {photographer && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate("/photographer/albums")}
                >
                  <Image className="mr-2 h-4 w-4" />
                  Álbumes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/photographer/orders")}
                >
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Órdenes
                </Button>
              </div>
            )}
          </div>

          <p className="text-muted-foreground mb-6">
            {photographer ? "Revisa y edita tu información de fotógrafo" : "Completa el formulario para crear tu cuenta"}
          </p>

          {isCreating ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Profile Info Card */}
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    {/* Logo and Watermark uploads */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <FormLabel>Logo</FormLabel>
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                          {logoPreview ? (
                            <img
                              src={logoPreview}
                              alt="Logo preview"
                              className="h-full w-full object-contain rounded-lg"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <Upload className="h-8 w-8 mb-2" />
                              <span className="text-sm">Subir logo</span>
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleLogoUpload}
                          />
                        </label>
                      </div>

                      <div className="space-y-2">
                        <FormLabel>Marca de agua</FormLabel>
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                          {watermarkPreview ? (
                            <img
                              src={watermarkPreview}
                              alt="Watermark preview"
                              className="h-full w-full object-contain rounded-lg"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <Upload className="h-8 w-8 mb-2" />
                              <span className="text-sm">Subir marca</span>
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleWatermarkUpload}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Brand Name */}
                    <FormField
                      control={form.control}
                      name="brandName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marca o nombre comercial</FormLabel>
                          <FormControl>
                            <Input placeholder="Nombre" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Descripción"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Payment Details Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-medium">
                      Ingresa los datos que usarás para cobrar a tus clientes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Bank */}
                    <FormField
                      control={form.control}
                      name="bank"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Banco</FormLabel>
                          <FormControl>
                            <Input placeholder="Nombre del banco" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Document ID (RIF) */}
                    <FormField
                      control={form.control}
                      name="documentId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Documento de identidad (RIF/CI)</FormLabel>
                          <FormControl>
                            <Input placeholder="V-12345678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input placeholder="0412-1234567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Account Holder */}
                    <FormField
                      control={form.control}
                      name="accountHolder"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titular de la cuenta</FormLabel>
                          <FormControl>
                            <Input placeholder="Nombre del titular" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button type="submit" className="w-full" size="lg">
                  Crear cuenta
                </Button>
              </form>
            </Form>
          ) : (
            <div className="space-y-6">
              <PhotographerDetails
                data={{
                  brandName: photographer.brandName,
                  email: photographer.email,
                  description: photographer.description,
                  logo: photographer.logo,
                  watermark: photographer.watermark,
                }}
                onUpdate={handlePhotographerDetailsUpdate}
              />

              <PaymentDetails
                data={{
                  bank: photographer.bank,
                  documentId: photographer.documentId,
                  phone: photographer.phone,
                  accountHolder: photographer.accountHolder,
                }}
                onUpdate={handlePaymentDetailsUpdate}
              />

              {/* Delete Profile Button */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full gap-2">
                    <Trash2 className="h-4 w-4" />
                    Eliminar Perfil de Fotógrafo
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. Se eliminará permanentemente tu perfil de fotógrafo
                      y toda la información asociada.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeletePhotographerProfile}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
