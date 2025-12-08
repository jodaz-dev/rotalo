import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { SignInForm } from "@/components/auth/SignInForm";
import { RecoveryForm } from "@/components/auth/RecoveryForm";
import { VerificationPending } from "@/components/auth/VerificationPending";
import { useToast } from "@/hooks/use-toast";
import type { SignUpFormData, SignInFormData } from "@/lib/validations/auth";

type AuthView = "auth" | "recovery" | "verification";

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [view, setView] = useState<AuthView>("auth");
  const [activeTab, setActiveTab] = useState("signin");
  const [pendingVerification, setPendingVerification] = useState<{
    email: string;
    phone: string;
  } | null>(null);

  const handleSignUp = (data: SignUpFormData) => {
    console.log("Sign up data:", data);
    setPendingVerification({
      email: data.email,
      phone: data.phone,
    });
    setView("verification");
    toast({
      title: "Cuenta creada",
      description: "Por favor verifica tu correo y teléfono.",
    });
  };

  const handleSignIn = (data: SignInFormData) => {
    console.log("Sign in data:", data);
    toast({
      title: "Bienvenido",
      description: "Has iniciado sesión exitosamente.",
    });
    navigate("/");
  };

  const handleRecoverySuccess = () => {
    toast({
      title: "Contraseña actualizada",
      description: "Tu contraseña ha sido restablecida exitosamente.",
    });
    setView("auth");
    setActiveTab("signin");
  };

  const handleResendEmail = () => {
    toast({
      title: "Correo enviado",
      description: "Se ha reenviado el correo de verificación.",
    });
  };

  const handleResendPhone = () => {
    toast({
      title: "SMS enviado",
      description: "Se ha reenviado el código de verificación.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Camera className="h-8 w-8" />
            </div>
            <span className="text-3xl font-bold tracking-tight">EventShot</span>
          </div>
          <h1 className="text-4xl font-bold text-center mb-4">
            Captura momentos,<br />comparte recuerdos
          </h1>
          <p className="text-lg text-white/80 text-center max-w-md">
            La plataforma donde los fotógrafos comparten sus mejores capturas de eventos deportivos y tú las haces tuyas.
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* Right side - Forms */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
              <Camera className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">EventShot</span>
          </div>

          {view === "auth" && (
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold text-foreground">
                  {activeTab === "signin" ? "Bienvenido de nuevo" : "Crear cuenta"}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {activeTab === "signin"
                    ? "Ingresa tus credenciales para continuar"
                    : "Completa el formulario para registrarte"}
                </p>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Iniciar sesión</TabsTrigger>
                  <TabsTrigger value="signup">Registrarse</TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="mt-6">
                  <SignInForm
                    onSuccess={handleSignIn}
                    onSwitchToSignUp={() => setActiveTab("signup")}
                    onForgotPassword={() => setView("recovery")}
                  />
                </TabsContent>

                <TabsContent value="signup" className="mt-6">
                  <SignUpForm
                    onSuccess={handleSignUp}
                    onSwitchToSignIn={() => setActiveTab("signin")}
                  />
                </TabsContent>
              </Tabs>
            </div>
          )}

          {view === "recovery" && (
            <RecoveryForm
              onSuccess={handleRecoverySuccess}
              onBack={() => setView("auth")}
            />
          )}

          {view === "verification" && pendingVerification && (
            <VerificationPending
              email={pendingVerification.email}
              phone={pendingVerification.phone}
              onResendEmail={handleResendEmail}
              onResendPhone={handleResendPhone}
              onBackToSignIn={() => {
                setView("auth");
                setActiveTab("signin");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
