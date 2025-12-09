import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const emailSchema = z.object({
  email: z.string().email("Ingresa un correo electrónico válido"),
  confirmEmail: z.string().email("Ingresa un correo electrónico válido"),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Los correos no coinciden",
  path: ["confirmEmail"],
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailSectionProps {
  email: string;
  onUpdate: (data: EmailFormData) => void;
}

export function EmailSection({ email, onUpdate }: EmailSectionProps) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
      confirmEmail: "",
    },
  });

  const onSubmit = (data: EmailFormData) => {
    onUpdate(data);
    setIsEditing(false);
    form.reset();
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <h3 className="text-lg font-semibold">Correo Electrónico</h3>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} size="sm">
            Cambiar email
          </Button>
        )}
        {isEditing && (
          <div className="flex gap-2">
            <Button onClick={handleCancel} variant="outline" size="sm">
              Cancelar
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)} size="sm">
              Actualizar email
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {!isEditing ? (
          <p className="font-medium">{email}</p>
        ) : (
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nuevo correo electrónico</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="nuevo@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar correo electrónico</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Confirmar nuevo email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
