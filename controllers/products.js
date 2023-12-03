const Product = require("../models/product");

const getProducts = async (req, res) => {
  const { company, name, featured, sort, select } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }
  if (featured) {
    queryObject.featured = featured;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let apiData = Product.find(queryObject);
  if (sort) {
    let sortFix = sort.replace(",", " ");
    apiData = apiData.select(sortFix);
  }

  if (select) {
    let selectFix = select.replace(",", " ");
    apiData = apiData.select(selectFix);
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;

  let skip = (page - 1) * limit;

  apiData = apiData.skip(skip).limit(limit);

  const myData = await apiData;

  res.status(200).json({ myData, nbHits: myData.length });
};

const getProductsTesting = async (req, res) => {
  res.status(200).json({ msg: "I got my products" });
};

module.exports = { getProducts, getProductsTesting };
