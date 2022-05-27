import { applyMiddleware, compose, createStore } from 'redux';
import rootReduser from './rootReduser';
import rootSaga from './rootSaga'
import createSagaMiddleware from 'redux-saga'


const maps = JSON.parse(localStorage.getItem('maps')) || [];
const initialState = {
  map: {
    select_maps: maps , 
  map_img: {
      url: '#',
  },
  fog_war: {
      open: false,
      fogWarMaps: [],      
  },
  open: false,
  },
}


const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storeMap = createStore(rootReduser, initialState, composeEnhancers(
    applyMiddleware(sagaMiddleware)
  ));

sagaMiddleware.run(rootSaga)  

export default storeMap;