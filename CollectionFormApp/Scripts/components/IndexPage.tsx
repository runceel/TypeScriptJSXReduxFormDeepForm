import * as React from 'react';
import * as Redux from 'redux';
import * as ReduxForm from 'redux-form';
import * as reducers from '../reducers';
import Order from '../models/Order';
import OrderDetail from '../models/OrderDetail';
import * as orderActions from '../actions/orderActions';

interface IndexPageProps extends ReduxForm.ReduxFormProps {
    order?: (order: Order) => void;
    shippedOrder?: Order;
}

interface OrderFormData {
    name: string;
    orders: OrderDetailFormData[];
}

interface OrderDetailFormData {
    name: string;
    price: string;
}

class IndexPage extends React.Component<IndexPageProps, {}> {
    constructor(props: IndexPageProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    private onSubmit(data: OrderFormData) {
        let details = data.orders.map(x => {
            return {
                name: x.name,
                price: parseFloat(x.price)
            } as OrderDetail;
        });
        let order = {
            name: data.name,
            details: details
        } as Order;

        this.props.order(order);
    }

    render() {
        const {
            handleSubmit,
            fields: {name, orders}
        } = this.props;
        let orderDetails = orders as any;
        let orderDetailForms = orderDetails.map(x => (
            <div>
                <hr />
                <h3>Order detail</h3>
                <div>
                    <label>name</label>
                    <input type='text' {...x.name} />
                </div>
                <div>
                    <label>price</label>
                    <input type='text' {...x.price} />
                </div>
            </div>
        ));
        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <div>
                        <input type='submit' />
                    </div>
                    <div>
                        <label>Name</label>
                        <input type='text' {...name}/>
                    </div>
                    <div>
                        <button onClick={e => {
                            e.preventDefault();
                            orderDetails.addField();
                        }}>Add Order detail</button>
                    </div>
                    <div>
                        {orderDetailForms}
                    </div>
                </form>
                {this.props.shippedOrder.name && (
                    <div>
                        <hr />
                        <span>Order shipped: </span>
                        <span>{this.props.shippedOrder.name}</span>
                    </div>
                )}
            </div>
        );
    }
}

function select(state: reducers.AppState): IndexPageProps {
    return {
        shippedOrder: state.order
    };
};

export default ReduxForm.reduxForm({
    form: 'IndexPage',
    fields: ['name', 'orders[].name', 'orders[].price']
}, select, {
    addValue: (ReduxForm as any).addArrayValue,
    order: orderActions.order
})(IndexPage);