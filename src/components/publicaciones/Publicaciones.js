/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../general/Spinner';
import Comentarios from './Comentarios';
import Loading from '../general/Spinner';
import Fatal from '../general/Fatal';
import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { 
  traerPorUsuario: publicacionestraerPorUsuario, 
  abrirCerrar, traerComentarios 
} = publicacionesActions;

class Publicaciones extends Component {

  async componentDidMount() {
    const { 
      match: { params: { key } },
      usuariosTraerTodos, publicacionestraerPorUsuario
    } = this.props

    if(!this.props.usuariosReducer.usuarios.length) { 
      await usuariosTraerTodos();
    }

    if(this.props.usuariosReducer.error) return;

    if(!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])){
      await publicacionestraerPorUsuario(key);
    }
  }

  ponerUsuario = () => {
    const { usuariosReducer, match: { params: { key } } } = this.props;

    if(usuariosReducer.error) return <Fatal mensaje={usuariosReducer.error}/>
    if(!usuariosReducer.usuarios.length || usuariosReducer.loading) return <Spinner />

    const nombre = usuariosReducer.usuarios[key].name;

    return ( <h1>publicaciones de { nombre }</h1> )
  };

// /**********************************************************************/

  ponerPublicaciones = () => {
    const { 
      usuariosReducer, 
      usuariosReducer: { usuarios },
      publicacionesReducer, 
      publicacionesReducer: { publicaciones },
      match: { params: { key } }
    } = this.props;

    if(!usuarios.length) return;
    if(usuariosReducer.error) return;
    // if(publicacionesReducer.loading) return <Spinner />;
    if(publicacionesReducer.error) return <Fatal mensaje={publicacionesReducer.error} />
    if(!publicaciones.length) return;
    if(!('publicaciones_key' in usuarios[key])) return;

    const { publicaciones_key } = usuarios[key];

    return this.mostrarInfo(
      publicaciones[publicaciones_key],
      publicaciones_key
    )
  }

// /**********************************************************************/

  mostrarInfo = (publicaciones, pub_key) => (
    publicaciones.map((publicacion, com_key) => (
      <div key={ publicacion.id }
        onClick={ () => this.mostrarComentarios(pub_key, com_key, publicacion.comentarios) }
        className="pub_titulo">
        <h2>{ publicacion.title }</h2>
        <h3>{ publicacion.body }</h3>
        { (publicacion.abierto) ? <Comentarios comentarios={publicacion.comentarios}/> : '' }
      </div>
    ))
  )

// /**********************************************************************/
  
  mostrarComentarios = (pub_key, com_key, comentarios) => {
    this.props.abrirCerrar(pub_key, com_key);
    if(!comentarios.length){
      this.props.traerComentarios(pub_key, com_key);
    }
  }

  render() {
    console.log(this.props)
    return (
      <React.Fragment>
        { this.ponerUsuario() }
        { this.ponerPublicaciones() }
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
  return { usuariosReducer, publicacionesReducer };
}

const mapDispatchToProps = {
  usuariosTraerTodos,
  publicacionestraerPorUsuario,
  abrirCerrar,
  traerComentarios
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
