import * as actions from '../actions';
import * as orderActions from '../actions/orderActions';
import Order from '../models/Order';
import OrderDetail from '../models/OrderDetail';

export function order(state = new Order(), action: actions.Action<any>): Order {
    switch (action.type) {
        case actions.ORDER:
            return setOrder(state, action.payload as orderActions.OrderPayload);
        default:
            return state;
    }
}

function setOrder(state: Order, p: orderActions.OrderPayload): Order {
    return p.order;
}
