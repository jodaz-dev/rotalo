import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AccountProfileSection } from "@/components/profile/AccountProfileSection";
import { EmailSection } from "@/components/profile/EmailSection";
import { PasswordSection } from "@/components/profile/PasswordSection";
import { ExitDeletionSection } from "@/components/profile/ExitDeletionSection";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Por favor inicia sesión para ver tu perfil.</p>
      </div>
    );
  }

  const handleLogout = () => {
    navigate("/");
    logout();
  };

  const handleProfileUpdate = (data: any) => {
    console.log("Profile update:", data);
    toast.success("Perfil actualizado correctamente");
  };

  const handleEmailUpdate = (data: any) => {
    console.log("Email update:", data);
    toast.success("Correo electrónico actualizado correctamente");
  };

  const handlePasswordUpdate = (data: any) => {
    console.log("Password update:", data);
    toast.success("Contraseña actualizada correctamente");
  };

  const handleDeleteAccount = () => {
    // This would typically open a confirmation dialog
    toast.error("Función de eliminación de cuenta no implementada");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold mb-6">Configuración del Perfil</h1>
          
          <AccountProfileSection 
            user={user} 
            onUpdate={handleProfileUpdate} 
          />
          
          <EmailSection 
            email={user.email} 
            onUpdate={handleEmailUpdate} 
          />
          
          <PasswordSection 
            onUpdate={handlePasswordUpdate} 
          />
          
          <ExitDeletionSection 
            onLogout={handleLogout}
            onDeleteAccount={handleDeleteAccount}
          />
        </div>
      </div>
    </div>
  );
}
