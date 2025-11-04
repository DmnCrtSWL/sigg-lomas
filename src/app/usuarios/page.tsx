"use client";

import React, { useState } from "react";
import AdminLayout from "../(admin)/layout";
import BaseTable from "@/components/tables/BaseTable";
import { PencilIcon, EyeIcon, TrashBinIcon, } from "@/icons";

type Usuario = {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: "Operativo" | "Administrador" | "Super Administrador";
  password?: string;
  createdAt: string;
};

const initialData: Usuario[] = [
  { id: 1, name: "Ricardo Corona", phone: "555-123-4567", email: "correo@example.com", role: "Administrador", createdAt: "2025-11-03" },
  { id: 2, name: "Usuario 2", phone: "555-987-6543", email: "user2@example.com", role: "Operativo", createdAt: "2025-10-29" },
  { id: 3, name: "Usuario 3", phone: "555-456-7890", email: "user3@example.com", role: "Super Administrador", createdAt: "2025-09-15" },
];

const UsuariosPage: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [nuevoUsuario, setNuevoUsuario] = useState<Usuario>({
    id: 0,
    name: "",
    phone: "",
    email: "",
    role: "Operativo",
    password: "",
    createdAt: new Date().toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" }),
  });

  const handleGuardar = () => {
    setUsuarios([...usuarios, { ...nuevoUsuario, id: Date.now() }]);
    setNuevoUsuario({
      id: 0,
      name: "",
      phone: "",
      email: "",
      role: "Operativo",
      password: "",
      createdAt: new Date().toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" }),
    });
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Seguro que quieres eliminar este usuario?")) {
      setUsuarios(usuarios.filter((u) => u.id !== id));
    }
  };

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Nombre", accessor: "name" },
    { header: "Teléfono", accessor: "phone" },
    { header: "Correo", accessor: "email" },
    { header: "Rol", accessor: "role" },
    { header: "Fecha de Alta", accessor: "createdAt" },
    {
      header: "Acciones",
      accessor: "acciones",
      render: (_: any, row: Usuario) => (
        <div className="flex gap-2">
          <button className="p-1 text-blue-500 hover:text-blue-700">
            <EyeIcon className="w-5 h-5 text-brand-400"/>
          </button>
          <button className="p-1 text-yellow-500 hover:text-yellow-700">
            <PencilIcon className="w-5 h-5 text-brand-400" />
          </button>
          <button className="p-1 text-red-500 hover:text-red-700" onClick={() => handleDelete(row.id)}>
            <TrashBinIcon className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-400">Usuarios</h1>
          <p className="text-gray-600 mt-1">
            Aquí puedes administrar todos los usuarios del sistema.
          </p>
        </div>
        <button
          className="flex items-center gap-2 bg-brand-400 text-white px-4 py-2 rounded hover:bg-brand-500"
          onClick={() => setIsModalOpen(true)}
        >
          Agregar Usuario
        </button>
      </div>

      <BaseTable columns={columns} data={usuarios} />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4">Nuevo Usuario</h2>

            <input
              type="text"
              placeholder="Nombre"
              className="border px-3 py-2 rounded w-full mb-2"
              value={nuevoUsuario.name}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Teléfono"
              className="border px-3 py-2 rounded w-full mb-2"
              value={nuevoUsuario.phone}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, phone: e.target.value })}
            />
            <input
              type="email"
              placeholder="Correo"
              className="border px-3 py-2 rounded w-full mb-2"
              value={nuevoUsuario.email}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="border px-3 py-2 rounded w-full mb-2"
              value={nuevoUsuario.password}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
            />
            <select
              className="border px-3 py-2 rounded w-full mb-4"
              value={nuevoUsuario.role}
              onChange={(e) =>
                setNuevoUsuario({ ...nuevoUsuario, role: e.target.value as Usuario["role"] })
              }
            >
              <option>Operativo</option>
              <option>Administrador</option>
              <option>Super Administrador</option>
            </select>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 rounded bg-brand-400 text-white hover:bg-brand-500"
                onClick={handleGuardar}
              >
                Guardar Usuario
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default UsuariosPage;
