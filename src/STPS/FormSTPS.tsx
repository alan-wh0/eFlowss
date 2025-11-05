import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Building2, CheckCircle2, FileText, User } from "lucide-react";
import { useState } from "react";

type FormData = {
  // Step 1: Company Information
  companyName: string;
  industry: string;
  companySize: string;
  website: string;

  // Step 2: Contact Information
  fullName: string;
  position: string;
  email: string;
  phone: string;

  // Step 3: Project Details
  serviceType: string;
  budget: string;
  timeline: string;
  description: string;
};

const steps = [
  { id: 1, name: "Información de Empresa", icon: Building2 },
  { id: 2, name: "Datos de Contacto", icon: User },
  { id: 3, name: "Detalles del Proyecto", icon: FileText },
];

const FormSTPS = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    industry: "",
    companySize: "",
    website: "",
    fullName: "",
    position: "",
    email: "",
    phone: "",
    serviceType: "",
    budget: "",
    timeline: "",
    description: "",
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Card className="border-2">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-accent/10 p-4">
              <CheckCircle2 className="h-16 w-16 text-accent" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-primary mb-3">
            ¡Solicitud Enviada!
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Gracias por su interés. Nuestro equipo revisará su solicitud y se
            pondrá en contacto con usted en las próximas 24-48 horas.
          </p>
          <Button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
              setFormData({
                companyName: "",
                industry: "",
                companySize: "",
                website: "",
                fullName: "",
                position: "",
                email: "",
                phone: "",
                serviceType: "",
                budget: "",
                timeline: "",
                description: "",
              });
            }}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Enviar Otra Solicitud
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={cn(
                      "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all",
                      isCompleted &&
                        "bg-accent border-accent text-accent-foreground",
                      isCurrent &&
                        "bg-primary border-primary text-primary-foreground",
                      !isCompleted &&
                        !isCurrent &&
                        "bg-card border-border text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      <Icon className="h-6 w-6" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "mt-2 text-sm font-medium text-center hidden sm:block",
                      isCompleted || isCurrent
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 mx-2 transition-all",
                      isCompleted ? "bg-accent" : "bg-border"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Card */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">
            {steps[currentStep - 1].name}
          </CardTitle>
          <CardDescription className="text-base">
            {currentStep === 1 && "Cuéntenos sobre su empresa"}
            {currentStep === 2 && "Información de la persona de contacto"}
            {currentStep === 3 && "Detalles sobre el servicio que necesita"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Step 1: Company Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-base">
                    Nombre de la Empresa *
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="Ej: Acme Corporation"
                    value={formData.companyName}
                    onChange={(e) =>
                      updateFormData("companyName", e.target.value)
                    }
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-base">
                    Industria *
                  </Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => updateFormData("industry", value)}
                    required
                  >
                    <SelectTrigger id="industry" className="h-11">
                      <SelectValue placeholder="Seleccione una industria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tecnologia">Tecnología</SelectItem>
                      <SelectItem value="finanzas">Finanzas</SelectItem>
                      <SelectItem value="salud">Salud</SelectItem>
                      <SelectItem value="manufactura">Manufactura</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="educacion">Educación</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companySize" className="text-base">
                    Tamaño de la Empresa *
                  </Label>
                  <Select
                    value={formData.companySize}
                    onValueChange={(value) =>
                      updateFormData("companySize", value)
                    }
                    required
                  >
                    <SelectTrigger id="companySize" className="h-11">
                      <SelectValue placeholder="Seleccione el tamaño" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 empleados</SelectItem>
                      <SelectItem value="11-50">11-50 empleados</SelectItem>
                      <SelectItem value="51-200">51-200 empleados</SelectItem>
                      <SelectItem value="201-500">201-500 empleados</SelectItem>
                      <SelectItem value="500+">500+ empleados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-base">
                    Sitio Web
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://www.ejemplo.com"
                    value={formData.website}
                    onChange={(e) => updateFormData("website", e.target.value)}
                    className="h-11"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-base">
                    Nombre Completo *
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Ej: Juan Pérez"
                    value={formData.fullName}
                    onChange={(e) => updateFormData("fullName", e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position" className="text-base">
                    Cargo *
                  </Label>
                  <Input
                    id="position"
                    placeholder="Ej: Director de Operaciones"
                    value={formData.position}
                    onChange={(e) => updateFormData("position", e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">
                    Email Corporativo *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="juan.perez@empresa.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base">
                    Teléfono *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Project Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="serviceType" className="text-base">
                    Tipo de Servicio *
                  </Label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value) =>
                      updateFormData("serviceType", value)
                    }
                    required
                  >
                    <SelectTrigger id="serviceType" className="h-11">
                      <SelectValue placeholder="Seleccione un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultoria">Consultoría</SelectItem>
                      <SelectItem value="desarrollo">
                        Desarrollo de Software
                      </SelectItem>
                      <SelectItem value="diseno">Diseño</SelectItem>
                      <SelectItem value="marketing">
                        Marketing Digital
                      </SelectItem>
                      <SelectItem value="soporte">Soporte Técnico</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-base">
                    Presupuesto Estimado *
                  </Label>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) => updateFormData("budget", value)}
                    required
                  >
                    <SelectTrigger id="budget" className="h-11">
                      <SelectValue placeholder="Seleccione un rango" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                      <SelectItem value="50k-100k">
                        $50,000 - $100,000
                      </SelectItem>
                      <SelectItem value="100k+">$100,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline" className="text-base">
                    Plazo Deseado *
                  </Label>
                  <Select
                    value={formData.timeline}
                    onValueChange={(value) => updateFormData("timeline", value)}
                    required
                  >
                    <SelectTrigger id="timeline" className="h-11">
                      <SelectValue placeholder="Seleccione un plazo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgente">
                        Urgente (1-2 semanas)
                      </SelectItem>
                      <SelectItem value="1-mes">1 mes</SelectItem>
                      <SelectItem value="2-3-meses">2-3 meses</SelectItem>
                      <SelectItem value="3-6-meses">3-6 meses</SelectItem>
                      <SelectItem value="6-meses+">6+ meses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base">
                    Descripción del Proyecto *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describa brevemente sus necesidades y objetivos..."
                    value={formData.description}
                    onChange={(e) =>
                      updateFormData("description", e.target.value)
                    }
                    required
                    rows={5}
                    className="resize-none"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="h-11 px-6 bg-transparent"
              >
                Anterior
              </Button>

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="h-11 px-6 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Siguiente
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="h-11 px-6 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Enviar Solicitud
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormSTPS;
