import React from "react";
import {Conjuntos} from "./Conjuntos";

export class UsuarioListItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleUsuarioSeleccionado = this.handleUsuarioSeleccionado.bind(this);
    }

    handleUsuarioSeleccionado() {
        this.props.handleUsuarioSeleccionado(this.props.usuario);
    }

    render() {
        const usuario = this.props.usuario;
        let className = "list-group-item d-flex justify-content-between";
        if (this.props.seleccionado) {
            className = className + " bg-" + Conjuntos.colorJuego("primary", this.props.juego) + " text-white";
        }
        return (

            <li className={className} key={usuario.usuario} onClick={this.handleUsuarioSeleccionado}>
                <div>
                    <h6 className="my-0">{usuario.usuario}</h6>
                </div>
                <span>{usuario.cartas.length}</span>
            </li>
        );
    }
}