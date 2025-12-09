import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 py-6">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex space-x-6">
            <a
              href="https://instagram.com/eventshot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Instagram
            </a>
            <Link
              to="/privacy"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Políticas de privacidad
            </Link>
            <Link
              to="/terms"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Términos y condiciones
            </Link>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © 2025 EventShot. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};