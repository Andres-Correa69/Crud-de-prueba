import { Link, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import React from 'react';

type Client = {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    company?: string | null;
    notes?: string | null;
};

type Paginated<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
};

export default function ClientsIndex({ clients, filters, metrics }: PageProps<{ clients: Paginated<Client>; filters: { search?: string; status?: string }; metrics: { total: number; active: number; inactive: number } }>) {
    const { get, data, setData } = useForm<{ search: string; status: string }>({ search: filters?.search ?? '', status: filters?.status ?? '' });

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6 bg-white">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold">Gestión de Clientes</h1>
                    <p className="text-gray-500">Administra y organiza tu cartera de clientes</p>
                </div>
                <Link href={'/clients/create'} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 shadow-sm">
                    + Nuevo Cliente
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border p-4 bg-[#f7f9ff]">
                    <div className="text-sm text-gray-500">Total Clientes</div>
                    <div className="text-3xl font-semibold mt-1">{metrics.total}</div>
                </div>
                <div className="rounded-xl border p-4 bg-[#f3fff7]">
                    <div className="text-sm text-gray-500">Clientes Activos</div>
                    <div className="text-3xl font-semibold mt-1">{metrics.active}</div>
                </div>
                <div className="rounded-xl border p-4 bg-[#fff7f7]">
                    <div className="text-sm text-gray-500">Clientes Inactivos</div>
                    <div className="text-3xl font-semibold mt-1">{metrics.inactive}</div>
                </div>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    get('/clients', { preserveState: true, preserveScroll: true });
                }}
                className="flex flex-col sm:flex-row gap-2"
            >
                <input
                    value={data.search}
                    onChange={(e) => setData('search', e.target.value)}
                    placeholder="Buscar por nombre, email o empresa"
                    className="w-full border rounded-md px-3 py-2"
                />
                <select
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    className="sm:w-60 border rounded-md px-3 py-2"
                >
                    <option value="">Todos los estados</option>
                    <option value="active">Solo activos</option>
                    <option value="inactive">Solo inactivos</option>
                </select>
                <button className="px-3 py-2 rounded-md border">Aplicar</button>
            </form>

            <div className="overflow-x-auto border rounded-lg bg-white">
                <table className="min-w-full divide-y">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left px-4 py-3">Nombre</th>
                            <th className="text-left px-4 py-3">Email</th>
                            <th className="text-left px-4 py-3">Empresa</th>
                            <th className="text-right px-4 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {clients.data.map((c: Client) => (
                            <tr key={c.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">{c.name}</td>
                                <td className="px-4 py-3">{c.email}</td>
                                <td className="px-4 py-3">{c.company ?? '-'}</td>
                                <td className="px-4 py-3 text-right space-x-2">
                                    <Link href={`/clients/${c.id}/edit`} className="px-2 py-1 border rounded-md">
                                        Editar
                                    </Link>
                                    <Link
                                        as="button"
                                        method="delete"
                                        href={`/clients/${c.id}`}
                                        className="px-2 py-1 border rounded-md text-red-600"
                                        onBefore={() => confirm('¿Eliminar cliente?')}
                                    >
                                        Eliminar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap gap-2">
                {clients.links.map((l: { url: string | null; label: string; active: boolean }, idx: number) => (
                    <Link
                        key={idx}
                        href={l.url ?? ''}
                        className={`px-3 py-1 border rounded ${l.active ? 'bg-black text-white' : ''} ${!l.url ? 'opacity-50 pointer-events-none' : ''}`}
                        dangerouslySetInnerHTML={{ __html: l.label }}
                    />
                ))}
            </div>
        </div>
    );
}


