import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './css/index.css';
import './css/iconos.css';
import Usuarios from './components/Usuarios';
import Publicaciones from './components/publicaciones/Publicaciones';
import Tareas from './components/tareas/Tareas';
import Menu from './components/Menu';
import TareasGuardar from './components/tareas/Guardar';

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu /> 
      <div id="margen">
        <Switch>
          <Route exact path="/" component={Usuarios}/>
          <Route exact path="/usuarios" component={Usuarios}/>
          <Route exact path="/tareas" component={Tareas}/>
          <Route exact path="/tareas/guardar" component={TareasGuardar}/>
          <Route exact path="/tareas/guardar/:usu_id/:tar_id" component={TareasGuardar}/>
          <Route exact path="/publicaciones/:key" component={Publicaciones}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default Routes;