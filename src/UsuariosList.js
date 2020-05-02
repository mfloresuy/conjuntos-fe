import React from "react";
import {UsuarioListItem} from "./UsuarioListItem";

export class UsuariosList extends React.Component {
    constructor(props) {
        super(props);
        this.handleUsuarioSeleccionado = this.handleUsuarioSeleccionado.bind(this);
    }

    handleUsuarioSeleccionado(usuario) {
        this.props.handleUsuarioSeleccionado(usuario);
    }

    render() {
        const seleccionado = this.props.seleccionado;
        const juego = this.props.juego;
        const usuarios = this.props.usuarios.map(usuario => {
            return (
                <UsuarioListItem usuario={usuario}
                                 key={usuario.usuario}
                                 juego={juego}
                                 seleccionado={usuario.usuario === seleccionado}
                                 handleUsuarioSeleccionado={this.handleUsuarioSeleccionado}
                />
            )
        });

        return (
            <ul className="list-group mb-3">
                {usuarios}
            </ul>
        );
    }
}