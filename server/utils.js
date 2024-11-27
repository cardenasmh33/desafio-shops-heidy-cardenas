const temporalItems = [];

export async function formatItems(itemsData) {
    const formattedItems = await Promise.all(itemsData.map(async (itemData) => {
        const productImages = await fetchProductImages(itemData.id);
        const condition = itemData.attributes.find((attribute) => attribute.id === "ITEM_CONDITION");
        const installments = `${itemData.installments?.quantity} cuotas de ${formatPrice(itemData.installments?.amount, itemData.currency_id)}`;

        saveProductTemporalData(temporalItems, itemData.id, {
            installments,
            seller: itemData.seller
        });

        const formattedItem = {
            id: itemData.id,
            title: itemData.title,
            price: {
                currency: itemData.currency_id,
                amount: itemData.price,
                decimals: 0,
                regular_amount: itemData.original_price,
            },
            picture: productImages[0].url,
            condition: condition.value_name,
            free_shipping: itemData.shipping.free_shipping,
            installments,
            seller: itemData.seller.nickname,
        }

        return formattedItem;
    }));

    const data = {
        categories: [""],
        items: formattedItems,
        paging: itemsData.paging
    };

    return data;
}

async function fetchProductImages(itemId) {
    const response = await fetch(`https://api.mercadolibre.com/items/${itemId}`);
    const data = await response.json();
    return data.pictures;
}

async function fetchCategoryPath(categoryId) {
    const response = await fetch(`https://api.mercadolibre.com/categories/${categoryId}`);
    const data = await response.json();
    const categoryPath = data.path_from_root.map((path) => path.name);
    return categoryPath;
}

function formatPrice(price, currency) {
    let formattedPrice = Math.ceil(price).toLocaleString('es-AR', {
        style: 'currency',
        currency
    });

    formattedPrice = formattedPrice.replace(/,.*$/, "");

    return formattedPrice;
}

export async function formatProduct(itemData) {
    const pictures = itemData.pictures.map((picture) => picture.url);
    const condition = itemData.attributes.find((attribute) => attribute.id === "ITEM_CONDITION").value_name;
    const productTempData = temporalItems.find((tempItem) => tempItem.id === itemData.id);
    const colorAttribute = itemData.attributes.find((attribute) => attribute.id === "MAIN_COLOR" || attribute.id === "COLOR");
    const categoryPath = await fetchCategoryPath(itemData.category_id);

    const item = {
        id: itemData.id,
        title: itemData.title,
        price: {
            currency: itemData.currency_id,
            amount: itemData.price,
            decimals: 0,
            regular_amount: itemData.original_price,
        },
        pictures,
        condition,
        free_shipping: itemData.shipping.free_shipping,
        sold_quantity: 0,
        installments: productTempData?.installments || "",
        attributes: [
            {
                id: colorAttribute?.id,
                name: colorAttribute?.name,
                value_name: colorAttribute?.value_name,
            }
        ],
        category_path_from_root: categoryPath,
        seller: productTempData?.seller.nickname || ""
    }

    return item;
}

export function saveProductTemporalData(items, id, tempData) {
    const itemIndex = items.findIndex((tempItem) => tempItem.id === id);
    if (itemIndex !== -1) {
        items[itemIndex] = { ...items[itemIndex], ...tempData };
    } else {
        items.push({
            id,
            ...tempData
        })
    }
}