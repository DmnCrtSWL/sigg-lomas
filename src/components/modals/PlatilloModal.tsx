"use client";

import React, { ChangeEvent, useRef } from "react";
import { EyeIcon, PencilIcon, TrashBinIcon } from "@/icons";

type Platillo = {
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

type Props = {
  nuevoPlatillo: Platillo;
  setNuevoPlatillo: React.Dispatch<React.SetStateAction<Platillo>>;
  onClose: () => void;
  onSave: (platillo: Platillo) => void;
};

const PlatilloModal: React.FC<Props> = ({ nuevoPlatillo, setNuevoPlatillo, onClose, onSave }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calcularCostoTotal = () => {
    const subtotal = (nuevoPlatillo.receta || []).reduce((sum, ing: any) => sum + ing.costo, 0);
    return +(subtotal * 1.1).toFixed(2);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-6xl flex gap-6 relative p-6">
        {/* Columna izquierda: imagen / placeholder clicable */}
        <div
          className="w-2/5 h-[400px] flex items-center justify-center border rounded-lg overflow-hidden bg-gray-200 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {(nuevoPlatillo.imagenes && nuevoPlatillo.imagenes.length > 0) ? (
            <img
              src={nuevoPlatillo.imagenes[0]}
              alt="Platillo"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-center">Sin imagen disponible</span>
          )}
        </div>

        {/* Columna derecha: formulario */}
        <div className="w-3/5 flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nombre del platillo"
            className="border px-3 py-2 rounded"
            value={nuevoPlatillo.nombre}
            onChange={(e) => setNuevoPlatillo({ ...nuevoPlatillo, nombre: e.target.value })}
          />
          <select
            className="border px-3 py-2 rounded"
            value={nuevoPlatillo.categoria}
            onChange={(e) => setNuevoPlatillo({ ...nuevoPlatillo, categoria: e.target.value })}
          >
            <option>Desayunos</option>
            <option>Menú del Día</option>
            <option>Sandwiches</option>
            <option>Huevos</option>
            <option>Ensaladas</option>
            <option>Barra de Café</option>
            <option>Dulcería</option>
            <option>Bebidas</option>
          </select>

          {/* Precio con $ fijo y placeholder */}
          <div className="border px-3 py-2 rounded flex items-center">
            <span className="mr-1 text-gray-600">$</span>
            <input
              type="number"
              placeholder="Precio de venta"
              className="flex-1 outline-none"
              value={nuevoPlatillo.precio > 0 ? nuevoPlatillo.precio : ""}
              onChange={(e) =>
                setNuevoPlatillo({ ...nuevoPlatillo, precio: parseFloat(e.target.value) })
              }
            />
          </div>

          <select
            className="border px-3 py-2 rounded"
            value={nuevoPlatillo.estado}
            onChange={(e) =>
              setNuevoPlatillo({ ...nuevoPlatillo, estado: e.target.value as "Publico" | "En Revisión" })
            }
          >
            <option value="Publico">Publico</option>
            <option value="En Revisión">En Revisión</option>
          </select>

          <textarea
            placeholder="Descripción (500 caracteres)"
            className="border px-3 py-2 rounded resize-none"
            rows={4}
            maxLength={500}
            value={nuevoPlatillo.descripcion}
            onChange={(e) => setNuevoPlatillo({ ...nuevoPlatillo, descripcion: e.target.value })}
          />

          {/* Botón de subir imagen debajo del formulario */}
          <button
            className="px-4 py-2 bg-[#376167] text-white rounded hover:bg-[#2e4e56] mt-2"
            onClick={() => fileInputRef.current?.click()}
          >
            Subir Imagen
          </button>
          <input
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            ref={fileInputRef}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file && file.size <= 500 * 1024) {
                const reader = new FileReader();
                reader.onloadend = () =>
                  setNuevoPlatillo({
                    ...nuevoPlatillo,
                    imagenes: [...(nuevoPlatillo.imagenes || []), reader.result as string],
                  });
                reader.readAsDataURL(file);
              } else {
                alert("La imagen debe ser PNG/JPG y menor a 500Kb");
              }
            }}
          />

          {/* Botones de acción */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 rounded bg-[#376167] text-white hover:bg-[#2e4e56]"
              onClick={() => onSave({ ...nuevoPlatillo, costo: calcularCostoTotal() })}
            >
              Guardar Platillo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatilloModal;
