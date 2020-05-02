import {Conjuntos} from "./Conjuntos";

export const Tablero = (function () {
    let tablero = [];
    let mazo = [];

    function getCantidadMazo() {
        return mazo.length;
    }

    function obtenerCartas(cantPedidas) {
        const cantActual = Math.min(getCantidadMazo(), cantPedidas);
        if (cantActual > 0) {
            return mazo.splice(0, cantActual);
        }
        return [];
    }

    function remplazarCartas(cartas) {
        const nuevas = obtenerCartas(cartas.length);
        cartas.forEach(carta => {
            const idx = tablero.findIndex(c => c.id === carta.id);
            if (tablero.length > 0) {
                const nueva = nuevas.splice(0, 1);
                tablero.splice(idx, 1, nueva[0]);
            }
        });

    }

    function devolverCartasMazo(cartas) {
        cartas.forEach(carta => mazo.push(carta));
        mazo = Conjuntos.shuffle(mazo);
    }

    return {
        iniciarPartida: function () {
            mazo = Conjuntos.crearMazo();
            tablero = mazo.splice(0, 12);
            return tablero;
        },

        obtenerTablero: function () {
            return tablero;
        },

        remplazarCartas: function (cartas) {
            remplazarCartas(cartas);
        },

        devolverCartasMazo: function (cartas) {
            devolverCartasMazo(cartas);
        },

        pedirCartas: function (cant) {
            const cartasNuevas = obtenerCartas(cant);
            cartasNuevas.forEach(carta => tablero.push(carta));
        },

        getCantidadMazo: function () {
            return getCantidadMazo();
        }
    }
})();