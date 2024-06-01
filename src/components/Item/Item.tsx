import React from "react";

interface IProps {
    name: string;
    price: number;
    image: string;
    key: string;
    makeOrder: (name: string) => void;
}

const Item: React.FC<IProps> = ({makeOrder,name,image,price}) => {
    return (
        <div onClick={() => makeOrder(name)} className="item-choose">
            <img
                className="item-img"
                src={image}
                alt={name}
            />
            <p className="name">{name}</p>
            <p>
                Price: <strong>{price} KGS</strong>
            </p>
        </div>
    );
};

export default Item;