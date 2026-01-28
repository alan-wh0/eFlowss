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

import logo from "../public/logo.jpg"


interface FormData {
  // Sección 1 - Información General de la Empresa
  "INSERTAR RAZÓN SOCIAL DE LA EMPRESA": string
  "INSERTAR RFC DE LA EMPRESA": string
  "LOGO": File | null
  "IMAGEN": File | null
  "IMAGEN2": File | null
  "INSERTAR REPRESENTANTE LEGAL": string
  "INSERTAR CORREO ELECTRÓNICO": string
  "INSERTAR TELÉFONO": string
  "INSERTAR DIRECCIÓN DE LA EMPRESA": string
  "INSERTAR FECHA": string
  // Sección 2 - Empleados, Turnos y Trabajadores
  "CANTIDAD TOTAL DE TRABAJADORES": string
  "CANTIDAD DE TURNOS": string
  "TOTAL DE OPERATIVOS": string
  "TOTAL DE ADMINISTRATIVOS": string
  "FECHA DE INICIO DE OPERACIONES": string
  "dd": string
  "mm": string
  "aaaa": string
  "INSERTAR HORARIOS DE TRABAJO": string
  "INSERTAR REGISTRO PATRONAL": string
  // Sección 3 - Domicilio Fiscal y Actividad Económica
  "INSERTAR CALLE": string
  "INSERTAR COLONIA": string
  "INSERTAR CIUDAD": string
  "CODIGO POSTAL": string
  "NUM#": string
  "INSERTAR MUNICIPIO": string
  "INSERTAR ESTADO": string
  "INSERTAR LOS METROS SOBRE EL NIVEL DEL MAR DEL CENTRO DE TRABAJO": string
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
  "UNIDADES HABITACIONALES": string
  "ESTABLECIMIENTOS DE ATENCION MEDICA": string
  "CENTROS EDUCACIONALES": string
  "PARQUES NACIONALES": string
  "AREAS NATURALES PROTEGIDAS": string
  "LINEAS DE ALTA TENSION": string
  "GASODUCTOS": string
  "POZOS DE ABASTECIMIENTO": string
  "CUERPOS DE AGUA": string
  "INSERTAR RESPONSABLE DE DESIGNADO": string
  "INSERTAR EVALUADOR": string
  "INSERTAR RESPONSABLE DEL DERECHO AL DESCANSO": string
  "INSERTAR JEFE INMEDIATO": string
  "NOMBRE DEL RESPONSABLE DE LA APLICACION": string
  // Sección 6 - Responsables de Seguridad y Permisos
  "INSERTAR RESPONSABLE DE SEGURIDAD Y SALUD": string
  "INSERTAR PERMISO CRE": string
  // Sección 7 - Tanques
  "TANQUE REGULAR": string
  "TANQUE PREMIUM": string
  "TANQUE DIESEL": string
  "REGULAR LITROS": string
  "PREMIUM LITROS": string
  // Sección 8 - Litros de Combustible
  "DIESEL LITROS": string
  "EXT4": string
  "EXT4 REGULAR": string
  "REGULAR LITROS 4": string
  "EXT5": string
  "EXT5 PREMIUM": string
  "PREMIUM LITROS 5": string
  "XTIPOCOMLITROS1": string
  "XTIPOCOMLITROS2": string
  "TOTAL DE LITROS DE COMBUSTIBLE": string
  "TOTAL DE TANQUES": string
  "X CANTIDAD DE DISPENSARIOS": string
  "INSERTAR NOMBRE DEL AREA 1": string
  "INSERTAR NOMBRE DEL AREA 2": string
  "OFICINAS M2": string
  "AREA M2": string
  // Sección 9 - Superficies y Áreas
  "TOTAL M2": string
  "OFICINAS %": string
  "AREA %": string
  "INSERTAR NOMBRE DEL AREA 3": string
  "AREA 3 M2": string
  "AREA 3 %": string
  "INSERTAR NOMBRE DEL AREA 4": string
  "AREA 4 M2": string
  "AREA 4 %": string
  "INSERTAR NOMBRE DEL AREA 5": string
  "AREA 5 M2": string
  "AREA 5 %": string
  "INSERTAR NOMBRE DEL AREA 6": string
  "AREA 6 M2": string
  "AREA 6 %": string
  "INSERTAR NOMBRE DEL AREA 7": string
  "AREA 7 M2": string
  "AREA 7 %": string
  "INSERTAR NOMBRE DEL AREA 8": string
  "AREA 8 M2": string
  "AREA 8 %": string
  "INSERTAR NOMBRE DEL AREA 9": string
  "AREA 9 M2": string
  "AREA 9 %": string
  "INSERTAR NOMBRE DEL AREA 10": string
  "AREA 10 M2": string
  "AREA 10 %": string
  "INSERTAR NOMBRE DEL AREA 11": string
  "AREA 11 M2": string
  "AREA 11 %": string
  "INSERTAR NOMBRE DEL AREA 12": string
  "AREA 12 M2": string
  "AREA 12 %": string
  "INSERTAR NOMBRE DEL AREA 13": string
  "AREA 13 M2": string
  "AREA 13 %": string
  "INSERTAR NOMBRE DEL AREA 14": string
  "AREA 14 M2": string
  "AREA 14 %": string
  "MANGUERA 1R": string
  "MANGUERA 2R": string
  "MANGUERA 3R": string
  "XTIPOCOM1": string
  "XTIPOCOM2": string
  // Sección 10 - Mangueras P y D
  "MANGUERA 1P": string
  "MANGUERA 2P": string
  "MANGUERA 3P": string
  "MANGUERA 1D": string
  "MANGUERA 2D": string
  "MANGUERA 3D": string
  "DISP4": string
  "MANGUERA 4R": string
  "MANGUERA 4P": string
  "MANGUERA 4D": string
  "DISP5": string
  "MANGUERA 5R": string
  "MANGUERA 5P": string
  "MANGUERA 5D": string
  "DISP6": string
  "MANGUERA 6R": string
  "MANGUERA 6P": string
  "MANGUERA 6D": string
  "DISP7": string
  "MANGUERA 7R": string
  "MANGUERA 7P": string
  "MANGUERA 7D": string
  "DISP8": string
  "MANGUERA 8R": string
  "MANGUERA 8P": string
  "MANGUERA 8D": string
  "DISP9": string
  "MANGUERA 9R": string
  "MANGUERA 9P": string
  "MANGUERA 9D": string
  "DISP10": string
  "MANGUERA 10R": string
  "MANGUERA 10P": string
  "MANGUERA 10D": string
  "DISP11": string
  "MANGUERA 11R": string
  "MANGUERA 11P": string
  "MANGUERA 11D": string
  "DISP12": string
  "MANGUERA 12R": string
  "MANGUERA 12P": string
  "MANGUERA 12D": string
  "DISP13": string
  "MANGUERA 13R": string
  "MANGUERA 13P": string
  "MANGUERA 13D": string
  "DISP14": string
  "MANGUERA 14R": string
  "MANGUERA 14P": string
  "MANGUERA 14D": string
  "DISP15": string
  "MANGUERA 15R": string
  "MANGUERA 15P": string
  "MANGUERA 15D": string
}

