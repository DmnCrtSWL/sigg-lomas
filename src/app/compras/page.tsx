"use client";

import React, { useState } from "react";
import AdminLayout from "../(admin)/layout";
import BaseTable from "@/components/tables/BaseTable";
import { PencilIcon, EyeIcon, TrashBinIcon, DocsIcon } from "@/icons";

type Producto = {
  id: number;
  nombre: string;
  cantidad: number;
  unidad: string;
  precioUnitario: number;
};

type Compra = {
  id: number;
  ticket: string;
  proveedor: string;
  total: number;
  formaPago: "Efectivo" | "Tarjeta" | "Transferencia";
  fecha: string;
  productos?: Producto[];
};

const initialCompras: Compra[] = [
  {
    id: 1,
    ticket: "TCK123",
    proveedor: "Proveedor A",
    total: 3650,
    formaPago: "Efectivo",
    fecha: "2025-11-01",
    productos: [],
  },
];

const ComprasPage: React.FC = () => {
  const [compras, setCompras] = useState<Compra[]>(initialCompras);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"compra" | "detalle">("compra");
  const [selectedCompra, setSelectedCompra] = useState<Compra | null>(null);

  const [nuevoCompra, setNuevoCompra] = useState<Compra>({
    id: 0,
    ticket: "",
    proveedor: "",
    total: 0,
    formaPago: "Efectivo",
    fecha: new Date().toLocaleDateString("es-MX"),
    productos: [],
  });

  const [nuevoProducto, setNuevoProducto] = useState<Producto>({
    id: 0,
    nombre: "",
    cantidad: 0,
    unidad: "Piezas",
    precioUnitario: 0,
  });

  const columnasCompras = [
    { header: "# Ticket", accessor: "ticket" },
    { header: "Proveedor", accessor: "proveedor" },
    {
      header: "Total Ticket",
      accessor: "total",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    { header: "Forma de Pago", accessor: "formaPago" },
    { header: "Fecha de Compra", accessor: "fecha" },
    {
      header: "Acciones",
      accessor: "acciones",
      render: (_: any, row: Compra) => (
        <div className="flex gap-2">
          <button
            className="text-brand-400"
            onClick={() => {
              setSelectedCompra(row);
              setModalType("detalle");
              setIsModalOpen(true);
            }}
          >
            <DocsIcon />
          </button>
          <button className="text-brand-400">
            <EyeIcon className="w-5 h-5" />
          </button>
          <button className="text-brand-400">
            <PencilIcon className="w-5 h-5" />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() =>
              setCompras(compras.filter((c) => c.id !== row.id))
            }
          >
            <TrashBinIcon className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  const handleGuardarCompra = () => {
    setCompras([
      ...compras,
      { ...nuevoCompra, id: Date.now(), productos: [] },
    ]);
    setNuevoCompra({
      id: 0,
      ticket: "",
      proveedor: "",
      total: 0,
      formaPago: "Efectivo",
      fecha: new Date().toLocaleDateString("es-MX"),
      productos: [],
    });
    setIsModalOpen(false);
  };

  const handleAgregarProducto = () => {
    if (!selectedCompra) return;
    const updated = {
      ...selectedCompra,
      productos: [
        ...(selectedCompra.productos || []),
        { ...nuevoProducto, id: Date.now() },
      ],
    };
    setCompras(
      compras.map((c) => (c.id === selectedCompra.id ? updated : c))
    );
    setSelectedCompra(updated);
    setNuevoProducto({
      id: 0,
      nombre: "",
      cantidad: 0,
      unidad: "Piezas",
      precioUnitario: 0,
    });
  };

  const totalProductos =
    selectedCompra?.productos?.reduce(
      (sum, p) => sum + p.cantidad * p.precioUnitario,
      0
    ) ?? 0;

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-brand-400">Compras</h1>
        <button
          className="flex items-center gap-2 bg-brand-400 text-white px-4 py-2 rounded hover:bg-brand-500"
          onClick={() => {
            setModalType("compra");
            setIsModalOpen(true);
          }}
        >
          Agregar Compra
        </button>
      </div>

      <BaseTable columns={columnasCompras} data={compras} />

      {/* MODAL DETALLE */}
      {isModalOpen && modalType === "detalle" && selectedCompra && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl relative">
            <h2 className="text-xl font-bold mb-4 text-brand-400">
              Detalle del Ticket
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              <strong>Ticket:</strong> {selectedCompra.ticket} &nbsp; | &nbsp;
              <strong>Proveedor:</strong> {selectedCompra.proveedor} &nbsp; | &nbsp;
              <strong>Pago:</strong> {selectedCompra.formaPago} &nbsp; | &nbsp;
              <strong>Fecha:</strong> {selectedCompra.fecha}
            </p>

            <div className="grid grid-cols-4 gap-2 mb-3">
              <input
                type="text"
                placeholder="Producto"
                className="border px-3 py-2 rounded col-span-2"
                value={nuevoProducto.nombre}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    nombre: e.target.value,
                  })
                }
              />
              <input
                type="number"
                placeholder="Cantidad"
                className="border px-3 py-2 rounded"
                value={nuevoProducto.cantidad}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    cantidad: parseFloat(e.target.value),
                  })
                }
              />
              <select
                className="border px-3 py-2 rounded"
                value={nuevoProducto.unidad}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    unidad: e.target.value,
                  })
                }
              >
                <option>Gramos</option>
                <option>Kilos</option>
                <option>Litros</option>
                <option>Mililitros</option>
                <option>Piezas</option>
              </select>
              <input
                type="number"
                placeholder="Precio Unitario"
                className="border px-3 py-2 rounded col-span-2"
                value={nuevoProducto.precioUnitario}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    precioUnitario: parseFloat(e.target.value),
                  })
                }
              />
              <button
                className="bg-brand-400 text-white px-4 py-2 rounded hover:bg-brand-500 col-span-2"
                onClick={handleAgregarProducto}
              >
                Guardar Producto
              </button>
            </div>

            <div className="mt-4 border-t pt-3">
              <h3 className="font-semibold mb-2">Productos en el Ticket</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Unidad</th>
                    <th>Precio U.</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCompra.productos?.map((p) => (
                    <tr key={p.id} className="border-b">
                      <td>{p.nombre}</td>
                      <td>{p.cantidad}</td>
                      <td>{p.unidad}</td>
                      <td>${p.precioUnitario.toFixed(2)}</td>
                      <td>${(p.cantidad * p.precioUnitario).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end mt-3 font-semibold text-brand-500">
                Total Calculado: ${totalProductos.toFixed(2)} &nbsp; | &nbsp;
                Total Ticket: ${selectedCompra.total.toFixed(2)}
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-3">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL NUEVA COMPRA */}
      {isModalOpen && modalType === "compra" && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4 text-brand-400">
              Nueva Compra
            </h2>
            <input
              type="text"
              placeholder="# Ticket"
              className="border px-3 py-2 rounded w-full mb-2"
              value={nuevoCompra.ticket}
              onChange={(e) =>
                setNuevoCompra({ ...nuevoCompra, ticket: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Proveedor"
              className="border px-3 py-2 rounded w-full mb-2"
              value={nuevoCompra.proveedor}
              onChange={(e) =>
                setNuevoCompra({
                  ...nuevoCompra,
                  proveedor: e.target.value,
                })
              }
            />
            <input
              type="number"
              placeholder="Total"
              className="border px-3 py-2 rounded w-full mb-2"
              value={nuevoCompra.total}
              onChange={(e) =>
                setNuevoCompra({
                  ...nuevoCompra,
                  total: parseFloat(e.target.value),
                })
              }
            />
            <select
              className="border px-3 py-2 rounded w-full mb-2"
              value={nuevoCompra.formaPago}
              onChange={(e) =>
                setNuevoCompra({
                  ...nuevoCompra,
                  formaPago: e.target.value as Compra["formaPago"],
                })
              }
            >
              <option>Efectivo</option>
              <option>Tarjeta</option>
              <option>Transferencia</option>
            </select>
            <input
              type="date"
              className="border px-3 py-2 rounded w-full mb-4"
              value={nuevoCompra.fecha}
              onChange={(e) =>
                setNuevoCompra({ ...nuevoCompra, fecha: e.target.value })
              }
            />
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 rounded bg-brand-400 text-white hover:bg-brand-500"
                onClick={handleGuardarCompra}
              >
                Guardar Compra
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ComprasPage;
