import {ConjuntoUtils} from "./ConjuntoUtils";

export const Usuarios = (function () {

    const usuarios = {};

    function crearUsuario(nombre) {
        usuarios[nombre] = {
            "usuario": nombre,
            "cartas": []
        };
    }

    function agregarCartas(nombreUsuario, cartas) {
        const usuario = usuarios[nombreUsuario];
        cartas.forEach(t => usuario.cartas.push(t));
    }

    function sacarCartas(nombre, cant) {
        const usuario = usuarios[nombre];
        return usuario.cartas.splice(0, cant)
    }

    return {
        crearUsuarios: function (nombres) {
            nombres.forEach(nom => crearUsuario(nom));
            return usuarios;
        },

        agregarCartas: function (nombre, cartas) {
            agregarCartas(nombre, cartas);
        },

        sacarCartas: function (nombre, cantCartas) {
            return sacarCartas(nombre, cantCartas);
        },

        obtenerUsuarios: function () {
            return ConjuntoUtils.objArrayValues(usuarios);
        }
    }
})();