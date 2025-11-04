"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import AdminLayout from "../(admin)/layout";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
};

type ItemCarrito = {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
};

const productosMock: Producto[] = [
  { id: 1, nombre: "Café americano", precio: 35 },
  { id: 2, nombre: "Latte", precio: 45 },
  { id: 3, nombre: "Capuccino", precio: 48 },
  { id: 4, nombre: "Croissant", precio: 32 },
  { id: 5, nombre: "Bagel con queso", precio: 55 },
  { id: 6, nombre: "Sandwich pollo", precio: 65 },
  { id: 7, nombre: "Jugo naranja", precio: 28 },
  { id: 8, nombre: "Té chai", precio: 50 },
  { id: 9, nombre: "Pastel de zanahoria", precio: 60 },
  { id: 10, nombre: "Brownie", precio: 42 },
  { id: 11, nombre: "Espresso doble", precio: 38 },
  { id: 12, nombre: "Agua natural", precio: 20 },
];

const POSPage: React.FC = () => {
  const [busqueda, setBusqueda] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [showPersonalModal, setShowPersonalModal] = useState(false);
  const [personal, setPersonal] = useState({ nombre: "", precio: "", cantidad: "1" });

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const productosFiltrados = useMemo(() => {
    if (!busqueda) return [];
    return productosMock.filter((p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [busqueda]);

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito((prev) => {
      const existe = prev.find((it) => it.id === producto.id);
      if (existe) {
        return prev.map((it) =>
          it.id === producto.id ? { ...it, cantidad: it.cantidad + 1 } : it
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
    setBusqueda("");
    setShowDropdown(false);
  };

  const agregarFrecuente = (producto: Producto) => {
    agregarAlCarrito(producto);
  };

  const eliminarItem = (id: number) => {
    setCarrito((prev) => prev.filter((it) => it.id !== id));
  };

  const actualizarCantidad = (id: number, cantidad: number) => {
    if (cantidad < 1) return;
    setCarrito((prev) => prev.map((it) => (it.id === id ? { ...it, cantidad } : it)));
  };

  const agregarPersonalizado = () => {
    if (!personal.nombre.trim()) return alert("Ingresa nombre del producto");
    const precio = parseFloat(personal.precio || "0");
    const cantidad = parseInt(personal.cantidad || "1", 10) || 1;
    if (isNaN(precio) || precio <= 0) return alert("Ingresa un precio válido");
    const nuevo: ItemCarrito = {
      id: Date.now(),
      nombre: personal.nombre,
      precio,
      cantidad,
    };
    setCarrito((prev) => [...prev, nuevo]);
    setPersonal({ nombre: "", precio: "", cantidad: "1" });
    setShowPersonalModal(false);
  };

  const total = carrito.reduce((s, it) => s + it.precio * it.cantidad, 0);

  return (
    <AdminLayout>
      {/* Header con botón de venta personalizada */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-brand-400">Punto de Venta</h1>
        
        <button
          onClick={() => setShowPersonalModal(true)}
          className="bg-brand-400 text-white px-4 py-2 rounded hover:bg-brand-500 transition"
        >
         Venta personalizada
        </button>
      </div>

      {/* Layout 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* COLUMNA IZQUIERDA */}
        <div className="lg:col-span-3 space-y-4">
          {/* Barra de búsqueda */}
          <div ref={wrapperRef} className="relative">
            <input
              type="text"
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setShowDropdown(Boolean(e.target.value));
              }}
              placeholder="Buscar producto..."
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-brand-400 outline-none bg-white"
            />

            {showDropdown && (
              <div className="absolute left-0 right-0 z-30 mt-1 bg-white border rounded shadow max-h-56 overflow-auto">
                {productosFiltrados.length > 0 ? (
                  productosFiltrados.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => agregarAlCarrito(p)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 transition"
                    >
                      <div className="flex justify-between items-center">
                        <span className="truncate">{p.nombre}</span>
                        <span className="ml-3 text-sm font-semibold">${p.precio}</span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-gray-500 text-sm">Sin resultados</div>
                )}
              </div>
            )}
          </div>

          {/* Grid productos más usados */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Productos más usados</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {productosMock.slice(0, 12).map((p) => (
                <div
                  key={p.id}
                  className="bg-white border rounded-lg p-3 shadow-sm hover:border-brand-400 cursor-pointer"
                  onClick={() => agregarFrecuente(p)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-gray-800">{p.nombre}</div>
                      <div className="text-sm text-gray-500">${p.precio.toFixed(2)}</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        agregarFrecuente(p);
                      }}
                      className="bg-brand-400 text-white px-2 py-1 rounded text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Ticket</h2>

          <div className="bg-white border rounded-lg p-3 shadow-sm max-h-[60vh] overflow-auto">
            {carrito.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay productos agregados</p>
            ) : (
              <ul className="space-y-2">
                {carrito.map((it) => (
                  <li key={it.id} className="flex justify-between items-center border-b pb-2">
                    <div className="flex-1 pr-2">
                      <div className="font-medium text-gray-800 truncate">{it.nombre}</div>
                      <div className="text-xs text-gray-500">
                        ${it.precio.toFixed(2)} ×{" "}
                        <input
                          type="number"
                          min={1}
                          value={it.cantidad}
                          onChange={(e) => actualizarCantidad(it.id, Number(e.target.value))}
                          className="w-14 border rounded px-1 py-0.5 text-right text-sm inline-block ml-1"
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${(it.precio * it.cantidad).toFixed(2)}</div>
                      <button
                        onClick={() => eliminarItem(it.id)}
                        className="text-red-500 text-sm mt-1"
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Total simple */}
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  if (carrito.length === 0) return alert("Agrega productos antes de cobrar");
                  alert("Venta registrada (simulada). Se limpiará el ticket.");
                  setCarrito([]);
                }}
                className="flex-1 bg-brand-400 text-white py-2 rounded hover:bg-brand-500 transition"
              >
                Cobrar
              </button>
              <button
                onClick={() => setCarrito([])}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition"
              >
                Vaciar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Venta Personalizada */}
      {showPersonalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Venta personalizada</h3>

            <label className="text-sm text-gray-600">Nombre</label>
            <input
              value={personal.nombre}
              onChange={(e) => setPersonal({ ...personal, nombre: e.target.value })}
              className="w-full border rounded px-3 py-2 mb-3"
            />

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-sm text-gray-600">Precio unitario</label>
                <input
                  type="number"
                  min={0}
                  value={personal.precio}
                  onChange={(e) => setPersonal({ ...personal, precio: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Cantidad</label>
                <input
                  type="number"
                  min={1}
                  value={personal.cantidad}
                  onChange={(e) => setPersonal({ ...personal, cantidad: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPersonalModal(false)}
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={agregarPersonalizado}
                className="px-4 py-2 rounded bg-brand-400 text-white hover:bg-brand-500"
              >
                Agregar al ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default POSPage;
