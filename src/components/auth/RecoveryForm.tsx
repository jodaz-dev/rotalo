import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  recoveryRequestSchema,
  recoveryVerifySchema,
  resetPasswordSchema,
  type RecoveryRequestFormData,
  type RecoveryVerifyFormData,
  type ResetPasswordFormData,
} from "@/lib/validations/auth";

type RecoveryStep = "request" | "verify" | "reset";

interface RecoveryFormProps {
  onSuccess: () => void;
  onBack: () => void;
}

export function RecoveryForm({ onSuccess, onBack }: RecoveryFormProps) {
  const [step, setStep] = useState<RecoveryStep>("request");
  const [identifier, setIdentifier] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const requestForm = useForm<RecoveryRequestFormData>({
    resolver: zodResolver(recoveryRequestSchema),
    defaultValues: {
      identifier: "",
    },
  });

  const verifyForm = useForm<RecoveryVerifyFormData>({
    resolver: zodResolver(recoveryVerifySchema),
    defaultValues: {
      otp: "",
    },
  });

  const resetForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onRequestSubmit = (data: RecoveryRequestFormData) => {
    setIdentifier(data.identifier);
    setStep("verify");
  };

  const onVerifySubmit = (data: RecoveryVerifyFormData) => {
    console.log("OTP verified:", data.otp);
    setStep("reset");
  };

  const onResetSubmit = (data: ResetPasswordFormData) => {
    console.log("Password reset:", data);
    onSuccess();
  };

  const handleResendCode = () => {
    console.log("Resending code to:", identifier);
  };

  if (step === "request") {
    return (
      <div className="space-y-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio de sesión
        </button>

        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <KeyRound className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Recuperar contraseña</h2>
          <p className="text-sm text-muted-foreground">
            Ingresa tu correo electrónico o teléfono y te enviaremos un código de verificación.
          </p>
        </div>

        <Form {...requestForm}>
          <form onSubmit={requestForm.handleSubmit(onRequestSubmit)} className="space-y-5">
            <FormField
              control={requestForm.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico o teléfono</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="tu@email.com o +52 123 456 7890"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" size="lg">
              Enviar código
            </Button>
          </form>
        </Form>
      </div>
    );
  }

  if (step === "verify") {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setStep("request")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Cambiar método de recuperación
        </button>

        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <KeyRound className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Verificar código</h2>
          <p className="text-sm text-muted-foreground">
            Ingresa el código de 6 dígitos enviado a{" "}
            <span className="font-medium text-foreground">{identifier}</span>
          </p>
        </div>

        <Form {...verifyForm}>
          <form onSubmit={verifyForm.handleSubmit(onVerifySubmit)} className="space-y-5">
            <FormField
              control={verifyForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="text-center">
                    ¿No recibiste el código?{" "}
                    <button
                      type="button"
                      onClick={handleResendCode}
                      className="text-primary hover:underline font-medium"
                    >
                      Reenviar
                    </button>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" size="lg">
              Verificar
            </Button>
          </form>
        </Form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Nueva contraseña</h2>
        <p className="text-sm text-muted-foreground">
          Crea una nueva contraseña segura para tu cuenta.
        </p>
      </div>

      <Form {...resetForm}>
        <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-5">
          <FormField
            control={resetForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nueva contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={resetForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" size="lg">
            Restablecer contraseña
          </Button>
        </form>
      </Form>
    </div>
  );
}
