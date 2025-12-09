import { useState } from "react";
import { Upload, CreditCard, Copy, Check } from "lucide-react";
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

export const PaymentModal = ({
  isOpen,
  onClose,
  onComplete,
  cartItems,
  totalAmount,
}: PaymentModalProps) => {
  const [reference, setReference] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Group items by photographer
  const itemsByPhotographer = cartItems.reduce((acc, item) => {
    if (!acc[item.photographerId]) {
      acc[item.photographerId] = [];
    }
    acc[item.photographerId].push(item);
    return acc;
  }, {} as Record<string, CartPhoto[]>);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete();
    }, 1000);
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Detalles de pago
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photographer Payment Details */}
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Cada fotógrafo tiene sus propios datos bancarios. Asegúrate de hacer el pago correctamente.
              </p>

              {Object.entries(itemsByPhotographer).map(([photographerId, photos]) => {
                const photographer = getPhotographerById(photographerId);
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
                        className="w-full mt-2"
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
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total Summary */}
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total a pagar</span>
                <span className="text-xl font-bold text-primary">${totalAmount.toFixed(2)}</span>
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
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={!reference.trim() || isSubmitting}
              >
                {isSubmitting ? "Procesando..." : "Ya pagué"}
              </Button>
            </div>
          </form>
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
