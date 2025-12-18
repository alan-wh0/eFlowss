"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Check, Loader2 } from "lucide-react"
import logo from "/assets/logo.jpg"

interface FormData {
  // Sección 1 - Información General de la Empresa
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
  // Sección 2 - Empleados, Turnos y Trabajadores
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
  "CANTIDAD DE TRABAJADORES": string
  // Sección 3 - Domicilio Fiscal y Actividad Económica
  "INSERTAR CALLE": string
  "INSERTAR COLONIA": string
  "INSERTAR CIUDAD": string
  "CODIGO POSTAL": string
  "NUM#": string
  "INSERTAR MUNICIPIO": string
  "INSERTAR ESTADO": string
  "INSERTAR LOS METROS SOBRE EL NIVEL DEL MAR DEL CENTRO DE TRABAJO": string
  "VENTA AL POR MENOR DE COMBUSTIBLES": string
  // Sección 4 - Vocales y Personal de Dirección
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
  // Sección 5 - Colindancias y Responsables
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
  // Sección 6 - Responsables de Seguridad y Permisos
  "INSERTAR RESPONSABLE DE SEGURIDAD Y SALUD": string
  "INSERTAR PERMISO CRE": string
  "INSERTAR PUESTO": string
  // Sección 7 - Tanques
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

type FieldConfig = {
  id: string
  name: keyof FormData
  label: string
  type?: string
  placeholder?: string
  rows?: number
  maxLength?: number
  min?: number | string
  max?: number | string
  step?: string
  accept?: string
  options?: { value: string; label: string }[]
}

// Estado inicial centralizado - elimina duplicación
const getInitialFormData = (): FormData => ({
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

// Configuración de campos por sección - centraliza estructura del formulario
const FORM_SECTIONS: Record<number, FieldConfig[]> = {
  1: [
    { id: "razonSocial", name: "INSERTAR RAZÓN SOCIAL DE LA EMPRESA", label: "Razón Social de la Empresa", placeholder: "Ingrese la razón social" },
    { id: "pl", name: "PL", label: "PL", placeholder: "Ingrese PL" },
    { id: "rfc", name: "INSERTAR RFC DE LA EMPRESA", label: "RFC de la Empresa", placeholder: "Ingrese el RFC", maxLength: 13 },
    { id: "imss", name: "IMSS", label: "IMSS", placeholder: "Ingrese IMSS" },
    { id: "logo", name: "LOGO", label: "Logo", type: "file", accept: "image/*" },
    { id: "representanteLegal", name: "INSERTAR REPRESENTANTE LEGAL", label: "Representante Legal", placeholder: "Ingrese el nombre del representante legal" },
    { id: "correoElectronico", name: "INSERTAR CORREO ELECTRÓNICO", label: "Correo Electrónico", type: "email", placeholder: "correo@ejemplo.com" },
    { id: "telefono", name: "INSERTAR TELÉFONO", label: "Teléfono", type: "tel", placeholder: "+52 123 456 7890" },
    { id: "direccion", name: "INSERTAR DIRECCIÓN DE LA EMPRESA", label: "Dirección de la Empresa", type: "textarea", placeholder: "Ingrese la dirección completa", rows: 3 },
    { id: "fecha", name: "INSERTAR FECHA", label: "Fecha de Elaboración", placeholder: "Ej: 01 enero de 2025" },
  ],
  2: [
    { id: "cantidadEmpleados", name: "CANTIDAD DE EMPLEADOS", label: "Cantidad de Empleados", type: "number", placeholder: "Ingrese la cantidad de empleados", min: "1" },
    { id: "cantidadTurno", name: "X CANTIDAD DE TURNO", label: "Cantidad de Turno", type: "number", placeholder: "Ingrese la cantidad de turnos", min: "1" },
    { id: "totalTrabajadores", name: "TOTAL DE TRABAJADORES", label: "Total de Trabajadores", type: "number", placeholder: "Ingrese el total de trabajadores", min: "0" },
    { id: "totalOperativos", name: "TOTAL DE OPERATIVOS", label: "Total de Operativos", type: "number", placeholder: "Ingrese el total de operativos", min: "0" },
    { id: "totalAdministrativos", name: "TOTAL DE ADMINISTRATIVOS", label: "Total de Administrativos", type: "number", placeholder: "Ingrese el total de administrativos", min: "0" },
    { id: "totalTurnosTrabajo", name: "TOTAL TURNOS DE TRABAJO", label: "Total Turnos de Trabajo", type: "number", placeholder: "Ingrese el total de turnos de trabajo", min: "1" },
    { id: "fechaSeccion2", name: "dd", label: "Fecha de Inicio de Operaciones", type: "date" },
    { id: "horariosTrabajo", name: "INSERTAR HORARIOS DE TRABAJO", label: "Horarios de Trabajo", placeholder: "Ej: 8:00 AM - 5:00 PM" },
    { id: "registroPatronal", name: "INSERTAR REGISTRO PATRONAL", label: "Registro Patronal", placeholder: "Ingrese el registro patronal" },
    { id: "cantidadTrabajadores", name: "CANTIDAD DE TRABAJADORES", label: "Cantidad de Trabajadores", type: "number", placeholder: "Ingrese la cantidad de trabajadores", min: "0" },
  ],
  3: [
    { id: "calle", name: "INSERTAR CALLE", label: "Calle", placeholder: "Ingrese el nombre de la calle" },
    { id: "colonia", name: "INSERTAR COLONIA", label: "Colonia", placeholder: "Ingrese la colonia" },
    { id: "ciudad", name: "INSERTAR CIUDAD", label: "Ciudad", placeholder: "Ingrese la ciudad" },
    { id: "codigoPostal", name: "CODIGO POSTAL", label: "Código Postal", placeholder: "Ingrese el código postal", maxLength: 5 },
    { id: "numero", name: "NUM#", label: "Número", placeholder: "Ingrese el número exterior/interior" },
    { id: "municipio", name: "INSERTAR MUNICIPIO", label: "Municipio", placeholder: "Ingrese el municipio" },
    { id: "estado", name: "INSERTAR ESTADO", label: "Estado", placeholder: "Ingrese el estado" },
    { id: "metrosNivelMar", name: "INSERTAR LOS METROS SOBRE EL NIVEL DEL MAR DEL CENTRO DE TRABAJO", label: "Los Metros sobre el Nivel del Mar del Centro de Trabajo", type: "number", placeholder: "Ingrese los metros sobre el nivel del mar", step: "0.01" },
    { id: "ventaCombustibles", name: "VENTA AL POR MENOR DE COMBUSTIBLES", label: "Venta al Por Menor de Combustibles", placeholder: "Ingrese información sobre venta de combustibles" },
  ],
  4: [
    { id: "vocal1", name: "INSERTAR VOCAL 1", label: "Vocal 1", placeholder: "Ingrese el nombre del vocal 1" },
    { id: "vocal2", name: "INSERTAR VOCAL 2", label: "Vocal 2", placeholder: "Ingrese el nombre del vocal 2" },
    { id: "vocal3", name: "INSERTAR VOCAL 3", label: "Vocal 3", placeholder: "Ingrese el nombre del vocal 3" },
    { id: "vocal4", name: "INSERTAR VOCAL 4", label: "Vocal 4", placeholder: "Ingrese el nombre del vocal 4" },
    { id: "coordinador", name: "INSERTAR COORDINADOR", label: "Coordinador", placeholder: "Ingrese el nombre del coordinador" },
    { id: "secretario", name: "INSERTAR SECRETARIO", label: "Secretario", placeholder: "Ingrese el nombre del secretario" },
    { id: "generoCoordinador", name: "el/la(COORDINADOR)", label: "el/la(COORDINADOR)", type: "select", options: [{ value: "El", label: "El" }, { value: "La", label: "La" }] },
    { id: "generoSecretario", name: "el/la(SECRETARIO)", label: "el/la(SECRETARIO)", type: "select", options: [{ value: "El", label: "El" }, { value: "La", label: "La" }] },
    { id: "generoVocal1", name: "el/la(VOCAL1)", label: "el/la(VOCAL1)", type: "select", options: [{ value: "El", label: "El" }, { value: "La", label: "La" }] },
    { id: "generoVocal2", name: "el/la(VOCAL2)", label: "el/la(VOCAL2)", type: "select", options: [{ value: "El", label: "El" }, { value: "La", label: "La" }] },
  ],
  5: [
    { id: "colindanciaNorte", name: "INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL NORTE", label: "Colindancias del Centro de Trabajo hacia el Norte", type: "textarea", placeholder: "Describa las colindancias hacia el norte", rows: 2 },
    { id: "colindanciaSur", name: "INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL SUR", label: "Colindancias del Centro de Trabajo hacia el Sur", type: "textarea", placeholder: "Describa las colindancias hacia el sur", rows: 2 },
    { id: "colindanciaEste", name: "INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL ESTE", label: "Colindancias del Centro de Trabajo hacia el Este", type: "textarea", placeholder: "Describa las colindancias hacia el este", rows: 2 },
    { id: "colindanciaOeste", name: "INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL OESTE", label: "Colindancias del Centro de Trabajo hacia el Oeste", type: "textarea", placeholder: "Describa las colindancias hacia el oeste", rows: 2 },
    { id: "responsableDesignado", name: "INSERTAR RESPONSABLE DE DESIGNADO", label: "Responsable Designado", placeholder: "Ingrese el nombre del responsable designado" },
    { id: "evaluador", name: "INSERTAR EVALUADOR", label: "Evaluador", placeholder: "Ingrese el nombre del evaluador" },
  ],
  6: [
    { id: "responsableDescanso", name: "INSERTAR RESPONSABLE DEL DERECHO AL DESCANSO", label: "Responsable del Derecho al Descanso", placeholder: "Ingrese el nombre del responsable" },
    { id: "jefeInmediato", name: "INSERTAR JEFE INMEDIATO", label: "Jefe Inmediato", placeholder: "Ingrese el nombre del jefe inmediato" },
    { id: "personaTrabajadora", name: "INSERTAR PERSONA TRABAJADORA", label: "Persona Trabajadora", placeholder: "Ingrese el nombre de la persona trabajadora" },
    { id: "nombreResponsableAplicacion", name: "NOMBRE DEL RESPONSABLE DE LA APLICACION", label: "Nombre del Responsable de la Aplicación", placeholder: "Ingrese el nombre del responsable" },
    { id: "responsableSeguridadSalud", name: "INSERTAR RESPONSABLE DE SEGURIDAD Y SALUD", label: "Responsable de Seguridad y Salud", placeholder: "Ingrese el nombre del responsable" },
    { id: "permisoCRE", name: "INSERTAR PERMISO CRE", label: "Permiso CRE", placeholder: "Ingrese el número de permiso CRE" },
    { id: "puesto", name: "INSERTAR PUESTO", label: "Puesto", placeholder: "Ingrese el puesto" },
  ],
  7: [
    { id: "t1", name: "T1", label: "T1", placeholder: "Ingrese información T1" },
    { id: "t2", name: "T2", label: "T2", placeholder: "Ingrese información T2" },
    { id: "t3", name: "T3", label: "T3", placeholder: "Ingrese información T3" },
    { id: "tanqueRegular", name: "TANQUE REGULAR", label: "Tanque Regular", placeholder: "Ingrese información del tanque regular" },
    { id: "tanquePremium", name: "TANQUE PREMIUM", label: "Tanque Premium", placeholder: "Ingrese información del tanque premium" },
    { id: "tanqueDiesel", name: "TANQUE DIESEL", label: "Tanque Diesel", placeholder: "Ingrese información del tanque diesel" },
    { id: "tipoCombustible1", name: "TIPO COMBUSTIBLE 1", label: "Tipo Combustible 1", placeholder: "Ingrese el tipo de combustible 1" },
    { id: "tipoCombustible2", name: "TIPO COMBUSTIBLE 2", label: "Tipo Combustible 2", placeholder: "Ingrese el tipo de combustible 2" },
    { id: "tipoCombustible3", name: "TIPO COMBUSTIBLE 3", label: "Tipo Combustible 3", placeholder: "Ingrese el tipo de combustible 3" },
    { id: "regularLitros", name: "REGULAR LITROS", label: "Regular Litros", type: "number", placeholder: "Ingrese litros de gasolina regular", step: "0.01", min: "0" },
    { id: "premiumLitros", name: "PREMIUM LITROS", label: "Premium Litros", type: "number", placeholder: "Ingrese litros de gasolina premium", step: "0.01", min: "0" },
  ],
  8: [
    { id: "dieselLitros", name: "DIESEL LITROS", label: "Diesel Litros", type: "number", placeholder: "Ingrese litros de diesel", step: "0.01", min: "0" },
    { id: "xtipoCom1", name: "XTIPOCOMLITROS1", label: "X Tipo Combustible Litros 1", type: "number", placeholder: "Ingrese litros tipo combustible 1", step: "0.01", min: "0" },
    { id: "xtipoCom2", name: "XTIPOCOMLITROS2", label: "X Tipo Combustible Litros 2", type: "number", placeholder: "Ingrese litros tipo combustible 2", step: "0.01", min: "0" },
    { id: "totalTanques", name: "TOTAL DE TANQUES", label: "Total de Tanques", type: "number", placeholder: "Ingrese el total de tanques", min: "0" },
    { id: "totalLitrosCombustible", name: "TOTAL DE LITROS DE COMBUSTIBLE", label: "Total de Litros de Combustible", type: "number", placeholder: "Ingrese el total de litros de combustible", step: "0.01", min: "0" },
    { id: "cantidadDispensarios", name: "X CANTIDAD DE DISPENSARIOS", label: "X Cantidad de Dispensarios", type: "number", placeholder: "Ingrese cantidad de dispensarios", min: "0" },
    { id: "oficinas", name: "OFICINAS", label: "Oficinas", placeholder: "Ingrese información de oficinas" },
    { id: "cantidadSuperficieM2", name: "INSERTAR CANTIDAD DE SUPERFICIE M2", label: "Insertar Cantidad de Superficie M2", type: "number", placeholder: "Ingrese la cantidad de superficie en m2", step: "0.01" },
    { id: "oficinasM2", name: "OFICINAS M2", label: "Oficinas m2", type: "number", placeholder: "Ingrese los m2 de oficinas", step: "0.01" },
  ],
  9: [
    { id: "areaM2", name: "AREA M2", label: "Área m2", type: "number", placeholder: "Ingrese los m2 del área", step: "0.01" },
    { id: "totalM2", name: "TOTAL M2", label: "Total m2", type: "number", placeholder: "Ingrese el total en m2", step: "0.01" },
    { id: "oficinasPorc", name: "OFICINAS %", label: "Oficinas %", type: "number", placeholder: "Ingrese el porcentaje de oficinas", step: "0.01", min: "0", max: "100" },
    { id: "areaPorc", name: "AREA %", label: "Área %", type: "number", placeholder: "Ingrese el porcentaje del área", step: "0.01", min: "0", max: "100" },
    { id: "manguera3R", name: "MANGUERA 3R", label: "Manguera 3R", placeholder: "Ingrese Manguera 3R" },
    { id: "xtan", name: "XTAN", label: "XTAN", placeholder: "Ingrese XTAN" },
    { id: "xtipocom1", name: "XTIPOCOM1", label: "XTIPOCOM1", placeholder: "Ingrese XTIPOCOM1" },
    { id: "xtipocom2", name: "XTIPOCOM2", label: "XTIPOCOM2", placeholder: "Ingrese XTIPOCOM2" },
  ],
  10: [
    { id: "d1", name: "D1", label: "D1", placeholder: "Ingrese información D1" },
    { id: "d2", name: "D2", label: "D2", placeholder: "Ingrese información D2" },
    { id: "d3", name: "D3", label: "D3", placeholder: "Ingrese información D3" },
    { id: "manguera1R", name: "MANGUERA 1R", label: "Manguera 1R", placeholder: "Ingrese información manguera 1R" },
    { id: "manguera2R", name: "MANGUERA 2R", label: "Manguera 2R", placeholder: "Ingrese información manguera 2R" },
    { id: "manguera1P", name: "MANGUERA 1P", label: "Manguera 1P", placeholder: "Ingrese información manguera 1P" },
    { id: "manguera2P", name: "MANGUERA 2P", label: "Manguera 2P", placeholder: "Ingrese información manguera 2P" },
    { id: "manguera3P", name: "MANGUERA 3P", label: "Manguera 3P", placeholder: "Ingrese información manguera 3P" },
    { id: "manguera1D", name: "MANGUERA 1D", label: "Manguera 1D", placeholder: "Ingrese información manguera 1D" },
    { id: "manguera2D", name: "MANGUERA 2D", label: "Manguera 2D", placeholder: "Ingrese información manguera 2D" },
    { id: "manguera3D", name: "MANGUERA 3D", label: "Manguera 3D", placeholder: "Ingrese información manguera 3D" },
  ],
}

const TOTAL_STEPS = 11

// Componente helper para renderizar un campo
const FormField: React.FC<{
  field: FieldConfig
  value: string | File | null
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSelectChange: (name: string, value: string) => void
  onLogoChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  logoPreview?: string | null
}> = ({ field, value, onChange, onSelectChange, onLogoChange, logoPreview }) => {
  const { id, name, label, type = "text", placeholder, rows, maxLength, min, max, step, accept, options } = field

  if (type === "file") {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <div className="flex items-center gap-4">
          <Input
            id={id}
            name={name}
            type="file"
            accept={accept}
            onChange={onLogoChange}
            className="flex-1"
          />
          {logoPreview && (
            <div className="w-16 h-16 border rounded-md overflow-hidden">
              <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain" />
            </div>
          )}
        </div>
      </div>
    )
  }

  if (type === "textarea") {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Textarea
          id={id}
          name={name}
          value={value as string}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
        />
      </div>
    )
  }

  if (type === "select") {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Select
          value={value as string}
          onValueChange={(val) => onSelectChange(name, val)}
        >
          <SelectTrigger id={id}>
            <SelectValue placeholder={`Seleccione ${label}`} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={name}
        type={type}
        value={value as string}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        min={min}
        max={max}
        step={step}
      />
    </div>
  )
}

export default function FormSTPS() {
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>(getInitialFormData())

  const resetForm = () => {
    setIsSubmitted(false)
    setStep(1)
    setError(null)
    setFormData(getInitialFormData())
    setLogoPreview(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleInputChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    if (id === "fechaSeccion2") {
      const [aaaa, mm, dd] = value.split("-")
      setFormData((prev) => ({ ...prev, dd, mm, aaaa }))
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }))
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
    if (step < TOTAL_STEPS) setStep(step + 1)
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

  const currentFields = FORM_SECTIONS[step] || []

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
              <Button onClick={resetForm}>Enviar Otro Formulario</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-2xl">Formulario STPS - Cliente</CardTitle>
              <CardDescription>Complete la información requerida en {TOTAL_STEPS} sección(es)</CardDescription>
            </div>
            <div className="flex-shrink-0">
              <img src="./public/logo.jpg" alt="ESERVICES Logo" className="h-16 w-auto object-contain" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex items-center justify-between relative px-4">
              {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s, index) => (
                <div key={s} className="flex flex-col items-center relative">
                  {index < TOTAL_STEPS - 1 && (
                    <div
                      className={`absolute top-5 h-0.5 transition-all duration-300 ${
                        s < step ? "bg-primary" : "bg-muted"
                      }`}
                      style={{ left: "20px", width: "calc(100% + 60px)" }}
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
                    {s === TOTAL_STEPS ? <Check className="w-5 h-5" /> : <span className="font-semibold">{s}</span>}
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
            {step < TOTAL_STEPS ? (
              <div className="space-y-4">
                {currentFields.map((field) => (
                  <FormField
                    key={field.id}
                    field={field}
                    value={formData[field.name]}
                    onChange={field.id === "fechaSeccion2" ? handleInputChangeDate : handleInputChange}
                    onSelectChange={handleSelectChange}
                    onLogoChange={handleLogoChange}
                    logoPreview={logoPreview}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
                      <Check className="w-10 h-10 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">¡Formulario Completado!</h3>
                  <p className="text-muted-foreground">
                    Has completado todas las secciones del formulario. Haz clic en el botón "Enviar" para enviar tu información.
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <Button type="button" variant="outline" onClick={handlePrevious} disabled={step === 1 || isLoading}>
                Anterior
              </Button>
              {step < TOTAL_STEPS ? (
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
