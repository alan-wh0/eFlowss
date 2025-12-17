"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Check, Loader2 } from "lucide-react"
import logo from "/assets/logo.jpg"

interface FormData {
  // Sección 1 (10 campos) - Información General de la Empresa
  "INSERTAR RAZÓN SOCIAL DE LA EMPRESA": string
  "PL": string
  "INSERTAR RFC DE LA EMPRESA": string
  "IMSS": string
  "LOGO": File | null
  "INSERTAR REPRESENTANTE LEGAL": string
  "INSERTAR CORREO ELECTRÓNICO": string
  "INSERTAR TELÉFONO": string
  "INSERTAR DIRECCIÓN DE LA EMPRESA": string
  "INSERTAR FECHA": string
  // Sección 2 (10 campos) - Empleados, Turnos y Trabajadores
  "CANTIDAD DE EMPLEADOS": string
  "X CANTIDAD DE TURNO": string
  "TOTAL DE TRABAJADORES": string
  "TOTAL DE OPERATIVOS": string
  "TOTAL DE ADMINISTRATIVOS": string
  "TOTAL TURNOS DE TRABAJO": string
  "dd": string
  "mm": string
  "aaaa": string
  "INSERTAR HORARIOS DE TRABAJO": string
  "INSERTAR REGISTRO PATRONAL": string
  "CANTIDAD DE TRABAJADORES": string // Duplicated, but keeping as per original structure for now
  // Sección 3 (10 campos) - Domicilio Fiscal y Actividad Económica
  "INSERTAR CALLE": string
  "INSERTAR COLONIA": string
  "INSERTAR CIUDAD": string
  "CODIGO POSTAL": string
  "NUM#": string
  "INSERTAR MUNICIPIO": string
  "INSERTAR ESTADO": string
  "INSERTAR LOS METROS SOBRE EL NIVEL DEL MAR DEL CENTRO DE TRABAJO": string
  "VENTA AL POR MENOR DE COMBUSTIBLES": string
  // Sección 4 (10 campos) - Vocales y Personal de Dirección
  "INSERTAR VOCAL 1": string
  "INSERTAR VOCAL 2": string
  "INSERTAR VOCAL 3": string
  "INSERTAR VOCAL 4": string
  "INSERTAR COORDINADOR": string
  "INSERTAR SECRETARIO": string
  "el/la(COORDINADOR)": string
  "el/la(SECRETARIO)": string
  "el/la(VOCAL1)": string
  "el/la(VOCAL2)": string
  // Sección 5 (10 campos) - Colindancias
  "INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL NORTE": string
  "INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL SUR": string
  "INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL ESTE": string
  "INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL OESTE": string
  "INSERTAR RESPONSABLE DE DESIGNADO": string
  "INSERTAR EVALUADOR": string
  "INSERTAR RESPONSABLE DEL DERECHO AL DESCANSO": string
  "INSERTAR JEFE INMEDIATO": string
  "INSERTAR PERSONA TRABAJADORA": string
  "NOMBRE DEL RESPONSABLE DE LA APLICACION": string
  // Sección 6 (10 campos) - Responsables de Seguridad y Permisos
  "INSERTAR RESPONSABLE DE SEGURIDAD Y SALUD": string
  "INSERTAR PERMISO CRE": string
  "INSERTAR PUESTO": string
  // Sección 7 - Tanques (T1, T2, T3)
  "T1": string
  "T2": string
  "T3": string
  "TANQUE REGULAR": string
  "TANQUE PREMIUM": string
  "TANQUE DIESEL": string
  "TIPO COMBUSTIBLE 1": string
  "TIPO COMBUSTIBLE 2": string
  "TIPO COMBUSTIBLE 3": string
  "REGULAR LITROS": string
  "PREMIUM LITROS": string
  // Sección 8 - Litros de Combustible
  "DIESEL LITROS": string
  "XTIPOCOMLITROS1": string
  "XTIPOCOMLITROS2": string
  "TOTAL DE LITROS DE COMBUSTIBLE": string
  "TOTAL DE TANQUES": string
  "X CANTIDAD DE DISPENSARIOS": string
  "INSERTAR CANTIDAD DE SUPERFICIE M2": string
  "OFICINAS": string
  "OFICINAS M2": string
  "AREA M2": string
  // Sección 9 - Superficies y Áreas
  "TOTAL M2": string
  "OFICINAS %": string
  "AREA %": string
  "D1": string
  "D2": string
  "D3": string
  "MANGUERA 1R": string
  "MANGUERA 2R": string
  "MANGUERA 3R": string
  "XTAN": string
  "XTIPOCOM1": string
  "XTIPOCOM2": string
  // Sección 10 - Mangueras P y D
  "MANGUERA 1P": string
  "MANGUERA 2P": string
  "MANGUERA 3P": string
  "MANGUERA 1D": string
  "MANGUERA 2D": string
  "MANGUERA 3D": string
}

