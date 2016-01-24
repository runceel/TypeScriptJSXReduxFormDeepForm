import * as actions from './';
import Order from '../models/Order';

export interface OrderPayload {
    order: Order;
}

export function order(order: Order): actions.Action<OrderPayload> {
    return {
        type: actions.ORDER,
        payload: {
            order: order
        }
    };
}
