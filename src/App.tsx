import FormSTPS from "./STPS/FormSTPS";

const App = () => {
  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-3 text-balance">
            Solicitud de Servicio Empresarial
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Complete el formulario en 3 simples pasos para comenzar
          </p>
        </div>
        <FormSTPS />
      </div>
    </main>
  );
};

export default App;
