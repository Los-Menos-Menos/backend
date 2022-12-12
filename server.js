const express = require('express'); //modulo por defecto de la dependencia express
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const {ApolloServer, gql} = require('apollo-server-express');

const Residente = require('./models/residente');
const Administrador = require('./models/administrador')
const Conserje = require('./models/conserje')
const EstadoDeCuenta = require('./models/estadodecuenta')
const GastosComunes = require('./models/gastoscomunes')
const Instalacion = require('./models/instalacion')
const LibroReservas= require('./models/libroreservas')
const Multa = require('./models/multa')
const Reserva = require('./models/reserva')
const Directiva = require('./models/directiva')
const Anuncio = require('./models/anuncio');
const residente = require('./models/residente');


mongoose.connect('mongodb+srv://sofiamanana:sofia56204@cluster0.ncfwni4.mongodb.net/bdwebmovil');

//pk = object id
// !: se usa para indicar si es obligatorio o opcional el parámetro
const typeDefs = gql`
    type Administrador{
        id: ID!
        nombre: String!
        rut: Int!
        email: String!
    }
    
    type Conserje{
        id: ID!
        nombre: String!
        rut: Int!
        email: String!
    }
    
    type Directiva{
        id: ID!
        nombre: String
        rut: Int!
        email: String!
    }

    type EstadoDeCuenta{
        id: ID!
        residente: ID
        morosidad: Boolean
        multas: [ID]
        gastoscomuneslista: [ID]
        reservas: [ID]
    }
    
    type GastosComunes{
        id: ID!
        fecha: String!
        monto: Int!
        detalle: String
        pagado: Boolean!
        residente: ID!
    }
    
    type Instalacion{
        id: ID!
        nombre: String!
        monto: Int!
        reservas: [ID]
        estado: String!
    }
    
    type LibroReservas{
        id: ID!
        reservas: [ID]
    }
    
    type Multa{
        id: ID!
        residente: ID!
        fecha: String!
        monto: Int!
        detalle: String!
        pagado: Boolean!
    }
    
    type Reserva{
        id: ID!
        fecha: String
        pagado: Boolean
        instalacion: ID
        residente: ID
    }

    type Residente{
        id: ID!
        nombre: String!
        rut: Int!
        email: String!
        estadodecuenta: ID!
    }

    type Anuncio{
        id: ID!
        titulo: String!
        mensaje: String!
        fecha: String!
        autor: String!
    }

    input AdminInput{
        nombre: String
        rut: Int
        email: String
    }

    input AnuncioInput{
        titulo: String
        mensaje: String
        fecha: String
        autor: String
    }
    
    input ConserjeInput{
        nombre: String
        rut: Int
        email: String
    }

    input DirectivaInput{
        nombre: String
        rut: Int
        email: String
    }

    input EstadoDeCuentaInput{
        residente: ID
        morosidad: Boolean
        multas: [ID]
        gastoscomuneslista: [ID]
        reservas: [ID]
    }
    
    input GastosComunesInput{
        fecha: FechaInput
        monto: Int
        detalle: String
        pagado: Boolean
        residente: ID
        estadodecuenta: ID
    }

    input InstalacionInput{
        nombre: String!
        monto: Int!
        estado: String!
    }

    input LibroReservasInput{
        reservas: [ReservaInput]
    }

    input MultaInput{
        residente: ID!
        fecha: FechaInput
        monto: Int
        detalle: String
        pagado: Boolean
    }

    input ReservaInput{
        fecha: FechaInput
        pagado: Boolean
        instalacion: ID
        residente: ID
        estadodecuenta: ID
    }

    input ResidenteInput{
        rut: Int
        email: String
        nombre: String
    }

    input FechaInput{
        anio: Int
        mes: Int
        dia: Int
        hora: Int
    }

    type Alert{
        message: String
    }
    
    type Query{
        getAdministrador(id: ID!): Administrador
        getAdministradores: [Administrador]
        
        getConserje(id: ID!): Conserje
        getConserjes: [Conserje]

        getDirectiva(id: ID!): Directiva
        getDirectivas: [Directiva]

        getEstadoDeCuenta(id: ID!): EstadoDeCuenta
        getEstadosDeCuentas: [EstadoDeCuenta]
        
        getGastoComun(id: ID!): GastosComunes
        getGastosComunes: [GastosComunes]

        getInstalacion(id: ID!): Instalacion
        getInstalaciones: [Instalacion]

        getLibroReservas(id: ID!): LibroReservas
        
        
        getMulta(id: ID!): Multa
        getMultas: [Multa]

        getReserva(id: ID!): Reserva
        getReservas: [Reserva]

        getResidente(id: ID!): Residente
        getResidentes: [Residente]

        getAnuncio(id: ID!): Anuncio
        getAnuncios: [Anuncio]

        getAreasLibres(input: FechaInput): [Instalacion]

        getMorosos: [Residente]
    }
    
    type Mutation{
        addAdministrador(input: AdminInput): Administrador
        updateAdministrador(id: ID!, input: AdminInput): Administrador
        deleteAdministrador(id: ID!): Alert

        addAnuncio(input: AnuncioInput): Anuncio
        updateAnuncio(id: ID!, input: AdminInput): Anuncio
        deleteAnuncio(id: ID!): Alert
        
        addConserje(input: ConserjeInput): Conserje
        updateConserje(id: ID!, input: ConserjeInput): Conserje
        deleteConserje(id: ID!): Alert
        
        addDirectiva(input: DirectivaInput): Directiva
        updateDirectiva(id: ID!, input: DirectivaInput): Directiva
        deleteDirectiva(id: ID!): Alert
        
        addEstadoDeCuenta(input: EstadoDeCuentaInput): EstadoDeCuenta
        updateEstadoDeCuenta(id: ID!, input: EstadoDeCuentaInput): EstadoDeCuenta
        deleteEstadoDeCuenta(id: ID!): Alert

        addGastosComunes(input: GastosComunesInput): GastosComunes
        updateGastosComunes(id: ID!, input: GastosComunesInput): GastosComunes
        deleteGastosComunes(id: ID!): Alert

        addInstalacion(input: InstalacionInput): Instalacion
        updateInstalacion(id: ID!, input: InstalacionInput): Instalacion
        deleteInstalacion(id: ID!): Alert

        addLibroReservas(input: LibroReservasInput): LibroReservas
        updateLibroReservas(id: ID!, input: LibroReservasInput): LibroReservas
        deleteLibroReservas(id: ID!): Alert
        
        addMulta(input: MultaInput): Multa
        updateMulta(id: ID!, input: MultaInput): Multa
        deleteMulta(id: ID!): Alert

        addReserva(input: ReservaInput): Reserva
        updateReserva(id: ID!, input: ReservaInput) : Reserva 
        deleteReserva(id: ID!): Alert

        addResidente(input: ResidenteInput): Residente
        updateResidente(id: ID!, input: ResidenteInput): Residente
        deleteResidente(id: ID!): Alert
    }

`

