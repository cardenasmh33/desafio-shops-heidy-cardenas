const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { formatItems, formatProduct } = require('./utils');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/items', async (req, res) => {
    try {
        const { offset, q } = req.query;
        const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?offset=${offset}&q=${q}`);
        const data = await formatItems(response.data.results);
        res.json({
            ...data,
            paging: response.data.paging
        });
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.get('/api/items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://api.mercadolibre.com/items/${id}`);
        const data = await formatProduct(response.data);
        const descriptionResponse = await axios.get(`https://api.mercadolibre.com/items/${id}/description`);
        const description = descriptionResponse.data.plain_text;
        res.json({
            ...data,
            description,
        });
    } catch (error) {
        res.status(404).send(error.message);
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});