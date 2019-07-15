### ¿Qúe es Redux?
Es una herramienta de uso libre que nos permite manipular todo el estado de nuestra aplicación en un solo lugar (store).
"Redux es un contenedor predecible del estado de aplicaciones JavaScript".

#### Principios
- Almacenamiento
- Inmutable
- Centralizado

#### Fases
![1](https://user-images.githubusercontent.com/38017835/61195707-6fef5200-a68f-11e9-8558-f96219b13983.PNG)

- **Store:** El store contiene todo el árbol de estado de tu aplicación. La única forma de cambiar el estado que contiene es despachando una acción. El store no es una clase.
 - Características:
   * Contiene el estado de la aplicación
   * Permite el acceso al estado vía getState()
   * Permite que el estado sea actualizado vía dispatch (action)
 - **Provider:** Es el componente que nos facilita Redux donde cubre toda nuestra aplicación para que puedan comunicarse todos los componentes.

 - **Redux Thunk:** Permite a las actions creators invertir el control despachando funciones asíncronas.
Van a recibir el dispatch como argumento y capaz llamarlo asíncronamente. Estas funciones son llamadas thunks.

Ejemplo - store, provider, redux thunk:
	
```javascript
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import reduxThunk from 'redux-thunk';

const store = createStore(
 	reducers,
  	{},
  	applyMiddleware(reduxThunk)
);

ReactDOM.render(  
  	<Provider store={store}>
    	<Routes />
  	</Provider>,
  	document.getElementById('root')
);
```
   
#### "El estado de toda la aplicación esta almacenado en un árbol guardado en un único store"

- **Actions:** Las acciones son un bloque de información que envia datos desde la aplicación a tu store.  Normalmente son promesas. *"Son la única fuente de información para el store"*.
Ejemplo:
   ```javascript
  export const cambioTitulo = (titulo) => (dispatch) => {
  	dispatch({
    	type: CAMBIO_TITULO,
    	payload: titulo
    })
  }


- **Reducers:**  Las acciones describen que algo pasó, pero no especifican cómo cambió el estado de la aplicación en respuesta. Esto es trabajo de los reducers. Se encargan de reconocer cada cambio que hagamos en las actions para actualizar el componente.
Ejemplo:
  ```javascript
	const INITIAL_STATE = {
		titulo: ''
	};
    	
	export default (state = INITIAL_STATE, action) => {
		switch (action.type) {
			case CAMBIO_TITULO:
				return {
					...state,
					titulo: action.payload
				}
			default: return state;
			}
	}

- **Componentes (JSX):** Fusión de HTML y JS que nos permite crear componentes reautilizables para las aplicaciones. *"Interfaz"*.
Ejemplo:

  ```javascript
  import React from 'react';
  const Error = (props) => {
  	return (
   	 <React.Fragment>
    	  <h2 className="container">{ props.mensaje }</h2>
   	 </React.Fragment>
 	 );
	} 
	export default Error;

 ## El mundo redux se resume en el siguiente ciclo:
 ![2](https://user-images.githubusercontent.com/38017835/61195708-6fef5200-a68f-11e9-9ea2-6893f5875cfd.PNG)