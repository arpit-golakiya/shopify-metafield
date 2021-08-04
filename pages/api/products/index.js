const mongoose = require('mongoose');
const Product = mongoose.model('Product');

export default async function handler(req, res) {
    const page = (req.query.page > 0 ? req.query.page : 1) - 1;
    const _id = req.query.item;
    const limit = 15;
    const options = {
      limit: limit,
      page: page
    };
  
    if (_id) options.criteria = { _id };
  
    const products = await Product.list(options);
    const count = await Product.countDocuments();

    res.status(200).json({
        title: 'Products',
        products: products,
        page: page + 1,
        pages: Math.ceil(count / limit)
    })

}