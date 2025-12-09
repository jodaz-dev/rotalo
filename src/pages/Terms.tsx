import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-6 md:py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6 text-3xl font-bold mb-4 tracking-tight text-foreground">
            Términos y Condiciones
          </h1>

          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-1">
              Bienvenido a Rótalo. Al utilizar nuestra aplicación, aceptas los siguientes términos y condiciones. Te invitamos a leerlos detenidamente para comprender tus derechos y responsabilidades.
            </p>

            <h2 className="font-bold mb-4">1. Aceptación de los Términos</h2>
            <p className="mb-1">
              El acceso y uso de Rótalo está sujeto a estos Términos y Condiciones, así como a nuestra Política de Privacidad. Al registrarte o usar la aplicación, confirmas que has leído, entendido y aceptado ambos documentos.
            </p>

            <h2 className="font-bold mb-4">2. Uso de la Aplicación</h2>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Los usuarios deben proporcionar información precisa y actualizada al registrarse.</li>
              <li>Está prohibido usar la aplicación para actividades ilegales, ofensivas o que infrinjan derechos de terceros.</li>
              <li>Los fotógrafos son responsables de garantizar que el contenido publicado no viole derechos de imagen ni leyes aplicables.</li>
            </ul>

            <h2 className="font-bold mb-4">3. Contenido y Derechos de Autor</h2>
            <p className="mb-1">
              El contenido disponible en la aplicación es propiedad de los fotógrafos que las suben. Los usuarios pueden adquirir contenido bajo los términos de uso especificados y están obligados a respetar los derechos de autor. Si un usuario aparece en una Fotografía/Video o contenido y desea que sea eliminada de la app, podrá solicitarlo enviando un correo a {}.
            </p>

            <h2 className="font-bold mb-4">4. Contenido Inapropiado</h2>
            <p className="mb-1">
              Si detectas contenido inapropiado o que infringe derechos de autor, puedes denunciarlo escribiendo a {} para que sea evaluado y eliminado si corresponde.
            </p>

            <h2 className="font-bold mb-4">5. Compras y Pagos</h2>
            <p className="mb-1">
              Los pagos los acuerdas directamente con los fotógrafos, Rótalo no se hace cargo ni se responsabiliza del proceso comercial. Rótalo no almacena directamente la información de pagos; sin embargo, implementamos medidas de seguridad avanzadas para proteger tus datos.
            </p>

            <h2 className="font-bold mb-4">6. Descargo de Responsabilidad</h2>
            <p className="mb-1">
              Aunque Rótalo implementa medidas de seguridad para proteger tu privacidad, no podemos garantizar que la información confidencial transmitida a través de la aplicación sea completamente segura en caso de incidentes externos o ataques informáticos. Al utilizar la aplicación, aceptas que compartes esta información bajo tu propia responsabilidad y entiendes los posibles riesgos.
            </p>

            <h2 className="font-bold mb-4">7. Exclusión de Responsabilidad</h2>
            <p className="mb-1">
              Rótalo no se responsabiliza por el contenido publicado por los fotógrafos o usuarios, ni por disputas relacionadas con derechos de imagen o propiedad intelectual. El acceso a la aplicación puede estar sujeto a interrupciones temporales por mantenimiento, actualización o problemas técnicos.
            </p>

            <h2 className="font-bold mb-4">8. Modificaciones de los Términos</h2>
            <p className="mb-1">
              Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las actualizaciones se informarán mediante la aplicación o por correo electrónico.
            </p>

            <h2 className="font-bold mb-4">9. Resolución de Conflictos</h2>
            <p className="mb-1">
              En caso de conflicto relacionado con el uso de la aplicación, trabajaremos para llegar a una solución amistosa. Si no se resuelve, los usuarios aceptan someterse a la jurisdicción de las leyes locales aplicables.
            </p>

            <h2 className="font-bold mb-4">10. Contacto</h2>
            <p className="mb-1">
              Para preguntas sobre los Términos y Condiciones, contáctanos en {}.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
