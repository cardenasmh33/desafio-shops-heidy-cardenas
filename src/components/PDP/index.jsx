import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import axios from 'axios';

import './styles.scss'
import Breadcrumb from "./Breadcrumb";
import Gallery from "./Gallery";
import { formatPrice, getDiscountPercent } from "../../utils";

function ProductDetailPage(props) {
    const { id } = useParams();
    const [itemData, setItemData] = useState();


    async function fetchProductInfo(productId) {
        try {
            const response = await axios.get(`http://localhost:5000/api/items/${productId}`);
            setItemData(response.data);
        } catch (error) {
            console.error('Fetching Product: ', error);
        }
    }

    useEffect(() => {
        fetchProductInfo(id);
    }, [id])

    const discount = useMemo(() => {
        if (!itemData) return;
        const itemDiscount = itemData?.price.regular_amount - itemData.price.amount;
        return itemDiscount > 0;
    }, [itemData]);

    const itemDescription = useMemo(() => {
        if (!itemData) return;
        return itemData.description.split("\n");
    }, [itemData]);

    const colorVariation = useMemo(() => {
        if (!itemData) return;
        console.log('test', itemData.attributes.find((attribute) => attribute.id === "MAIN_COLOR" || attribute.id === "COLOR"))
        return itemData.attributes.find((attribute) => attribute.id === "MAIN_COLOR" || attribute.id === "COLOR");
    });

    if (!itemData) return;

    return (
        <div className="pdp-container">
            <Breadcrumb categories={itemData.category_path_from_root} />
            <div className="product-detail-container">
                <div className="product-detail-row">
                    <Gallery pictures={itemData.pictures} />
                    <div className="product-details">
                        <div className="product-selling-details">{itemData.condition} | +100 vendidos</div>
                        <h1 className="product-title">
                            {itemData.title}
                        </h1>
                        {itemData.seller &&
                            <div className="product-seller">
                                Por {itemData.seller}
                            </div>
                        }
                        <div className="product-price">
                            {discount && formatPrice(itemData.price.regular_amount, itemData.price.currency)}
                        </div>
                        <div className="product-selling-price">
                            {formatPrice(itemData.price.amount, itemData.price.currency)}
                            {discount && <span className="product-discount">
                                {getDiscountPercent(itemData.price.regular_amount, itemData.price.amount)}% OFF
                            </span>}
                        </div>
                        {itemData.installments &&
                            <div className="product-installments">
                                Mismo precio en {itemData.installments}
                            </div>
                        }
                        {itemData.free_shipping &&
                            <div className="product-free-shipping">
                                Envío gratis
                            </div>
                        }
                        {colorVariation &&
                            <div className="product-variation">
                                Color: <span className="variation-value">{colorVariation.value_name}</span>
                            </div>
                        }
                    </div>
                </div>
                <div className="product-description">
                    <h2 className="description-title">Descripción</h2>
                    <p className="description-content">
                        {itemDescription.map((partialDescription, index) => (
                            <span key={index} className="description">{partialDescription}< br /></span>
                        ))}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;