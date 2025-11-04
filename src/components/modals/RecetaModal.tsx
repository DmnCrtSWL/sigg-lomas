"use client";

import React, { useState } from "react";
import { Platillo } from "@/app/recetas/page"; // ajusta la ruta según tu estructura

interface RecetaModalProps {
  platillo: Platillo;
  onClose: () => void;
  onSave: (receta: any[]) => void;
}

const RecetaModal: React.FC<RecetaModalProps> = ({ platillo, onClose, onSave }) => {
  const [receta, setReceta] = useState<any[]>(platillo.receta || []);

  const handleAddIngrediente = () => {
    setReceta([...receta, { ingrediente: "", cantidad: "", unidad: "" }]);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...receta];
    updated[index][field] = value;
    setReceta(updated);
  };

  const handleDelete = (index: number) => {
    const updated = receta.filter((_, i) => i !== index);
    setReceta(updated);
  };

  const handleSave = () => {
    onSave(receta);
  };

  return (
<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg shadow-lg w-[700px] max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Receta de {platillo.nombre}
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 text-xl"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {receta.length === 0 ? (
            <p className="text-gray-500 italic">No hay ingredientes agregados.</p>
          ) : (
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">Ingrediente</th>
                  <th className="p-2 border">Cantidad</th>
                  <th className="p-2 border">Unidad</th>
                  <th className="p-2 border w-12"></th>
                </tr>
              </thead>
              <tbody>
                {receta.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={item.ingrediente}
                        onChange={(e) =>
                          handleChange(index, "ingrediente", e.target.value)
                        }
                        className="w-full border rounded px-2 py-1"
                        placeholder="Ej. Tomate"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={item.cantidad}
                        onChange={(e) =>
                          handleChange(index, "cantidad", e.target.value)
                        }
                        className="w-full border rounded px-2 py-1 text-right"
                        placeholder="Ej. 100"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={item.unidad}
                        onChange={(e) =>
                          handleChange(index, "unidad", e.target.value)
                        }
                        className="w-full border rounded px-2 py-1"
                        placeholder="Ej. g / ml / pieza"
                      />
                    </td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <button
            onClick={handleAddIngrediente}
            className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
          >
            + Agregar ingrediente
          </button>
        </div>

        <div className="flex justify-end gap-2 border-t p-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#376167] hover:bg-[#2e4e56] text-white rounded"
          >
            Guardar Receta
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecetaModal;
