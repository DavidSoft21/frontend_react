import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

class Editar extends React.Component {
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

  cargarDatos(id) {
    fetch(`${process.env.REACT_APP_API}/empleados/${id}`)
      .then((resultado) => resultado.json())
      .then((data) => {
        this.setState({
          productosCargados: true,
          id: id,
          nombre: data.nombre,
          apellido: data.apellido,
          razon_social: data.razon_social,
          cedula: data.cedula,
          telefono: data.telefono,
          pais: data.pais,
          ciudad: data.ciudad,
          send: false,
        });
        console.log(data);
      })
      .catch(console.log);
  }

  enviarDatos = (e) => {
    e.preventDefault();

    const {
      id,
      nombre,
      apellido,
      razon_social,
      cedula,
      telefono,
      pais,
      ciudad,
    } = this.state;

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

    let data = {
      id: id,
      nombre: nombre,
      apellido: apellido,
      razon_social: razon_social,
      cedula: cedula,
      telefono: telefono,
      pais: pais,
      ciudad: ciudad,
    };

    const url = `${process.env.REACT_APP_API}/empleados/${id}`; // Cambia esto por la URL de tu API
    console.log(url, "url");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        alert("Empleado Actualizado");
        this.setState({ send: true });
      })
      .catch((error) => console.error("Error:", error));
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    // console.log(this.props.match.params.id);
    this.cargarDatos(id);
  }

  render() {
    const {
      send,
      id,
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
                editar
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

export default withRouter(Editar);
