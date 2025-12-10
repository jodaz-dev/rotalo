import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowLeft, Check, X, Eye, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { mockOrders, Order } from "@/data/mockOrders";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Store() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedProof, setSelectedProof] = useState<string | null>(null);
  const [approveOrder, setApproveOrder] = useState<Order | null>(null);
  const [rejectOrder, setRejectOrder] = useState<Order | null>(null);

  const handleApprove = (order: Order) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === order.id ? { ...o, status: "approved" as const } : o
      )
    );
    setApproveOrder(null);
    toast({
      title: "Orden aprobada",
      description: "Las fotografías han sido enviadas al correo del comprador.",
    });
  };

  const handleReject = (order: Order) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === order.id ? { ...o, status: "rejected" as const } : o
      )
    );
    setRejectOrder(null);
    toast({
      title: "Orden rechazada",
      description: "El comprador ha sido notificado del rechazo.",
      variant: "destructive",
    });
  };

  const pendingOrders = orders.filter((o) => o.status === "pending");
  const processedOrders = orders.filter((o) => o.status !== "pending");

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d MMM yyyy, HH:mm", { locale: es });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-VE", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/photographer-profile")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al perfil
          </Button>
          <h1 className="text-3xl font-bold text-foreground">
            Panel de Órdenes
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestiona las órdenes de compra de tus fotografías
          </p>
        </div>

        {/* Pending Orders */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Órdenes Pendientes
              <Badge variant="secondary">{pendingOrders.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingOrders.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No hay órdenes pendientes por revisar.
              </p>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">#</TableHead>
                        <TableHead>Comprador</TableHead>
                        <TableHead>Fotografías</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Referencia</TableHead>
                        <TableHead>Comprobante</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            {order.orderNumber}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{order.buyerName}</p>
                              <p className="text-sm text-muted-foreground">
                                {order.buyerEmail}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="flex -space-x-2">
                                {order.photos.slice(0, 3).map((photo) => (
                                  <img
                                    key={photo.id}
                                    src={photo.thumbnail}
                                    alt=""
                                    className="w-10 h-10 rounded border-2 border-background object-cover"
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {order.photos.length} fotografía
                                {order.photos.length !== 1 ? "s" : ""}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">
                            {formatCurrency(order.totalAmount)}
                          </TableCell>
                          <TableCell>{formatDate(order.submittedAt)}</TableCell>
                          <TableCell>
                            <code className="text-xs bg-muted px-2 py-1 rounded">
                              {order.paymentReference}
                            </code>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedProof(order.paymentProof)}
                            >
                              <Eye className="mr-1 h-4 w-4" />
                              Ver
                            </Button>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => setApproveOrder(order)}
                              >
                                <Check className="mr-1 h-4 w-4" />
                                Aprobar
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => setRejectOrder(order)}
                              >
                                <X className="mr-1 h-4 w-4" />
                                Rechazar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4">
                  {pendingOrders.map((order) => (
                    <Card key={order.id} className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-lg">
                            Orden #{order.orderNumber}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(order.submittedAt)}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-base font-semibold">
                          {formatCurrency(order.totalAmount)}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Comprador
                          </p>
                          <p className="font-medium">{order.buyerName}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.buyerEmail}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Fotografías ({order.photos.length})
                          </p>
                          <div className="flex gap-2 overflow-x-auto pb-2">
                            {order.photos.map((photo) => (
                              <img
                                key={photo.id}
                                src={photo.thumbnail}
                                alt=""
                                className="w-16 h-16 rounded object-cover flex-shrink-0"
                              />
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">
                            Referencia de pago
                          </p>
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {order.paymentReference}
                          </code>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setSelectedProof(order.paymentProof)}
                        >
                          <ImageIcon className="mr-2 h-4 w-4" />
                          Ver comprobante
                        </Button>

                        <div className="flex gap-2">
                          <Button
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => setApproveOrder(order)}
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Aprobar orden
                          </Button>
                          <Button
                            variant="destructive"
                            className="flex-1"
                            onClick={() => setRejectOrder(order)}
                          >
                            <X className="mr-1 h-4 w-4" />
                            Rechazar
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Processed Orders */}
        {processedOrders.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Órdenes Procesadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="hidden lg:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">#</TableHead>
                      <TableHead>Comprador</TableHead>
                      <TableHead>Fotografías</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {processedOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.orderNumber}
                        </TableCell>
                        <TableCell>{order.buyerName}</TableCell>
                        <TableCell>
                          {order.photos.length} fotografía
                          {order.photos.length !== 1 ? "s" : ""}
                        </TableCell>
                        <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === "approved"
                                ? "default"
                                : "destructive"
                            }
                            className={
                              order.status === "approved"
                                ? "bg-green-600"
                                : ""
                            }
                          >
                            {order.status === "approved"
                              ? "Aprobada"
                              : "Rechazada"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards for Processed */}
              <div className="lg:hidden space-y-3">
                {processedOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">
                        #{order.orderNumber} - {order.buyerName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.photos.length} foto(s) •{" "}
                        {formatCurrency(order.totalAmount)}
                      </p>
                    </div>
                    <Badge
                      variant={
                        order.status === "approved" ? "default" : "destructive"
                      }
                      className={
                        order.status === "approved" ? "bg-green-600" : ""
                      }
                    >
                      {order.status === "approved" ? "Aprobada" : "Rechazada"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />

      {/* Payment Proof Modal */}
      <Dialog open={!!selectedProof} onOpenChange={() => setSelectedProof(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Comprobante de Pago</DialogTitle>
          </DialogHeader>
          {selectedProof && (
            <img
              src={selectedProof}
              alt="Comprobante de pago"
              className="w-full rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Approve Confirmation Modal */}
      <AlertDialog open={!!approveOrder} onOpenChange={() => setApproveOrder(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Aprobar y enviar las fotografías?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Al aprobar, se enviarán automáticamente las fotografías originales
              al correo del comprador.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-600 hover:bg-green-700"
              onClick={() => approveOrder && handleApprove(approveOrder)}
            >
              Sí, aprobar y enviar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Confirmation Modal */}
      <AlertDialog open={!!rejectOrder} onOpenChange={() => setRejectOrder(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Rechazar esta orden?</AlertDialogTitle>
            <AlertDialogDescription>
              La orden será rechazada y el comprador será notificado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => rejectOrder && handleReject(rejectOrder)}
            >
              Sí, rechazar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
