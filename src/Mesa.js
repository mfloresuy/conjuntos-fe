import React from "react";
import {UsuariosList} from "./UsuariosList";
import {Conjuntos} from "./Conjuntos"
import {Tarjeta} from "./Tarjeta";
import {ConjuntoUtils} from "./ConjuntoUtils";
import {Usuarios} from "./Usuarios";
import {Tablero} from "./Tablero";

export class Mesa extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cantMazo: Tablero.getCantidadMazo(),
            seleccionadas: {},
            juego: 0,
            usuarioSeleccionado: null,
            mensaje: null
        };
        this.handleCartaSeleccionada = this.handleCartaSeleccionada.bind(this);
        this.handleUsuarioSeleccionado = this.handleUsuarioSeleccionado.bind(this);
        this.continuarTurno = this.continuarTurno.bind(this);
        this.pedirCartas = this.pedirCartas.bind(this);
        Usuarios.crearUsuarios(["Martin", "Romina"]);
        Tablero.iniciarPartida();
    }

    pedirCartas(e) {
        e.preventDefault();
        if (Tablero.obtenerTablero().length <= 12) {
            Tablero.pedirCartas(3);
            this.setState({
                "cantMazo": Tablero.getCantidadMazo()
            })
        }


    }

    handleUsuarioSeleccionado(usuario) {
        if (this.state.usuarioSeleccionado !== usuario.usuario) {
            this.setState({
                "usuarioSeleccionado": usuario.usuario,
                "juego": 0,
                "seleccionadas": []
            });
        } else {
            this.limpiarJugada();
        }
    }

    continuarTurno(usuarioSeleccionado, tarjetasSeleccionadas) {
        if (this.state.juego === 1) {
            Usuarios.agregarCartas(usuarioSeleccionado, tarjetasSeleccionadas);
            this.remplazarCartas(tarjetasSeleccionadas);
        } else if (this.state.juego === 2) {
            const cartasDevueltas = Usuarios.sacarCartas(usuarioSeleccionado, 3);
            Tablero.devolverCartasMazo(cartasDevueltas);
            this.setState({
                "cantMazo": Tablero.getCantidadMazo()
            });
        }
        this.limpiarJugada();
    }

    handleCartaSeleccionada(carta) {
        if (this.state.juego === 0 && this.state.usuarioSeleccionado) {
            let seleccionadas = this.state.seleccionadas;
            if (this.state.juego === 0) {
                if (seleccionadas.hasOwnProperty(carta.id)) {
                    delete seleccionadas[carta.id];
                } else {
                    seleccionadas[carta.id] = carta;
                    const cantSeleccionadas = Object.keys(seleccionadas).length;
                    if (cantSeleccionadas === 3) {
                        const tarjetasSeleccionadas = ConjuntoUtils.objArrayValues(seleccionadas);
                        const resultado = this.validarSeleccionadas(tarjetasSeleccionadas);
                        this.setState({"juego": resultado.juego});
                        setTimeout(this.continuarTurno, Conjuntos.timeOuts[resultado.juego], this.state.usuarioSeleccionado, tarjetasSeleccionadas);
                    }
                }
            }
            this.setState({"seleccionadas": seleccionadas});
        }
    }

    remplazarCartas(cartas) {
        Tablero.remplazarCartas(cartas);
        this.setState({
            "cantMazo": Tablero.getCantidadMazo(),
        });
    }

    validarSeleccionadas(tarjetasSeleccionadas) {
        const groupColor = ConjuntoUtils.groupBy(tarjetasSeleccionadas, "color");
        const cantColor = Object.keys(groupColor).length;

        const groupFigura = ConjuntoUtils.groupBy(tarjetasSeleccionadas, "figura");
        const cantFigura = Object.keys(groupFigura).length;

        const groupCantidad = ConjuntoUtils.groupBy(tarjetasSeleccionadas, "cantidad");
        const cantCantidad = Object.keys(groupCantidad).length;

        const groupRelleno = ConjuntoUtils.groupBy(tarjetasSeleccionadas, "relleno");
        const cantRelleno = Object.keys(groupRelleno).length;

        const ok = cantCantidad !== 2 && cantColor !== 2 && cantFigura !== 2 && cantRelleno !== 2;

        return {
            juego: ok ? 1 : 2,
            color: cantColor,
            relleno: cantRelleno,
            figura: cantFigura,
            cantidad: cantCantidad
        };
    }

    limpiarJugada() {
        this.setState({
            "usuarioSeleccionado": null,
            "juego": 0,
            "seleccionadas": []
        });
    }


    render() {
        const seleccionadas = this.state.seleccionadas;
        const juego = this.state.juego;
        const tablero = Tablero.obtenerTablero().map(carta => {
            return <Tarjeta key={carta.id}
                            tarjeta={carta}
                            seleccionada={seleccionadas.hasOwnProperty(carta.id)}
                            juego={juego}
                            cartaSeleccionada={this.handleCartaSeleccionada}
            />
        });
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Mazo</span>
                            <span
                                className={"badge badge-" + Conjuntos.colorJuego("secondary", juego) + " badge-pill"}>{Tablero.getCantidadMazo()}</span>
                        </h4>

                        <UsuariosList seleccionado={this.state.usuarioSeleccionado}
                                      juego={juego}
                                      usuarios={Usuarios.obtenerUsuarios()}
                                      handleUsuarioSeleccionado={this.handleUsuarioSeleccionado}
                        />

                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <a onClick={this.pedirCartas} href="#" className="btn btn-primary my-2 text-white">Dame
                                cartas</a>
                        </h4>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            {tablero}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}