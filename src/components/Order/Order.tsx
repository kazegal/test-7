import React from "react";
import { Count, OrderType } from "../../types";

interface IProps {
    price: number;
    totalCount: Count[];
    food: OrderType[];
    delete: (name: string) => void;
}

const Order: React.FC<IProps> = (props) => {
    const ingredientsChosen = props.totalCount.some(item => item.count > 0);

    return (
        <div>
            {ingredientsChosen ? (
                <div>
                    {props.totalCount.map((item, index) => {
                        const foodItem = props.food.find((food) => food.name === item.name);
                        if (!foodItem || item.count === 0) return null;
                        const orderPrice = item.count * foodItem.price;

                        return (
                            <p key={index} style={{display: 'flex'}}>
                                <b style={{marginRight: 'auto'}}>{item.name}:</b>
                                <b style={{marginRight: '10px'}}>x{item.count}</b>
                                <span style={{marginRight: '10px'}}>
                                    = <b>{orderPrice} сом</b>
                                </span>
                                <button
                                    className="remove-btn"
                                    onClick={() => props.delete(item.name)}
                                >
                                    X
                                </button>
                            </p>
                        );
                    })}
                    <hr></hr>
                    <p className="total-price">Общая цена: {props.price} сом</p>
                </div>
            ) : (
                <p className="no-price">Заказы отстутствуют</p>
            )}
        </div>
    );
};

export default Order;
