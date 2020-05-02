import React from "react";
import {Conjuntos} from "./Conjuntos";

export class Tarjeta extends React.Component {
    constructor(props) {
        super(props);
        this.handleSeleccionada = this.handleSeleccionada.bind(this);
    }

    handleSeleccionada() {
        this.props.cartaSeleccionada(this.props.tarjeta);
    }

    cardClass() {
        let cardClass = "card";
        if (this.props.seleccionada) {
            cardClass = cardClass + " bg-" + Conjuntos.colorJuego("primary", this.props.juego);
        }
        return cardClass;
    }

    render() {
        const tarjeta = this.props.tarjeta;
        return (
            <div className="col-3">
                <div className={this.cardClass()} onClick={this.handleSeleccionada}>
                    <img className="card-img p-1" src={tarjeta.imagen} alt={"Tarjeta " + this.props.id}/>
                </div>
            </div>
        )
    }
}