"use client";

import React, { useState } from "react";
import AdminLayout from "../(admin)/layout";
import BaseTable from "@/components/tables/BaseTable";

type Producto = {
  id: number;
  nombre: string;
  cantidad: number;
  unidad: string;
  tipo: "Terminado" | "Insumo";
  ultimaActualizacion: string;
  stockStatus: "Suficiente" | "Bajo" | "Agotado";
};

const initialData: Producto[] = [
  {
    id: 1,
    nombre: "Coca-Cola 355ml",
    cantidad: 25,
    unidad: "Piezas",
    tipo: "Terminado",
    ultimaActualizacion: "02/nov/2025",
    stockStatus: "Suficiente",
  },
  {
    id: 2,
    nombre: "Pan Chapata",
    cantidad: 5,
    unidad: "Piezas",
    tipo: "Insumo",
    ultimaActualizacion: "02/nov/2025",
    stockStatus: "Bajo",
  },
  {
    id: 3,
    nombre: "Crema para café 500ml",
    cantidad: 0,
    unidad: "Mililitros",
    tipo: "Insumo",
    ultimaActualizacion: "01/nov/2025",
    stockStatus: "Agotado",
  },
];

const InventarioPage: React.FC = () => {
  const [productos] = useState<Producto[]>(initialData);

  const renderSemaforo = (status: Producto["stockStatus"]) => {
    const color =
      status === "Suficiente"
        ? "bg-brand-400"
        : status === "Bajo"
        ? "bg-yellow-400"
        : "bg-red-500";

    return (
      <div className="flex items-center gap-2">
        <span className={`w-3 h-3 rounded-full ${color}`}></span>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {status}
        </span>
      </div>
    );
  };

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Cantidad", accessor: "cantidad" },
    { header: "Unidad de Medida", accessor: "unidad" },
    { header: "Tipo", accessor: "tipo" },
    { header: "Última Actualización", accessor: "ultimaActualizacion" },
    {
      header: "Stock",
      accessor: "stockStatus",
      render: (_: any, row: Producto) => renderSemaforo(row.stockStatus),
    },
  ];

  return (
    <AdminLayout>
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-brand-400">Inventario</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-brand-400 text-white px-4 py-2 rounded hover:bg-brand-500 transition">
            
            Imprimir Inventario
          </button>
          <button className="flex items-center gap-2 bg-[#2e4e56] text-white px-4 py-2 rounded hover:bg-[#1e373d] transition">
           
            Lista de Compras
          </button>
        </div>
      </div>

      {/* Tabla */}
      <BaseTable columns={columns} data={productos} />
    </AdminLayout>
  );
};

export default InventarioPage;
