import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, ShoppingBag, CheckCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { PaymentModal } from "@/components/PaymentModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCart } from "@/contexts/CartContext";
import { getPhotographerById } from "@/data/mockData";

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, clearCart, totalAmount } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.phone.trim();

  // Group photos by photographer
  const photosByPhotographer = items.reduce((acc, item) => {
    const photographerId = item.photographerId;
    if (!acc[photographerId]) {
      acc[photographerId] = [];
    }
    acc[photographerId].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProceedToPayment = () => {
    if (!isFormValid) return;
    setIsPaymentOpen(true);
  };

  const handlePaymentComplete = () => {
    setIsPaymentOpen(false);
    setIsOrderComplete(true);
    clearCart();
  };

  if (items.length === 0 && !isOrderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-16 text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
          <h1 className="mb-2 text-2xl font-bold text-foreground">Tu carrito está vacío</h1>
          <p className="mb-6 text-muted-foreground">
            Explora eventos y agrega fotos a tu carrito.
          </p>
          <Button onClick={() => navigate("/")}>Explorar eventos</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Sub Header */}
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
          <h1 className="text-lg font-semibold">Carrito de compras</h1>
        </div>
      </div>

      <main className="container py-6">
        {/* Order Complete Alert */}
        {isOrderComplete && (
          <Alert className="mb-6 border-primary/50 bg-primary/10">
            <CheckCircle className="h-5 w-5 text-primary" />
            <AlertTitle className="text-primary">¡Pedido enviado!</AlertTitle>
            <AlertDescription>
              Recibirás tus fotografías en tu correo electrónico una vez que el fotógrafo apruebe tu solicitud.
            </AlertDescription>
          </Alert>
        )}

        {!isOrderComplete && (
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column - Photos & Payment Info */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Fotos seleccionadas</h2>
              
              {Object.entries(photosByPhotographer).map(([photographerId, photos]) => {
                const photographer = getPhotographerById(photographerId);
                return (
                  <div key={photographerId} className="rounded-lg border border-border bg-card p-4">
                    {/* Photographer Header */}
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
                      {photographer && (
                        <>
                          <img
                            src={photographer.logo}
                            alt={photographer.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">{photographer.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Pago: Transferencia bancaria / Pago móvil
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Photos Grid */}
                    <div className="grid grid-cols-3 gap-2">
                      {photos.map((photo) => (
                        <div key={photo.id} className="group relative aspect-square">
                          <img
                            src={photo.thumbnail}
                            alt="Foto seleccionada"
                            className="h-full w-full rounded-md object-cover"
                          />
                          <button
                            onClick={() => removeFromCart(photo.id)}
                            className="absolute -right-1 -top-1 rounded-full bg-destructive p-1 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                          <span className="absolute bottom-1 right-1 rounded bg-background/80 px-1.5 py-0.5 text-xs font-medium">
                            ${photo.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Total */}
              <div className="flex justify-between items-center rounded-lg bg-muted/50 p-4">
                <span className="font-medium">Total ({items.length} fotos)</span>
                <span className="text-xl font-bold text-primary">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Right Column - Customer Form */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Tu información</h2>
              
              <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ingresa tu nombre completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Ingresa tu correo"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Número de teléfono *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Ingresa tu número de teléfono"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button
                  className="w-full mt-4"
                  size="lg"
                  disabled={!isFormValid}
                  onClick={handleProceedToPayment}
                >
                  Proceder al pago
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onComplete={handlePaymentComplete}
        cartItems={items}
        totalAmount={totalAmount}
      />
    </div>
  );
};

export default Cart;