//el que hace la pega

const resolvers = {
    Query: {
        // query admin
        async getAdministrador(obj,{id}){
            const admin= await Administrador.findById(id);
            return admin;
        },
        async getAdministradores(obj){
            const admins= await Administrador.find();
            return admins;
        },
        //query conserje
        async getConserje(obj,{id}){
            const conserje = Conserje.findById(id);
            return conserje;
        },
        async getConserjes(obj){
            const conserjes= await Conserje.find();
            return conserjes;
        },
        //query directiva
        async getDirectiva(obj,{id}){
            const directiva = Directiva.findById(id);
            return directiva;
        },
        async getDirectivas(obj){
            const directiva = await Directiva.find();
            return directiva;
        },

        //query estadodecuenta
        async getEstadoDeCuenta(obj,{id}){
            const estadodecuenta = EstadoDeCuenta.findById(id);
            return estadodecuenta;
        },
        async getEstadosDeCuentas(obj){
            const estadodecuenta = await EstadoDeCuenta.find();
            return estadodecuenta;
        },
        //query gastoscomunes
        async getGastoComun(obj,{id}){
            const gastocomun = GastosComunes.findById(id);
            return gastocomun;
        },
        async getGastosComunes(obj){
            const gastoscomunes= await GastosComunes.find();
            return gastoscomunes;
        },

        //query instalacion
        async getInstalacion(obj,{id}){
            const instalacion = Instalacion.findById(id);
            return instalacion;
        },
        async getInstalaciones(obj){
            const instalaciones= await Instalacion.find();
            return instalaciones;
        },
        //query libroreservas
        async getLibroReservas(obj, { id }){
            const libroreservas = await LibroReservas.findById(id);
            return libroreservas;
        },
        //query multas
        async getMultas(obj){
            const multas = await Multa.find();
            return multas;
        },
        async getMulta(obj, { id }){
            const multa = await Multa.findById(id);
            return multa;
        },
        //query reserva
        async getReservas(obj){
            const reservas = await Reserva.find();
            return reservas;
        },
        async getReserva(obj, { id }){
            const reserva = await Reserva.findById(id);
            return reserva;
        },

        //query residente
        async getResidente(obj,{id}){
            const residente = Residente.findById(id);
            return residente;
        },
        async getResidentes(obj){
            const residentes= await Residente.find();
            return residentes;
        },

         //query anuncios
         async getAnuncio(obj,{id}){
            const anuncio = Anuncio.findById(id);
            return anuncio;
        },
        async getAnuncios(obj){
            const anuncios= await Anuncio.find();
            return anuncios;
        },
        //query areas libres
        async getAreasLibres(obj, {input}){
            // Transformar fecha string a fecha ISO
            console.log(input.anio, input.mes, input.dia, input.hora);
            const fechaISO = new Date(input.anio,input.mes,input.dia,input.hora).toISOString();
            // Todas las instalaciones
            const instalaciones = await Instalacion.find();
            // Buscamos entre sus reservas la fecha
            let areasOcupadas = [];
            // console.log(instalaciones.length)
            for (let i = 0; i < instalaciones.length; i++) {
                const reservas = await Reserva.find();
                for (let j = 0; j < reservas.length; j++) {
                    const uno = new Date(reservas[j].fecha).getTime();
                    const dos = new Date(fechaISO).getTime();
                    if(uno - dos === 0){
                        // console.log("Instalacion ocupada");
                        areasOcupadas.push(instalaciones[i]);
                    }
                    else{
                        // console.log("Instalacion libre");
                    }
                }
            }
            // Ver cuales estan libres
            let areasLibres = [];
            for (let i = 0; i < instalaciones.length; i++) {
                let ocupada = false;
                for (let j = 0; j < areasOcupadas.length; j++) {
                    if(instalaciones[i].id == areasOcupadas[j].id){
                        ocupada = true;
                    }
                }
                if(!ocupada){
                    areasLibres.push(instalaciones[i]);
                }
            }
            return areasLibres;
        },
        //query get morosos
        async getMorosos(obj){
            const morosos = await EstadoDeCuenta.find({morosidad: true});
            // Por cada id de residente en morosos, buscar el residente y agregarlo a un arreglo
            const residentesMorosos = [];
            for (let i = 0; i < morosos.length; i++) {
                const residente = await Residente.findById(morosos[i].residente);
                residentesMorosos.push(residente);
            }
            return residentesMorosos;
        }
    },
    
    Mutation: {
        //mutation administrador
        async updateAdministrador(obj, { id, input }){
            const Administrador = await Administrador.findByIdAndUpdate(id, input);
            return Administrador;
        },
        async deleteAdministrador(obj, { id }){
            await Administrador.deleteOne({ _id: id});
            return {
                message: "Administrador Eliminado"
            }
        },
        async addAdministrador(obj, { input }){
            const administrador = new Administrador(input);
            await administrador.save();
            return administrador;
        },

        //mutation conserje
        async updateConserje(obj, { id, input }){
            const conserje = await Conserje.findByIdAndUpdate(id, input);
            return conserje;
        },
        async deleteConserje(obj, { id }){
            await Conserje.deleteOne({ _id: id});
            return {
                message: "Conserje Eliminado"
            }
        },
        async addConserje(obj, { input }){
            const conserje = new Conserje(input);
            await conserje.save();
            return conserje;
        },

        //mutation directiva
        async updateDirectiva(obj, { id, input }){
            const directiva = await Directiva.findByIdAndUpdate(id, input);
            return directiva;
        },
        async deleteDirectiva(obj, { id }){
            await Directiva.deleteOne({ _id: id});
            return {
                message: "Directiva Eliminada"
            }
        },
        async addDirectiva(obj, { input }){
            const directiva = new Directiva(input);
            await directiva.save();
            return directiva;
        },
        //mutation estadodecuenta
        async updateEstadoDeCuenta(obj, { id, input }){
            const estadodecuenta = await EstadoDeCuenta.findByIdAndUpdate(id, input);
            return estadodecuenta;
        },
        async deleteEstadoDeCuenta(obj, { id }){
            // get all EstadoDeCuenta
            const estadodecuentas = await EstadoDeCuenta.find();
            // get all residentes
            const residentes = await Residente.find();
            // check whichs estado de cuenta are not in use
            let estadodecuentasInUse = [];
            for (let i = 0; i < residentes.length; i++) {
                for (let j = 0; j < estadodecuentas.length; j++) {
                    if(residentes[i].estadodecuenta == estadodecuentas[j].id){
                        estadodecuentasInUse.push(estadodecuentas[j]);
                    }
                }
            }
            // check whichs estado de cuenta are not in use
            let estadodecuentasNotInUse = [];
            for (let i = 0; i < estadodecuentas.length; i++) {
                let inUse = false;
                for (let j = 0; j < estadodecuentasInUse.length; j++) {
                    if(estadodecuentas[i].id == estadodecuentasInUse[j].id){
                        inUse = true;
                    }
                }
                if(!inUse){
                    estadodecuentasNotInUse.push(estadodecuentas[i]);
                }
            }
            // delete the one that is not in use
            for (let i = 0; i < estadodecuentasNotInUse.length; i++) {
                await EstadoDeCuenta.deleteOne({ _id: estadodecuentasNotInUse[i].id});
            }
            return {
                message: "EstadoDeCuenta Eliminado"
            }
        },
        async addEstadoDeCuenta(obj, { input }){
            const fechaGastosComunes = new Date().toISOString();
            input.fecha = fechaGastosComunes;
            const estadodecuenta = new EstadoDeCuenta(input);
            await estadodecuenta.save();
            return estadodecuenta;
        }, 
        //mutation gastoscomunes
        async updateGastosComunes(obj, { id, input }){
            let fechaISO = new Date(input.fecha.anio, input.fecha.mes);
            var inputNuevo = {
                fecha: fechaISO,
                pagado: input.pagado,
                residente: input.residente,
                estadodecuenta: input.estadodecuenta,
                monto: input.monto,
                detalle: input.detalle
            }
            const gastoscomunes = await GastosComunes.findByIdAndUpdate(id, inputNuevo);
            return gastoscomunes;
        },
        async deleteGastosComunes(obj, { id }){
            await GastosComunes.deleteOne({ _id: id});
            return {
                message: "Gasto Comun Eliminado"
            }
        },
        async addGastosComunes(obj, { input }){
            const estadodecuentaObjeto = await EstadoDeCuenta.findById(input.estadodecuenta);
            let fechaISO = new Date(input.fecha.anio, input.fecha.mes);
            var inputNuevo = {
                fecha: fechaISO,
                pagado: input.pagado,
                residente: input.residente,
                estadodecuenta: input.estadodecuenta,
                monto: input.monto,
                detalle: input.detalle
            }
            const gastoscomunes = new GastosComunes(inputNuevo);
            if (estadodecuentaObjeto.gastoscomuneslista == undefined){
                estadodecuentaObjeto.gastoscomuneslista = [];
            }
            estadodecuentaObjeto.gastoscomuneslista.push(gastoscomunes);
            
            await gastoscomunes.save();
            await estadodecuentaObjeto.save();

            return gastoscomunes;
        },
        
        //mutation instalacion
        async updateInstalacion(obj, { id, input }){
            const instalacion = await Instalacion.findByIdAndUpdate(id, input);
            return instalacion;
        },
        async deleteInstalacion(obj, { id }){
            await Instalacion.deleteOne({ _id: id});
            return {
                message: "Instalacion Eliminada"
            }
        },
        async addInstalacion(obj, { input }){
            const instalacion = new Instalacion(input);
            await instalacion.save();
            return instalacion;
        }, 
        //mutation libroreservas
        async updateLibroReservas(obj, { id, input }){
            const libroreservas = await LibroReservas.findByIdAndUpdate(id, input);
            return libroreservas;
        },
        async deleteLibroReservas(obj, { id }){
            await LibroReservas.deleteOne({ _id: id});
            return {
                message: "Libro de reservas Eliminado"
            }
        },
        async addLibroReservas(obj, { input }){
            const libroReservas = new LibroReservas(input);
            await libroReservas.save();
            return libroReservas;
        }, 
        //mutation multas
        async updateMulta(obj, { id, input }){
            const multa = await Multa.findByIdAndUpdate(id, input);
            return multa;
        },
        async deleteMulta(obj, { id }){
            await Multa.deleteOne({ _id: id});
            return {
                message: "Multa Eliminada"
            }
        },
        async addMulta(obj, { input }){
            const residente = await Residente.findById(input.residente);
            const estadodecuenta = await EstadoDeCuenta.findOne({ residente: residente });
            let fechaISO = new Date(input.fecha.anio, input.fecha.mes, input.fecha.dia, input.fecha.hora);
            input.fecha = fechaISO;
            const multa = new Multa(input);
            if (estadodecuenta.multas === undefined){
                estadodecuenta.multas = [];
            }
            estadodecuenta.multas.push(multa)
            await estadodecuenta.save();
            await multa.save();
            return multa;
        },
        
        //mutation reserva
        async updateReserva(obj, { id, input }){
            const reserva = await Reserva.findByIdAndUpdate(id, input);
            return reserva;
        },
        async deleteReserva(obj, { id }){
            await Reserva.deleteOne({ _id: id});
            return {
                message: "Reserva Eliminada"
            }
        },
        async addReserva(obj, { input }){
            const instalacionObjeto = await Instalacion.findById(input.instalacion);
            const LibroObjeto = await LibroReservas.findById("6330d13b8fd77b5585c63f4b")
            const estadodecuentaObjeto = await EstadoDeCuenta.findById(input.estadodecuenta);
            // console.log(input.fecha);
            let fechaISO = new Date(input.fecha.anio, input.fecha.mes, input.fecha.dia, input.fecha.hora);
            input.fecha = fechaISO;
            const reservaObjeto = new Reserva(input);
            if (estadodecuentaObjeto.reservas === undefined){
                estadodecuentaObjeto.reservas = [];
            }
            estadodecuentaObjeto.reservas.push(reservaObjeto)
            if (LibroObjeto.reservas === undefined){
                LibroObjeto.reservas = [];
            }
            LibroObjeto.reservas.push(reservaObjeto);
            if (instalacionObjeto.reservas === undefined){
                instalacionObjeto.reservas = [];
            }
            instalacionObjeto.reservas.push(reservaObjeto);
            await reservaObjeto.save();
            await LibroObjeto.save();
            await estadodecuentaObjeto.save();
            await instalacionObjeto.save();
            return reservaObjeto;
        },

        //mutation residente
        async updateResidente(obj, { id, input }){
            const residente = await Residente.findByIdAndUpdate(id, input);
            return residente;
        },
        async deleteResidente(obj, { id }){
            var res = Residente.findById(id);
            var estadodecuenta = EstadoDeCuenta.findById(res.estadodecuenta);
            var reservas = estadodecuenta.reservas;
            var multas = estadodecuenta.multas;
            var gastoscomunes = estadodecuenta.gastoscomunes;
            if (gastoscomunes !== undefined){
                for (var i = 0; i < gastoscomunes.length; i++){
                    await GastosComunes.deleteOne({ _id: gastoscomunes[i].id});
                }
            }
            if (multas !== undefined){
                for (var i = 0; i < multas.length; i++){
                    await Multa.deleteOne({ _id: multas[i].id});
                }
            }
            if (reservas !== undefined){
                for (var i = 0; i < reservas.length; i++){
                    await Reserva.deleteOne({ _id: reservas[i].id});
                }
            }
            await EstadoDeCuenta.deleteOne({ _id: estadodecuenta.id});
            await Residente.findByIdAndRemove(id);
            return {
                message: "Residente Eliminado"
            }
        },
        async addResidente(obj, { input }){
            const residenteObjeto = new Residente(input);
            const estadodecuentaObjeto = new EstadoDeCuenta({
                residente: residenteObjeto,
                morosidad: false,
            });
            residenteObjeto.estadodecuenta = estadodecuentaObjeto.id;
            residenteObjeto.multas = [];
            residenteObjeto.reservas = [];
            residenteObjeto.gastoscomunes = [];
            await estadodecuentaObjeto.save();
            await residenteObjeto.save();
            return residenteObjeto;
        }, 
        
        //mutation anuncio
        async updateAnuncio(obj, { id, input }){
            const anuncio = await Anuncio.findByIdAndUpdate(id, input);
            return anuncio;
        },
        async deleteAnuncio(obj, { id }){
            await Anuncio.deleteOne({ _id: id});
            return {
                message: "Anuncio Eliminado"
            }
        },
        async addAnuncio(obj, { input }){
            const fechaAnuncio = new Date().toISOString();
            input.fecha = fechaAnuncio;
            const anuncio = new Anuncio(input);
            await anuncio.save();
            return anuncio;
        },
    },
};

let apolloServer = null;
const corsOptions = {
    origin: "http://localhost:8090",
    credentials: false
}

async function startServer(){
    const apolloServer = new ApolloServer({typeDefs, resolvers, corsOptions});
    await apolloServer.start();

    apolloServer.applyMiddleware({ app, cors: false});

}
startServer();

const app = express();
app.use(cors());
app.listen(8090, () => console.log('Servidor Iniciado'));
