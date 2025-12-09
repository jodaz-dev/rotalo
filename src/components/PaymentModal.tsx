import { useState } from "react";
import { Upload, CreditCard, Copy, Check, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Photographer, getPhotographerById } from "@/data/mockData";

interface CartPhoto {
  id: string;
  photographerId: string;
  price: number;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  cartItems: CartPhoto[];
  totalAmount: number;
}

interface PaymentSubmission {
  photographerId: string;
  reference: string;
  proofFile: File | null;
}

export const PaymentModal = ({
  isOpen,
  onClose,
  onComplete,
  cartItems,
  totalAmount,
}: PaymentModalProps) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activePaymentPhotographer, setActivePaymentPhotographer] = useState<string | null>(null);
  const [paidPhotographers, setPaidPhotographers] = useState<PaymentSubmission[]>([]);
  const [reference, setReference] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Group items by photographer
  const itemsByPhotographer = cartItems.reduce((acc, item) => {
    if (!acc[item.photographerId]) {
      acc[item.photographerId] = [];
    }
    acc[item.photographerId].push(item);
    return acc;
  }, {} as Record<string, CartPhoto[]>);

  // Filter out paid photographers
  const unpaidPhotographers = Object.keys(itemsByPhotographer).filter(
    (id) => !paidPhotographers.find((p) => p.photographerId === id)
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setProofFile(file);
    }
  };

  const handleCopy = async (text: string, fieldId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const copyAllData = (photographer: Photographer, photoCount: number, subtotal: number) => {
    const data = `Fotógrafo: ${photographer.name}
Banco: ${photographer.paymentDetails.bank}
RIF: ${photographer.paymentDetails.rif}
Teléfono: ${photographer.paymentDetails.phone}
Titular: ${photographer.paymentDetails.accountHolder}
Fotos: ${photoCount}
Monto: $${subtotal.toFixed(2)}`;
    handleCopy(data, `all-${photographer.id}`);
  };

  const handleStartPayment = (photographerId: string) => {
    setActivePaymentPhotographer(photographerId);
    setReference("");
    setProofFile(null);
  };

  const handleCancelPayment = () => {
    setActivePaymentPhotographer(null);
    setReference("");
    setProofFile(null);
  };

  const handleSubmitPayment = () => {
    if (!reference.trim() || !activePaymentPhotographer) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setPaidPhotographers((prev) => [
        ...prev,
        { photographerId: activePaymentPhotographer, reference, proofFile },
      ]);
      setActivePaymentPhotographer(null);
      setReference("");
      setProofFile(null);
      setIsSubmitting(false);

      // Check if all photographers are paid
      const remainingUnpaid = unpaidPhotographers.filter(
        (id) => id !== activePaymentPhotographer
      );
      if (remainingUnpaid.length === 0) {
        // All paid, complete the order
        setTimeout(() => {
          onComplete();
          // Reset state for next time
          setPaidPhotographers([]);
        }, 500);
      }
    }, 1000);
  };

  const handleClose = () => {
    setActivePaymentPhotographer(null);
    setReference("");
    setProofFile(null);
    setPaidPhotographers([]);
    onClose();
  };

  const activePhotographer = activePaymentPhotographer
    ? getPhotographerById(activePaymentPhotographer)
    : null;
  const activePhotos = activePaymentPhotographer
    ? itemsByPhotographer[activePaymentPhotographer] || []
    : [];
  const activeSubtotal = activePhotos.reduce((sum, p) => sum + p.price, 0);

  // Payment submission view
  if (activePaymentPhotographer && activePhotographer) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 -ml-2"
                onClick={handleCancelPayment}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              Registrar pago
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Photographer Summary */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <img
                src={activePhotographer.logo}
                alt={activePhotographer.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold">{activePhotographer.name}</p>
                <p className="text-sm text-muted-foreground">
                  {activePhotos.length} {activePhotos.length === 1 ? 'foto' : 'fotos'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">${activeSubtotal.toFixed(2)}</p>
              </div>
            </div>

            {/* Reference Input */}
            <div className="space-y-2">
              <Label htmlFor="reference">Referencia de pago *</Label>
              <Input
                id="reference"
                placeholder="Ingresa tu número de referencia"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                required
              />
            </div>

            {/* Proof of Purchase */}
            <div className="space-y-2">
              <Label htmlFor="proof">Comprobante de pago (opcional)</Label>
              <div className="relative">
                <Input
                  id="proof"
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => document.getElementById("proof")?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {proofFile ? proofFile.name : "Adjuntar imagen (PNG, JPEG)"}
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleCancelPayment}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1"
                disabled={!reference.trim() || isSubmitting}
                onClick={handleSubmitPayment}
              >
                {isSubmitting ? "Procesando..." : "Confirmar pago"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Main payment details view
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Detalles de pago
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6">
            {/* Photographer Payment Details */}
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Cada fotógrafo tiene sus propios datos bancarios. Asegúrate de hacer el pago correctamente.
              </p>

              {unpaidPhotographers.length === 0 ? (
                <div className="text-center py-8">
                  <Check className="h-12 w-12 text-primary mx-auto mb-3" />
                  <p className="font-semibold">¡Todos los pagos registrados!</p>
                  <p className="text-sm text-muted-foreground">Procesando tu pedido...</p>
                </div>
              ) : (
                unpaidPhotographers.map((photographerId) => {
                  const photographer = getPhotographerById(photographerId);
                  const photos = itemsByPhotographer[photographerId];
                  if (!photographer) return null;

                  const subtotal = photos.reduce((sum, p) => sum + p.price, 0);

                  return (
                    <div key={photographerId} className="rounded-lg border border-border bg-card overflow-hidden">
                      {/* Photographer Header */}
                      <div className="flex items-center gap-3 p-3 bg-primary/10 border-b border-border">
                        <img
                          src={photographer.logo}
                          alt={photographer.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-semibold">{photographer.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {photos.length} {photos.length === 1 ? 'foto' : 'fotos'} · ${subtotal.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Payment Details */}
                      <div className="p-3 space-y-3">
                        <PaymentDetailRow
                          label="Banco"
                          value={photographer.paymentDetails.bank}
                          fieldId={`bank-${photographerId}`}
                          copiedField={copiedField}
                          onCopy={handleCopy}
                        />
                        <PaymentDetailRow
                          label="RIF"
                          value={photographer.paymentDetails.rif}
                          fieldId={`rif-${photographerId}`}
                          copiedField={copiedField}
                          onCopy={handleCopy}
                        />
                        <PaymentDetailRow
                          label="Teléfono"
                          value={photographer.paymentDetails.phone}
                          fieldId={`phone-${photographerId}`}
                          copiedField={copiedField}
                          onCopy={handleCopy}
                        />
                        <PaymentDetailRow
                          label="Titular"
                          value={photographer.paymentDetails.accountHolder}
                          fieldId={`holder-${photographerId}`}
                          copiedField={copiedField}
                          onCopy={handleCopy}
                        />

                        {/* Copy All Button */}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => copyAllData(photographer, photos.length, subtotal)}
                        >
                          {copiedField === `all-${photographer.id}` ? (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              ¡Copiado!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-2" />
                              Copiar todos los datos
                            </>
                          )}
                        </Button>

                        {/* Register Payment Button */}
                        <Button
                          type="button"
                          size="sm"
                          className="w-full"
                          onClick={() => handleStartPayment(photographerId)}
                        >
                          Ya pagué
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Total Summary */}
            {unpaidPhotographers.length > 0 && (
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total a pagar</span>
                  <span className="text-xl font-bold text-primary">${totalAmount.toFixed(2)}</span>
                </div>
                {paidPhotographers.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {paidPhotographers.length} de {Object.keys(itemsByPhotographer).length} fotógrafos pagados
                  </p>
                )}
              </div>
            )}

            {/* Cancel Button */}
            {unpaidPhotographers.length > 0 && (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleClose}
              >
                Cancelar
              </Button>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Helper component for payment detail rows
interface PaymentDetailRowProps {
  label: string;
  value: string;
  fieldId: string;
  copiedField: string | null;
  onCopy: (text: string, fieldId: string) => void;
}

const PaymentDetailRow = ({ label, value, fieldId, copiedField, onCopy }: PaymentDetailRowProps) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium text-sm">{value}</p>
    </div>
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="h-8 w-8 shrink-0"
      onClick={() => onCopy(value, fieldId)}
    >
      {copiedField === fieldId ? (
        <Check className="h-4 w-4 text-primary" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  </div>
);
