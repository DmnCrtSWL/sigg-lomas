"use client";

import React from "react";
import AdminLayout from "../(admin)/layout";

const DashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-brand-400">Pascientes</h1>
      <p className="text-gray-600 mt-2">Contenido del Administrador de Pascientes vacío.</p>
    </AdminLayout>
  );
};

export default DashboardPage;
