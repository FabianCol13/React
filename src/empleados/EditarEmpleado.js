import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditarEmpleado() {
  const urlBase = "http://localhost:8080/rh-sena/empleados";
  const navegacion = useNavigate();
  const { id } = useParams();

  const [empleado, setEmpleado] = useState({
    nombreEmpleado: "",
    departamentoEmpleado: "",
    sueldoEmpleado: "",
  });
  const { nombreEmpleado, departamentoEmpleado, sueldoEmpleado } = empleado;

  useEffect(()=>{
    cargarEmpleado();
},[])

const cargarEmpleado = async () => {
    const resultado = await axios.get(`${urlBase}/${id}`)
    
    setEmpleado(resultado.data);
}


  const onIputChange = (e) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${urlBase}/${id}`,empleado)
      navegacion("/");
    } catch (error) {
      console.error("Error al guardar empleado:", error);
    }
  };

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Editar Empleado</h3>
      </div>

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="nombreEmpleado" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombreEmpleado"
            name="nombreEmpleado"
            value={nombreEmpleado}
            onChange={onIputChange}
            required={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="departamentoEmpleado" className="form-label">
            Departamento
          </label>
          <input
            type="text"
            className="form-control"
            id="departamentoEmpleado"
            name="departamentoEmpleado"
            value={departamentoEmpleado}
            onChange={onIputChange}
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
            id="sueldoEmpleado"
            name="sueldoEmpleado"
            value={sueldoEmpleado}
            onChange={onIputChange}
          />
        </div>
        <div className="container text-center">
          <button type="submit" className="btn btn-primary me-3">
            Guardar
          </button>
          <a href="/" className="btn btn-danger">
            Volver
          </a>
        </div>
      </form>
    </div>
  );
}
