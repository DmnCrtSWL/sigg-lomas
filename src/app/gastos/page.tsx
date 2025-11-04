"use client";

import React, { useState } from "react";
import AdminLayout from "../(admin)/layout";
import BaseTable from "@/components/tables/BaseTable";
import { PencilIcon, EyeIcon, TrashBinIcon, PlusIcon, DocsIcon } from "@/icons";

type Compra = {
  id: number;
  ticket: string;
  proveedor: string;
  total: number;
  formaPago: "Efectivo" | "Tarjeta" | "Transferencia";
  fecha: string;
};

type GastoFijo = {
  id: number;
  concepto: string;
  fecha: string;
  monto: number;
  formaPago: "Efectivo" | "Tarjeta" | "Transferencia";
  pagadoA: string;
};

const initialCompras: Compra[] = [
  { id: 1, ticket: "TCK123", proveedor: "Proveedor A", total: 3650, formaPago: "Efectivo", fecha: "2025-11-01" },
];

const initialFijos: GastoFijo[] = [
  { id: 1, concepto: "Renta", fecha: "2025-10-28", monto: 20000, formaPago: "Efectivo", pagadoA: "Lomas Studio" },
];

const GastosPage: React.FC = () => {
  const [compras, setCompras] = useState<Compra[]>(initialCompras);
  const [fijos, setFijos] = useState<GastoFijo[]>(initialFijos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"compra" | "fijo">("compra");

  const [nuevoCompra, setNuevoCompra] = useState<Compra>({
    id: 0,
    ticket: "",
    proveedor: "",
    total: 0,
    formaPago: "Efectivo",
    fecha: new Date().toLocaleDateString("es-MX"),
  });

  const [nuevoFijo, setNuevoFijo] = useState<GastoFijo>({
    id: 0,
    concepto: "",
    fecha: new Date().toLocaleDateString("es-MX"),
    monto: 0,
    formaPago: "Efectivo",
    pagadoA: "",
  });

  // Columnas Compras
  const columnasCompras = [
    { header: "# Ticket", accessor: "ticket" },
    { header: "Proveedor", accessor: "proveedor" },
    { header: "Total Ticket", accessor: "total", render: (value: number) => `$${value.toFixed(2)}` },
    { header: "Forma de Pago", accessor: "formaPago" },
    { header: "Fecha de Compra", accessor: "fecha" },
    {
      header: "Acciones",
      accessor: "acciones",
      render: (_: any, row: Compra) => (
        <div className="flex gap-2">
          <button className="text-brand-400"><DocsIcon /></button>
          <button className="text-brand-400"><EyeIcon className="w-5 h-5" /></button>
          <button className="text-brand-400"><PencilIcon className="w-5 h-5" /></button>
          <button className="text-red-500 hover:text-red-700" onClick={() => setCompras(compras.filter(c => c.id !== row.id))}>
            <TrashBinIcon className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

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
          <button className=" text-brand-400"><EyeIcon className="w-5 h-5" /></button>
          <button className=" text-brand-400"><PencilIcon className="w-5 h-5 " /></button>
          <button className="text-red-500 hover:text-red-700" onClick={() => setFijos(fijos.filter(f => f.id !== row.id))}>
            <TrashBinIcon className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  const handleGuardarCompra = () => {
    setCompras([...compras, { ...nuevoCompra, id: Date.now() }]);
    setNuevoCompra({ id: 0, ticket: "", proveedor: "", total: 0, formaPago: "Efectivo", fecha: new Date().toLocaleDateString("es-MX") });
    setIsModalOpen(false);
  };

  const handleGuardarFijo = () => {
    setFijos([...fijos, { ...nuevoFijo, id: Date.now() }]);
    setNuevoFijo({ id: 0, concepto: "", fecha: new Date().toLocaleDateString("es-MX"), monto: 0, formaPago: "Efectivo", pagadoA: "" });
    setIsModalOpen(false);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-brand-400">Gastos</h1>
      </div>

      {/* Tabla Compras */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-brand-200">Compras</h2>
          <button
            className="flex items-center gap-2 bg-brand-400 text-white px-4 py-2 rounded hover:bg-brand-500"
            onClick={() => { setModalType("compra"); setIsModalOpen(true); }}
          >
            Agregar Compra
          </button>
        </div>
        <BaseTable columns={columnasCompras} data={compras} />
      </div>

      {/* Tabla Fijos */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-brand-200">Gastos Fijos</h2>
          <button
            className="flex items-center gap-2 bg-brand-400 text-white px-4 py-2 rounded hover:bg-brand-500"
            onClick={() => { setModalType("fijo"); setIsModalOpen(true); }}
          >
      Agregar Gasto Fijo
          </button>
        </div>
        <BaseTable columns={columnasFijos} data={fijos} />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
            {modalType === "compra" ? (
              <>
                <h2 className="text-xl font-bold mb-4">Nueva Compra</h2>
                <input type="text" placeholder="# Ticket" className="border px-3 py-2 rounded w-full mb-2"
                  value={nuevoCompra.ticket} onChange={(e) => setNuevoCompra({ ...nuevoCompra, ticket: e.target.value })} />
                <input type="text" placeholder="Proveedor" className="border px-3 py-2 rounded w-full mb-2"
                  value={nuevoCompra.proveedor} onChange={(e) => setNuevoCompra({ ...nuevoCompra, proveedor: e.target.value })} />
                <input type="number" placeholder="Total" className="border px-3 py-2 rounded w-full mb-2"
                  value={nuevoCompra.total} onChange={(e) => setNuevoCompra({ ...nuevoCompra, total: parseFloat(e.target.value) })} />
                <select className="border px-3 py-2 rounded w-full mb-2"
                  value={nuevoCompra.formaPago} onChange={(e) => setNuevoCompra({ ...nuevoCompra, formaPago: e.target.value as Compra["formaPago"] })}>
                  <option>Efectivo</option>
                  <option>Tarjeta</option>
                  <option>Transferencia</option>
                </select>
                <input type="date" className="border px-3 py-2 rounded w-full mb-4"
                  value={nuevoCompra.fecha} onChange={(e) => setNuevoCompra({ ...nuevoCompra, fecha: e.target.value })} />
                <div className="flex justify-end gap-3">
                  <button className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                  <button className="px-4 py-2 rounded bg-brand-400 text-white hover:bg-brand-500" onClick={handleGuardarCompra}>Guardar Compra</button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4">Nuevo Gasto Fijo</h2>
                <input type="text" placeholder="Concepto" className="border px-3 py-2 rounded w-full mb-2"
                  value={nuevoFijo.concepto} onChange={(e) => setNuevoFijo({ ...nuevoFijo, concepto: e.target.value })} />
                <input type="date" className="border px-3 py-2 rounded w-full mb-2"
                  value={nuevoFijo.fecha} onChange={(e) => setNuevoFijo({ ...nuevoFijo, fecha: e.target.value })} />
                <input type="number" placeholder="Monto" className="border px-3 py-2 rounded w-full mb-2"
                  value={nuevoFijo.monto} onChange={(e) => setNuevoFijo({ ...nuevoFijo, monto: parseFloat(e.target.value) })} />
                <select className="border px-3 py-2 rounded w-full mb-2"
                  value={nuevoFijo.formaPago} onChange={(e) => setNuevoFijo({ ...nuevoFijo, formaPago: e.target.value as GastoFijo["formaPago"] })}>
                  <option>Efectivo</option>
                  <option>Tarjeta</option>
                  <option>Transferencia</option>
                </select>
                <input type="text" placeholder="Pagado A" className="border px-3 py-2 rounded w-full mb-4"
                  value={nuevoFijo.pagadoA} onChange={(e) => setNuevoFijo({ ...nuevoFijo, pagadoA: e.target.value })} />
                <div className="flex justify-end gap-3">
                  <button className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                  <button className="px-4 py-2 rounded bg-brand-400 text-white hover:bg-brand-500" onClick={handleGuardarFijo}>Guardar Gasto Fijo</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default GastosPage;
