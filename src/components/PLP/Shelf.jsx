import React, { useMemo } from "react";
import { Link } from "react-router";

import { formatPrice, getDiscountPercent } from "../../utils";

function Shelf(props) {
    const { itemData } = props;

    const discount = useMemo(() => {
        const itemDiscount = itemData?.price.regular_amount - itemData.price.amount;
        return itemDiscount > 0;
    }, [itemData]);

    return (
        <div className="shelf-container">
            <Link to={`/items/${itemData.id}`} className="product-anchor" target="_self">
                <img src={itemData.picture} alt="Imagen de Producto" className="product-image" />
                <div className="product-info">
                    <h2 className="product-title">{itemData.title}</h2>
                    <div className="product-seller">Por {itemData.seller}</div>
                    <div className="product-prices">
                        {itemData.price.regular_amount && <div className="product-price">{formatPrice(itemData.price.regular_amount, itemData.price.currency)}</div>}
                        <div className="product-selling-price">
                            {formatPrice(itemData.price.amount, itemData.price.currency)}
                            {discount && <span className="product-discount">{getDiscountPercent(itemData.price.regular_amount, itemData.price.amount)}% OFF</span>}
                        </div>
                        <div className="product-installments">
                            Mismo precio en {itemData.installments}
                        </div>
                    </div>
                    {itemData.free_shipping && <div className="product-free-shipping">Envío gratis</div>}
                    {itemData.condition === "Reacondicionado" && <div className="product-condition">{itemData.condition}</div>}
                </div>
            </Link>
        </div>
    );
}

export default Shelf;