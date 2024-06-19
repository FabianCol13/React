import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';

export default function ListadoEmpleados() {

    const urlBase ="http://localhost:8080/rh-sena/empleados";
    const[empleados, setEmpleados] = useState([]);


    useEffect(() => {
        cargarEmpleados();
    }, []);

    const cargarEmpleados = async () => {
        try {
            const resultado = await axios.get(urlBase);
            console.log("Resultado cargar empleados");
            console.log(resultado.data);
            setEmpleados(resultado.data);
        } catch (error) {
            console.error("Error al cargar empleados:", error);
            
        }
    }

  return (
    <div className="container">
        <div className="container text-center" style={{margin: "30px"}}>
            <h3>Sistema de Recursos Humanos</h3>
        </div>

        <table className="table table-striped table-hover align-middle">
        <thead className='table-dark'>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Empleado</th>
            <th scope="col">Departamento</th>
            <th scope="col">Sueldo</th>
            </tr>
        </thead>
        <tbody>
            {
            //Iteramos el arreglo de empleados
            empleados.map((empleado, indice) => (
                <tr key={indice}>
                <th scope="row">{empleado.idEmpleado}</th>
                <td>{empleado.nombreEmpleado}</td>
                <td>{empleado.departamentoEmpleado}</td>
                <td><NumericFormat value={empleado.sueldoEmpleado}
                    displayType={'text'}
                    thousandSeparator=',' prefix={'$'}
                    decimalScale={2} fixedDecimalScale/>
                </td>
            </tr>
            ))
            }
        </tbody>
        </table>

    </div>
  )
}