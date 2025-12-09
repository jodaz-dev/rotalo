import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ProfileSectionProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  isEditing?: boolean;
  children: ReactNode;
  editContent?: ReactNode;
}

export function ProfileSection({
  title,
  actionLabel,
  onAction,
  isEditing,
  children,
  editContent,
}: ProfileSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {actionLabel && onAction && (
          <Button onClick={onAction} size="sm">
            {actionLabel}
          </Button>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {isEditing ? editContent : children}
      </CardContent>
    </Card>
  );
}
