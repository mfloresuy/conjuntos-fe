export const Conjuntos = (function () {
    const caracteristicas = {
        relleno: {
            0: "solido",
            1: "rayado",
            2: "vacio"
        },
        color: {
            0: "rojo",
            1: "violeta",
            2: "verde"
        },
        figura: {
            0: "curva",
            1: "rombo",
            2: "elipse"
        },
        cantidad: {
            0: "uno",
            1: "dos",
            2: "tres"
        }
    };

    function obtenerColor(id) {
        const colorId = Math.floor(((id % 27) % 9 / 3));
        return caracteristicas.color[colorId];
    }

    function obtenerRelleno(id) {
        const rellenoId = Math.floor(id / 27);
        return caracteristicas.relleno[rellenoId];
    }

    function obtenerFigura(id) {
        const figuraId = Math.floor((id % 27) / 9);
        return caracteristicas.figura[figuraId];
    }

    function obtenerCantidad(id) {
        const cantidadId = ((id % 27) % 9) % 3;
        return caracteristicas.cantidad[cantidadId];
    }

    function crearMazo() {
        const mazo = [];
        for (let i = 1; i <= 81; i++) {
            mazo.push({
                "id": i,
                "color": obtenerColor(i - 1),
                "relleno": obtenerRelleno(i - 1),
                "figura": obtenerFigura(i - 1),
                "cantidad": obtenerCantidad(i - 1),
                "imagen": "imagenes/" + i + ".png"
            })
        }
        return shuffle(mazo);
    }

    function shuffle(cartas) {
        for (let i = cartas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = cartas[i];
            cartas[i] = cartas[j];
            cartas[j] = temp;
        }
        return cartas;
    }

    return {
        crearMazo: function () {
            return crearMazo();
        },

        timeOuts: {
            1: 2000,
            2: 2500
        },


        colorJuego: function (defaultColor, juego) {
            switch (juego) {
                case 1:
                    return "success";
                case 2:
                    return "danger";
                default:
                    return defaultColor;
            }
        },

        shuffle: function (cartas) {
            return shuffle(cartas);
        }

    }
})();