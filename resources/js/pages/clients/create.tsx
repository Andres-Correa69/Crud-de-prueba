import { Link, useForm } from '@inertiajs/react';
import React from 'react';

type Status = 'active' | 'inactive';
type ClientFormData = {
    name: string;
    email: string;
    phone: string;
    company: string;
    notes: string;
    status: Status;
    address: string;
};

export default function ClientsCreate() {
    const { data, setData, post, processing, errors } = useForm<ClientFormData>({
        name: '',
        email: '',
        phone: '',
        company: '',
        notes: '',
        status: 'active',
        address: '',
    });

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white">
            <h1 className="text-2xl font-semibold">Nuevo Cliente</h1>
            <p className="text-gray-500">Completa los datos del nuevo cliente.</p>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    post('/clients');
                }}
                className="space-y-4"
            >
                <div>
                    <label className="block text-sm mb-1">Nombre</label>
                    <input className="w-full border rounded-md px-3 py-2" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                </div>
                <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input className="w-full border rounded-md px-3 py-2" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm mb-1">Teléfono</label>
                        <input className="w-full border rounded-md px-3 py-2" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                        {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Estado</label>
                        <select className="w-full border rounded-md px-3 py-2" value={data.status} onChange={(e) => setData('status', e.target.value as Status)}>
                            <option value="active">Activo</option>
                            <option value="inactive">Inactivo</option>
                        </select>
                        {errors.status && <p className="text-sm text-red-600 mt-1">{errors.status}</p>}
                    </div>
                </div>
                <div>
                    <label className="block text-sm mb-1">Empresa</label>
                    <input className="w-full border rounded-md px-3 py-2" value={data.company} onChange={(e) => setData('company', e.target.value )} />
                    {errors.company && <p className="text-sm text-red-600 mt-1">{errors.company}</p>}
                </div>
                <div>
                    <label className="block text-sm mb-1">Dirección</label>
                    <textarea className="w-full border rounded-md px-3 py-2" rows={2} value={data.address} onChange={(e) => setData('address', e.target.value)} />
                    {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address}</p>}
                </div>
                <div>
                    <label className="block text-sm mb-1">Notas</label>
                    <textarea className="w-full border rounded-md px-3 py-2" rows={4} value={data.notes} onChange={(e) => setData('notes', e.target.value)} />
                    {errors.notes && <p className="text-sm text-red-600 mt-1">{errors.notes}</p>}
                </div>

                <div className="flex items-center gap-2">
                    <button disabled={processing} className="px-3 py-2 rounded-md bg-black text-white hover:bg-gray-800 disabled:opacity-50">
                        Guardar
                    </button>
                    <Link href={'/clients'} className="px-3 py-2 rounded-md border">
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
}


