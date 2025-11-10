"use client";

import React, { useState } from "react";
import AdminLayout from "../(admin)/layout";

type Pedido = {
  id: number;
  nombreCliente: string;
  hora: string;
  metodoPago: "Efectivo" | "Tarjeta" | "Transferencia" | "Cortesía" | "CXC";
};

const pedidosMock: Pedido[] = [
  { id: 1001, nombreCliente: "Ana López", hora: "09:23 AM", metodoPago: "Efectivo" },
  { id: 1002, nombreCliente: "Carlos Ruiz", hora: "10:15 AM", metodoPago: "Tarjeta" },
  { id: 1003, nombreCliente: "Lucía Morales", hora: "11:47 AM", metodoPago: "Transferencia" },
  { id: 1004, nombreCliente: "David Torres", hora: "12:05 PM", metodoPago: "CXC" },
  { id: 1005, nombreCliente: "Invitado", hora: "01:12 PM", metodoPago: "Cortesía" },
  { id: 1006, nombreCliente: "María Pérez", hora: "02:33 PM", metodoPago: "Efectivo" },
  { id: 1007, nombreCliente: "Juan García", hora: "03:18 PM", metodoPago: "Tarjeta" },
];

const HistorialPage: React.FC = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const pedidosFiltrados = pedidosMock; // Aquí podrías filtrar por rango de fecha más adelante.

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-brand-400 mb-3 sm:mb-0">Historial de Ventas</h1>

          {/* Selector de fechas */}
          <div className="flex gap-3 items-center">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Desde</label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-brand-400 outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Hasta</label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-brand-400 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Tabla de historial */}
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs border-b">
              <tr>
                <th className="px-4 py-3"># Orden</th>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Hora</th>
                <th className="px-4 py-3">Método de Pago</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidosFiltrados.length > 0 ? (
                pedidosFiltrados.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">{p.id}</td>
                    <td className="px-4 py-3">{p.nombreCliente}</td>
                    <td className="px-4 py-3">{p.hora}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          p.metodoPago === "Efectivo"
                            ? "bg-green-100 text-green-700"
                            : p.metodoPago === "Tarjeta"
                            ? "bg-blue-100 text-blue-700"
                            : p.metodoPago === "Transferencia"
                            ? "bg-yellow-100 text-yellow-700"
                            : p.metodoPago === "CXC"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {p.metodoPago}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="px-3 py-1 text-sm bg-brand-400 text-white rounded hover:bg-brand-500 transition">
                        Ver
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No hay pedidos en este rango de fechas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HistorialPage;
