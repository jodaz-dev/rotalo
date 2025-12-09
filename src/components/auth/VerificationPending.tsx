import { Mail, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VerificationPendingProps {
  email: string;
  phone: string;
  onResendEmail: () => void;
  onResendPhone: () => void;
  onBackToSignIn: () => void;
}

export function VerificationPending({
  email,
  phone,
  onResendEmail,
  onResendPhone,
  onBackToSignIn,
}: VerificationPendingProps) {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <CheckCircle2 className="h-8 w-8 text-primary" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">¡Cuenta creada!</h2>
        <p className="text-muted-foreground">
          Tu cuenta ha sido creada exitosamente. Por favor verifica tu correo electrónico y teléfono para activarla.
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-lg border bg-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-medium">Correo electrónico</p>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={onResendEmail}
          >
            Reenviar correo de verificación
          </Button>
        </div>

        <div className="p-4 rounded-lg border bg-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-medium">Teléfono</p>
              <p className="text-sm text-muted-foreground">{phone}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={onResendPhone}
          >
            Reenviar código SMS
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        ¿Ya verificaste tu cuenta?{" "}
        <button
          onClick={onBackToSignIn}
          className="text-primary hover:underline font-medium"
        >
          Iniciar sesión
        </button>
      </p>
    </div>
  );
}
