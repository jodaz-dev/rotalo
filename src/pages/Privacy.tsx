import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-6 md:py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground">
            Política de Privacidad
          </h1>

          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-1">
              En Rótalo, nos comprometemos a proteger tu privacidad y garantizar que tus datos personales sean manejados de manera transparente y segura. A continuación, te presentamos nuestra política de privacidad:
            </p>

            <h2 className="font-bold mb-4">1. Información que Recopilamos</h2>
            <p className="mb-1">
              Recopilamos información personal que nos proporcionas al registrarte o realizar las compras, como:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Nombre completo.</li>
              <li>Dirección de correo electrónico.</li>
              <li>Número telefónico.</li>
              <li>Información de pago (procesada de manera segura por proveedores de servicios de pago).</li>
            </ul>
            <p className="mb-1">
              Además, recopilamos datos técnicos como tu dirección IP y detalles del dispositivo para mejorar tu experiencia en la app.
            </p>

            <h2 className="font-bold mb-4">2. Uso de la Información</h2>
            <p className="mb-1">
              Utilizamos tu información para:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Procesar tus compras de contenido.</li>
              <li>Proporcionarte una experiencia personalizada en la app.</li>
              <li>Mejorar nuestros servicios y realizar análisis internos.</li>
              <li>Enviar notificaciones relacionadas con tus transacciones o actualizaciones importantes de la plataforma.</li>
            </ul>

            <h2 className="font-bold mb-4">3. Privacidad del Contenido</h2>
            <p className="mb-1">
              El contenido publicado por los fotógrafos es propiedad de los mismos, y su uso está limitado a la compra y visualización dentro de la app. Si apareces en alguna Fotografía/Video/Contenido y no deseas que sea pública, puedes escribirnos a {} para solicitar su eliminación. Asimismo, si detectas contenido inapropiado o que infringe derechos de autor, puedes denunciarlo escribiendo al mismo correo.
            </p>

            <h2 className="font-bold mb-4">4. Compartir Información</h2>
            <p className="mb-1">
              Nunca compartimos tu información personal con terceros, excepto:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Proveedores de servicios esenciales (como procesadores de pago) o con los fotógrafos a los que les compras contenido.</li>
              <li>Cumplimiento de obligaciones legales o regulatorias.</li>
            </ul>

            <h2 className="font-bold mb-4">5. Seguridad de los Datos</h2>
            <p className="mb-1">
              Implementamos medidas de seguridad avanzadas para proteger tus datos personales y evitar accesos no autorizados.
            </p>

            <h2 className="font-bold mb-4">6. Tus Derechos</h2>
            <p className="mb-1">
              Tienes derecho a:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Acceder, corregir o eliminar tu información personal almacenada en la app.</li>
              <li>Solicitar la eliminación del contenido dónde apareces si esto infringe tus derechos de privacidad, conforme a las leyes aplicables.</li>
            </ul>

            <h2 className="font-bold mb-4">7. Cambios en la Política</h2>
            <p className="mb-1">
              Podemos actualizar esta política periódicamente. Notificaremos cambios importantes a través de la app o por correo electrónico.
            </p>

            <h2 className="font-bold mb-4">8. Contacto</h2>
            <p className="mb-1">
              Si tienes preguntas o inquietudes sobre nuestra política de privacidad, contáctanos a través de {}.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
