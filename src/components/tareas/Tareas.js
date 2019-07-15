import React, { Component } from 'react';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as tareasActions from '../../actions/tareasAction';

class Tareas extends Component {
  componentDidMount() {
    const { tareas, loading, traerTodas } = this.props;
    if(!Object.keys(tareas).length && !loading){
      traerTodas()
    }
  }

  componentDidUpdate(){
    if(!Object.keys(this.props.tareas).length){
      this.props.traerTodas()
    }
  }

  mostrarContenido = () => {
    const { tareas, loading, error } = this.props;

    if(error) return <Fatal mensaje={error} />

    if(loading) return <Spinner />

    return Object.keys(tareas).map((usu_id) => (
      <div key={usu_id}>
        <h2>Usuario {usu_id}</h2>
        <div className="contenedor_tareas">
          { this.ponerTareas(usu_id) }
        </div>
      </div>
    ))
  }

  ponerTareas = (usu_id) => {
    const { tareas, cambioCheck, eliminar } = this.props;
    const por_usuario = {
      ...tareas[usu_id]
    }

    return Object.keys(por_usuario).map((tar_id) => (
      <div key={tar_id}>
        <input 
          type="checkbox" 
          defaultChecked={por_usuario[tar_id].completed} 
          onChange={() => cambioCheck(usu_id, tar_id)}  
        />
        { por_usuario[tar_id].title }

      <button className="m_left"> 
        <Link to={`/tareas/guardar/${usu_id}/${tar_id}`}> Editar </Link> 
      </button>
      <button 
        className="m_left"
        onClick={() => eliminar(tar_id)}
      > Eliminar </button>
      </div>
    ))
  }
  
  render() {
    return (
      <>
        <button>
          <Link to="/tareas/guardar">
            Agregar
          </Link>
        </button>
        { this.mostrarContenido() }
      </>
    )
  }
}

const mapToStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapToStateToProps, tareasActions)(Tareas);
