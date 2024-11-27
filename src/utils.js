export function formatPrice(price, currency) {
    let formattedPrice = Math.ceil(price).toLocaleString('es-AR', {
        style: 'currency',
        currency
    });

    formattedPrice = formattedPrice.replace(/,.*$/, "");

    return formattedPrice;
}

export function getDiscountPercent(regularAmount, amount) {
    let discount = 0;
    discount = regularAmount - amount;
    const discountPercent = Math.floor(discount * 100 / regularAmount);

    if (discount > 0 && discountPercent === 0) return +(discount * 100 / regularAmount).toFixed(2);

    return discountPercent;
}