type FieldConfig = {
  id: string
  name: keyof FormData | string
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
  value?: string
}

// Estado inicial centralizado - elimina duplicación
const getInitialFormData = (): FormData => {
  const initialData: FormData = {
  "INSERTAR RAZÓN SOCIAL DE LA EMPRESA": "",
  "INSERTAR RFC DE LA EMPRESA": "",
  "LOGO": null,
  "IMAGEN": null,
  "IMAGEN2": null,
  "INSERTAR REPRESENTANTE LEGAL": "",
  "INSERTAR CORREO ELECTRÓNICO": "",
  "INSERTAR TELÉFONO": "",
  "INSERTAR DIRECCIÓN DE LA EMPRESA": "",
  "INSERTAR FECHA": "",
  "CANTIDAD TOTAL DE TRABAJADORES": "",
  "CANTIDAD DE TURNOS": "",
  "TOTAL DE OPERATIVOS": "",
  "TOTAL DE ADMINISTRATIVOS": "",
  "FECHA DE INICIO DE OPERACIONES": "",
  "dd": "",
  "mm": "",
  "aaaa": "",
  "INSERTAR HORARIOS DE TRABAJO": "",
  "INSERTAR REGISTRO PATRONAL": "",
  "INSERTAR CALLE": "",
  "INSERTAR COLONIA": "",
  "INSERTAR CIUDAD": "",
  "CODIGO POSTAL": "",
  "NUM#": "",
  "INSERTAR MUNICIPIO": "",
  "INSERTAR ESTADO": "",
  "INSERTAR LOS METROS SOBRE EL NIVEL DEL MAR DEL CENTRO DE TRABAJO": "",
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
  "UNIDADES HABITACIONALES": "",
  "ESTABLECIMIENTOS DE ATENCION MEDICA": "",
  "CENTROS EDUCACIONALES": "",
  "PARQUES NACIONALES": "",
  "AREAS NATURALES PROTEGIDAS": "",
  "LINEAS DE ALTA TENSION": "",
  "GASODUCTOS": "",
  "POZOS DE ABASTECIMIENTO": "",
  "CUERPOS DE AGUA": "",
  "INSERTAR RESPONSABLE DE DESIGNADO": "",
  "INSERTAR EVALUADOR": "",
  "INSERTAR RESPONSABLE DEL DERECHO AL DESCANSO": "",
  "INSERTAR JEFE INMEDIATO": "",
  "NOMBRE DEL RESPONSABLE DE LA APLICACION": "",
  "INSERTAR RESPONSABLE DE SEGURIDAD Y SALUD": "",
  "INSERTAR PERMISO CRE": "",
  "TANQUE REGULAR": "",
  "TANQUE PREMIUM": "",
  "TANQUE DIESEL": "",
  "REGULAR LITROS": "",
  "PREMIUM LITROS": "",
  "DIESEL LITROS": "",
  "EXT4": "",
  "EXT4 REGULAR": "",
  "REGULAR LITROS 4": "",
  "EXT5": "",
  "EXT5 PREMIUM": "",
  "PREMIUM LITROS 5": "",
  "XTIPOCOMLITROS1": "",
  "XTIPOCOMLITROS2": "",
  "TOTAL DE LITROS DE COMBUSTIBLE": "",
  "TOTAL DE TANQUES": "",
  "X CANTIDAD DE DISPENSARIOS": "",
  "INSERTAR NOMBRE DEL AREA 1": "",
  "INSERTAR NOMBRE DEL AREA 2": "",
  "OFICINAS M2": "",
  "AREA M2": "",
  "TOTAL M2": "",
  "OFICINAS %": "",
  "AREA %": "",
  "INSERTAR NOMBRE DEL AREA 3": "",
  "AREA 3 M2": "",
  "AREA 3 %": "",
  "INSERTAR NOMBRE DEL AREA 4": "",
  "AREA 4 M2": "",
  "AREA 4 %": "",
  "INSERTAR NOMBRE DEL AREA 5": "",
  "AREA 5 M2": "",
  "AREA 5 %": "",
  "INSERTAR NOMBRE DEL AREA 6": "",
  "AREA 6 M2": "",
  "AREA 6 %": "",
  "INSERTAR NOMBRE DEL AREA 7": "",
  "AREA 7 M2": "",
  "AREA 7 %": "",
  "INSERTAR NOMBRE DEL AREA 8": "",
  "AREA 8 M2": "",
  "AREA 8 %": "",
  "INSERTAR NOMBRE DEL AREA 9": "",
  "AREA 9 M2": "",
  "AREA 9 %": "",
  "INSERTAR NOMBRE DEL AREA 10": "",
  "AREA 10 M2": "",
  "AREA 10 %": "",
  "INSERTAR NOMBRE DEL AREA 11": "",
  "AREA 11 M2": "",
  "AREA 11 %": "",
  "INSERTAR NOMBRE DEL AREA 12": "",
  "AREA 12 M2": "",
  "AREA 12 %": "",
  "INSERTAR NOMBRE DEL AREA 13": "",
  "AREA 13 M2": "",
  "AREA 13 %": "",
  "INSERTAR NOMBRE DEL AREA 14": "",
  "AREA 14 M2": "",
  "AREA 14 %": "",
  "MANGUERA 1R": "",
  "MANGUERA 2R": "",
  "MANGUERA 3R": "",
  "XTIPOCOM1": "",
  "XTIPOCOM2": "",
  "MANGUERA 1P": "",
  "MANGUERA 2P": "",
  "MANGUERA 3P": "",
  "MANGUERA 1D": "",
  "MANGUERA 2D": "",
  "MANGUERA 3D": "",
  "DISP4": "",
  "MANGUERA 4R": "",
  "MANGUERA 4P": "",
  "MANGUERA 4D": "",
  "DISP5": "",
  "MANGUERA 5R": "",
  "MANGUERA 5P": "",
  "MANGUERA 5D": "",
  "DISP6": "",
  "MANGUERA 6R": "",
  "MANGUERA 6P": "",
  "MANGUERA 6D": "",
  "DISP7": "",
  "MANGUERA 7R": "",
  "MANGUERA 7P": "",
  "MANGUERA 7D": "",
  "DISP8": "",
  "MANGUERA 8R": "",
  "MANGUERA 8P": "",
  "MANGUERA 8D": "",
  "DISP9": "",
  "MANGUERA 9R": "",
  "MANGUERA 9P": "",
  "MANGUERA 9D": "",
  "DISP10": "",
  "MANGUERA 10R": "",
  "MANGUERA 10P": "",
  "MANGUERA 10D": "",
  "DISP11": "",
  "MANGUERA 11R": "",
  "MANGUERA 11P": "",
  "MANGUERA 11D": "",
  "DISP12": "",
  "MANGUERA 12R": "",
  "MANGUERA 12P": "",
  "MANGUERA 12D": "",
  "DISP13": "",
  "MANGUERA 13R": "",
  "MANGUERA 13P": "",
  "MANGUERA 13D": "",
  "DISP14": "",
  "MANGUERA 14R": "",
  "MANGUERA 14P": "",
  "MANGUERA 14D": "",
  "DISP15": "",
  "MANGUERA 15R": "",
  "MANGUERA 15P": "",
  "MANGUERA 15D": "",
  }

  // Aplicar valores por defecto desde FORM_SECTIONS
  Object.values(FORM_SECTIONS).forEach(section => {
    section.forEach(field => {
      if (field.value !== undefined && field.name !== "LOGO" && field.name !== "IMAGEN" && field.name !== "IMAGEN2") {
        initialData[field.name as keyof FormData] = field.value as any
      }
    })
  })

  return initialData
}

