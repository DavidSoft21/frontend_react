import React from "react";
import { Link, Navigate } from "react-router-dom";

class Crear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      apellido: "",
      razon_social: "",
      cedula: "",
      telefono: "",
      pais: "",
      ciudad: "",
      send: false,
    };
  }

  cambioValor = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ state });
  };
  enviarDatos = (e) => {
    e.preventDefault();

    const { nombre, apellido, razon_social, cedula, telefono, pais, ciudad } =
      this.state;
    // console.log(nombre);
    // console.log(apellido);
    // console.log(razon_social);
    // console.log(cedula);
    // console.log(telefono);
    // console.log(pais);
    // console.log(ciudad);

    let data = {
      nombre: nombre,
      apellido: apellido,
      razon_social: razon_social,
      cedula: cedula,
      telefono: telefono,
      pais: pais,
      ciudad: ciudad,
    };

    // Validación de campos vacíos
    if (
      !nombre ||
      !apellido ||
      !razon_social ||
      !cedula ||
      !telefono ||
      !pais ||
      !ciudad
    ) {
      alert("Por favor, rellene todos los campos antes de enviar.");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(`${process.env.REACT_APP_API}/empleados`, requestOptions)
      .then((resultado) => resultado.json())
      .then((resultado) => {
        // console.log(resultado);
        alert("Datos guardados");
        this.setState({ send: true });
      })
      .catch(console.log);
  };

  render() {
    const {
      send,
      nombre,
      apellido,
      razon_social,
      cedula,
      telefono,
      pais,
      ciudad,
    } = this.state;

    if (send === true) {
      return <Navigate to="/" />;
    }

    return (
      <div className="card">
        <h5 className="card-header">Agregar Empleado</h5>
        <div className="card-body">
          <form onSubmit={this.enviarDatos}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre:
              </label>
              <input
                name="nombre"
                value={nombre}
                onChange={this.cambioValor}
                type="text"
                placeholder="nombre"
                className="form-control"
                id="nombre"
                aria-describedby="nombre"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">
                Apellido:
              </label>
              <input
                name="apellido"
                value={apellido}
                onChange={this.cambioValor}
                type="text"
                placeholder="apellido"
                className="form-control"
                id="apellido"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="razon_social" className="form-label">
                Razón Social:
              </label>
              <input
                name="razon_social"
                value={razon_social}
                onChange={this.cambioValor}
                type="text"
                placeholder="razón social"
                className="form-control"
                id="razon_social"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cedula" className="form-label">
                Cédula:
              </label>
              <input
                name="cedula"
                value={cedula}
                onChange={this.cambioValor}
                type="text"
                placeholder="cédula"
                className="form-control"
                id="cedula"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">
                Teléfono:
              </label>
              <input
                name="telefono"
                value={telefono}
                onChange={this.cambioValor}
                type="text"
                placeholder="teléfono"
                className="form-control"
                id="telefono"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pais" className="form-label">
                País:
              </label>
              <input
                name="pais"
                value={pais}
                onChange={this.cambioValor}
                type="text"
                placeholder="país"
                className="form-control"
                id="pais"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ciudad" className="form-label">
                Ciudad:
              </label>
              <input
                name="ciudad"
                value={ciudad}
                onChange={this.cambioValor}
                type="text"
                placeholder="ciudad"
                className="form-control"
                id="ciudad"
              />
            </div>
            <div className="bnt-group" role="group">
              <button className="btn btn-success align-left" type="submit">
                crear
              </button>
              <button className="btn btn-danger align-right" type="">
                cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Crear;
