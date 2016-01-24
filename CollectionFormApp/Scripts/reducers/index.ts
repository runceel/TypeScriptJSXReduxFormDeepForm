import Order from '../models/Order';
import * as orderReducers from './orderReducers';
import * as Redux from 'redux';
import * as ReduxForm from 'redux-form';

export interface AppState {
    order: Order;
}

export const reducer = Redux.combineReducers({
    order: orderReducers.order,
    form: ReduxForm.reducer
});
