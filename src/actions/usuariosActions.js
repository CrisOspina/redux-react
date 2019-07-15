import axios from 'axios';
import { TRAER_TODOS, LOADING, ERROR } from '../types/usuariosTypes';

export const traerTodos = () => 
  async (dispatch) => {
    
    dispatch({ type: LOADING });

    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      dispatch({
        type: TRAER_TODOS,
        payload: res.data
      })
    } catch(error) {
      dispatch({ type: ERROR, payload: 'Información de usuario no disponible'})
    }
}