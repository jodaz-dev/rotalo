import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { SearchBox } from "@/components/SearchBox";
import { EventCard } from "@/components/EventCard";
import { Footer } from "@/components/Footer";
import { events } from "@/data/mockData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return events;
    const query = searchQuery.toLowerCase();
    return events.filter((event) =>
      event.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-6 md:py-10">
        {/* Hero Section */}
        <section className="mb-8 md:mb-12">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Encuentra tus fotos del evento
          </h1>
          <p className="mb-6 text-muted-foreground md:text-lg">
            Explora fotos de eventos deportivos capturadas por fotógrafos profesionales
          </p>
          <SearchBox
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Buscar eventos..."
            className="max-w-xl"
          />
        </section>

        {/* Events Grid */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              {searchQuery ? "Resultados de búsqueda" : "Eventos recientes"}
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredEvents.length} evento{filteredEvents.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 py-16">
              <p className="text-muted-foreground">No se encontraron eventos para "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-2 text-sm font-medium text-primary hover:underline"
              >
                Limpiar búsqueda
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
