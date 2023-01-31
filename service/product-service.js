"use strict";

import dateFormat from "dateformat";


import { productModel } from "../models/product-model.js";
import { productHistoryModel } from "../models/product-history-model.js";

import { config } from '../config.js';
import { ApiError } from "../exceptions/api-error.js";
import { ProductDto } from '../dtos/product-dto.js';

function errors(arg, message) {
    if (arg) {
        throw new ApiError(404, message, 'null');
    }
}

async function historyCreate(type, change) {
    return await productHistoryModel.create({
        date: Date.now(),
        type,
        change
    });
}

export const addProduct = async (isActive, image, name, count, weightPerItem, pricePerItem, description) => {
    const nameProduct = await productModel.findOne({ name });
    errors(nameProduct, 'You already have this product.');

    const historyProduct = await historyCreate('Add product', `Add product ${name}`);

    const product = await productModel.create({ isActive, image, name, count, weightPerItem, pricePerItem, description, history: [{ productHistory: historyProduct._id, date: historyProduct.date }] });
    return product;
};

export const updateProduct = async (id, isActive, image, name, count, weightPerItem, pricePerItem, description) => {

    const nameProduct = await productModel.findOne({ name });
    errors(nameProduct, 'You already have this product.');


    const oldProduct = await productModel.findOne({ id });
    console.log(oldProduct);

    const product = await productModel.findByIdAndUpdate(id, { isActive, image, name, count, weightPerItem, pricePerItem, description }, { new: true });

    //product.push({ productHistory: historyProduct._id, date: historyProduct.date });
    // product.save();

    // console.log(product);
    return product;
};

export const deleteProduct = async (id) => {
    const product = await productModel.findByIdAndRemove(id);
    // console.log(product);
    errors(!product, 'Required product not found.');
    return product;
};

export const getAllProducts = async () => {
    const products = await productModel.find({});
    errors(products, 'No payload.');
    return products;
};

export const getAllProductsHistory = async () => {
    const productsHistory = await productHistoryModel.find({});
    return productsHistory;
};