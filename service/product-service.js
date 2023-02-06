"use strict";

import { productModel } from "../models/product-model.js";
import { productHistoryModel } from "../models/product-history-model.js";

import { reqImage } from './cloudinary-service.js';

function errors(arg, message) {
    if (arg) {
        throw new Error(message);
    }
}

async function historyCreate(type, change) {
    const date = Date.now() + 7200 * 1000;
    return await productHistoryModel.create({
        date,
        type,
        change
    });
}

export const addProduct = async (isActive, image, name, count, weightPerItem, pricePerItem, description) => {
    name = name[0].toUpperCase() + name.substring(1);

    const nameProduct = await productModel.findOne({ name });
    errors(nameProduct, 'You already have this product.');

    if (image) {
        image = await reqImage(image);
    }
    // const imageMainUrl = image.split("upload/")[0] + "upload/";
    // const imageLocation = image.split("upload/")[1];


    //console.log(`${imageMainUrl}c_thumb,h_200,w_200/${imageLocation}`);

    const historyProduct = await historyCreate('Add product', `Product ${name}`);

    const product = await productModel.create({ isActive, image, name, count, weightPerItem, pricePerItem, description, history: [{ productHistory: historyProduct._id, date: historyProduct.date }] });
    return product;
};

export const updateProduct = async (id, isActive, image, name, count, weightPerItem, pricePerItem, description) => {
    if (id.length != 24) throw new Error("Product 'Id' not valid.");

    const productOld = await productModel.findById(id);
    errors(!productOld, 'Required product not found.');

    let historyProduct = {};

    if (count) {
        if (count == productOld.count) {
            throw new Error("The 'count' is equal to the previous value.");
        }

        historyProduct = await historyCreate('Edit count', `Product ${productOld.name} changed count from ${productOld.count} to ${count}.`);
    } else {

        let stringHistoryProduct = "";

        function editHistoryProduct(newParams, oldParams, error, message) {
            if (newParams) {
                if (newParams == oldParams) {
                    throw new Error(error);
                }
                stringHistoryProduct = stringHistoryProduct === "" ?
                    `Product ${productOld.name}: ` + message :
                    stringHistoryProduct.concat(`, `, message);
            }
        }

        editHistoryProduct(isActive, productOld.isActive, "The 'active' is equal to the previous value.", `changed 'active' from ${productOld.isActive} to ${isActive}`);
        editHistoryProduct(image, productOld.image, "The 'image' is equal to the previous value.", `changed 'image' from ${productOld.image} to ${image}`);
        editHistoryProduct(name, productOld.name, "The 'name' is equal to the previous value.", `changed 'name' from ${productOld.name} to ${name}`);
        editHistoryProduct(weightPerItem, productOld.weightPerItem, "The 'weightPerItem' is equal to the previous value.", `changed 'weightPerItem' from ${productOld.weightPerItem} to ${weightPerItem}`);
        editHistoryProduct(pricePerItem, productOld.pricePerItem, "The 'pricePerItem' is equal to the previous value.", `changed 'pricePerItem' from ${productOld.pricePerItem} to ${pricePerItem}`);
        editHistoryProduct(description, productOld.description, "The 'description' is equal to the previous value.", `changed 'description' from ${productOld.description} to ${description}`);

        if (stringHistoryProduct != "") {
            historyProduct = await historyCreate('Edit info', stringHistoryProduct);
        }
    }

    const product = await productModel.findByIdAndUpdate(id, { isActive, image, name, count, weightPerItem, pricePerItem, description }, { new: true });

    product.history.push({ productHistory: historyProduct._id, date: historyProduct.date });
    product.save();

    return product;
};

export const deleteProduct = async (id) => {
    if (id.length != 24) throw new Error("Product 'Id' not valid.");

    const product = await productModel.findByIdAndRemove(id);
    errors(!product, 'Required product not found.');

    let idArrayHistory = [];
    for (let i = 0; i < product.history.length; i++) {
        idArrayHistory[i] = product.history[i].productHistory.toString();
    }
    await productHistoryModel.deleteMany({ _id: { $in: idArrayHistory } });

    await historyCreate('Delete', `Product ${product.name}.`);

    return product;
};

export const getAllProducts = async (limit, offset) => {

    if (limit == 0) return [];

    const products = await productModel.find({}).limit(limit).skip(offset).exec();

    if (Object.keys(products).length === 0) {
        throw new Error('No payload.');
    }

    return products;
};

export const getAllProductsHistory = async (limit, offset) => {
    const productsHistory = await productHistoryModel.find({}).limit(limit).skip(offset).exec();

    if (Object.keys(productsHistory).length === 0) {
        throw new Error('No payload.');
    }

    return productsHistory;
};

export const getProduct = async (id) => {
    if (id.length != 24) throw new Error("Product 'Id' not valid.");

    const product = await productModel.findById(id);
    errors(!product, 'Required product not found.');

    return product;
};