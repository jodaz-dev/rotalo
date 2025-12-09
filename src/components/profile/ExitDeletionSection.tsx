import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ExitDeletionSectionProps {
  onLogout: () => void;
  onDeleteAccount: () => void;
}

export function ExitDeletionSection({ onLogout, onDeleteAccount }: ExitDeletionSectionProps) {
  return (
    <Card>
      <CardHeader className="py-4">
        <h3 className="text-lg font-semibold">Salir y Eliminación</h3>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        <button
          onClick={onLogout}
          className="w-full text-left hover:bg-muted/50 p-2 rounded-md transition-colors"
        >
          <p className="font-medium">Cerrar Sesión</p>
          <p className="text-sm text-muted-foreground">
            Cierra tu sesión de forma segura.
          </p>
        </button>
        <Separator />
        <button
          onClick={onDeleteAccount}
          className="w-full text-left hover:bg-destructive/10 p-2 rounded-md transition-colors"
        >
          <p className="font-medium text-destructive">Eliminar Cuenta</p>
          <p className="text-sm text-muted-foreground">
            Todos tus datos serán eliminados y no podrán ser recuperados.
          </p>
        </button>
      </CardContent>
    </Card>
  );
}