// Configuración de campos por sección - centraliza estructura del formulario
const FORM_SECTIONS: Record<number, FieldConfig[]> = {
  1: [
    { id: "razonSocial", name: "INSERTAR RAZÓN SOCIAL DE LA EMPRESA", label: "Razón Social de la Empresa", placeholder: "Ingrese la razón social" },
    { id: "rfc", name: "INSERTAR RFC DE LA EMPRESA", label: "RFC de la Empresa", placeholder: "Ingrese el RFC de la empresa", maxLength: 20 },
    { id: "logo", name: "LOGO", label: "Logo del encabezado", type: "file", accept: "image/*" },
    { id: "imagen", name: "IMAGEN", label: "Localizacion del centro de trabajo", type: "file", accept: "image/*" },
    { id: "imagen2", name: "IMAGEN2", label: "Imagen de la portada", type: "file", accept: "image/*" },
    { id: "correoElectronico", name: "INSERTAR CORREO ELECTRÓNICO", label: "Correo Electrónico", type: "email", placeholder: "correo@ejemplo.com" },
    { id: "telefono", name: "INSERTAR TELÉFONO", label: "Teléfono", type: "tel", placeholder: "Ejemplo: +52 664 456 7890", maxLength: 20 },
    { id: "direccion", name: "INSERTAR DIRECCIÓN DE LA EMPRESA", label: "Dirección de la Empresa", type: "textarea", placeholder: "Ingrese la dirección completa", rows: 3 },
    { id: "fecha", name: "INSERTAR FECHA", label: "Fecha de Elaboración", placeholder: "Ej: 01 enero de 2025" },
  ],
  2: [
    { id: "cantidadTotalTrabajadores", name: "CANTIDAD TOTAL DE TRABAJADORES", label: "Cantidad Total de Trabajadores", type: "text", placeholder: "Ingrese la cantidad total de trabajadores" },
    { id: "totalOperativos", name: "TOTAL DE OPERATIVOS", label: "Total de Operativos", type: "number", placeholder: "Ingrese el total de operativos", min: "0" },
    { id: "totalAdministrativos", name: "TOTAL DE ADMINISTRATIVOS", label: "Total de Administrativos", type: "number", placeholder: "Ingrese el total de administrativos", min: "0" },
    { id: "cantidadTurnos", name: "CANTIDAD DE TURNOS", label: "Cantidad de Turnos", type: "number", placeholder: "Ingrese la cantidad de turnos", min: "1" },
    { id: "fechaSeccion2", name: "FECHA DE INICIO DE OPERACIONES", label: "Fecha de Inicio de Operaciones", type: "date" },
    { id: "horariosTrabajo", name: "INSERTAR HORARIOS DE TRABAJO", label: "Horarios de Trabajo", type: "textarea", placeholder: "Ej: 8:00 AM - 5:00 PM", rows: 3 },
  ],
  3: [
    { id: "calle", name: "INSERTAR CALLE", label: "Calle", placeholder: "Ingrese el nombre de la calle" },
    { id: "colonia", name: "INSERTAR COLONIA", label: "Colonia", placeholder: "Ingrese la colonia" },
    { id: "ciudad", name: "INSERTAR CIUDAD", label: "Ciudad", placeholder: "Ingrese la ciudad" },
    { id: "codigoPostal", name: "CODIGO POSTAL", label: "Código Postal", placeholder: "Ingrese el código postal", maxLength: 5 },
    { id: "numero", name: "NUM#", label: "Número de la calle de la empresa", placeholder: "Ingrese el número de la calle de la empresa" },
    { id: "municipio", name: "INSERTAR MUNICIPIO", label: "Municipio", placeholder: "Ingrese el municipio" },
    { id: "estado", name: "INSERTAR ESTADO", label: "Estado", placeholder: "Ingrese el estado" },
  ],
  4: [
    { id: "vocal1", name: "INSERTAR VOCAL 1", label: "VOCAL 1", placeholder: "Ingrese el nombre del vocal 1" },
    { id: "generoVocal1", name: "el/la(VOCAL1)", label: "el/la(VOCAL 1)", type: "select", options: [{ value: "El", label: "El" }, { value: "La", label: "La" }] },
    { id: "vocal2", name: "INSERTAR VOCAL 2", label: "VOCAL 2", placeholder: "Ingrese el nombre del vocal 2" },
    { id: "generoVocal2", name: "el/la(VOCAL2)", label: "el/la(VOCAL 2)", type: "select", options: [{ value: "El", label: "El" }, { value: "La", label: "La" }] },
    { id: "vocal3", name: "INSERTAR VOCAL 3", label: "VOCAL 3", placeholder: "Ingrese el nombre del vocal 3" },
    { id: "vocal4", name: "INSERTAR VOCAL 4", label: "VOCAL 4", placeholder: "Ingrese el nombre del vocal 4" },
    { id: "coordinador", name: "INSERTAR COORDINADOR", label: "COORDINADOR(A)", placeholder: "Ingrese el nombre del coordinador" },
    { id: "generoCoordinador", name: "el/la(COORDINADOR)", label: "el/la(COORDINADOR(A))", type: "select", options: [{ value: "El", label: "El" }, { value: "La", label: "La" }] },
    { id: "secretario", name: "INSERTAR SECRETARIO", label: "SECRETARIO(A)", placeholder: "Ingrese el nombre del secretario" },
    { id: "generoSecretario", name: "el/la(SECRETARIO)", label: "el/la(SECRETARIO(A))", type: "select", options: [{ value: "El", label: "El" }, { value: "La", label: "La" }] },
  ],
  5: [
    { id: "colindanciaNorte", name: "INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL NORTE", label: "Colindancias del Centro de Trabajo hacia el Norte", type: "textarea", placeholder: "Describa las colindancias hacia el norte", rows: 2 },
    { id: "colindanciaSur", name: "INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL SUR", label: "Colindancias del Centro de Trabajo hacia el Sur", type: "textarea", placeholder: "Describa las colindancias hacia el sur", rows: 2 },
    { id: "colindanciaEste", name: "INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL ESTE", label: "Colindancias del Centro de Trabajo hacia el Este", type: "textarea", placeholder: "Describa las colindancias hacia el este", rows: 2 },
    { id: "colindanciaOeste", name: "INSERTAR COLINDANCIAS DEL CENTRO DE TRABAJO HACIA EL OESTE", label: "Colindancias del Centro de Trabajo hacia el Oeste", type: "textarea", placeholder: "Describa las colindancias hacia el oeste", rows: 2 },
    { id: "metrosNivelMar", name: "INSERTAR LOS METROS SOBRE EL NIVEL DEL MAR DEL CENTRO DE TRABAJO", label: "Los Metros sobre el Nivel del Mar del Centro de Trabajo", type: "number", placeholder: "Ingrese los metros sobre el nivel del mar", step: "1" },
    { id: "unidadesHabitacionales", name: "UNIDADES HABITACIONALES", label: "Unidades Habitacionales", type: "select", options: [{ value: "SI", label: "SI" }, { value: "NO", label: "NO" }] },
    { id: "establecimientosAtencionMedica", name: "ESTABLECIMIENTOS DE ATENCION MEDICA", label: "Establecimientos de Atencion Medica", type: "select", options: [{ value: "SI", label: "SI" }, { value: "NO", label: "NO" }] },
    { id: "centrosEducacionales", name: "CENTROS EDUCACIONALES", label: "Centros Educacionales", type: "select", options: [{ value: "SI", label: "SI" }, { value: "NO", label: "NO" }] },
    { id: "parquesNacionales", name: "PARQUES NACIONALES", label: "Parques Nacionales", type: "select", options: [{ value: "SI", label: "SI" }, { value: "NO", label: "NO" }] },
    { id: "areasNaturalesProtegidas", name: "AREAS NATURALES PROTEGIDAS", label: "Areas Naturales Protegidas", type: "select", options: [{ value: "SI", label: "SI" }, { value: "NO", label: "NO" }] },
    { id: "lineasAltaTension", name: "LINEAS DE ALTA TENSION", label: "Lineas de Alta Tension", type: "select", options: [{ value: "SI", label: "SI" }, { value: "NO", label: "NO" }] },
    { id: "gasoductos", name: "GASODUCTOS", label: "Gasoductos", type: "select", options: [{ value: "SI", label: "SI" }, { value: "NO", label: "NO" }] },
    { id: "pozosAbastecimiento", name: "POZOS DE ABASTECIMIENTO", label: "Pozos de Abastecimiento", type: "select", options: [{ value: "SI", label: "SI" }, { value: "NO", label: "NO" }] },
    { id: "cuerposAgua", name: "CUERPOS DE AGUA", label: "Cuerpos de Agua", type: "select", options: [{ value: "SI", label: "SI" }, { value: "NO", label: "NO" }] },
  ],
  6: [
    { id: "representanteLegal", name: "INSERTAR REPRESENTANTE LEGAL", label: "Representante Legal", placeholder: "Ingrese el nombre del representante legal" },
    { id: "registroPatronal", name: "INSERTAR REGISTRO PATRONAL", label: "Registro Patronal", placeholder: "Ingrese el registro patronal" },
    { id: "responsableDescanso", name: "INSERTAR RESPONSABLE DEL DERECHO AL DESCANSO", label: "Responsable del Derecho al Descanso", placeholder: "Ingrese el nombre del responsable del derecho al descanso" },
    { id: "nombreResponsableAplicacion", name: "NOMBRE DEL RESPONSABLE DE LA APLICACION", label: "Nombre del Responsable de la Aplicación", placeholder: "Ingrese el nombre del responsable de la aplicacion" },
    { id: "responsableSeguridadSalud", name: "INSERTAR RESPONSABLE DE SEGURIDAD Y SALUD", label: "Responsable de Seguridad y Salud", placeholder: "Ingrese el nombre del responsable de seguridad y salud" },
    { id: "permisoCRE", name: "INSERTAR PERMISO CRE", label: "Permiso CRE", placeholder: "Ingrese el permiso CRE" },
  ],
  7: [
    { id: "totalTanques", name: "TOTAL DE TANQUES", label: "Total de Tanques", type: "number", placeholder: "Ingrese el total de tanques", min: "0" },
    { id: "totalDispensarios", name: "X CANTIDAD DE DISPENSARIOS", label: "Total de Dispensarios", type: "number", placeholder: "Ingrese el total de dispensarios", min: "0" },
    { id: "totalLitrosCombustible", name: "TOTAL DE LITROS DE COMBUSTIBLE", label: "Total de Litros de Combustible", type: "number", placeholder: "Ingrese el total de litros de combustible", step: "1", min: "0" },
    { id: "tanqueRegular", name: "TANQUE REGULAR", label: "Tipo de combustible que almacena el tanque 1", placeholder: "Ingrese el tipo de combustible del tanque 1 ejemplo: regular" },
    { id: "regularLitros", name: "REGULAR LITROS", label: "Cantidad de Litros almacenados del tanque 1", type: "number", placeholder: "Ingrese la cantidad de litros del tanque 1", step: "1", min: "0" },
    { id: "tanquePremium", name: "TANQUE PREMIUM", label: "Tipo de combustible que almacena el tanque 2", placeholder: "Ingrese el tipo de combustible del tanque 2 ejemplo: premium" },
    { id: "premiumLitros", name: "PREMIUM LITROS", label: "Cantidad de Litros almacenados del tanque 2", type: "number", placeholder: "Ingrese la cantidad de litros del tanque 2", step: "1", min: "0" },
    { id: "tanqueDiesel", name: "TANQUE DIESEL", label: "Tipo de combustible que almacena el tanque 3", placeholder: "Ingrese el tipo de combustible del tanque 3 ejemplo: diesel" },
    { id: "dieselLitros", name: "DIESEL LITROS", label: "Cantidad de Litros almacenados del tanque 3", type: "number", placeholder: "Ingrese la cantidad de litros del tanque 3", step: "1", min: "0" },
    { id: "headingTanques45", name: "heading", label: "En caso de que exista un 4TO y 5TO tanque, rellenar los datos.", type: "heading" },
    { id: "ext4", name: "EXT4", label: "Tanque 4 (Si es que existe)", placeholder: "Ingresar solo el numero del tanque (4)" },
    { id: "ext4Regular", name: "EXT4 REGULAR", label: "Tipo de combustible que almacena el tanque 4", placeholder: "Ingrese el tipo de combustible del tanque 4 ejemplo: regular" },
    { id: "regularLitros4", name: "REGULAR LITROS 4", label: "Cantidad de Litros almacenados del tanque 4", type: "number", placeholder: "Ingrese la cantidad de litros del tanque 4", step: "1", min: "0" },
    { id: "ext5", name: "EXT5", label: "Tanque 5 (Si es que existe)", placeholder: "Ingresar solo el numero del tanque (5)" },
    { id: "ext5Premium", name: "EXT5 PREMIUM", label: "Tipo de combustible que almacena el tanque 5", placeholder: "Ingrese el tipo de combustible del tanque 5 ejemplo: premium" },
    { id: "premiumLitros5", name: "PREMIUM LITROS 5", label: "Cantidad de Litros almacenados del tanque 5", type: "number", placeholder: "Ingrese la cantidad de litros del tanque 5", step: "1", min: "0" },
  ],
  8: [
    { id: "xtipocom1", name: "XTIPOCOM1", label: "Tipo de combustible si es Bipartido 1", placeholder: "Ingrese el tipo de combustible si es el tanque es bipartido 1" },
    { id: "xtipoCom1", name: "XTIPOCOMLITROS1", label: "Cantidad de Combustible almacenado del tanque Bipartido 1", type: "number", placeholder: "Ingrese la cantidad de litros del tipo de combustible bipartido 1", step: "1", min: "0" },
    { id: "xtipocom2", name: "XTIPOCOM2", label: "Tipo de combustible si es Bipartido 2", placeholder: "Ingrese el tipo de combustible si es el tanque es bipartido 2" },
    { id: "xtipoCom2", name: "XTIPOCOMLITROS2", label: "Cantidad de Combustible almacenado del tanque Bipartido 2", type: "number", placeholder: "Ingrese la cantidad de litros del tipo de combustible bipartido 2", step: "1", min: "0" },
  ],
  9: [
    { id: "manguera1R", name: "MANGUERA 1R", label: "Manguera  Regular 1", placeholder: "Ingrese información manguera regular 1" },
    { id: "manguera1P", name: "MANGUERA 1P", label: "Manguera  Premium 1", placeholder: "Ingrese información manguera premium 1" },
    { id: "manguera1D", name: "MANGUERA 1D", label: "Manguera  Diesel 1", placeholder: "Ingrese información manguera diesel 1" },
    { id: "manguera2R", name: "MANGUERA 2R", label: "Manguera  Regular 2", placeholder: "Ingrese información manguera regular 2" },
    { id: "manguera2P", name: "MANGUERA 2P", label: "Manguera  Premium 2", placeholder: "Ingrese información manguera premium 2" },
    { id: "manguera2D", name: "MANGUERA 2D", label: "Manguera  Diesel 2", placeholder: "Ingrese información manguera diesel 2" },
    { id: "manguera3R", name: "MANGUERA 3R", label: "Manguera  Regular 3", placeholder: "Ingrese información manguera regular 3" },
    { id: "manguera3P", name: "MANGUERA 3P", label: "Manguera  Premium 3", placeholder: "Ingrese información manguera premium 3" },
    { id: "manguera3D", name: "MANGUERA 3D", label: "Manguera  Diesel 3", placeholder: "Ingrese información manguera diesel 3" },
    { id: "headingDisp4", name: "heading", label: "En caso de que existan más dispensarios, rellenar los datos.", type: "heading" },
    { id: "disp4", name: "DISP4", label: "Dispensario 4", type: "text", placeholder: "Ingresar solo el numero del dispensario (4)", maxLength: 1 },
    { id: "manguera4R", name: "MANGUERA 4R", label: "Manguera  Regular 4", placeholder: "Ingrese información manguera regular 4" },
    { id: "manguera4P", name: "MANGUERA 4P", label: "Manguera  Premium 4", placeholder: "Ingrese información manguera premium 4" },
    { id: "manguera4D", name: "MANGUERA 4D", label: "Manguera  Diesel 4", placeholder: "Ingrese información manguera diesel 4" },
    { id: "disp5", name: "DISP5", label: "Dispensario 5", type: "text", placeholder: "Ingresar solo el numero del dispensario (5)", maxLength: 1 },
    { id: "manguera5R", name: "MANGUERA 5R", label: "Manguera  Regular 5", placeholder: "Ingrese información manguera regular 5" },
    { id: "manguera5P", name: "MANGUERA 5P", label: "Manguera  Premium 5", placeholder: "Ingrese información manguera premium 5" },
    { id: "manguera5D", name: "MANGUERA 5D", label: "Manguera  Diesel 5", placeholder: "Ingrese información manguera diesel 5" },
    { id: "disp6", name: "DISP6", label: "Dispensario 6", type: "text", placeholder: "Ingresar solo el numero del dispensario (6)", maxLength: 1 },
    { id: "manguera6R", name: "MANGUERA 6R", label: "Manguera  Regular 6", placeholder: "Ingrese información manguera regular 6" },
    { id: "manguera6P", name: "MANGUERA 6P", label: "Manguera  Premium 6", placeholder: "Ingrese información manguera premium 6" },
    { id: "manguera6D", name: "MANGUERA 6D", label: "Manguera  Diesel 6", placeholder: "Ingrese información manguera diesel 6" },
    { id: "disp7", name: "DISP7", label: "Dispensario 7", type: "text", placeholder: "Ingresar solo el numero del dispensario (7)", maxLength: 1 },
    { id: "manguera7R", name: "MANGUERA 7R", label: "Manguera  Regular 7", placeholder: "Ingrese información manguera regular 7" },
    { id: "manguera7P", name: "MANGUERA 7P", label: "Manguera  Premium 7", placeholder: "Ingrese información manguera premium 7" },
    { id: "manguera7D", name: "MANGUERA 7D", label: "Manguera  Diesel 7", placeholder: "Ingrese información manguera diesel 7" },
    { id: "disp8", name: "DISP8", label: "Dispensario 8", type: "text", placeholder: "Ingresar solo el numero del dispensario (8)", maxLength: 1 },
    { id: "manguera8R", name: "MANGUERA 8R", label: "Manguera  Regular 8", placeholder: "Ingrese información manguera regular 8" },
    { id: "manguera8P", name: "MANGUERA 8P", label: "Manguera  Premium 8", placeholder: "Ingrese información manguera premium 8" },
    { id: "manguera8D", name: "MANGUERA 8D", label: "Manguera  Diesel 8", placeholder: "Ingrese información manguera diesel 8" },
  ],
  10: [
    { id: "disp9", name: "DISP9", label: "Dispensario 9", type: "text", placeholder: "Ingresar solo el numero del dispensario (9)", maxLength: 1 },
    { id: "manguera9R", name: "MANGUERA 9R", label: "Manguera  Regular 9", placeholder: "Ingrese información manguera regular 9" },
    { id: "manguera9P", name: "MANGUERA 9P", label: "Manguera  Premium 9", placeholder: "Ingrese información manguera premium 9" },
    { id: "manguera9D", name: "MANGUERA 9D", label: "Manguera  Diesel 9", placeholder: "Ingrese información manguera diesel 9" },
    { id: "disp10", name: "DISP10", label: "Dispensario 10", type: "text", placeholder: "Ingresar solo el numero del dispensario (10)", maxLength: 2 },
    { id: "manguera10R", name: "MANGUERA 10R", label: "Manguera  Regular 10", placeholder: "Ingrese información manguera regular 10" },
    { id: "manguera10P", name: "MANGUERA 10P", label: "Manguera  Premium 10", placeholder: "Ingrese información manguera premium 10" },
    { id: "manguera10D", name: "MANGUERA 10D", label: "Manguera  Diesel 10", placeholder: "Ingrese información manguera diesel 10" },
    { id: "disp11", name: "DISP11", label: "Dispensario 11", type: "text", placeholder: "Ingresar solo el numero del dispensario (11)", maxLength: 2 },
    { id: "manguera11R", name: "MANGUERA 11R", label: "Manguera  Regular 11", placeholder: "Ingrese información manguera regular 11" },
    { id: "manguera11P", name: "MANGUERA 11P", label: "Manguera  Premium 11", placeholder: "Ingrese información manguera premium 11" },
    { id: "manguera11D", name: "MANGUERA 11D", label: "Manguera  Diesel 11", placeholder: "Ingrese información manguera diesel 11" },
    { id: "disp12", name: "DISP12", label: "Dispensario 12", type: "text", placeholder: "Ingresar solo el numero del dispensario (12)", maxLength: 2 },
    { id: "manguera12R", name: "MANGUERA 12R", label: "Manguera  Regular 12", placeholder: "Ingrese información manguera regular 12" },
    { id: "manguera12P", name: "MANGUERA 12P", label: "Manguera  Premium 12", placeholder: "Ingrese información manguera premium 12" },
    { id: "manguera12D", name: "MANGUERA 12D", label: "Manguera  Diesel 12", placeholder: "Ingrese información manguera diesel 12" },
    { id: "disp13", name: "DISP13", label: "Dispensario 13", type: "text", placeholder: "Ingresar solo el numero del dispensario (13)", maxLength: 2 },
    { id: "manguera13R", name: "MANGUERA 13R", label: "Manguera  Regular 13", placeholder: "Ingrese información manguera regular 13" },
    { id: "manguera13P", name: "MANGUERA 13P", label: "Manguera  Premium 13", placeholder: "Ingrese información manguera premium 13" },
    { id: "manguera13D", name: "MANGUERA 13D", label: "Manguera  Diesel 13", placeholder: "Ingrese información manguera diesel 13" },
    { id: "disp14", name: "DISP14", label: "Dispensario 14", type: "text", placeholder: "Ingresar solo el numero del dispensario (14)", maxLength: 2 },
    { id: "manguera14R", name: "MANGUERA 14R", label: "Manguera  Regular 14", placeholder: "Ingrese información manguera regular 14" },
    { id: "manguera14P", name: "MANGUERA 14P", label: "Manguera  Premium 14", placeholder: "Ingrese información manguera premium 14" },
    { id: "manguera14D", name: "MANGUERA 14D", label: "Manguera  Diesel 14", placeholder: "Ingrese información manguera diesel 14" },
    { id: "disp15", name: "DISP15", label: "Dispensario 15", type: "text", placeholder: "Ingresar solo el numero del dispensario (15)", maxLength: 2 },
    { id: "manguera15R", name: "MANGUERA 15R", label: "Manguera  Regular 15", placeholder: "Ingrese información manguera regular 15" },
    { id: "manguera15P", name: "MANGUERA 15P", label: "Manguera  Premium 15", placeholder: "Ingrese información manguera premium 15" },
    { id: "manguera15D", name: "MANGUERA 15D", label: "Manguera  Diesel 15", placeholder: "Ingrese información manguera diesel 15" },
  ],
  11: [
    { id: "oficinas", name: "INSERTAR NOMBRE DEL AREA 1", label: "Nombre de Area 1", placeholder: "Ingrese información de oficina(s)" },
    { id: "oficinasM2", name: "OFICINAS M2", label: "Superficie del área 1 en m2", type: "number", placeholder: "Ingrese los m2 de oficinas", step: "1" },
    { id: "oficinasPorc", name: "OFICINAS %", label: "Superficie del área 1 en porcentaje (%)", type: "number", placeholder: "Ingrese el porcentaje de oficinas", step: "1", min: "0", max: "100" },
    { id: "oficinas2", name: "INSERTAR NOMBRE DEL AREA 2", label: "Nombre de Area 2", placeholder: "Ingrese información de área 2" },
    { id: "areaM2", name: "AREA M2", label: "Superficie del área 2 en m2", type: "number", placeholder: "Ingrese los m2 del área", step: "1" },
    { id: "areaPorc", name: "AREA %", label: "Superficie del área 2 en porcentaje (%)", type: "number", placeholder: "Ingrese el porcentaje del área", step: "1", min: "0", max: "100" },
    { id: "area3", name: "INSERTAR NOMBRE DEL AREA 3", label: "Nombre de Area 3", placeholder: "Ingrese información de área 3" },
    { id: "area3M2", name: "AREA 3 M2", label: "Superficie del área 3 en m2", type: "number", placeholder: "Ingrese los m2 del área 3", step: "1" },
    { id: "area3Porc", name: "AREA 3 %", label: "Superficie del área 3 en porcentaje (%)", type: "number", placeholder: "Ingrese el porcentaje del área 3", step: "1", min: "0", max: "100" },
    { id: "area4", name: "INSERTAR NOMBRE DEL AREA 4", label: "Nombre de Area 4", placeholder: "Ingrese información de área 4" },
    { id: "area4M2", name: "AREA 4 M2", label: "Superficie del área 4 en m2", type: "number", placeholder: "Ingrese los m2 del área 4", step: "1" },
    { id: "area4Porc", name: "AREA 4 %", label: "Superficie del área 4 en porcentaje (%)", type: "number", placeholder: "Ingrese el porcentaje del área 4", step: "1", min: "0", max: "100" },
    { id: "area5", name: "INSERTAR NOMBRE DEL AREA 5", label: "Nombre de Area 5", placeholder: "Ingrese información de área 5" },
    { id: "area5M2", name: "AREA 5 M2", label: "Superficie del área 5 en m2", type: "number", placeholder: "Ingrese los m2 del área 5", step: "1" },
    { id: "area5Porc", name: "AREA 5 %", label: "Superficie del área 5 en porcentaje (%)", type: "number", placeholder: "Ingrese el porcentaje del área 5", step: "1", min: "0", max: "100" },
    { id: "area6", name: "INSERTAR NOMBRE DEL AREA 6", label: "Nombre de Area 6", placeholder: "Ingrese información de área 6" },
    { id: "area6M2", name: "AREA 6 M2", label: "Superficie del área 6 en m2", type: "number", placeholder: "Ingrese los m2 del área 6", step: "1" },
    { id: "area6Porc", name: "AREA 6 %", label: "Superficie del área 6 en porcentaje (%)", type: "number", placeholder: "Ingrese el porcentaje del área 6", step: "1", min: "0", max: "100" },
    { id: "area7", name: "INSERTAR NOMBRE DEL AREA 7", label: "Nombre de Area 7", placeholder: "Ingrese información de área 7" },
    { id: "area7M2", name: "AREA 7 M2", label: "Superficie del área 7 en m2", type: "number", placeholder: "Ingrese los m2 del área 7", step: "1" },
    { id: "area7Porc", name: "AREA 7 %", label: "Superficie del área 7 en porcentaje (%)", type: "number", placeholder: "Ingrese el porcentaje del área 7", step: "1", min: "0", max: "100" },
    { id: "area8", name: "INSERTAR NOMBRE DEL AREA 8", label: "Nombre de Area 8", placeholder: "Ingrese información de área 8" },
    { id: "area8M2", name: "AREA 8 M2", label: "Superficie del área 8 en m2", type: "number", placeholder: "Ingrese los m2 del área 8", step: "1" },
    { id: "area8Porc", name: "AREA 8 %", label: "Superficie del área 8 en porcentaje (%)", type: "number", placeholder: "Ingrese el porcentaje del área 8", step: "1", min: "0", max: "100" },
  ],
  12: [
    { id: "area9", name: "INSERTAR NOMBRE DEL AREA 9", label: "Nombre de Area 9", placeholder: "Ingrese información de área 9" },
    { id: "area9M2", name: "AREA 9 M2", label: "Superficie del área 9 en m2", type: "number", placeholder: "Ingrese los m2 del área 9", step: "1" },
    { id: "area9Porc", name: "AREA 9 %", label: "Superficie del área 9 en porcentaje (%)", type: "number", placeholder: "Ingrese el porcentaje del área 9", step: "1", min: "0", max: "100" },
    { id: "area10", name: "INSERTAR NOMBRE DEL AREA 10", label: "Nombre de Area 10", placeholder: "Ingrese información de área 10" },
    { id: "area10M2", name: "AREA 10 M2", label: "Superficie del área 10 en m2", type: "number", placeholder: "Ingrese los m2 del área 10", step: "1" },
    { id: "area10Porc", name: "AREA 10 %", label: "Superficie del área 10 en porcentaje (%)", type: "number", placeholder: "Ingrese el porcentaje del área 10", step: "1", min: "0", max: "100" },
    { id: "area11", name: "INSERTAR NOMBRE DEL AREA 11", label: "Nombre de Area 11", placeholder: "Ingrese información de área 11" },
    { id: "area11M2", name: "AREA 11 M2", label: "Superficie del área 11 en m2", type: "number", placeholder: "Ingrese los m2 del área 11", step: "1" },
    { id: "area11Porc", name: "AREA 11 %", label: "Superficie del área 11 en porcentaje (%)", type: "number", placeholder: "Ingrese el porcentaje del área 11", step: "1", min: "0", max: "100" },
    { id: "area12", name: "INSERTAR NOMBRE DEL AREA 12", label: "Nombre de Area 12", placeholder: "Ingrese información de área 12" },
    { id: "area12M2", name: "AREA 12 M2", label: "Superficie del área 12 en m2", type: "number", placeholder: "Ingrese los m2 del área 12", step: "1" },
    { id: "area12Porc", name: "AREA 12 %", label: "Superficie del área 12 en porcentaje (%)", type: "number", placeholder: "Ingrese el porcentaje del área 12", step: "1", min: "0", max: "100" },
    { id: "area13", name: "INSERTAR NOMBRE DEL AREA 13", label: "Nombre de Area 13", placeholder: "Ingrese información de área 13" },
    { id: "area13M2", name: "AREA 13 M2", label: "Superficie del área 13 en m2", type: "number", placeholder: "Ingrese los m2 del área 13", step: "1" },
    { id: "area13Porc", name: "AREA 13 %", label: "Superficie del área 13 en porcentaje (%)", type: "number", placeholder: "Ingrese el porcentaje del área 13", step: "1", min: "0", max: "100" },
    { id: "area14", name: "INSERTAR NOMBRE DEL AREA 14", label: "Nombre de Area 14", placeholder: "Ingrese información de área 14" },
    { id: "area14M2", name: "AREA 14 M2", label: "Superficie del área 14 en m2", type: "number", placeholder: "Ingrese los m2 del área 14", step: "1" },
    { id: "area14Porc", name: "AREA 14 %", label: "Superficie del área 14 en porcentaje (%)", type: "number", placeholder: "Ingrese el porcentaje del área 14", step: "1", min: "0", max: "100" },
    { id: "totalM2", name: "TOTAL M2", label: "Total de m2", type: "number", placeholder: "Ingrese el total en m2", step: "0.01" },
  ],
}

