import React from "react";
import { Link } from "react-router-dom";

class Listar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empleadosCargado: false,
      empleados: [],
    };
  }

  cargarDatos() {
    fetch(`${process.env.REACT_APP_API}/empleados`)
      .then((resultado) => {
        if (!resultado.ok) {
          throw new Error("Error al cargar los datos");
        }
        return resultado.json();
      })
      .then((data) => {
        this.setState({ empleadosCargado: true, empleados: data });
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  }

  eliminarDatos(id) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${process.env.REACT_APP_API}/empleados/${id}`, requestOptions)
      .then((resultado) => {
        if (!resultado.ok) {
          throw new Error("Error al eliminar los datos");
        }
        return resultado.json();
      })
      .then((data) => {
        console.log(data);
        this.cargarDatos();
      })
      .catch((error) => console.error("Error:", error));
  }

  componentDidMount() {
    this.cargarDatos();
  }

  render() {
    const { empleadosCargado, empleados } = this.state;
    if (!empleadosCargado) {
      return <div>Cargando...</div>;
    } else {
      return (
        <div className="card text-center">
          <div className="card-header">empleados</div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">NOMBRE</th>
                  <th scope="col">APELLIDO</th>
                  <th scope="col">RAZON SOCIAL</th>
                  <th scope="col">CEDULA</th>
                  <th scope="col">TELEFONO</th>
                  <th scope="col">PAIS</th>
                  <th scope="col">CIUDAD</th>
                </tr>
              </thead>
              <tbody>
                {empleados.map((empleado) => (
                  <tr key={empleado.id}>
                    <th scope="row"> {empleado.id} </th>
                    <td> {empleado.nombre} </td>
                    <td> {empleado.apellido} </td>
                    <td> {empleado.razon_social} </td>
                    <td> {empleado.cedula} </td>
                    <td> {empleado.telefono} </td>
                    <td> {empleado.pais} </td>
                    <td> {empleado.ciudad} </td>
                    <td>
                      <Link
                        className="btn btn-primary"
                        to={`/editar/${empleado.id}`}
                      >
                        editar
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          this.eliminarDatos(empleado.id);
                        }}
                      >
                        eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

export default Listar;
