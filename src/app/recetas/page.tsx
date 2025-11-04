"use client";

import React, { useState } from "react";
import AdminLayout from "../(admin)/layout";
import BaseTable from "@/components/tables/BaseTable";
import PlatilloModal from "../../components/modals/PlatilloModal";
import RecetaModal from "../../components/modals/RecetaModal";
import { PencilIcon, EyeIcon, TrashBinIcon, DocsIcon } from "@/icons";

export type Platillo = {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  costo: number;
  estado: "Publico" | "En Revisión";
  descripcion: string;
  imagenes?: string[];
  receta?: any[];
};

const initialPlatillos: Platillo[] = [
  {
    id: 1,
    nombre: "Tacos al Pastor",
    categoria: "Desayunos",
    precio: 50,
    costo: 22,
    estado: "Publico",
    descripcion: "Deliciosos tacos con carne al pastor.",
    imagenes: [],
  },
];

const RecetasPage: React.FC = () => {
  const [platillos, setPlatillos] = useState<Platillo[]>(initialPlatillos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRecetaModalOpen, setIsRecetaModalOpen] = useState(false);
  const [platilloSeleccionado, setPlatilloSeleccionado] = useState<Platillo | null>(null);

  const [nuevoPlatillo, setNuevoPlatillo] = useState<Platillo>({
    id: 0,
    nombre: "",
    categoria: "Desayunos",
    precio: 0,
    costo: 0,
    estado: "En Revisión",
    descripcion: "",
    imagenes: [],
    receta: [],
  });

  // 🔹 Eliminar platillo
  const handleDelete = (id: number) => {
    if (confirm("¿Seguro que quieres eliminar este platillo?")) {
      setPlatillos(platillos.filter((p) => p.id !== id));
    }
  };

  // 🔹 Guardar nuevo platillo
  const handleSave = (platillo: Platillo) => {
    setPlatillos([...platillos, { ...platillo, id: Date.now() }]);
    setIsModalOpen(false);
    resetNuevoPlatillo();
  };

  // 🔹 Reset del formulario
  const resetNuevoPlatillo = () => {
    setNuevoPlatillo({
      id: 0,
      nombre: "",
      categoria: "Desayunos",
      precio: 0,
      costo: 0,
      estado: "En Revisión",
      descripcion: "",
      imagenes: [],
      receta: [],
    });
  };

  // 🔹 Abrir modal de receta
  const handleAbrirReceta = (platillo: Platillo) => {
    setPlatilloSeleccionado(platillo);
    setIsRecetaModalOpen(true);
  };

  // 🔹 Columnas de la tabla
  const columns = [
    { header: "ID", accessor: "id" },
    {
      header: "Platillo",
      accessor: "nombre",
      render: (value: string) => <span className="font-medium text-gray-800">{value}</span>,
    },
    { header: "Categoría", accessor: "categoria" },
    {
      header: "Precio",
      accessor: "precio",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      header: "Costo",
      accessor: "costo",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    { header: "Estado", accessor: "estado" },

    {
      header: "Acciones",
      accessor: "acciones",
      render: (_: any, row: Platillo) => {
        const tieneReceta = row.receta && row.receta.length > 0;
        return (
          <div className="flex gap-2">
            {/* 🔹 Botón Receta */}
            <button
              className={`transition ${
                tieneReceta
                  ? "text-brand-400 hover:text-brand-500"
                  : "text-gray-400 hover:text-gray-500"
              }`}
              title={tieneReceta ? "Ver / Editar Receta" : "Agregar Receta"}
              onClick={() => handleAbrirReceta(row)}
            >
              <DocsIcon className={tieneReceta ? "text-brand-400" : "text-gray-400"} />
            </button>

            {/* 🔹 Botón Ver */}
            <button title="Ver">
              <EyeIcon className="text-brand-400" />
            </button>

            {/* 🔹 Botón Editar */}
            <button title="Editar">
              <PencilIcon className="text-brand-400" />
            </button>

            {/* 🔹 Botón Eliminar */}
            <button
              className="text-red-500"
              title="Eliminar"
              onClick={() => handleDelete(row.id)}
            >
              <TrashBinIcon />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <AdminLayout>
      {/* 🔹 Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-brand-400">Recetas</h1>
        <button
          className="flex items-center gap-2 bg-[#376167] text-white px-4 py-2 rounded hover:bg-[#2e4e56] transition"
          onClick={() => setIsModalOpen(true)}
        >
          Nuevo Platillo
        </button>
      </div>

      {/* 🔹 Tabla de platillos */}
      <BaseTable columns={columns} data={platillos} />

      {/* 🔹 Modal de platillo */}
      {isModalOpen && (
        <PlatilloModal
          nuevoPlatillo={nuevoPlatillo}
          setNuevoPlatillo={setNuevoPlatillo}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {/* 🔹 Modal de receta */}
      {isRecetaModalOpen && platilloSeleccionado && (
        <RecetaModal
          platillo={platilloSeleccionado}
          onClose={() => {
            setIsRecetaModalOpen(false);
            setPlatilloSeleccionado(null);
          }}
          onSave={(receta) => {
            setPlatillos((prev) =>
              prev.map((p) =>
                p.id === platilloSeleccionado.id ? { ...p, receta } : p
              )
            );
            setIsRecetaModalOpen(false);
            setPlatilloSeleccionado(null);
          }}
        />
      )}
    </AdminLayout>
  );
};

export default RecetasPage;
