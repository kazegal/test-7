import {useState} from 'react';
import {nanoid} from "nanoid";
import foodImage from './assets/food.png';
import drinkImage from './assets/drink.png';
import {Count, FoodConst} from "./types";
import Item from "./components/Item/Item";
import Order from "./components/Order/Order";
import './App.css';

const App = () => {

    const FOOD: FoodConst[] = [
        {id: nanoid(), name: 'Hamburger', price: 80, image: foodImage},
        {id: nanoid(), name: 'CheeseBurger', price: 90, image: foodImage},
        {id: nanoid(), name: 'Fries', price: 45, image: foodImage},
        {id: nanoid(), name: 'Coffee', price: 70, image: drinkImage},
        {id: nanoid(), name: 'Tea', price: 50, image: drinkImage},
        {id: nanoid(), name: 'Cola', price: 40, image: drinkImage},
    ];

    const [fastFood, setFastFood] = useState<Count[]>([
        {name: 'Hamburger', count: 0},
        {name: 'CheeseBurger', count: 0},
        {name: 'Fries', count: 0},
        {name: 'Coffee', count: 0},
        {name: 'Tea', count: 0},
        {name: 'Cola', count: 0},
    ]);

    const [totalPrice, setTotalPrice] = useState(0);

    const makeOrder = (name: string) => {
        setFastFood((prevState) => {
            return prevState.map((item, index) => {
                if (item.name === name) {
                    const total = totalPrice + FOOD[index].price;
                    setTotalPrice(total);
                    return {
                        ...item,
                        count: item.count + 1,
                    };
                }
                return item;
            });
        });
    };

    const removeOrder = (name: string) => {
        setFastFood((prevState) => {
            return prevState.map((item, index) => {
                if (item.name === name) {
                    const priceCount =
                        totalPrice - fastFood[index].count * FOOD[index].price;
                    setTotalPrice(priceCount);
                    return {
                        ...item,
                        count:  0,
                    };
                }
                return item;
            });
        });
    };

    const showItems = FOOD.map((item) => {
        return (
            <Item
                name={item.name}
                price={item.price}
                image={item.image}
                key={item.id}
                makeOrder={makeOrder}
            />
        );
    });

    return (
        <div className="App">
            <div className='order-wrap'>
                <h4 className='order-title'>Order Details:</h4>
                <Order
                    key={nanoid()}
                    price={totalPrice}
                    totalCount={fastFood}
                    food={FOOD}
                    delete={removeOrder}
                />
            </div>
            <div className='items-wrap'>
                <h4 className='item-title'>Add Items:</h4>
                {showItems}
            </div>
        </div>
    );
};

export default App;

