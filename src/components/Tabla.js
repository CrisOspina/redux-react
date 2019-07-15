import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Tabla = (props) => {

  //get row data
  const ponerFilas = () => (
    props.usuarios.map((usuario, key) => (
      <tr key={usuario.id}>
        <td>{usuario.name}</td>
        <td>{usuario.email}</td>
        <td>{usuario.website}</td>
        <td>
          <Link to={ `/publicaciones/${key}` }>
            <div className="eye-solid icon"></div>
          </Link>
        </td>
      </tr>
    ))
  )

  return (
    <React.Fragment>
      <table className="tabla">
        <thead>
          <tr>
            <td><h3>Nombre</h3></td>
            <td><h3>Correo</h3></td>
            <td><h3>Enlace</h3></td>
          </tr>
        </thead>
        <tbody>
          { ponerFilas() }
        </tbody>
    </table>
    </React.Fragment>
  );
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
}

export default connect(mapStateToProps)(Tabla);


