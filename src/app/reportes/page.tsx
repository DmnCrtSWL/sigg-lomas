"use client";

import React, { useState } from "react";
import AdminLayout from "../(admin)/layout";

const ReportesPage: React.FC = () => {
  const [selected, setSelected] = useState({
    corteCaja: false,
    ingresos: false,
    gastos: false,
    poliza: false,
    estadistico: false,
  });

  const handleCheckbox = (key: keyof typeof selected) => {
    setSelected({ ...selected, [key]: !selected[key] });
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-brand-400 mb-6">Reportes</h1>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-8 border border-gray-200 dark:border-gray-700">
        {/* CORTE DE CAJA */}
        <div className="mb-8">
          <label className="flex items-center gap-2 mb-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.corteCaja}
              onChange={() => handleCheckbox("corteCaja")}
              className="accent-brand-400 w-5 h-5"
            />
            <h2 className="text-xl font-semibold text-brand-400">Corte de Caja</h2>
          </label>

          {selected.corteCaja && (
            <div className="ml-6 space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="corte" className="accent-brand-400" />
                <span>Usuario: Ana</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="corte" className="accent-brand-400" />
                <span>Usuario: Carlos</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="corte" className="accent-brand-400" />
                <span>Usuario: Juan</span>
              </label>
              <div className="flex items-center gap-3 pt-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Seleccionar fecha:</span>
                <input
                  type="date"
                  className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm"
                />
              </div>
            </div>
          )}
        </div>

        <hr className="border-gray-200 dark:border-gray-700 mb-8" />

        {/* INGRESOS */}
        <div className="mb-8">
          <label className="flex items-center gap-2 mb-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.ingresos}
              onChange={() => handleCheckbox("ingresos")}
              className="accent-brand-400 w-5 h-5"
            />
            <h2 className="text-xl font-semibold text-brand-400">Ingresos</h2>
          </label>

          {selected.ingresos && (
            <div className="ml-6 space-y-2">
              {["Del día", "Del mes", "Mes anterior", "Últimos 30 días"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input type="radio" name="ingresos" className="accent-brand-400" />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <hr className="border-gray-200 dark:border-gray-700 mb-8" />

        {/* GASTOS */}
        <div className="mb-8">
          <label className="flex items-center gap-2 mb-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.gastos}
              onChange={() => handleCheckbox("gastos")}
              className="accent-brand-400 w-5 h-5"
            />
            <h2 className="text-xl font-semibold text-brand-400">Gastos</h2>
          </label>

          {selected.gastos && (
            <div className="ml-6 space-y-2">
              {["Del día", "Del mes", "Mes anterior", "Últimos 30 días"].map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input type="radio" name="gastos" className="accent-brand-400" />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <hr className="border-gray-200 dark:border-gray-700 mb-8" />

        {/* POLIZA MENSUAL */}
        <div className="mb-8">
          <label className="flex items-center gap-2 mb-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.poliza}
              onChange={() => handleCheckbox("poliza")}
              className="accent-brand-400 w-5 h-5"
            />
            <h2 className="text-xl font-semibold text-brand-400">Póliza Mensual</h2>
          </label>

          {selected.poliza && (
            <div className="ml-6 space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="poliza" className="accent-brand-400" />
                <span>Mes en curso</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="poliza" className="accent-brand-400" />
                <span>Mes anterior</span>
              </label>
              <div className="flex items-center gap-3 pt-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Seleccionar mes y año:</span>
                <input
                  type="month"
                  className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm"
                />
              </div>
            </div>
          )}
        </div>

        <hr className="border-gray-200 dark:border-gray-700 mb-8" />

        {/* ESTADISTICO */}
        <div className="mb-8">
          <label className="flex items-center gap-2 mb-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.estadistico}
              onChange={() => handleCheckbox("estadistico")}
              className="accent-brand-400 w-5 h-5"
            />
            <h2 className="text-xl font-semibold text-brand-400">Estadístico</h2>
          </label>
        </div>

        {/* BOTONES FINALES */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button className="flex items-center gap-2 bg-brand-400 text-white px-5 py-2 rounded-lg hover:bg-brand-500 transition">

            Generar PDF
          </button>
          <button className="flex items-center gap-2 bg-[#2e4e56] text-white px-5 py-2 rounded-lg hover:bg-[#1e373d] transition">
            Exportar XLS
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReportesPage;
