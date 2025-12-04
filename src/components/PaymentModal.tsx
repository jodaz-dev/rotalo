import { useState } from "react";
import { X, Upload, CreditCard } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  totalPhotos: number;
  totalAmount: number;
  paymentMethod: string;
}

export const PaymentModal = ({
  isOpen,
  onClose,
  onComplete,
  totalPhotos,
  totalAmount,
  paymentMethod,
}: PaymentModalProps) => {
  const [reference, setReference] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setProofFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim()) return;
    
    setIsSubmitting(true);
    // Simulate processing
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Detalles de pago
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order Summary */}
          <div className="rounded-lg bg-muted/50 p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fotos</span>
              <span className="font-medium">{totalPhotos}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Método de pago</span>
              <span className="font-medium">{paymentMethod}</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold text-primary">${totalAmount.toFixed(2)}</span>
              </div>
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
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={!reference.trim() || isSubmitting}
            >
              {isSubmitting ? "Procesando..." : "Completar pedido"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};