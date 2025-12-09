import { Link, useNavigate } from "react-router-dom";
import { Camera, Menu, User, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Header = () => {
  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Camera className="h-7 w-7 text-primary" />
          <span className="text-xl font-semibold tracking-tight text-foreground">
            EventShot
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {/* <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Eventos
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Fotógrafos
          </Link> */}
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
            onClick={() => navigate(isAuthenticated ? "/profile" : "/auth")}
          >
            <User className="h-5 w-5" />
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <nav className="mt-8 flex flex-col gap-4">
              <Link
                to="/"
                className="text-lg font-medium text-foreground transition-colors hover:text-primary"
              >
                Eventos
              </Link>
              <Link
                to="/"
                className="text-lg font-medium text-foreground transition-colors hover:text-primary"
              >
                Fotógrafos
              </Link>
              <Link
                to="/cart"
                className="text-lg font-medium text-foreground transition-colors hover:text-primary"
              >
                Carrito {totalItems > 0 && `(${totalItems})`}
              </Link>
              <Link
                to="/"
                className="text-lg font-medium text-foreground transition-colors hover:text-primary"
              >
                Cuenta
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
