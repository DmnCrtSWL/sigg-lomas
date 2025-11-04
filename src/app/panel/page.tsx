"use client";

import React, { useState } from "react";
import AdminLayout from "../(admin)/layout";

type Pedido = {
  id: number;
  cliente: string;
  horaEntrega?: string;
  ordenes: string[];
  estado: "Nuevos" | "Preparacion" | "Recoleccion" | "Reparto";
};

const pedidosIniciales: Pedido[] = [
  { id: 1, cliente: "Juan Pérez", horaEntrega: "14:30", ordenes: ["Hamburguesa con papas", "Refresco"], estado: "Nuevos" },
  { id: 2, cliente: "María López", ordenes: ["Ensalada César"], estado: "Preparacion" },
  { id: 3, cliente: "Carlos Ruiz", horaEntrega: "13:50", ordenes: ["Pizza grande"], estado: "Recoleccion" },
];

const DashboardPage: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosIniciales);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);

  const cambiarEstado = (pedidoId: number, nuevoEstado: Pedido["estado"]) => {
    setPedidos(pedidos.map(p => p.id === pedidoId ? { ...p, estado: nuevoEstado } : p));
    setSelectedPedido(null);
  };

  const columnas: Pedido["estado"][] = ["Nuevos", "Preparacion", "Recoleccion", "Reparto"];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-brand-400 mb-4">Panel de Trabajo</h1>
      <div className="grid grid-cols-4 gap-4">
        {columnas.map(col => (
          <div key={col}>
            <h2 className="font-semibold mb-2 text-gray-700">{col}</h2>
            <div className="flex flex-col gap-3">
              {pedidos.filter(p => p.estado === col).map(pedido => (
                <button
                  key={pedido.id}
                  onClick={() => setSelectedPedido(pedido)}
                  className="text-left bg-white p-3 rounded-lg shadow hover:shadow-md transition duration-150 border border-gray-200"
                >
                  <div className="font-semibold">{pedido.cliente}</div>
                  <div className="text-sm text-gray-500">{pedido.horaEntrega ?? "Ahora"}</div>
                  <div className="text-gray-700 truncate">{pedido.ordenes[0]}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Detalle Pedido */}
      {selectedPedido && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg relative">
            <h2 className="text-xl font-bold mb-2 text-brand-400">{selectedPedido.cliente}</h2>
            <p className="text-gray-500 mb-3">Hora de entrega: {selectedPedido.horaEntrega ?? "Ahora"}</p>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Orden Completa</h3>
              <ul className="list-disc list-inside space-y-1">
                {selectedPedido.ordenes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              {selectedPedido.estado === "Nuevos" && (
                <button
                  className="px-4 py-2 rounded bg-brand-400 text-white hover:bg-brand-500"
                  onClick={() => cambiarEstado(selectedPedido.id, "Preparacion")}
                >
                  Preparar
                </button>
              )}
              {selectedPedido.estado === "Preparacion" && (
                <button
                  className="px-4 py-2 rounded bg-brand-400 text-white hover:bg-brand-500"
                  onClick={() => cambiarEstado(selectedPedido.id, "Recoleccion")}
                >
                  Recolección
                </button>
              )}
              {selectedPedido.estado === "Recoleccion" && (
                <button
                  className="px-4 py-2 rounded bg-brand-400 text-white hover:bg-brand-500"
                  onClick={() => cambiarEstado(selectedPedido.id, "Reparto")}
                >
                  Reparto
                </button>
              )}
              {selectedPedido.estado === "Reparto" && (
                <button
                  className="px-4 py-2 rounded bg-brand-400 text-white hover:bg-brand-400"
                  onClick={() => setPedidos(pedidos.filter(p => p.id !== selectedPedido.id))}
                >
                  Entregado
                </button>
              )}
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setSelectedPedido(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default DashboardPage;
