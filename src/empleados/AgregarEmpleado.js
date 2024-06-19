import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AgregarEmpleado() {

  let navegacion = useNavigate();

  const [empleado, setEmpleado] = useState({
    nombreEmpleado: "",
    departamentoEmpleado: "",
    sueldoEmpleado: "",
  });
  const { nombre, departamento, sueldo } = empleado;
  const onIputChange = (e) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const urlBase = "http://localhost:8080/rh-sena/empleados";
    await axios.post(urlBase, empleado);
    navegacion("/");
  };
  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Registrar Empleado</h3>
      </div>

      <form onSubmit={(e)=>onSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="nombreEmpleado" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombreEmpleado"
            name="nombreEmpleado"
            value={nombre}
            onChange={(e) => onIputChange(e)}
            required={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="depto" className="form-label">
            Departamento
          </label>
          <input
            type="text"
            className="form-control"
            id="depto"
            name="departamentoEmpleado"
            value={departamento}
            onChange={(e) => onIputChange(e)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="sueldoEmpleado" className="form-label">
            Sueldo
          </label>
          <input
            type="number"
            step="any"
            className="form-control"
            id="sueldo"
            name="sueldoEmpleado"
            value={sueldo}
            onChange={(e) => onIputChange(e)}
          />
        </div>
        <div className="container text-center">
          <button type="submit" className="btn btn-primary me-3">
            Registrar
          </button>
          <a href="/" className="btn btn-danger">
            Volver
          </a>
        </div>
      </form>
    </div>
  );
}
