export interface Lugares {
    nombre: string,
    descripcion: string,
    img: string,
    sector: string,
    lng: number,
    lat: number,
    tipo: string,
    informacion: string,
    _id?: string,
}

export interface Sector {
    nombre: string,
    descripcion: string,
    img: string,
    _id?: string,
}

export interface Rutas {
    descripcion: string
}

export interface CoordRuta {
    lng: number,
    lat: number,
    orden: number,
    ruta: string,
    _id?: string,
}

export interface Tipo {
    descripcion: string,
    color: string,
    _id?: string
}

export interface Agenda {
    titulo: string,
    descripcion: string,
    fecha: string,
    lugar: string
}