import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const Menu = (props) => {
  return (
    <React.Fragment>
      <nav id="menu">
        <Link to="/usuarios">Usuarios</Link>
        <Link to="/tareas">Tareas</Link>
      </nav>
    </React.Fragment>
  )
}

export default Menu;