export default function FormSTPS() {
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    "INSERTAR RAZÓN SOCIAL DE LA EMPRESA": "",
    "PL": "",
    "INSERTAR RFC DE LA EMPRESA": "",
    "IMSS": "",
    "LOGO": null,
    "INSERTAR REPRESENTANTE LEGAL": "",
    "INSERTAR CORREO ELECTRÓNICO": "",
    "INSERTAR TELÉFONO": "",
    "INSERTAR DIRECCIÓN DE LA EMPRESA": "",
    "INSERTAR FECHA": "",
    "CANTIDAD DE EMPLEADOS": "",
    "X CANTIDAD DE TURNO": "",
    "TOTAL DE TRABAJADORES": "",
    "TOTAL DE OPERATIVOS": "",
    "TOTAL DE ADMINISTRATIVOS": "",
    "TOTAL TURNOS DE TRABAJO": "",
    "dd": "",
    "mm": "",
    "aaaa": "",
    "INSERTAR HORARIOS DE TRABAJO": "",
    "INSERTAR REGISTRO PATRONAL": "",
    "CANTIDAD DE TRABAJADORES": "", // Duplicated, but keeping as per original structure for now
    "INSERTAR CALLE": "",
    "INSERTAR COLONIA": "",
    "INSERTAR CIUDAD": "",
    "CODIGO POSTAL": "",
    "NUM#": "",
    "INSERTAR MUNICIPIO": "",
    "INSERTAR ESTADO": "",
    "INSERTAR LOS METROS SOBRE EL NIVEL DEL MAR DEL CENTRO DE TRABAJO": "",
    "VENTA AL POR MENOR DE COMBUSTIBLES": "",
    "INSERTAR VOCAL 1": "",
    "INSERTAR VOCAL 2": "",
    "INSERTAR VOCAL 3": "",
    "INSERTAR VOCAL 4": "",
    "INSERTAR COORDINADOR": "",
    "INSERTAR SECRETARIO": "",
    "el/la(COORDINADOR)": "",
    "el/la(SECRETARIO)": "",
    "el/la(VOCAL1)": "",
    "el/la(VOCAL2)": "",
    "INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL NORTE": "",
    "INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL SUR": "",
    "INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL ESTE": "",
    "INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL OESTE": "",
    "INSERTAR RESPONSABLE DE DESIGNADO": "",
    "INSERTAR EVALUADOR": "",
    "INSERTAR RESPONSABLE DEL DERECHO AL DESCANSO": "",
    "INSERTAR JEFE INMEDIATO": "",
    "INSERTAR PERSONA TRABAJADORA": "",
    "NOMBRE DEL RESPONSABLE DE LA APLICACION": "",
    "INSERTAR RESPONSABLE DE SEGURIDAD Y SALUD": "",
    "INSERTAR PERMISO CRE": "",
    "INSERTAR PUESTO": "",
    // Reset sections 7-10
    "T1": "",
    "T2": "",
    "T3": "",
    "TANQUE REGULAR": "",
    "TANQUE PREMIUM": "",
    "TANQUE DIESEL": "",
    "TIPO COMBUSTIBLE 1": "",
    "TIPO COMBUSTIBLE 2": "",
    "TIPO COMBUSTIBLE 3": "",
    "REGULAR LITROS": "",
    "PREMIUM LITROS": "",
    "DIESEL LITROS": "",
    "XTIPOCOMLITROS1": "",
    "XTIPOCOMLITROS2": "",
    "TOTAL DE LITROS DE COMBUSTIBLE": "",
    "TOTAL DE TANQUES": "",
    "X CANTIDAD DE DISPENSARIOS": "",
    "INSERTAR CANTIDAD DE SUPERFICIE M2": "",
    "OFICINAS": "",
    "OFICINAS M2": "",
    "AREA M2": "",
    "TOTAL M2": "",
    "OFICINAS %": "",
    "AREA %": "",
    "D1": "",
    "D2": "",
    "D3": "",
    "MANGUERA 1R": "",
    "MANGUERA 2R": "",
    "MANGUERA 3R": "",
    "XTAN": "",
    "XTIPOCOM1": "",
    "XTIPOCOM2": "",
    // Sección 10 - Mangueras P y D
    "MANGUERA 1P": "",
    "MANGUERA 2P": "",
    "MANGUERA 3P": "",
    "MANGUERA 1D": "",
    "MANGUERA 2D": "",
    "MANGUERA 3D": "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleInputChangeDate(e: any) {
    const { id, value } = e.target

    if (id === "fechaSeccion2") {
      const [aaaa, mm, dd] = value.split("-")
      setFormData((prev) => ({
        ...prev,
        dd,
        mm,
        aaaa,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, LOGO: file }))
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const submitData = new FormData()

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "LOGO" && value instanceof File) {
          submitData.append(key, value, value.name)
        } else if (value !== null) {
          submitData.append(key, String(value))
        }
      })

      const response = await fetch("api/imagenes", {
        method: "POST",
        body: submitData,
      })

      if (!response.ok) {
        throw new Error(`Error al enviar el formulario: ${response.statusText}`)
      }

      setIsSubmitted(true)
    } catch (err) {
      console.error("Error al enviar el formulario:", err)
      setError(err instanceof Error ? err.message : "Error desconocido al enviar el formulario")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Formulario Enviado Exitosamente</h2>
              <p className="text-muted-foreground">
                Gracias por completar el formulario. Nos pondremos en contacto contigo pronto.
              </p>
              <Button
                onClick={() => {
                  setIsSubmitted(false)
                  setStep(1)
                  setError(null)
                  setFormData({
                    "INSERTAR RAZÓN SOCIAL DE LA EMPRESA": "",
                    "PL": "",
                    "INSERTAR RFC DE LA EMPRESA": "",
                    "IMSS": "",
                    "LOGO": null,
                    "INSERTAR REPRESENTANTE LEGAL": "",
                    "INSERTAR CORREO ELECTRÓNICO": "",
                    "INSERTAR TELÉFONO": "",
                    "INSERTAR DIRECCIÓN DE LA EMPRESA": "",
                    "INSERTAR FECHA": "",
                    "CANTIDAD DE EMPLEADOS": "",
                    "X CANTIDAD DE TURNO": "",
                    "TOTAL DE TRABAJADORES": "",
                    "TOTAL DE OPERATIVOS": "",
                    "TOTAL DE ADMINISTRATIVOS": "",
                    "TOTAL TURNOS DE TRABAJO": "",
                    "dd": "",
                    "mm": "",
                    "aaaa": "",
                    "INSERTAR HORARIOS DE TRABAJO": "",
                    "INSERTAR REGISTRO PATRONAL": "",
                    "CANTIDAD DE TRABAJADORES": "",
                    "INSERTAR CALLE": "",
                    "INSERTAR COLONIA": "",
                    "INSERTAR CIUDAD": "",
                    "CODIGO POSTAL": "",
                    "NUM#": "",
                    "INSERTAR MUNICIPIO": "",
                    "INSERTAR ESTADO": "",
                    "INSERTAR LOS METROS SOBRE EL NIVEL DEL MAR DEL CENTRO DE TRABAJO": "",
                    "VENTA AL POR MENOR DE COMBUSTIBLES": "",
                    "INSERTAR VOCAL 1": "",
                    "INSERTAR VOCAL 2": "",
                    "INSERTAR VOCAL 3": "",
                    "INSERTAR VOCAL 4": "",
                    "INSERTAR COORDINADOR": "",
                    "INSERTAR SECRETARIO": "",
                    "el/la(COORDINADOR)": "",
                    "el/la(SECRETARIO)": "",
                    "el/la(VOCAL1)": "",
                    "el/la(VOCAL2)": "",
                    "INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL NORTE": "",
                    "INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL SUR": "",
                    "INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL ESTE": "",
                    "INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL OESTE": "",
                    "INSERTAR RESPONSABLE DE DESIGNADO": "",
                    "INSERTAR EVALUADOR": "",
                    "INSERTAR RESPONSABLE DEL DERECHO AL DESCANSO": "",
                    "INSERTAR JEFE INMEDIATO": "",
                    "INSERTAR PERSONA TRABAJADORA": "",
                    "NOMBRE DEL RESPONSABLE DE LA APLICACION": "",
                    "INSERTAR RESPONSABLE DE SEGURIDAD Y SALUD": "",
                    "INSERTAR PERMISO CRE": "",
                    "INSERTAR PUESTO": "",
                    // Reset sections 7-10
                    "T1": "",
                    "T2": "",
                    "T3": "",
                    "TANQUE REGULAR": "",
                    "TANQUE PREMIUM": "",
                    "TANQUE DIESEL": "",
                    "TIPO COMBUSTIBLE 1": "",
                    "TIPO COMBUSTIBLE 2": "",
                    "TIPO COMBUSTIBLE 3": "",
                    "REGULAR LITROS": "",
                    "PREMIUM LITROS": "",
                    "DIESEL LITROS": "",
                    "XTIPOCOMLITROS1": "",
                    "XTIPOCOMLITROS2": "",
                    "TOTAL DE LITROS DE COMBUSTIBLE": "",
                    "TOTAL DE TANQUES": "",
                    "X CANTIDAD DE DISPENSARIOS": "",
                    "INSERTAR CANTIDAD DE SUPERFICIE M2": "",
                    "OFICINAS": "",
                    "OFICINAS M2": "",
                    "AREA M2": "",
                    "TOTAL M2": "",
                    "OFICINAS %": "",
                    "AREA %": "",
                    "D1": "",
                    "D2": "",
                    "D3": "",
                    "MANGUERA 1R": "",
                    "MANGUERA 2R": "",
                    "MANGUERA 3R": "",
                    "XTAN": "",
                    "XTIPOCOM1": "",
                    "XTIPOCOM2": "",
                    "MANGUERA 1P": "",
                    "MANGUERA 2P": "",
                    "MANGUERA 3P": "",
                    "MANGUERA 1D": "",
                    "MANGUERA 2D": "",
                    "MANGUERA 3D": "",
                  })
                  setLogoPreview(null)
                }}
              >
                Enviar Otro Formulario
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalSteps = 11 // Updated from 10 to 11 (now includes confirmation step)

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-2xl">Formulario STPS - Cliente</CardTitle>
              <CardDescription>Complete la información requerida en {totalSteps} sección(es)</CardDescription>
            </div>
            <div className="flex-shrink-0">
              <img src="" alt="ESERVICES Logo" className="h-16 w-auto object-contain" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex items-center justify-between relative px-4">
              {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s, index) => (
                <div key={s} className="flex flex-col items-center relative">
                  {index < totalSteps - 1 && (
                    <div
                      className={`absolute top-5 h-0.5 transition-all duration-300 ${
                        s < step ? "bg-primary" : "bg-muted"
                      }`}
                      style={{
                        left: "20px",
                        width: "calc(100% + 60px)",
                      }}
                    />
                  )}

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative z-10 ${
                      s < step
                        ? "bg-primary text-primary-foreground"
                        : s === step
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s === totalSteps ? <Check className="w-5 h-5" /> : <span className="font-semibold">{s}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="razonSocial">Razón Social de la Empresa</Label>
                  <Input
                    id="razonSocial"
                    name="INSERTAR RAZÓN SOCIAL DE LA EMPRESA"
                    value={formData["INSERTAR RAZÓN SOCIAL DE LA EMPRESA"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese la razón social"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pl">PL</Label>
                  <Input id="pl" name="PL" value={formData.PL} onChange={handleInputChange} placeholder="Ingrese PL" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rfc">RFC de la Empresa</Label>
                  <Input
                    id="rfc"
                    name="INSERTAR RFC DE LA EMPRESA"
                    value={formData["INSERTAR RFC DE LA EMPRESA"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el RFC"
                    maxLength={13}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imss">IMSS</Label>
                  <Input
                    id="imss"
                    name="IMSS"
                    value={formData.IMSS}
                    onChange={handleInputChange}
                    placeholder="Ingrese IMSS"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="logo"
                      name="LOGO"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="flex-1"
                    />
                    {logoPreview && (
                      <div className="w-16 h-16 border rounded-md overflow-hidden">
                        <img
                          src={logoPreview || "/placeholder.svg"}
                          alt="Logo preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="representanteLegal">Representante Legal</Label>
                  <Input
                    id="representanteLegal"
                    name="INSERTAR REPRESENTANTE LEGAL"
                    value={formData["INSERTAR REPRESENTANTE LEGAL"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el nombre del representante legal"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="correoElectronico">Correo Electrónico</Label>
                  <Input
                    id="correoElectronico"
                    name="INSERTAR CORREO ELECTRÓNICO"
                    type="email"
                    value={formData["INSERTAR CORREO ELECTRÓNICO"]}
                    onChange={handleInputChange}
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    name="INSERTAR TELÉFONO"
                    type="tel"
                    value={formData["INSERTAR TELÉFONO"]}
                    onChange={handleInputChange}
                    placeholder="+52 123 456 7890"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección de la Empresa</Label>
                  <Textarea
                    id="direccion"
                    name="INSERTAR DIRECCIÓN DE LA EMPRESA"
                    value={formData["INSERTAR DIRECCIÓN DE LA EMPRESA"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese la dirección completa"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fecha">Fecha de Elaboración</Label>
                  <Input
                    id="fecha"
                    name="INSERTAR FECHA"
                    type="text"
                    value={formData["INSERTAR FECHA"]}
                    onChange={handleInputChange}
                    placeholder="Ej: 01 enero de 2025"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cantidadEmpleados">Cantidad de Empleados</Label>
                  <Input
                    id="cantidadEmpleados"
                    name="CANTIDAD DE EMPLEADOS"
                    type="number"
                    value={formData["CANTIDAD DE EMPLEADOS"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese la cantidad de empleados"
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cantidadTurno">Cantidad de Turno</Label>
                  <Input
                    id="cantidadTurno"
                    name="X CANTIDAD DE TURNO"
                    type="number"
                    value={formData["X CANTIDAD DE TURNO"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese la cantidad de turnos"
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalTrabajadores">Total de Trabajadores</Label>
                  <Input
                    id="totalTrabajadores"
                    name="TOTAL DE TRABAJADORES"
                    type="number"
                    value={formData["TOTAL DE TRABAJADORES"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el total de trabajadores"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalOperativos">Total de Operativos</Label>
                  <Input
                    id="totalOperativos"
                    name="TOTAL DE OPERATIVOS"
                    type="number"
                    value={formData["TOTAL DE OPERATIVOS"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el total de operativos"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalAdministrativos">Total de Administrativos</Label>
                  <Input
                    id="totalAdministrativos"
                    name="TOTAL DE ADMINISTRATIVOS"
                    type="number"
                    value={formData["TOTAL DE ADMINISTRATIVOS"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el total de administrativos"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalTurnosTrabajo">Total Turnos de Trabajo</Label>
                  <Input
                    id="totalTurnosTrabajo"
                    name="TOTAL TURNOS DE TRABAJO"
                    type="number"
                    value={formData["TOTAL TURNOS DE TRABAJO"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el total de turnos de trabajo"
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaSeccion2">Fecha de Inicio de Operaciones</Label>
                  <Input
                    id="fechaSeccion2"
                    type="date"
                    value={
                      formData.aaaa && formData.mm && formData.dd
                        ? `${formData.aaaa}-${formData.mm}-${formData.dd}`
                        : ""
                    }
                    onChange={handleInputChangeDate}
                    placeholder="dd/mm/aa"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="horariosTrabajo">Horarios de Trabajo</Label>
                  <Input
                    id="horariosTrabajo"
                    name="INSERTAR HORARIOS DE TRABAJO"
                    value={formData["INSERTAR HORARIOS DE TRABAJO"]}
                    onChange={handleInputChange}
                    placeholder="Ej: 8:00 AM - 5:00 PM"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registroPatronal">Registro Patronal</Label>
                  <Input
                    id="registroPatronal"
                    name="INSERTAR REGISTRO PATRONAL"
                    value={formData["INSERTAR REGISTRO PATRONAL"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el registro patronal"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cantidadTrabajadores">Cantidad de Trabajadores</Label>
                  <Input
                    id="cantidadTrabajadores"
                    name="CANTIDAD DE TRABAJADORES"
                    type="number"
                    value={formData["CANTIDAD DE TRABAJADORES"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese la cantidad de trabajadores"
                    min="0"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="calle">Calle</Label>
                  <Input
                    id="calle"
                    name="INSERTAR CALLE"
                    value={formData["INSERTAR CALLE"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el nombre de la calle"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="colonia">Colonia</Label>
                  <Input
                    id="colonia"
                    name="INSERTAR COLONIA"
                    value={formData["INSERTAR COLONIA"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese la colonia"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ciudad">Ciudad</Label>
                  <Input
                    id="ciudad"
                    name="INSERTAR CIUDAD"
                    value={formData["INSERTAR CIUDAD"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese la ciudad"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="codigoPostal">Código Postal</Label>
                  <Input
                    id="codigoPostal"
                    name="CODIGO POSTAL"
                    value={formData["CODIGO POSTAL"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el código postal"
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numero">Número</Label>
                  <Input
                    id="numero"
                    name="NUM#"
                    value={formData["NUM#"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el número exterior/interior"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="municipio">Municipio</Label>
                  <Input
                    id="municipio"
                    name="INSERTAR MUNICIPIO"
                    value={formData["INSERTAR MUNICIPIO"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el municipio"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Input
                    id="estado"
                    name="INSERTAR ESTADO"
                    value={formData["INSERTAR ESTADO"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el estado"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metrosNivelMar">Los Metros sobre el Nivel del Mar del Centro de Trabajo</Label>
                  <Input
                    id="metrosNivelMar"
                    name="INSERTAR LOS METROS SOBRE EL NIVEL DEL MAR DEL CENTRO DE TRABAJO"
                    type="number"
                    value={formData["INSERTAR LOS METROS SOBRE EL NIVEL DEL MAR DEL CENTRO DE TRABAJO"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese los metros sobre el nivel del mar"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ventaCombustibles">Venta al Por Menor de Combustibles</Label>
                  <Input
                    id="ventaCombustibles"
                    name="VENTA AL POR MENOR DE COMBUSTIBLES"
                    value={formData["VENTA AL POR MENOR DE COMBUSTIBLES"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese información sobre venta de combustibles"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="vocal1">Vocal 1</Label>
                  <Input
                    id="vocal1"
                    name="INSERTAR VOCAL 1"
                    value={formData["INSERTAR VOCAL 1"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el nombre del vocal 1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vocal2">Vocal 2</Label>
                  <Input
                    id="vocal2"
                    name="INSERTAR VOCAL 2"
                    value={formData["INSERTAR VOCAL 2"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el nombre del vocal 2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vocal3">Vocal 3</Label>
                  <Input
                    id="vocal3"
                    name="INSERTAR VOCAL 3"
                    value={formData["INSERTAR VOCAL 3"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el nombre del vocal 3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vocal4">Vocal 4</Label>
                  <Input
                    id="vocal4"
                    name="INSERTAR VOCAL 4"
                    value={formData["INSERTAR VOCAL 4"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el nombre del vocal 4"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coordinador">Coordinador</Label>
                  <Input
                    id="coordinador"
                    name="INSERTAR COORDINADOR"
                    value={formData["INSERTAR COORDINADOR"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el nombre del coordinador"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secretario">Secretario</Label>
                  <Input
                    id="secretario"
                    name="INSERTAR SECRETARIO"
                    value={formData["INSERTAR SECRETARIO"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el nombre del secretario"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="generoCoordinador">el/la(COORDINADOR)</Label>
                  <Select
                    value={formData["el/la(COORDINADOR)"]}
                    onValueChange={(value) => handleSelectChange("el/la(COORDINADOR)", value)}
                  >
                    <SelectTrigger id="generoCoordinador">
                      <SelectValue placeholder="Seleccione El o La" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="El">El</SelectItem>
                      <SelectItem value="La">La</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="generoSecretario">el/la(SECRETARIO)</Label>
                  <Select
                    value={formData["el/la(SECRETARIO)"]}
                    onValueChange={(value) => handleSelectChange("el/la(SECRETARIO)", value)}
                  >
                    <SelectTrigger id="generoSecretario">
                      <SelectValue placeholder="Seleccione El o La" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="El">El</SelectItem>
                      <SelectItem value="La">La</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="generoVocal1">el/la(VOCAL1)</Label>
                  <Select
                    value={formData["el/la(VOCAL1)"]}
                    onValueChange={(value) => handleSelectChange("el/la(VOCAL1)", value)}
                  >
                    <SelectTrigger id="generoVocal1">
                      <SelectValue placeholder="Seleccione El o La" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="El">El</SelectItem>
                      <SelectItem value="La">La</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="generoVocal2">el/la(VOCAL2)</Label>
                  <Select
                    value={formData["el/la(VOCAL2)"]}
                    onValueChange={(value) => handleSelectChange("el/la(VOCAL2)", value)}
                  >
                    <SelectTrigger id="generoVocal2">
                      <SelectValue placeholder="Seleccione El o La" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="El">El</SelectItem>
                      <SelectItem value="La">La</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="colindanciaNorte">Colindancias del Centro de Trabajo hacia el Norte</Label>
                  <Textarea
                    id="colindanciaNorte"
                    name="INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL NORTE"
                    value={formData["INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL NORTE"]}
                    onChange={handleInputChange}
                    placeholder="Describa las colindancias hacia el norte"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="colindanciaSur">Colindancias del Centro de Trabajo hacia el Sur</Label>
                  <Textarea
                    id="colindanciaSur"
                    name="INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL SUR"
                    value={formData["INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL SUR"]}
                    onChange={handleInputChange}
                    placeholder="Describa las colindancias hacia el sur"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="colindanciaEste">Colindancias del Centro de Trabajo hacia el Este</Label>
                  <Textarea
                    id="colindanciaEste"
                    name="INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL ESTE"
                    value={formData["INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL ESTE"]}
                    onChange={handleInputChange}
                    placeholder="Describa las colindancias hacia el este"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="colindanciaOeste">Colindancias del Centro de Trabajo hacia el Oeste</Label>
                  <Textarea
                    id="colindanciaOeste"
                    name="INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL OESTE"
                    value={formData["INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL OESTE"]}
                    onChange={handleInputChange}
                    placeholder="Describa las colindancias hacia el oeste"
                    rows={2}
                  />
                </div>
                {/* Responsables - Campos 5-10 */}
                <div className="space-y-2">
                  <Label htmlFor="responsableDesignado">Responsable Designado</Label>
                  <Input
                    id="responsableDesignado"
                    name="INSERTAR RESPONSABLE DE DESIGNADO"
                    value={formData["INSERTAR RESPONSABLE DE DESIGNADO"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el nombre del responsable designado"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="evaluador">Evaluador</Label>
                  <Input
                    id="evaluador"
                    name="INSERTAR EVALUADOR"
                    value={formData["INSERTAR EVALUADOR"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el nombre del evaluador"
                  />
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-4">
                {/* Continuación de Responsables */}

                <div className="space-y-2">
                  <Label htmlFor="jefeInmediato">Jefe Inmediato</Label>
                  <Input
                    id="jefeInmediato"
                    name="INSERTAR JEFE INMEDIATO"
                    value={formData["INSERTAR JEFE INMEDIATO"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el nombre del jefe inmediato"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="personaTrabajadora">Persona Trabajadora</Label>
                  <Input
                    id="personaTrabajadora"
                    name="INSERTAR PERSONA TRABAJADORA"
                    value={formData["INSERTAR PERSONA TRABAJADORA"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el nombre de la persona trabajadora"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nombreResponsableAplicacion">Nombre del Responsable de la Aplicación</Label>
                  <Input
                    id="nombreResponsableAplicacion"
                    name=" NOMBRE DEL RESPONSABLE DE LA APLICACION"
                    value={formData["NOMBRE DEL RESPONSABLE DE LA APLICACION"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el nombre del responsable"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsableSeguridadSalud">Responsable de Seguridad y Salud</Label>
                  <Input
                    id="responsableSeguridadSalud"
                    name="INSERTAR RESPONSABLE DE SEGURIDAD Y SALUD"
                    value={formData["INSERTAR RESPONSABLE DE SEGURIDAD Y SALUD"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el nombre del responsable"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="permisoCRE">Permiso CRE</Label>
                  <Input
                    id="permisoCRE"
                    name="INSERTAR PERMISO CRE"
                    value={formData["INSERTAR PERMISO CRE"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el número de permiso CRE"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="puesto">Puesto</Label>
                  <Input
                    id="puesto"
                    name="INSERTAR PUESTO"
                    value={formData["INSERTAR PUESTO"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el puesto"
                  />
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="t1">T1</Label>
                  <Input
                    id="t1"
                    name="T1"
                    value={formData["T1"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese información T1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="t2">T2</Label>
                  <Input
                    id="t2"
                    name="T2"
                    value={formData["T2"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese información T2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="t3">T3</Label>
                  <Input
                    id="t3"
                    name="T3"
                    value={formData["T3"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese información T3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tanqueRegular">Tanque Regular</Label>
                  <Input
                    id="tanqueRegular"
                    name="TANQUE REGULAR"
                    value={formData["TANQUE REGULAR"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese información del tanque regular"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tanquePremium">Tanque Premium</Label>
                  <Input
                    id="tanquePremium"
                    name="TANQUE PREMIUM"
                    value={formData["TANQUE PREMIUM"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese información del tanque premium"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tanqueDiesel">Tanque Diesel</Label>
                  <Input
                    id="tanqueDiesel"
                    name="TANQUE DIESEL"
                    value={formData["TANQUE DIESEL"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese información del tanque diesel"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipoCombustible1">Tipo Combustible 1</Label>
                  <Input
                    id="tipoCombustible1"
                    name="TIPO COMBUSTIBLE 1"
                    value={formData["TIPO COMBUSTIBLE 1"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el tipo de combustible 1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipoCombustible2">Tipo Combustible 2</Label>
                  <Input
                    id="tipoCombustible2"
                    name="TIPO COMBUSTIBLE 2"
                    value={formData["TIPO COMBUSTIBLE 2"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el tipo de combustible 2"
                  />
                  </div>
                <div className="space-y-2">
                  <Label htmlFor="tipoCombustible3">Tipo Combustible 3</Label>
                  <Input
                    id="tipoCombustible3"
                    name="TIPO COMBUSTIBLE 3"
                    value={formData["TIPO COMBUSTIBLE 3"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el tipo de combustible 3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regularLitros">Regular Litros</Label>
                  <Input
                    id="regularLitros"
                    name="REGULAR LITROS"
                    type="number"
                    value={formData["REGULAR LITROS"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese litros de gasolina regular"
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="premiumLitros">Premium Litros</Label>
                  <Input
                    id="premiumLitros"
                    name="PREMIUM LITROS"
                    type="number"
                    value={formData["PREMIUM LITROS"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese litros de gasolina premium"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
            )}

            {step === 8 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dieselLitros">Diesel Litros</Label>
                  <Input
                    id="dieselLitros"
                    name="DIESEL LITROS"
                    type="number"
                    value={formData["DIESEL LITROS"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese litros de diesel"
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="xtipoCom1">X Tipo Combustible Litros 1</Label>
                  <Input
                    id="xtipoCom1"
                    name="XTIPOCOMLITROS1"
                    type="number"
                    value={formData["XTIPOCOMLITROS1"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese litros tipo combustible 1"
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="xtipoCom2">X Tipo Combustible Litros 2</Label>
                  <Input
                    id="xtipoCom2"
                    name="XTIPOCOMLITROS2"
                    type="number"
                    value={formData["XTIPOCOMLITROS2"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese litros tipo combustible 2"
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalTanques">Total de Tanques</Label>
                  <Input
                    id="totalTanques"
                    name="TOTAL DE TANQUES"
                    type="number"
                    value={formData["TOTAL DE TANQUES"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el total de tanques"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalLitrosCombustible">Total de Litros de Combustible</Label>
                  <Input
                    id="totalLitrosCombustible"
                    name="TOTAL DE LITROS DE COMBUSTIBLE"
                    type="number"
                    value={formData["TOTAL DE LITROS DE COMBUSTIBLE"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el total de litros de combustible"
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cantidadDispensarios">X Cantidad de Dispensarios</Label>
                  <Input
                    id="cantidadDispensarios"
                    name="X CANTIDAD DE DISPENSARIOS"
                    type="number"
                    value={formData["X CANTIDAD DE DISPENSARIOS"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese cantidad de dispensarios"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="oficinas">Oficinas</Label>
                  <Input
                    id="oficinas"
                    name="OFICINAS"
                    value={formData["OFICINAS"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese información de oficinas"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cantidadSuperficieM2">Insertar Cantidad de Superficie M2</Label>
                  <Input
                    id="cantidadSuperficieM2"
                    name="INSERTAR CANTIDAD DE SUPERFICIE M2"
                    type="number"
                    value={formData["INSERTAR CANTIDAD DE SUPERFICIE M2"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese la cantidad de superficie en m2"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="oficinasM2">Oficinas m2</Label>
                  <Input
                    id="oficinasM2"
                    name="OFICINAS M2"
                    type="number"
                    value={formData["OFICINAS M2"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese los m2 de oficinas"
                    step="0.01"
                  />
                </div>
              </div>
            )}

            {step === 9 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="areaM2">Área m2</Label>
                  <Input
                    id="areaM2"
                    name="AREA M2"
                    type="number"
                    value={formData["AREA M2"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese los m2 del área"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalM2">Total m2</Label>
                  <Input
                    id="totalM2"
                    name="TOTAL M2"
                    type="number"
                    value={formData["TOTAL M2"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el total en m2"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="oficinasPorc">Oficinas %</Label>
                  <Input
                    id="oficinasPorc"
                    name="OFICINAS %"
                    type="number"
                    value={formData["OFICINAS %"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el porcentaje de oficinas"
                    step="0.01"
                    min="0"
                    max="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="areaPorc">Área %</Label>
                  <Input
                    id="areaPorc"
                    name="AREA %"
                    type="number"
                    value={formData["AREA %"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese el porcentaje del área"
                    step="0.01"
                    min="0"
                    max="100"
                  />
                </div>
                {/* Added fields for section 9 */}
                <div className="space-y-2">
                  <Label htmlFor="manguera3R">Manguera 3R</Label>
                  <Input
                    id="manguera3R"
                    name="MANGUERA 3R"
                    type="text"
                    value={formData["MANGUERA 3R"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese Manguera 3R"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="xtan">XTAN</Label>
                  <Input
                    id="xtan"
                    name="XTAN"
                    type="text"
                    value={formData["XTAN"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese XTAN"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="xtipocom1">XTIPOCOM1</Label>
                  <Input
                    id="xtipocom1"
                    name="XTIPOCOM1"
                    type="text"
                    value={formData["XTIPOCOM1"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese XTIPOCOM1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="xtipocom2">XTIPOCOM2</Label>
                  <Input
                    id="xtipocom2"
                    name="XTIPOCOM2"
                    type="text"
                    value={formData["XTIPOCOM2"]}
                    onChange={handleInputChange}
                    placeholder="Ingrese XTIPOCOM2"
                  />
                </div>
              </div>
            )}

{step === 10 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="d1">D1</Label>
            <Input
              id="d1"
              name="D1"
              value={formData["D1"]}
              onChange={handleInputChange}
              placeholder="Ingrese información D1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="d2">D2</Label>
            <Input
              id="d2"
              name="D2"
              value={formData["D2"]}
              onChange={handleInputChange}
              placeholder="Ingrese información D2"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="d3">D3</Label>
            <Input
              id="d3"
              name="D3"
              value={formData["D3"]}
              onChange={handleInputChange}
              placeholder="Ingrese información D3"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manguera1R">Manguera 1R</Label>
            <Input
              id="manguera1R"
              name="MANGUERA 1R"
              value={formData["MANGUERA 1R"]}
              onChange={handleInputChange}
              placeholder="Ingrese información manguera 1R"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manguera2R">Manguera 2R</Label>
            <Input
              id="manguera2R"
              name="MANGUERA 2R"
              value={formData["MANGUERA 2R"]}
              onChange={handleInputChange}
              placeholder="Ingrese información manguera 2R"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manguera3R">Manguera 3R</Label>
            <Input
              id="manguera3R"
              name="MANGUERA 3R"
              value={formData["MANGUERA 3R"]}
              onChange={handleInputChange}
              placeholder="Ingrese información manguera 3R"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manguera1P">Manguera 1P</Label>
            <Input
              id="manguera1P"
              name="MANGUERA 1P"
              value={formData["MANGUERA 1P"]}
              onChange={handleInputChange}
              placeholder="Ingrese información manguera 1P"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manguera2P">Manguera 2P</Label>
            <Input
              id="manguera2P"
              name="MANGUERA 2P"
              value={formData["MANGUERA 2P"]}
              onChange={handleInputChange}
              placeholder="Ingrese información manguera 2P"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manguera3P">Manguera 3P</Label>
            <Input
              id="manguera3P"
              name="MANGUERA 3P"
              value={formData["MANGUERA 3P"]}
              onChange={handleInputChange}
              placeholder="Ingrese información manguera 3P"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manguera1D">Manguera 1D</Label>
            <Input
              id="manguera1D"
              name="MANGUERA 1D"
              value={formData["MANGUERA 1D"]}
              onChange={handleInputChange}
              placeholder="Ingrese información manguera 1D"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manguera2D">Manguera 2D</Label>
            <Input
              id="manguera2D"
              name="MANGUERA 2D"
              value={formData["MANGUERA 2D"]}
              onChange={handleInputChange}
              placeholder="Ingrese información manguera 2D"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="manguera3D">Manguera 3D</Label>
            <Input
              id="manguera3D"
              name="MANGUERA 3D"
              value={formData["MANGUERA 3D"]}
              onChange={handleInputChange}
              placeholder="Ingrese información manguera 3D"
            />
          </div>
        </div>
      )}

            {step === 11 && (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
                      <Check className="w-10 h-10 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">¡Formulario Completado!</h3>
                  <p className="text-muted-foreground">
                    Has completado todas las secciones del formulario. Haz clic en el botón "Enviar" para enviar tu
                    información.
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <Button type="button" variant="outline" onClick={handlePrevious} disabled={step === 1 || isLoading}>
                Anterior
              </Button>
              {step < totalSteps ? (
                <Button type="button" onClick={handleNext} disabled={isLoading}>
                  Siguiente
                </Button>
              ) : (
                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Confirmar y Enviar
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