const TOTAL_STEPS = 13

// Componente helper para renderizar un campo
const FormField: React.FC<{
  field: FieldConfig
  value: string | File | null
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSelectChange: (name: string, value: string) => void
  onLogoChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onImagenChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onImagen2Change?: (e: React.ChangeEvent<HTMLInputElement>) => void
  logoPreview?: string | null
  imagenPreview?: string | null
  imagen2Preview?: string | null
}> = ({ field, value, onChange, onSelectChange, onLogoChange, onImagenChange, onImagen2Change, logoPreview, imagenPreview, imagen2Preview }) => {
  const { id, name, label, type = "text", placeholder, rows, maxLength, min, max, step, accept, options } = field

  if (type === "heading") {
    return (
      <div className="pt-4 pb-2">
        <h3 className="text-lg font-semibold text-foreground">{label}</h3>
      </div>
    )
  }

  if (type === "file") {
    const isLogoField = name === "LOGO"
    const isImagenField = name === "IMAGEN"
    
    const currentHandler = isLogoField ? onLogoChange : isImagenField ? onImagenChange : onImagen2Change
    const currentPreview = isLogoField ? logoPreview : isImagenField ? imagenPreview : imagen2Preview
    
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <div className="flex items-center gap-4">
          <Input
            id={id}
            name={name}
            type="file"
            accept={accept}
            onChange={currentHandler}
            className="flex-1"
          />
          {currentPreview && (
            <div className="w-16 h-16 border rounded-md overflow-hidden">
              <img src={currentPreview} alt={`${label} preview`} className="w-full h-full object-contain" />
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
  const [imagenPreview, setImagenPreview] = useState<string | null>(null)
  const [imagen2Preview, setImagen2Preview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [_error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>(getInitialFormData())

  const resetForm = () => {
    setIsSubmitted(false)
    setStep(1)
    setError(null)
    setFormData(getInitialFormData())
    setLogoPreview(null)
    setImagenPreview(null)
    setImagen2Preview(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Validación especial para cantidad de trabajadores
    if (name === "CANTIDAD TOTAL DE TRABAJADORES") {
      // Solo permitir números, filtrar letras y signos
      const numericValue = value.replace(/[^0-9]/g, '')
      
      // Si el valor es vacío, permitirlo (para poder borrar)
      if (numericValue === '') {
        setFormData((prev) => ({ ...prev, [name]: '' }))
        return
      }
      
      // Convertir a número
      let finalValue = parseInt(numericValue, 10)
      
      // Si es 0, convertirlo a 1
      if (finalValue === 0) {
        finalValue = 1
      }
      
      // Respetar el máximo de 120
      if (finalValue > 120) {
        finalValue = 120
      }
      
      setFormData((prev) => ({ ...prev, [name]: finalValue.toString() }))
      return
    }
    
    // Validación para campos de dispensarios (DISP4-DISP15)
    if (name.startsWith("DISP") && /^DISP\d+$/.test(name)) {
      const fieldNumber = parseInt(name.replace("DISP", ""), 10)
      
      // Para DISP4-DISP9: solo permitir el número correspondiente
      if (fieldNumber >= 4 && fieldNumber <= 9) {
        const expectedNumber = fieldNumber.toString()
        if (value === expectedNumber || value === '') {
          setFormData((prev) => ({ ...prev, [name]: value }))
        }
        return
      }
      
      // Para DISP10-DISP15: permitir cualquier número (hasta 2 dígitos)
      if (fieldNumber >= 10 && fieldNumber <= 15) {
        const numericValue = value.replace(/[^0-9]/g, '')
        setFormData((prev) => ({ ...prev, [name]: numericValue }))
        return
      }
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleInputChangeDate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "FECHA DE INICIO DE OPERACIONES") {
      const [aaaa, mm, dd] = value.split("-")
      setFormData((prev) => ({ ...prev, [name]: value, dd, mm, aaaa }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
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

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, IMAGEN: file }))
      setImagenPreview(URL.createObjectURL(file))
    }
  }

  const handleImagen2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, IMAGEN2: file }))
      setImagen2Preview(URL.createObjectURL(file))
    }
  }

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const submitData: Record<string, any> = {}
      const images: Array<{ key: string; image: string; mimeType: string }> = []
      
    for (const [key, value] of Object.entries(formData)) {
  if (key === "LOGO" && value instanceof File) {
    const base64Full = await fileToBase64(value)
    const base64Match = base64Full.match(/^data:(.+);base64,(.+)$/)
    if (base64Match) {
      const mimeType = base64Match[1]
      const base64Only = base64Match[2]
      images.push({
        key: "[LOGO]",
        image: base64Only,
        mimeType: mimeType
      })
    }
  } 
  // ✅ AGREGAR ESTE BLOQUE PARA LA SEGUNDA IMAGEN
  else if (key === "IMAGEN" && value instanceof File) {
    const base64Full = await fileToBase64(value)
    const base64Match = base64Full.match(/^data:(.+);base64,(.+)$/)
    if (base64Match) {
      const mimeType = base64Match[1]
      const base64Only = base64Match[2]
      images.push({
        key: "[IMAGEN]",
        image: base64Only,
        mimeType: mimeType
      })
    }
  }
  else if (key === "IMAGEN2" && value instanceof File) {
    const base64Full = await fileToBase64(value)
    const base64Match = base64Full.match(/^data:(.+);base64,(.+)$/)
    if (base64Match) {
      const mimeType = base64Match[1]
      const base64Only = base64Match[2]
      images.push({
        key: "[IMAGEN2]",
        image: base64Only,
        mimeType: mimeType
      })
    }
  }
  else if (value !== null) {
    submitData[key] = String(value)
  }
}
      submitData.images = images

      // En producción usa la URL directa de N8N, en desarrollo usa el proxy
      const apiUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || "/api/imagenes"
    
      // Aqui se hace la peticion
      await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      }).catch(() => {});

      console.log(submitData)

      setIsLoading(false)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error al procesar el formulario:", error)
      setError("Error al procesar la imagen")
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
              <h2 className="text-2xl font-bold text-foreground">Formulario Completado</h2>
              <p className="text-muted-foreground">
                Revisa las carpetas con la informacion reemplazada.
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Editar Formulario
                </Button>
                <Button onClick={resetForm}>Enviar Otro Formulario</Button>
              </div>
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
              <CardTitle className="text-2xl">Formulario STPS - Clientes {new Date().getFullYear()}</CardTitle>
              <CardDescription>Complete la información requerida en {TOTAL_STEPS} sección(es)</CardDescription>
            </div>
            <div className="flex-shrink-0">
              <img src={logo} alt="ESERVICES Logo" className="h-16 w-auto object-contain" />
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

          <form onSubmit={handleSubmit}>
            {step < TOTAL_STEPS ? (
              <div className="space-y-4">
                {currentFields.map((field) => (
                  <FormField
                    key={field.id}
                    field={field}
                    value={formData[field.name as keyof FormData]}
                    onChange={field.type === "date" ? handleInputChangeDate : handleInputChange}
                    onSelectChange={handleSelectChange}
                    onLogoChange={handleLogoChange}
                    onImagenChange={handleImagenChange}
                    onImagen2Change={handleImagen2Change}
                    logoPreview={logoPreview}
                    imagenPreview={imagenPreview}
                    imagen2Preview={imagen2Preview}
                  />
                ))}
              </div>
            ) : (
              <div>
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
                      <Check className="w-10 h-10 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">¡Formulario Completado!</h3>
                  <p className="text-muted-foreground">
                    Espere un momento en lo que se llenan los datos.
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
              <Button type="button" variant="outline" onClick={handlePrevious} disabled={step === 1 || isLoading} className="w-full sm:w-auto">
                Anterior
              </Button>
              <div className="flex items-center gap-2 flex-wrap justify-center">
                {Array.from({ length: TOTAL_STEPS - 1 }, (_, i) => i + 1).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStep(s)}
                    disabled={isLoading}
                    className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium transition-all ${
                      s === step
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {step < TOTAL_STEPS ? (
                <Button type="button" onClick={handleNext} disabled={isLoading} className="w-full sm:w-auto">
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
