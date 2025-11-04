"use client";

import React, { useState } from "react";
import AdminLayout from "../(admin)/layout";
import BaseTable from "@/components/tables/BaseTable";
import { PencilIcon, EyeIcon, TrashBinIcon } from "@/icons";

type GastoFijo = {
  id: number;
  concepto: string;
  fecha: string;
  monto: number;
  formaPago: "Efectivo" | "Tarjeta" | "Transferencia";
  pagadoA: string;
};

const initialFijos: GastoFijo[] = [
  { id: 1, concepto: "Renta", fecha: "2025-10-28", monto: 20000, formaPago: "Efectivo", pagadoA: "Lomas Studio" },
];

const GastosFijosPage: React.FC = () => {
  const [fijos, setFijos] = useState<GastoFijo[]>(initialFijos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevoFijo, setNuevoFijo] = useState<GastoFijo>({
    id: 0,
    concepto: "",
    fecha: new Date().toLocaleDateString("es-MX"),
    monto: 0,
    formaPago: "Efectivo",
    pagadoA: "",
  });

  // Columnas Fijos
  const columnasFijos = [
    { header: "Concepto", accessor: "concepto" },
    { header: "Fecha", accessor: "fecha" },
    { header: "Monto", accessor: "monto", render: (value: number) => `$${value.toFixed(2)}` },
    { header: "Forma de Pago", accessor: "formaPago" },
    { header: "Pagado A", accessor: "pagadoA" },
    {
      header: "Acciones",
      accessor: "acciones",
      render: (_: any, row: GastoFijo) => (
        <div className="flex gap-2">
          <button className="text-brand-400"><EyeIcon className="w-5 h-5" /></button>
          <button className="text-brand-400"><PencilIcon className="w-5 h-5" /></button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => setFijos(fijos.filter(f => f.id !== row.id))}
          >
            <TrashBinIcon className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  const handleGuardarFijo = () => {
    setFijos([...fijos, { ...nuevoFijo, id: Date.now() }]);
    setNuevoFijo({ id: 0, concepto: "", fecha: new Date().toLocaleDateString("es-MX"), monto: 0, formaPago: "Efectivo", pagadoA: "" });
    setIsModalOpen(false);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-brand-400">Gastos Fijos</h1>
      </div>

      {/* Tabla Fijos */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-brand-200">Gastos Fijos</h2>
          <button
            className="flex items-center gap-2 bg-brand-400 text-white px-4 py-2 rounded hover:bg-brand-500"
            onClick={() => setIsModalOpen(true)}
          >
            Agregar Gasto Fijo
          </button>
        </div>
        <BaseTable columns={columnasFijos} data={fijos} />
      </div>

      {/* Modal Nuevo Gasto Fijo */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4">Nuevo Gasto Fijo</h2>
            <input
              type="text"
              placeholder="Concepto"
              className="border px-3 py-2 rounded w-full mb-2"
              value={nuevoFijo.concepto}
              onChange={(e) => setNuevoFijo({ ...nuevoFijo, concepto: e.target.value })}
            />
            <input
              type="date"
              className="border px-3 py-2 rounded w-full mb-2"
              value={nuevoFijo.fecha}
              onChange={(e) => setNuevoFijo({ ...nuevoFijo, fecha: e.target.value })}
            />
            <input
              type="number"
              placeholder="Monto"
              className="border px-3 py-2 rounded w-full mb-2"
              value={nuevoFijo.monto}
              onChange={(e) => setNuevoFijo({ ...nuevoFijo, monto: parseFloat(e.target.value) })}
            />
            <select
              className="border px-3 py-2 rounded w-full mb-2"
              value={nuevoFijo.formaPago}
              onChange={(e) => setNuevoFijo({ ...nuevoFijo, formaPago: e.target.value as GastoFijo["formaPago"] })}
            >
              <option>Efectivo</option>
              <option>Tarjeta</option>
              <option>Transferencia</option>
            </select>
            <input
              type="text"
              placeholder="Pagado A"
              className="border px-3 py-2 rounded w-full mb-4"
              value={nuevoFijo.pagadoA}
              onChange={(e) => setNuevoFijo({ ...nuevoFijo, pagadoA: e.target.value })}
            />
            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400" onClick={() => setIsModalOpen(false)}>Cancelar</button>
              <button className="px-4 py-2 rounded bg-brand-400 text-white hover:bg-brand-500" onClick={handleGuardarFijo}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default GastosFijosPage;
