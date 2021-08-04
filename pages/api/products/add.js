
const mongoose = require('mongoose');
const Metafield = mongoose.model('Metafield');

export default async function handler(req, res) {
    // const data = req.query;
    // console.log('product metafield data---');
    // console.log(data);
    // const metafield = new Metafield(data);
    const metafield = {}

    console.log('Add Product Metafields')

    res.status(200).json(metafield)
}
