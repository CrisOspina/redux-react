import React, { Component } from 'react';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as tareasActions from '../../actions/tareasAction';

class Guardar extends Component {

  componentDidMount() {
    const { 
      match: { params: { usu_id, tar_id } }, 
      tareas, cambioUsuarioId, cambioTitulo, limpiarForma } = this.props;

      if(usu_id && tar_id){
        const tarea = tareas[usu_id][tar_id];
        cambioUsuarioId(tarea.userId);
        cambioTitulo(tarea.title);
      } else {
        limpiarForma();
      }
  } 

  handleCambioUsuarioId = (e) => {
    this.props.cambioUsuarioId(e.target.value);
  }

  handleCambioTitulo = (e) => {
    this.props.cambioTitulo(e.target.value);
  }

  handleGuardar = (e) => {
    const { usuario_id, titulo, agregar, 
      match: { params: { usu_id, tar_id } }, tareas, editar } = this.props;
    
    const nueva_tarea = {
      userId: usuario_id,
      title: titulo,
      completed: false
    }

    if(usu_id && tar_id){
      const tarea = tareas[usu_id][tar_id];
      const tarea_editada = {
        ...nueva_tarea,
        completed: tarea.completed,
        id: tarea.id
      }
      editar(tarea_editada)
    }
    else {
      agregar(nueva_tarea);
    }
  }

  handleDeshabilitar = () => {
    const { titulo, usuario_id, loading } = this.props;
    if(loading) return true;

    if(!usuario_id || !titulo) return true;

    return false;
  }

  mostrarAccion = () => {
    const { error, loading } = this.props;
    if(loading) return <Spinner />;
    if(error) return <Fatal mensaje={error}/>
  }

  render() {
    const { regresar, usuario_id, titulo } = this.props;
    return (
      <>
        { (regresar) ? <Redirect to='/tareas' /> : '' } 
        <h1>Guardar Tarea</h1>
        Usuario id:
        <input 
          type="number"
          value={usuario_id}
          onChange={this.handleCambioUsuarioId}

        /><br/><br/>
        Titulo:
        <input 
          type="text"
          value={titulo}
          onChange={this.handleCambioTitulo}
        /><br/><br/>
        <button 
          onClick={this.handleGuardar}
          disabled={this.handleDeshabilitar()}
        >
          Guardar
        </button>
        { this.mostrarAccion() }
      </>
    )
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);
