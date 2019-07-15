import React, { Component } from 'react';
import Spinner from '../components/general/Spinner';
import Fatal from '../components/general/Fatal';
import Tabla from '../components/Tabla'
import { connect } from 'react-redux';
import * as usuariosActions from '../actions/usuariosActions';

class Usuarios extends Component {

  //get data
  componentDidMount(){
    if(!this.props.usuarios.length){ this.props.traerTodos() }
  }

  //get content - cargando, error, exitoso
  ponerContenido = () => {
    if(this.props.loading) return <Spinner />
    if(this.props.error) return <Fatal mensaje={this.props.error}/>
    return <Tabla />
  }

  render(){
    return (
      <React.Fragment>
        <h1> Usuarios </h1>
        { this.ponerContenido() }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
}

export default connect(mapStateToProps, usuariosActions)(Usuarios);