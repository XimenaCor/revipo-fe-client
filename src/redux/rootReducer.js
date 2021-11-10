import {combineReducers} from 'redux';
import solicitudReducer from './solicitud/reducer';

const rootReducer = combineReducers({
    solicitud: solicitudReducer,
});

export default rootReducer;