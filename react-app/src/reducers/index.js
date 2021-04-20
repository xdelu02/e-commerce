import cartReducer from './cart';
import loggedReducer from './isLogged';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
	cart: cartReducer,
	isLogged: loggedReducer
});

export default allReducers;
